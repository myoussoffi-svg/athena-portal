'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, FileText, AlertCircle, Loader2, X } from 'lucide-react';
import { MAX_FILE_SIZE_BYTES, ACCEPTED_CONTENT_TYPE } from '@/lib/resume/schemas';

interface ResumeUploaderProps {
  onUploadComplete: (data: { feedbackId: string; objectKey: string }) => void;
  onError: (error: string) => void;
  trackSlug: string;
  disabled?: boolean;
}

type UploadState = 'idle' | 'validating' | 'uploading' | 'submitting' | 'error';

export function ResumeUploader({
  onUploadComplete,
  onError,
  trackSlug,
  disabled = false,
}: ResumeUploaderProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Accept .docx files (may have different MIME type depending on browser)
    const isValidDocx =
      file.type === ACCEPTED_CONTENT_TYPE ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.toLowerCase().endsWith('.docx');

    if (!isValidDocx) {
      return 'Please upload a Word document (.docx)';
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File must be under ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`;
    }
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    setErrorMessage(null);
    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      onError(validationError);
      return;
    }
    setSelectedFile(file);
  }, [onError]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [disabled, handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

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
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const uploadFile = async () => {
    if (!selectedFile) return;

    try {
      setState('validating');
      setErrorMessage(null);

      // Step 1: Get presigned upload URL
      const uploadResponse = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: selectedFile.name,
          contentType: ACCEPTED_CONTENT_TYPE,
          fileSizeBytes: selectedFile.size,
          trackSlug,
        }),
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { feedbackId, uploadUrl, objectKey } = await uploadResponse.json();

      // Step 2: Upload file directly to R2
      setState('uploading');
      const putResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': ACCEPTED_CONTENT_TYPE,
        },
      });

      if (!putResponse.ok) {
        throw new Error('Failed to upload file to storage');
      }

      // Step 3: Confirm upload and trigger processing
      setState('submitting');
      const submitResponse = await fetch('/api/resume/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeObjectKey: objectKey,
          resumeFileName: selectedFile.name,
          trackSlug,
        }),
      });

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        throw new Error(errorData.error || 'Failed to submit resume');
      }

      // Success!
      onUploadComplete({ feedbackId, objectKey });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setState('error');
      setErrorMessage(message);
      onError(message);
    }
  };

  const isUploading = state === 'validating' || state === 'uploading' || state === 'submitting';

  return (
    <div style={{ width: '100%' }}>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
        style={{
          padding: selectedFile ? '24px' : '48px 24px',
          border: `2px dashed ${
            dragActive
              ? 'rgba(65, 109, 137, 0.6)'
              : errorMessage
                ? 'rgba(220, 38, 38, 0.4)'
                : 'rgba(10, 10, 10, 0.15)'
          }`,
          borderRadius: 16,
          background: dragActive
            ? 'rgba(65, 109, 137, 0.05)'
            : selectedFile
              ? 'rgba(65, 109, 137, 0.03)'
              : 'rgba(10, 10, 10, 0.02)',
          cursor: disabled || isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleInputChange}
          style={{ display: 'none' }}
          disabled={disabled || isUploading}
        />

        {selectedFile ? (
          // File selected state
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#416D89',
              }}
            >
              <FileText size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'rgba(10, 10, 10, 0.9)',
                  marginBottom: 4,
                }}
              >
                {selectedFile.name}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.5)' }}>
                {(selectedFile.size / 1024).toFixed(1)} KB
              </div>
            </div>
            {!isUploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: 'none',
                  background: 'rgba(10, 10, 10, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(10, 10, 10, 0.5)',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          // Empty state
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.08) 0%, rgba(65, 109, 137, 0.12) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#416D89',
              }}
            >
              <Upload size={28} />
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(10, 10, 10, 0.8)',
                marginBottom: 8,
              }}
            >
              Drop your resume here
            </div>
            <div style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.5)' }}>
              or click to browse (.docx only, max 5MB)
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div
          style={{
            marginTop: 12,
            padding: '12px 16px',
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <AlertCircle size={18} style={{ color: 'rgb(220, 38, 38)', flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: 'rgb(220, 38, 38)' }}>{errorMessage}</span>
        </div>
      )}

      {/* Upload button */}
      {selectedFile && !errorMessage && (
        <button
          onClick={uploadFile}
          disabled={isUploading || disabled}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '14px 24px',
            background: isUploading
              ? 'rgba(65, 109, 137, 0.6)'
              : 'linear-gradient(135deg, #416D89 0%, #4a7a96 100%)',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            color: 'white',
            cursor: isUploading || disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: isUploading ? 'none' : '0 4px 12px rgba(65, 109, 137, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          {isUploading ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              {state === 'validating' && 'Validating...'}
              {state === 'uploading' && 'Uploading...'}
              {state === 'submitting' && 'Submitting...'}
            </>
          ) : (
            <>
              <Upload size={18} />
              Get Feedback
            </>
          )}
        </button>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
