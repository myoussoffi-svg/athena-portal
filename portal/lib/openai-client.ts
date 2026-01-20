import OpenAI from 'openai';
import ffmpeg from 'fluent-ffmpeg';
import { tmpdir } from 'os';
import { join, resolve } from 'path';
import { writeFile, readFile, unlink } from 'fs/promises';
import { randomUUID } from 'crypto';
import { existsSync } from 'fs';

// Set FFmpeg path - resolve manually to avoid Turbopack path mangling
function getFfmpegPath(): string {
  // Try common locations
  const possiblePaths = [
    resolve(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg.exe'),
    resolve(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg'),
    '/usr/bin/ffmpeg',
    '/usr/local/bin/ffmpeg',
  ];

  for (const p of possiblePaths) {
    if (existsSync(p)) {
      return p;
    }
  }

  throw new Error('FFmpeg not found. Install ffmpeg-static or system ffmpeg.');
}

// Initialize ffmpeg path
const ffmpegBinaryPath = getFfmpegPath();
ffmpeg.setFfmpegPath(ffmpegBinaryPath);
console.log(`Using FFmpeg at: ${ffmpegBinaryPath}`);

// Initialize OpenAI client
function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

/**
 * Extract and compress audio from video file.
 * Converts to MP3 at 64kbps mono for minimum file size while maintaining clarity.
 * This ensures the file stays under Whisper's 25MB limit.
 */
async function extractAudioFromVideo(videoBuffer: Buffer): Promise<Buffer> {
  const tempId = randomUUID();
  const inputPath = join(tmpdir(), `input-${tempId}.webm`);
  const outputPath = join(tmpdir(), `output-${tempId}.mp3`);

  try {
    // Write video buffer to temp file
    await writeFile(inputPath, videoBuffer);

    // Extract audio using FFmpeg
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .noVideo()
        .audioCodec('libmp3lame')
        .audioBitrate('64k')
        .audioChannels(1)
        .audioFrequency(16000) // 16kHz is optimal for speech recognition
        .output(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    // Read the output audio file
    const audioBuffer = await readFile(outputPath);

    console.log(`Audio extraction complete: ${(videoBuffer.length / 1024 / 1024).toFixed(2)}MB video -> ${(audioBuffer.length / 1024 / 1024).toFixed(2)}MB audio`);

    return audioBuffer;
  } finally {
    // Cleanup temp files
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});
  }
}

// Whisper transcription response with word-level timing
export interface WhisperWord {
  word: string;
  start: number; // seconds
  end: number; // seconds
}

export interface WhisperSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResult {
  text: string;
  segments: WhisperSegment[];
  words: WhisperWord[];
  duration: number;
}

/**
 * Transcribe audio/video using OpenAI Whisper API.
 * Returns full transcript with word-level timestamps for segment alignment.
 *
 * For video files, extracts and compresses audio first to stay under Whisper's 25MB limit.
 *
 * @param videoBuffer - Buffer containing video/audio data
 * @param filename - Filename with extension (e.g., "recording.webm")
 * @returns Transcription with word-level timing
 */
export async function transcribeAudio(
  videoBuffer: Buffer,
  filename: string = 'recording.webm'
): Promise<TranscriptionResult> {
  const client = getOpenAIClient();

  // Extract and compress audio from video
  console.log(`Starting audio extraction from ${(videoBuffer.length / 1024 / 1024).toFixed(2)}MB video...`);
  const audioBuffer = await extractAudioFromVideo(videoBuffer);

  // Check file size (Whisper limit is 25MB)
  const fileSizeMB = audioBuffer.length / 1024 / 1024;
  if (fileSizeMB > 25) {
    throw new Error(`Audio file too large for Whisper API: ${fileSizeMB.toFixed(2)}MB (limit: 25MB)`);
  }

  // Create a File object from the compressed audio buffer
  const uint8Array = new Uint8Array(audioBuffer);
  const file = new File([uint8Array], 'recording.mp3', { type: 'audio/mpeg' });

  console.log(`Sending ${fileSizeMB.toFixed(2)}MB audio to Whisper API...`);

  // Call Whisper API with verbose_json to get word-level timestamps
  const response = await client.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word', 'segment'],
  });

  // Extract data from response
  const result: TranscriptionResult = {
    text: response.text,
    segments: (response.segments || []).map((seg) => ({
      id: seg.id,
      start: seg.start,
      end: seg.end,
      text: seg.text,
    })),
    words: (response.words || []).map((word) => ({
      word: word.word,
      start: word.start,
      end: word.end,
    })),
    duration: response.duration || 0,
  };

  return result;
}

/**
 * Align transcript to segment boundaries.
 * Maps words from Whisper to the interview prompt segments based on timing.
 *
 * @param transcription - Full transcription with word timings
 * @param segmentBoundaries - Array of {promptId, startTimeSeconds, endTimeSeconds}
 * @returns Segments with transcript text filled in
 */
export function alignTranscriptToSegments(
  transcription: TranscriptionResult,
  segmentBoundaries: Array<{
    promptId: number;
    startTimeSeconds: number;
    endTimeSeconds: number;
  }>
): Array<{
  promptId: number;
  startTimeSeconds: number;
  endTimeSeconds: number;
  transcriptText: string;
}> {
  return segmentBoundaries.map((boundary) => {
    // Find words that fall within this segment's time range
    // Convert boundary times from milliseconds to seconds if needed
    const startSec = boundary.startTimeSeconds / 1000;
    const endSec = boundary.endTimeSeconds / 1000;

    const segmentWords = transcription.words.filter((word) => {
      // Word is in segment if its midpoint falls within the boundary
      const wordMid = (word.start + word.end) / 2;
      return wordMid >= startSec && wordMid <= endSec;
    });

    const transcriptText = segmentWords.map((w) => w.word).join(' ').trim();

    return {
      promptId: boundary.promptId,
      startTimeSeconds: boundary.startTimeSeconds,
      endTimeSeconds: boundary.endTimeSeconds,
      transcriptText: transcriptText || '[No speech detected in this segment]',
    };
  });
}
