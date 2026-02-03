'use client';

import { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import type { LessonVideo as LessonVideoType } from '@/lib/content';

interface LessonVideoProps {
  video: LessonVideoType;
}

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

function getEmbedUrl(video: LessonVideoType): string {
  const startTime = video.startTime ? `#t=${video.startTime}s` : '';

  switch (video.provider) {
    case 'youtube': {
      const ytStart = video.startTime ? `&start=${video.startTime}` : '';
      return `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1${ytStart}`;
    }
    case 'vimeo':
      // dnt=1 = do not track (privacy)
      // byline=0, portrait=0 = hide uploader info
      // Domain restriction is set in Vimeo dashboard, not here
      return `https://player.vimeo.com/video/${video.id}?dnt=1&byline=0&portrait=0&title=0${startTime}`;
    case 'mux':
      return `https://stream.mux.com/${video.id}.m3u8`;
    case 'cloudflare':
      return `https://customer-${video.id}.cloudflarestream.com/${video.id}/iframe`;
    default:
      return '';
  }
}

function getThumbnailUrl(video: LessonVideoType): string | null {
  if (video.poster) return video.poster;

  switch (video.provider) {
    case 'youtube':
      return `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    case 'vimeo':
      // Vimeo thumbnails require an API call, so we'll skip auto-thumbnail
      return null;
    case 'mux':
      return `https://image.mux.com/${video.id}/thumbnail.jpg?width=1280&height=720`;
    default:
      return null;
  }
}

export function LessonVideo({ video }: LessonVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = getThumbnailUrl(video);
  const embedUrl = getEmbedUrl(video);

  // For Mux, use iframe embed
  if (video.provider === 'mux') {
    return (
      <div
        style={{
          marginBottom: 32,
          borderRadius: 12,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
          }}
        >
          <iframe
            src={`https://stream.mux.com/${video.id}/iframe`}
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
            title="Lesson Video"
          />
        </div>
      </div>
    );
  }

  // For YouTube, Vimeo, Cloudflare - use iframe embed with click-to-play
  return (
    <div
      style={{
        marginBottom: 32,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#000',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
        }}
      >
        {!isPlaying && thumbnailUrl ? (
          <button
            onClick={() => setIsPlaying(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: 'none',
            }}
          >
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Play
                  size={32}
                  style={{
                    color: 'var(--athena-accent)',
                    marginLeft: 4, // Optical centering for play icon
                  }}
                  fill="var(--athena-accent)"
                />
              </div>
            </div>
            {video.duration && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <Clock size={14} />
                <span>{formatDuration(video.duration)}</span>
              </div>
            )}
          </button>
        ) : (
          <iframe
            src={`${embedUrl}${isPlaying ? '&autoplay=1' : ''}`}
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
            title="Lesson Video"
          />
        )}
      </div>
    </div>
  );
}
