import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getTracks, getModulesForTrack, getLessonsForModule } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { checkTrackAccess } from "@/lib/access-control";
import { GlobalStyles, AthenaMark } from "@/components/ui";

// Force dynamic rendering since we check auth
export const dynamic = 'force-dynamic';

function getTrackStats(trackSlug: string) {
  const modules = getModulesForTrack(trackSlug);
  const lessonCount = modules.reduce(
    (sum, m) => sum + getLessonsForModule(trackSlug, m.slug).length,
    0
  );
  return { modules: modules.length, lessons: lessonCount };
}

export default async function HomePage() {
  const allTracks = getTracks();

  // Check if user is authenticated and has course access
  const { userId } = await auth();
  let hasAccess = false;

  if (userId) {
    const accessResult = await checkTrackAccess(userId, 'investment-banking-interview-prep');
    hasAccess = accessResult.hasAccess;
  }

  // Get the primary course (IB) - always available
  const primaryTrack = allTracks.find(t => t.slug === 'investment-banking-interview-prep');

  // Get the PE course
  const peTrack = allTracks.find(t => t.slug === 'private-equity-interview-prep');

  // Get other tracks with their visibility status (exclude IB and PE since they're featured)
  const otherTracks = allTracks
    .filter(t => t.slug !== 'investment-banking-interview-prep' && t.slug !== 'private-equity-interview-prep')
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

        /* Top Nav */
        .top-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: flex-end;
          padding: 20px 24px;
          z-index: 10;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        .nav-link.primary {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .nav-link.primary:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Hero Section */
        .tracks-hero {
          background: radial-gradient(112% 82% at 84.7% 18%, #429cd4 0%, #416d89 100%);
          color: white;
          padding: 80px 24px 100px;
          position: relative;
          overflow: hidden;
        }
        .tracks-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .tracks-logo {
          margin-bottom: 32px;
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
        .featured-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #416D89;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .featured-cta:hover {
          background: #3a6179;
        }
        .featured-cta.secondary {
          background: transparent;
          border: 2px solid rgba(65, 109, 137, 0.3);
          color: #416D89;
        }
        .featured-cta.secondary:hover {
          border-color: #416D89;
          background: rgba(65, 109, 137, 0.05);
        }
        .featured-cta-arrow {
          transition: transform 0.2s ease;
        }
        .featured-cta:hover .featured-cta-arrow {
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
        .other-track-enroll {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #416D89;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }
        .other-track-enroll:hover {
          background: #3a6179;
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
          {/* Top Navigation */}
          <div className="top-nav">
            {!userId ? (
              <Link href="/sign-in" className="nav-link primary">
                Sign In
              </Link>
            ) : hasAccess ? (
              <Link href="/track/investment-banking-interview-prep" className="nav-link primary">
                Go to Course
              </Link>
            ) : (
              <Link href="/sign-in" className="nav-link">
                My Account
              </Link>
            )}
          </div>

          <div className="tracks-hero-inner">
            <div className="tracks-logo">
              <AthenaMark size={18} tone="white" align="center" />
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
            <div className="featured-card">
              <div className="featured-header">
                <span className="featured-badge">Featured Course</span>
                <h2 className="featured-title">{primaryTrack.title}</h2>
              </div>
              <div className="featured-body">
                <p className="featured-desc">
                  Master valuation, financial modeling, and behavioral interviews.
                  Covers DCF and LBO fundamentals, interactive case studies, and quiz banks
                  to solidify technicals. Includes a resume feedback tool, outreach tracker
                  for networking emails, and an AI-powered mock interview simulator.
                </p>
                {(() => {
                  const stats = getTrackStats('investment-banking-interview-prep');
                  return (
                    <div className="featured-stats">
                      <div className="featured-stat">
                        <span className="featured-stat-value">{stats.lessons}</span>
                        <span className="featured-stat-label">Lessons</span>
                      </div>
                      <div className="featured-stat">
                        <span className="featured-stat-value">{stats.modules}</span>
                        <span className="featured-stat-label">Modules</span>
                      </div>
                      <div className="featured-stat">
                        <span className="featured-stat-value">AI</span>
                        <span className="featured-stat-label">Interview Sim</span>
                      </div>
                    </div>
                  );
                })()}
                <div className="featured-ctas">
                  <Link href="/preview/ib" className="featured-cta">
                    Learn More
                    <span className="featured-cta-arrow">→</span>
                  </Link>
                  <Link href="/courses/investment-banking-interview-prep" className="featured-cta secondary">
                    Enroll Now — $250
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>No courses available at this time.</p>
          </div>
        )}

        {/* PE Course */}
        {peTrack && isTrackVisible('private-equity-interview-prep') && (
          <div className="featured-section" style={{ marginTop: 0 }}>
            <div className="featured-card">
              <div className="featured-header">
                <span className="featured-badge">New Course</span>
                <h2 className="featured-title">{peTrack.title}</h2>
              </div>
              <div className="featured-body">
                <p className="featured-desc">
                  Rigorous preparation for private equity recruiting. Master LBO modeling
                  under pressure, case study frameworks, investment judgment, and deal
                  walkthroughs to pass PE interviews at top firms.
                </p>
                {(() => {
                  const stats = getTrackStats('private-equity-interview-prep');
                  return (
                    <div className="featured-stats">
                      <div className="featured-stat">
                        <span className="featured-stat-value">{stats.lessons}</span>
                        <span className="featured-stat-label">Lessons</span>
                      </div>
                      <div className="featured-stat">
                        <span className="featured-stat-value">{stats.modules}</span>
                        <span className="featured-stat-label">Modules</span>
                      </div>
                      <div className="featured-stat">
                        <span className="featured-stat-value">AI</span>
                        <span className="featured-stat-label">Interview Sim</span>
                      </div>
                    </div>
                  );
                })()}
                <div className="featured-ctas">
                  <Link href="/preview/pe" className="featured-cta">
                    Learn More
                    <span className="featured-cta-arrow">→</span>
                  </Link>
                  <Link href="/courses/private-equity-interview-prep" className="featured-cta secondary">
                    Enroll Now — $295
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tracks - Course Library */}
        {otherTracks.length > 0 && (
          <div className="other-tracks">
            <h3 className="other-tracks-title">More Courses</h3>
            <div className="other-tracks-grid">
              {otherTracks.map((t) => {

                if (t.isAvailable) {
                  return (
                    <div
                      key={t.slug}
                      className="other-track-card available"
                    >
                      <div className="other-track-icon">📊</div>
                      <div className="other-track-content">
                        <div className="other-track-header">
                          <h4 className="other-track-title">{t.title}</h4>
                        </div>
                        <p className="other-track-desc">
                          {t.description || "Comprehensive interview preparation"}
                        </p>
                      </div>
                      <Link href={`/courses/${t.slug}`} className="other-track-enroll">
                        Enroll Now
                      </Link>
                    </div>
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
                        {t.description || "Comprehensive interview preparation"}
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
