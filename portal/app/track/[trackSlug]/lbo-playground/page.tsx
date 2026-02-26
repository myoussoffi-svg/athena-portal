import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { getTracks } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { GlobalStyles, ComingSoon } from "@/components/ui";
import { LBOPlaygroundClient } from "./LBOPlaygroundClient";

type Params = { trackSlug: string };

export const metadata = {
  title: 'LBO Sensitivity Playground | Athena',
  description: 'Interactive LBO calculator — explore how entry multiples, leverage, growth, and exit assumptions drive PE returns.',
};

export default async function LBOPlaygroundPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  const { userId } = await auth();
  if (!userId) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2 style={{ fontSize: 24, marginBottom: 12 }}>Sign in required</h2>
            <p style={{ color: "rgba(10, 10, 10, 0.6)", marginBottom: 20 }}>
              Please sign in to access the LBO Playground.
            </p>
            <Link
              href="/sign-in"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#416D89",
                color: "white",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!isTrackVisible(trackSlug)) {
    return (
      <>
        <GlobalStyles />
        <ComingSoon
          courseName="This course"
          backHref="/track"
          backLabel="Back to Tracks"
        />
      </>
    );
  }

  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  return (
    <>
      <GlobalStyles />
      <style>{`
        .playground-page {
          min-height: 100vh;
          background: #FFFFFF;
          font-family: Inter, system-ui, sans-serif;
        }
        .playground-header {
          background: linear-gradient(180deg, #416D89 0%, #4a7a96 50%, #FFFFFF 100%);
          padding: 48px 24px 60px;
          margin-bottom: -32px;
        }
        .playground-header-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .playground-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 16px;
          transition: color 0.15s;
        }
        .playground-breadcrumb:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .playground-breadcrumb svg {
          width: 16px;
          height: 16px;
        }
        .playground-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }
        .playground-subtitle {
          margin: 8px 0 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 560px;
        }
        .playground-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 64px;
        }
        @media (max-width: 640px) {
          .playground-header {
            padding: 36px 20px 52px;
          }
          .playground-title {
            font-size: 26px;
          }
          .playground-content {
            padding: 0 16px 48px;
          }
        }
      `}</style>

      <div className="playground-page">
        <div className="playground-header">
          <div className="playground-header-inner">
            <Link href={`/track/${trackSlug}`} className="playground-breadcrumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {track.title}
            </Link>
            <h1 className="playground-title">LBO Sensitivity Playground</h1>
            <p className="playground-subtitle">
              Explore how entry multiples, leverage, growth, and exit assumptions drive PE returns. Adjust any parameter and watch IRR and MOIC update in real time.
            </p>
          </div>
        </div>

        <div className="playground-content">
          <LBOPlaygroundClient />
        </div>
      </div>
    </>
  );
}
