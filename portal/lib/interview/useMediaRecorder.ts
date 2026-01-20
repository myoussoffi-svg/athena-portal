'use client';

import { useState, useRef, useCallback } from 'react';
import { getSupportedMimeType } from './browserCompat';

interface UseMediaRecorderReturn {
  // State
  isRecording: boolean;
  error: string | null;
  recordedBlob: Blob | null;
  stream: MediaStream | null;

  // Actions
  requestPermissions: () => Promise<boolean>;
  startRecording: () => boolean;
  stopRecording: () => void;
  releaseStream: () => void;
}

/**
 * Hook to manage MediaRecorder for video recording
 */
export function useMediaRecorder(): UseMediaRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string | null>(null);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      // Get supported MIME type
      const mimeType = getSupportedMimeType();
      if (!mimeType) {
        setError('No supported video format found in this browser');
        return false;
      }
      mimeTypeRef.current = mimeType;

      // Request camera and microphone access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      setStream(mediaStream);
      return true;
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setError('Camera and microphone access was denied. Please allow access in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera or microphone found. Please connect a camera and microphone.');
        } else {
          setError(`Failed to access camera: ${err.message}`);
        }
      } else {
        setError('Failed to access camera and microphone');
      }
      return false;
    }
  }, []);

  const startRecording = useCallback((): boolean => {
    if (!stream || !mimeTypeRef.current) {
      setError('Stream not available. Please request permissions first.');
      return false;
    }

    try {
      setError(null);
      chunksRef.current = [];
      setRecordedBlob(null);

      const recorder = new MediaRecorder(stream, {
        mimeType: mimeTypeRef.current,
        videoBitsPerSecond: 2_500_000, // 2.5 Mbps
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current! });
        setRecordedBlob(blob);
        setIsRecording(false);
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording error occurred');
        setIsRecording(false);
      };

      // Request data every second to avoid memory issues
      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      return true;
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to start recording');
      return false;
    }
  }, [stream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const releaseStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }, [stream]);

  return {
    isRecording,
    error,
    recordedBlob,
    stream,
    requestPermissions,
    startRecording,
    stopRecording,
    releaseStream,
  };
}
