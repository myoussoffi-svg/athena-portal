import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { getTracks } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { GlobalStyles, ComingSoon } from "@/components/ui";
import { OutreachDashboard } from "@/components/outreach";

type Params = { trackSlug: string };

export default async function OutreachPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  // Check auth
  const { userId } = await auth();
  if (!userId) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2 style={{ fontSize: 24, marginBottom: 12 }}>Sign in required</h2>
            <p style={{ color: "rgba(10, 10, 10, 0.6)" }}>
              Please sign in to access the Outreach Tracker.
            </p>
          </div>
        </div>
      </>
    );
  }

  // Check if track is visible
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

  // Load track
  const tracks = await getTracks();
  const track = tracks.find((t: { slug: string }) => t.slug === trackSlug);

  if (!track) {
    notFound();
  }

  return (
    <>
      <GlobalStyles />
      <style>{`
        .outreach-page {
          min-height: 100vh;
          background: #FFFFFF;
          font-family: Inter, system-ui, sans-serif;
        }
        .outreach-header {
          background: linear-gradient(180deg, #416D89 0%, #4a7a96 50%, #FFFFFF 100%);
          padding: 48px 24px 60px;
          margin-bottom: -32px;
        }
        .outreach-header-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .outreach-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 16px;
          transition: color 0.15s;
        }
        .outreach-breadcrumb:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .outreach-breadcrumb svg {
          width: 16px;
          height: 16px;
        }
        .outreach-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }
        .outreach-subtitle {
          margin: 8px 0 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 560px;
        }
        .outreach-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 64px;
        }
        .outreach-card {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(10, 10, 10, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          padding: 24px;
        }
        @media (max-width: 640px) {
          .outreach-header {
            padding: 36px 20px 52px;
          }
          .outreach-title {
            font-size: 26px;
          }
          .outreach-content {
            padding: 0 16px 48px;
          }
          .outreach-card {
            padding: 16px;
          }
        }
      `}</style>

      <div className="outreach-page">
        <div className="outreach-header">
          <div className="outreach-header-inner">
            <Link href={`/track/${trackSlug}`} className="outreach-breadcrumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {track.title}
            </Link>
            <h1 className="outreach-title">Outreach Tracker</h1>
            <p className="outreach-subtitle">
              Track your networking contacts, manage follow-ups, and generate personalized outreach emails.
            </p>
          </div>
        </div>

        <div className="outreach-content">
          <div className="outreach-card">
            <OutreachDashboard />
          </div>
        </div>
      </div>
    </>
  );
}
