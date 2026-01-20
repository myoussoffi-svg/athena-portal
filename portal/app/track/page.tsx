import Link from "next/link";
import { getTracks } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { GlobalStyles } from "@/components/ui";

export default function TrackIndexPage() {
  const allTracks = getTracks();
  const tracks = allTracks.filter((t) => isTrackVisible(t.slug));

  return (
    <>
      <GlobalStyles />
      <style>{`
        .tracks-page {
          min-height: 100vh;
          background: #FFFFFF;
          font-family: Inter, system-ui, sans-serif;
        }
        .tracks-hero {
          background: linear-gradient(180deg, #416D89 0%, #4a7a96 70%, #FFFFFF 100%);
          color: white;
          padding: 56px 24px 48px;
        }
        .tracks-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .tracks-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }
        .tracks-title {
          margin: 0 0 16px;
          font-size: 42px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .tracks-subtitle {
          margin: 0 auto;
          max-width: 560px;
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }
        .tracks-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 64px;
        }
        .tracks-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .track-card {
          display: flex;
          align-items: center;
          gap: 24px;
          background: #FFFFFF;
          border: 1px solid rgba(10, 10, 10, 0.1);
          border-radius: 16px;
          padding: 28px 32px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .track-card:hover {
          border-color: rgba(65, 109, 137, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(10, 10, 10, 0.1);
        }
        .track-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
        }
        .track-card-content {
          flex: 1;
          min-width: 0;
        }
        .track-card-title {
          margin: 0 0 8px;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #0A0A0A;
        }
        .track-card-desc {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.6);
        }
        .track-card-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .track-card-badge {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.6);
          background: rgba(10, 10, 10, 0.04);
          padding: 6px 14px;
          border-radius: 999px;
        }
        .track-card-arrow {
          font-size: 20px;
          color: #416D89;
          transition: transform 0.2s;
        }
        .track-card:hover .track-card-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .tracks-hero {
            padding: 40px 20px 40px;
          }
          .tracks-title {
            font-size: 32px;
          }
          .tracks-subtitle {
            font-size: 15px;
          }
          .tracks-content {
            padding: 32px 20px 48px;
          }
          .track-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px;
          }
          .track-card-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="tracks-page">
        {/* Hero Section */}
        <div className="tracks-hero">
          <div className="tracks-hero-inner">
            <div className="tracks-eyebrow">
              <span>Athena</span>
            </div>
            <h1 className="tracks-title">Interview Preparation</h1>
            <p className="tracks-subtitle">
              Master the skills and knowledge needed to succeed in finance interviews.
              Each course is structured to build your expertise from fundamentals to advanced topics.
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="tracks-content">
          <div className="tracks-grid">
            {tracks.map((t) => (
              <Link
                key={t.slug}
                href={`/track/${t.slug}`}
                className="track-card"
              >
                <div className="track-card-icon">📊</div>
                <div className="track-card-content">
                  <h2 className="track-card-title">{t.title}</h2>
                  <p className="track-card-desc">
                    {t.description || "A comprehensive course with modules and lessons designed to prepare you for success."}
                  </p>
                </div>
                <div className="track-card-right">
                  <span className="track-card-badge">Self-paced</span>
                  <span className="track-card-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
