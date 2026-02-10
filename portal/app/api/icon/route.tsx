import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #429cd4 0%, #416d89 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          A
        </div>
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
