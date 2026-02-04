import Link from "next/link";
import { getTracks } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { GlobalStyles } from "@/components/ui";

// Course metadata for display
const courseInfo: Record<string, { description: string; stats: { lessons: string; modules: string } }> = {
  'investment-banking-interview-prep': {
    description: 'Master valuation, financial modeling, and behavioral interviews. This course covers everything from DCF and LBO fundamentals to advanced deal analysis and case study walkthroughs.',
    stats: { lessons: '30+', modules: '4' }
  },
  'private-equity-interview-prep': {
    description: 'Prepare for PE interviews with a focus on LBO modeling, deal evaluation, and portfolio company analysis. Learn what top PE firms look for in candidates.',
    stats: { lessons: '25+', modules: '4' }
  },
  'advanced-private-equity-associate': {
    description: 'Advanced training for PE associates featuring an interactive Deal Simulator. Work through realistic deal scenarios from sourcing to close.',
    stats: { lessons: '20+', modules: '3' }
  }
};

export default function HomePage() {
  const allTracks = getTracks();

  // Get the primary course (IB) - always available
  const primaryTrack = allTracks.find(t => t.slug === 'investment-banking-interview-prep');

  // Get other tracks with their visibility status
  const otherTracks = allTracks
    .filter(t => t.slug !== 'investment-banking-interview-prep')
    .map(t => ({
      ...t,
      isAvailable: isTrackVisible(t.slug)
    }));

  return (
    <>
      <GlobalStyles />
      <style>{`
        .tracks-page {
          min-height: 100vh;
          background: #FAFAFA;
          font-family: Inter, system-ui, sans-serif;
        }

        /* Hero Section */
        .tracks-hero {
          background: #0A0A0A;
          color: white;
          padding: 80px 24px 100px;
          position: relative;
          overflow: hidden;
        }
        .tracks-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at top right, rgba(65, 109, 137, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .tracks-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .tracks-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #416D89;
          margin-bottom: 32px;
        }
        .tracks-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .tracks-title {
          margin: 0 0 24px;
          font-size: 52px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          background: linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tracks-subtitle {
          margin: 0 auto;
          max-width: 600px;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Featured Course Section */
        .featured-section {
          max-width: 900px;
          margin: -60px auto 0;
          padding: 0 24px 80px;
          position: relative;
          z-index: 2;
        }
        .featured-card {
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: block;
          transition: all 0.3s ease;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
        }
        .featured-header {
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          padding: 32px 40px;
          color: white;
        }
        .featured-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .featured-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .featured-body {
          padding: 32px 40px;
        }
        .featured-desc {
          margin: 0 0 28px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(10, 10, 10, 0.7);
        }
        .featured-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .featured-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .featured-stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #0A0A0A;
        }
        .featured-stat-label {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0A0A0A;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .featured-card:hover .featured-cta {
          background: #416D89;
        }
        .featured-cta-arrow {
          transition: transform 0.2s ease;
        }
        .featured-card:hover .featured-cta-arrow {
          transform: translateX(4px);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 80px 24px;
          color: rgba(10, 10, 10, 0.5);
        }

        /* Other Tracks Grid */
        .other-tracks {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .other-tracks-title {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.4);
          margin-bottom: 20px;
        }
        .other-tracks-grid {
          display: grid;
          gap: 16px;
        }
        .other-track-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 12px;
          padding: 20px 24px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .other-track-card.available:hover {
          border-color: rgba(65, 109, 137, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }
        .other-track-card.locked {
          cursor: default;
          opacity: 0.85;
        }
        .other-track-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(65, 109, 137, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .other-track-card.locked .other-track-icon {
          background: rgba(10, 10, 10, 0.05);
        }
        .other-track-content {
          flex: 1;
        }
        .other-track-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .other-track-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #0A0A0A;
        }
        .other-track-card.locked .other-track-title {
          color: rgba(10, 10, 10, 0.6);
        }
        .coming-soon-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: rgba(65, 109, 137, 0.1);
          color: #416D89;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .other-track-desc {
          margin: 0;
          font-size: 14px;
          color: rgba(10, 10, 10, 0.5);
        }
        .other-track-arrow {
          color: #416D89;
          font-size: 18px;
          opacity: 0;
          transition: all 0.2s ease;
        }
        .other-track-card.available:hover .other-track-arrow {
          opacity: 1;
          transform: translateX(4px);
        }
        .other-track-lock {
          color: rgba(10, 10, 10, 0.3);
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .tracks-hero {
            padding: 60px 20px 80px;
          }
          .tracks-title {
            font-size: 36px;
          }
          .tracks-subtitle {
            font-size: 16px;
          }
          .featured-section {
            padding: 0 16px 60px;
            margin-top: -40px;
          }
          .featured-header {
            padding: 24px;
          }
          .featured-title {
            font-size: 22px;
          }
          .featured-body {
            padding: 24px;
          }
          .featured-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .featured-stat-value {
            font-size: 20px;
          }
          .other-tracks {
            padding: 0 16px 60px;
          }
        }
      `}</style>

      <div className="tracks-page">
        {/* Hero Section */}
        <div className="tracks-hero">
          <div className="tracks-hero-inner">
            <div className="tracks-logo">
              <span className="tracks-logo-icon">A</span>
              <span>Athena</span>
            </div>
            <h1 className="tracks-title">Master Your Finance Interview</h1>
            <p className="tracks-subtitle">
              Comprehensive preparation designed by industry professionals.
              Build the technical skills and confidence to succeed at top firms.
            </p>
          </div>
        </div>

        {/* Featured Course */}
        {primaryTrack ? (
          <div className="featured-section">
            <Link href={`/track/${primaryTrack.slug}`} className="featured-card">
              <div className="featured-header">
                <span className="featured-badge">Featured Course</span>
                <h2 className="featured-title">{primaryTrack.title}</h2>
              </div>
              <div className="featured-body">
                <p className="featured-desc">
                  Master valuation, financial modeling, and behavioral interviews.
                  This course covers everything from DCF and LBO fundamentals to
                  advanced deal analysis and case study walkthroughs.
                </p>
                <div className="featured-stats">
                  <div className="featured-stat">
                    <span className="featured-stat-value">30+</span>
                    <span className="featured-stat-label">Lessons</span>
                  </div>
                  <div className="featured-stat">
                    <span className="featured-stat-value">4</span>
                    <span className="featured-stat-label">Modules</span>
                  </div>
                  <div className="featured-stat">
                    <span className="featured-stat-value">AI</span>
                    <span className="featured-stat-label">Interview Sim</span>
                  </div>
                </div>
                <span className="featured-cta">
                  Start Learning
                  <span className="featured-cta-arrow">→</span>
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="empty-state">
            <p>No courses available at this time.</p>
          </div>
        )}

        {/* Other Tracks - Course Library */}
        {otherTracks.length > 0 && (
          <div className="other-tracks">
            <h3 className="other-tracks-title">More Courses</h3>
            <div className="other-tracks-grid">
              {otherTracks.map((t) => {
                const info = courseInfo[t.slug];

                if (t.isAvailable) {
                  return (
                    <Link
                      key={t.slug}
                      href={`/track/${t.slug}`}
                      className="other-track-card available"
                    >
                      <div className="other-track-icon">📊</div>
                      <div className="other-track-content">
                        <div className="other-track-header">
                          <h4 className="other-track-title">{t.title}</h4>
                        </div>
                        <p className="other-track-desc">
                          {info?.description || t.description || "Comprehensive interview preparation"}
                        </p>
                      </div>
                      <span className="other-track-arrow">→</span>
                    </Link>
                  );
                }

                // Locked/Coming Soon course
                return (
                  <div
                    key={t.slug}
                    className="other-track-card locked"
                  >
                    <div className="other-track-icon">🔒</div>
                    <div className="other-track-content">
                      <div className="other-track-header">
                        <h4 className="other-track-title">{t.title}</h4>
                        <span className="coming-soon-badge">Coming Soon</span>
                      </div>
                      <p className="other-track-desc">
                        {info?.description || t.description || "Comprehensive interview preparation"}
                      </p>
                    </div>
                    <span className="other-track-lock">🔒</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
