'use client';

import { useState } from 'react';
import type { VideoWalkthroughItem } from '@/lib/content';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}:${remainingMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface VideoWalkthroughSectionProps {
  videos: VideoWalkthroughItem[];
}

export function VideoWalkthroughSection({ videos }: VideoWalkthroughSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {videos.map((video, i) => (
        <div key={video.vimeoId} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Video card */}
          <button
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              background: activeIndex === i ? 'rgba(65, 109, 137, 0.06)' : 'rgba(10, 10, 10, 0.02)',
              border: `1px solid ${activeIndex === i ? 'rgba(65, 109, 137, 0.2)' : 'rgba(10, 10, 10, 0.06)'}`,
              borderRadius: activeIndex === i ? '12px 12px 0 0' : 12,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              width: '100%',
            }}
          >
            {/* Step number */}
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: activeIndex === i
                ? 'linear-gradient(135deg, #416D89 0%, #2d4a5e 100%)'
                : 'rgba(10, 10, 10, 0.08)',
              color: activeIndex === i ? 'white' : 'rgba(10, 10, 10, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {i + 1}
            </div>

            {/* Title */}
            <span style={{
              flex: 1,
              fontSize: 15,
              fontWeight: 500,
              color: '#0A0A0A',
            }}>
              {video.title}
            </span>

            {/* Duration */}
            {video.duration && (
              <span style={{
                fontSize: 13,
                color: 'rgba(10, 10, 10, 0.4)',
                flexShrink: 0,
              }}>
                {formatDuration(video.duration)}
              </span>
            )}

            {/* Expand indicator */}
            <span style={{
              fontSize: 18,
              color: 'rgba(10, 10, 10, 0.3)',
              transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}>
              ▾
            </span>
          </button>

          {/* Expanded video player + template download */}
          {activeIndex === i && (
            <div style={{
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              border: '1px solid rgba(65, 109, 137, 0.2)',
              borderTop: 'none',
            }}>
              <div style={{ background: '#000' }}>
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?dnt=1&byline=0&portrait=0&title=0`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
              </div>
              {video.template && (
                <div style={{
                  padding: '12px 20px',
                  background: 'rgba(65, 109, 137, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <span style={{ fontSize: 16 }}>📎</span>
                  <a
                    href={video.template}
                    download
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#416D89',
                      textDecoration: 'none',
                    }}
                  >
                    Download Excel Template
                  </a>
                  <span style={{
                    fontSize: 12,
                    color: 'rgba(10, 10, 10, 0.35)',
                    marginLeft: 'auto',
                  }}>
                    .xlsx
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
