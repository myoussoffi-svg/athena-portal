import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// R2 client configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'athena-interviews';

// Validate required env vars (will throw at runtime if missing)
function getR2Client(): S3Client {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('R2 credentials not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Generate a presigned URL for uploading a video directly to R2.
 * The client uses this URL to PUT the video file directly.
 *
 * @param attemptId - The interview attempt ID (used as folder name)
 * @param expiresInSeconds - URL expiration time (default 30 minutes)
 * @returns Presigned PUT URL and the object key
 */
export async function generateUploadUrl(
  attemptId: string,
  expiresInSeconds: number = 30 * 60
): Promise<{ uploadUrl: string; objectKey: string; expiresAt: Date }> {
  const client = getR2Client();
  const objectKey = `videos/${attemptId}/recording.webm`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
    ContentType: 'video/webm',
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  return { uploadUrl, objectKey, expiresAt };
}

/**
 * Generate a presigned URL for viewing/downloading a video.
 * Used by admins to view candidate recordings.
 *
 * @param objectKey - The R2 object key
 * @param expiresInSeconds - URL expiration time (default 15 minutes)
 * @returns Presigned GET URL
 */
export async function generateViewUrl(
  objectKey: string,
  expiresInSeconds: number = 15 * 60
): Promise<{ url: string; expiresIn: number }> {
  const client = getR2Client();

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  return { url, expiresIn: expiresInSeconds };
}

/**
 * Check if an object exists in R2.
 *
 * @param objectKey - The R2 object key
 * @returns true if object exists, false otherwise
 */
export async function objectExists(objectKey: string): Promise<boolean> {
  const client = getR2Client();

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: objectKey,
      })
    );
    return true;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'NotFound') {
      return false;
    }
    throw error;
  }
}

/**
 * Delete an object from R2.
 *
 * @param objectKey - The R2 object key
 */
export async function deleteObject(objectKey: string): Promise<void> {
  const client = getR2Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: objectKey,
    })
  );
}

/**
 * Generate a presigned URL for uploading a Word document resume to R2.
 * The client uses this URL to PUT the .docx file directly.
 *
 * @param feedbackId - The resume feedback ID (used as folder name)
 * @param fileName - Original file name for the document
 * @param expiresInSeconds - URL expiration time (default 15 minutes)
 * @returns Presigned PUT URL and the object key
 */
export async function generateResumeUploadUrl(
  feedbackId: string,
  fileName: string,
  expiresInSeconds: number = 15 * 60
): Promise<{ uploadUrl: string; objectKey: string; expiresAt: Date }> {
  const client = getR2Client();
  // Sanitize filename and create object key
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectKey = `resumes/${feedbackId}/${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
    ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  return { uploadUrl, objectKey, expiresAt };
}

/**
 * Download an object from R2 as a buffer.
 * Used by the processing pipeline to send video to transcription service.
 *
 * @param objectKey - The R2 object key
 * @returns Buffer containing the file data
 */
export async function downloadObject(objectKey: string): Promise<Buffer> {
  const client = getR2Client();

  const response = await client.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: objectKey,
    })
  );

  if (!response.Body) {
    throw new Error('Empty response body from R2');
  }

  // Convert stream to buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
