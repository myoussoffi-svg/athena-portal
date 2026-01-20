'use client';

import { useEffect, useRef } from 'react';

interface VideoPreviewProps {
  stream: MediaStream | null;
  size?: 'small' | 'large';
}

export function VideoPreview({ stream, size = 'large' }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const dimensions = size === 'small'
    ? { width: 160, height: 120 }
    : { width: 640, height: 480 };

  return (
    <div
      style={{
        position: 'relative',
        width: dimensions.width,
        maxWidth: '100%',
        aspectRatio: '4/3',
        background: '#111827',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(10, 10, 10, 0.08)',
      }}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // Mirror for natural feel
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
            fontSize: 14,
          }}
        >
          Camera not available
        </div>
      )}
    </div>
  );
}
