'use client';

import { useState, useCallback, useRef } from 'react';
import { Camera, Image, X, Loader2, CheckCircle, Sparkles } from 'lucide-react';

interface ScreenshotUploaderProps {
  feedbackId: string;
  onUploadComplete?: () => void;
  onError?: (error: string) => void;
}

type UploadState = 'idle' | 'uploading' | 'complete' | 'error';

const MAX_SCREENSHOT_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function ScreenshotUploader({
  feedbackId,
  onUploadComplete,
  onError,
}: ScreenshotUploaderProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return 'Please upload a PNG, JPEG, or WebP image';
    }
    if (file.size > MAX_SCREENSHOT_SIZE) {
      return `Image must be under ${MAX_SCREENSHOT_SIZE / 1024 / 1024}MB`;
    }
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    setErrorMessage(null);
    setState('idle');

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      onError?.(validationError);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  }, [onError]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const clearFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    setState('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [previewUrl]);

  const uploadScreenshot = async () => {
    if (!selectedFile) return;

    try {
      setState('uploading');
      setErrorMessage(null);

      const formData = new FormData();
      formData.append('screenshot', selectedFile);
      formData.append('feedbackId', feedbackId);

      const response = await fetch('/api/resume/screenshot', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload screenshot');
      }

      setState('complete');
      onUploadComplete?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setState('error');
      setErrorMessage(message);
      onError?.(message);
    }
  };

  const isUploading = state === 'uploading';
  const isComplete = state === 'complete';

  return (
    <div
      style={{
        padding: 20,
        background: isComplete
          ? 'rgba(34, 197, 94, 0.05)'
          : 'rgba(139, 92, 246, 0.03)',
        border: `1px solid ${
          isComplete
            ? 'rgba(34, 197, 94, 0.2)'
            : 'rgba(139, 92, 246, 0.15)'
        }`,
        borderRadius: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: isComplete
              ? 'rgba(34, 197, 94, 0.1)'
              : 'rgba(139, 92, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isComplete ? (
            <CheckCircle size={20} style={{ color: 'rgb(34, 197, 94)' }} />
          ) : (
            <Sparkles size={20} style={{ color: 'rgb(139, 92, 246)' }} />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'rgba(10, 10, 10, 0.9)',
                margin: 0,
              }}
            >
              Enhanced Formatting Analysis
            </h4>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'rgb(139, 92, 246)',
                background: 'rgba(139, 92, 246, 0.1)',
                padding: '2px 8px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              Optional
            </span>
          </div>

          <p
            style={{
              fontSize: 13,
              color: 'rgba(10, 10, 10, 0.6)',
              margin: '0 0 16px',
              lineHeight: 1.5,
            }}
          >
            {isComplete
              ? 'Screenshot uploaded! Your feedback will include detailed formatting analysis.'
              : 'Upload a screenshot of your resume to get visual formatting feedback (margins, fonts, header layout, content density).'}
          </p>

          {!isComplete && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleInputChange}
                style={{ display: 'none' }}
                disabled={isUploading}
              />

              {selectedFile && previewUrl ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Preview */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: '1px solid rgba(10, 10, 10, 0.1)',
                      background: 'white',
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Resume screenshot preview"
                      style={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                    {!isUploading && (
                      <button
                        onClick={clearFile}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: 'none',
                          background: 'rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* File info */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.5)' }}>
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                    </span>

                    <button
                      onClick={uploadScreenshot}
                      disabled={isUploading}
                      style={{
                        padding: '8px 16px',
                        background: isUploading
                          ? 'rgba(139, 92, 246, 0.5)'
                          : 'rgb(139, 92, 246)',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'white',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      {isUploading ? (
                        <>
                          <Loader2
                            size={14}
                            style={{ animation: 'spin 1s linear infinite' }}
                          />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera size={14} />
                          Upload Screenshot
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px dashed rgba(139, 92, 246, 0.3)',
                    borderRadius: 8,
                    background: 'rgba(139, 92, 246, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: 14,
                    color: 'rgb(139, 92, 246)',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Image size={18} />
                  Choose Screenshot
                </button>
              )}

              {/* Error message */}
              {errorMessage && (
                <div
                  style={{
                    marginTop: 8,
                    padding: '8px 12px',
                    background: 'rgba(220, 38, 38, 0.08)',
                    borderRadius: 6,
                    fontSize: 13,
                    color: 'rgb(220, 38, 38)',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Tip */}
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(10, 10, 10, 0.4)',
                  margin: '12px 0 0',
                }}
              >
                Tip: Take a full-page screenshot of your resume in Word (File → Print → Save as PDF, then screenshot)
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
