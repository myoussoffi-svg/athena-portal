import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #429cd4 0%, #416d89 50%, #2d4a5e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: 'white',
              letterSpacing: '0.4em',
            }}
          >
            ATHENA
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Master Your Finance Interview
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Investment Banking Interview Prep
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
