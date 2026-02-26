import { notFound } from "next/navigation";
import Link from "next/link";

import { getTracks, getModulesForTrack } from "@/lib/content";
import { isTrackVisible, getCourseIdForTrack, getCourseMetadata } from "@/lib/feature-flags";
import { GlobalStyles, ComingSoon } from "@/components/ui";
import { TrackModuleList } from "@/components/progress";

type Params = { trackSlug: string };

export default async function Page({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  // Check if track is visible via feature flags
  if (!isTrackVisible(trackSlug)) {
    const courseId = getCourseIdForTrack(trackSlug);
    const metadata = courseId ? getCourseMetadata(courseId) : null;
    return (
      <>
        <GlobalStyles />
        <ComingSoon
          courseName={metadata?.name || 'This course'}
          backHref="/track"
          backLabel="Back to Tracks"
        />
      </>
    );
  }

  // Load all tracks, then find the one matching the slug
  const tracks = await getTracks();
  const track = tracks.find((t: { slug: string }) => t.slug === trackSlug);

  if (!track) {
    notFound();
  }

  const modules = await getModulesForTrack(trackSlug);

  return (
    <>
      <GlobalStyles />
      <style>{`
        .track-hero {
          background: linear-gradient(180deg, #416D89 0%, #4a7a96 70%, #FFFFFF 100%);
          color: white;
          padding: 48px 24px 40px;
          margin-bottom: 0;
          position: relative;
          overflow: hidden;
        }
        .track-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 30%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }
        .track-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .track-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 20px;
          transition: color 0.15s;
        }
        .track-breadcrumb:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .track-breadcrumb svg {
          width: 16px;
          height: 16px;
        }
        .track-badges {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .track-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.3px;
        }
        .track-badge-icon {
          font-size: 14px;
        }
        .track-title {
          margin: 0 0 16px;
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .track-description {
          margin: 0;
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 680px;
        }
        .track-stats {
          display: flex;
          gap: 20px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .track-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }
        .track-stat:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
        .track-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          position: relative;
          overflow: hidden;
        }
        .track-stat-icon::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 60%
          );
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .track-stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .track-stat-value {
          font-weight: 600;
          font-size: 15px;
        }
        .track-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 64px;
        }
        .track-section {
          margin-bottom: 48px;
        }
        .track-section:last-child {
          margin-bottom: 0;
        }
        .track-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .track-section-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #0A0A0A;
        }
        .track-section-subtitle {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.55);
        }
        .practice-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(65, 109, 137, 0.25);
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .practice-card:hover {
          border-color: rgba(65, 109, 137, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(65, 109, 137, 0.15);
        }
        .practice-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .practice-content {
          flex: 1;
          min-width: 0;
        }
        .practice-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .practice-title {
          font-size: 17px;
          font-weight: 600;
          color: #0A0A0A;
        }
        .practice-badge {
          font-size: 10px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(65, 109, 137, 0.1);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .practice-desc {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.6);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .practice-features {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .practice-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
        }
        .practice-feature-icon {
          font-size: 14px;
        }
        .practice-arrow {
          color: #416D89;
          font-size: 20px;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .practice-card:hover .practice-arrow {
          transform: translateX(4px);
        }
        .practice-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 48px 0;
          color: rgba(10, 10, 10, 0.35);
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.06) 0%, rgba(10, 10, 10, 0.02) 100%);
        }
        .section-divider-line.reverse {
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.02) 0%, rgba(10, 10, 10, 0.06) 100%);
        }
        .section-divider-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(65, 109, 137, 0.06);
          border: 1px solid rgba(65, 109, 137, 0.1);
          font-size: 16px;
        }
        .learn-section {
          margin-bottom: 40px;
          animation: fadeInUp 0.5s ease-out;
        }
        .learn-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .learn-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(65, 109, 137, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(65, 109, 137, 0.08);
        }
        .learn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .learn-text {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.7);
          line-height: 1.4;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-section {
          animation: fadeInUp 0.5s ease-out backwards;
        }
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
        @media (max-width: 640px) {
          .learn-grid {
            grid-template-columns: 1fr;
          }
          .track-hero {
            padding: 36px 20px 44px;
          }
          .track-title {
            font-size: 28px;
          }
          .track-description {
            font-size: 15px;
          }
          .track-stats {
            gap: 16px;
          }
          .track-content {
            padding: 32px 20px 48px;
          }
          .practice-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .practice-arrow {
            align-self: flex-end;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Hero Section */}
        <div className="track-hero">
          <div className="track-hero-inner">
            <Link href="/track" className="track-breadcrumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Courses
            </Link>

            <div className="track-badges">
              <span className="track-badge">
                <span className="track-badge-icon">📚</span>
                {modules?.length || 0} Modules
              </span>
              <span className="track-badge">
                <span className="track-badge-icon">⏱</span>
                ~16 Hours
              </span>
              <span className="track-badge">
                <span className="track-badge-icon">🎯</span>
                Interview Ready
              </span>
            </div>

            <h1 className="track-title">{track.title}</h1>

            {track.description && (
              <p className="track-description">{track.description}</p>
            )}

            <div className="track-stats">
              <div className="track-stat">
                <div className="track-stat-icon">📖</div>
                <div>
                  <div className="track-stat-label">Content</div>
                  <div className="track-stat-value">30+ Lessons</div>
                </div>
              </div>
              <div className="track-stat">
                <div className="track-stat-icon">📝</div>
                <div>
                  <div className="track-stat-label">Practice</div>
                  <div className="track-stat-value">270+ Questions</div>
                </div>
              </div>
              <div className="track-stat">
                <div className="track-stat-icon">🎤</div>
                <div>
                  <div className="track-stat-label">Simulator</div>
                  <div className="track-stat-value">AI Interviews</div>
                </div>
              </div>
              <div className="track-stat">
                <div className="track-stat-icon">📊</div>
                <div>
                  <div className="track-stat-label">Progress</div>
                  <div className="track-stat-value">Tracked</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="track-content">
          {/* What You'll Learn Section */}
          <section className="learn-section animate-section">
            <div className="track-section-header">
              <h2 className="track-section-title">What You&apos;ll Learn</h2>
              <span className="track-section-subtitle">Key skills covered</span>
            </div>
            {trackSlug === 'private-equity-interview-prep' ? (
              <div className="learn-grid">
                <div className="learn-item">
                  <div className="learn-icon">📊</div>
                  <span className="learn-text">Master LBO modeling and paper LBO mental math</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">💼</div>
                  <span className="learn-text">Build frameworks for case studies and investment judgment</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">🎯</div>
                  <span className="learn-text">Practice deal walkthroughs and PE-specific technicals</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">🏆</div>
                  <span className="learn-text">Navigate on-cycle recruiting and headhunter dynamics</span>
                </div>
              </div>
            ) : (
              <div className="learn-grid">
                <div className="learn-item">
                  <div className="learn-icon">📖</div>
                  <span className="learn-text">Master technical concepts tested in IB interviews</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">💡</div>
                  <span className="learn-text">Build frameworks for structuring your answers</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">🎯</div>
                  <span className="learn-text">Practice with real interview questions and scenarios</span>
                </div>
                <div className="learn-item">
                  <div className="learn-icon">🏆</div>
                  <span className="learn-text">Gain confidence to perform under pressure</span>
                </div>
              </div>
            )}
          </section>

          {/* Modules Section */}
          <section className="track-section animate-section animate-delay-1">
            <div className="track-section-header">
              <h2 className="track-section-title">Course Modules</h2>
              <span className="track-section-subtitle">
                {modules?.length || 0} modules
              </span>
            </div>

            {modules && modules.length > 0 ? (
              <TrackModuleList
                trackSlug={trackSlug}
                modules={modules.map((m: { slug: string; title: string; description?: string }) => ({
                  slug: m.slug,
                  title: m.title ?? m.slug,
                  description: m.description,
                }))}
              />
            ) : (
              <div style={{ padding: 24, textAlign: "center", color: "rgba(10, 10, 10, 0.5)" }}>
                No modules available yet.
              </div>
            )}
          </section>

          {/* Section Divider */}
          <div className="section-divider animate-section animate-delay-2">
            <div className="section-divider-line" />
            <div className="section-divider-icon">🎯</div>
            <div className="section-divider-line reverse" />
          </div>

          {/* Additional Tools Section */}
          <section className="track-section animate-section animate-delay-3">
            <div className="track-section-header">
              <h2 className="track-section-title">Additional Tools</h2>
              <span className="track-section-subtitle">Test your knowledge</span>
            </div>

            <div className="practice-cards">
              <Link href={`/track/${trackSlug}/interview`} className="practice-card">
                <div className="practice-icon">🎤</div>
                <div className="practice-content">
                  <div className="practice-title-row">
                    <span className="practice-title">Interview Simulator</span>
                    <span className="practice-badge">AI-Powered</span>
                  </div>
                  <div className="practice-desc">
                    Practice with an AI-powered mock interview and receive detailed feedback on your responses.
                  </div>
                  <div className="practice-features">
                    <span className="practice-feature">
                      <span className="practice-feature-icon">💬</span> Real questions
                    </span>
                    <span className="practice-feature">
                      <span className="practice-feature-icon">📊</span> Scoring
                    </span>
                    <span className="practice-feature">
                      <span className="practice-feature-icon">🔄</span> Unlimited
                    </span>
                  </div>
                </div>
                <span className="practice-arrow">→</span>
              </Link>

              <Link href={`/track/${trackSlug}/resume`} className="practice-card">
                <div className="practice-icon">📄</div>
                <div className="practice-content">
                  <div className="practice-title-row">
                    <span className="practice-title">Resume Feedback</span>
                    <span className="practice-badge">AI-Powered</span>
                  </div>
                  <div className="practice-desc">
                    {trackSlug === 'private-equity-interview-prep'
                      ? 'Upload your resume and get detailed AI feedback tailored for PE recruiting—optimizing deal experience and technical skills.'
                      : 'Upload your resume and get detailed AI feedback tailored for Investment Banking analyst applications.'}
                  </div>
                  <div className="practice-features">
                    <span className="practice-feature">
                      <span className="practice-feature-icon">📊</span> Scoring breakdown
                    </span>
                    <span className="practice-feature">
                      <span className="practice-feature-icon">✍️</span> Bullet rewrites
                    </span>
                    <span className="practice-feature">
                      <span className="practice-feature-icon">🎯</span> Action items
                    </span>
                  </div>
                </div>
                <span className="practice-arrow">→</span>
              </Link>

              {/* Outreach Tracker - only for IB course (PE recruiting is headhunter-driven) */}
              {trackSlug === 'investment-banking-interview-prep' && (
                <Link href={`/track/${trackSlug}/outreach`} className="practice-card">
                  <div className="practice-icon">📧</div>
                  <div className="practice-content">
                    <div className="practice-title-row">
                      <span className="practice-title">Outreach Tracker</span>
                      <span className="practice-badge">AI-Powered</span>
                    </div>
                    <div className="practice-desc">
                      Track your networking contacts, manage follow-ups, and generate personalized outreach emails.
                    </div>
                    <div className="practice-features">
                      <span className="practice-feature">
                        <span className="practice-feature-icon">📋</span> Contact tracker
                      </span>
                      <span className="practice-feature">
                        <span className="practice-feature-icon">⏰</span> Follow-up alerts
                      </span>
                      <span className="practice-feature">
                        <span className="practice-feature-icon">✍️</span> Email generator
                      </span>
                    </div>
                  </div>
                  <span className="practice-arrow">→</span>
                </Link>
              )}

              {/* PE-only interactive tools */}
              {trackSlug === 'private-equity-interview-prep' && (
                <>
                  <Link href={`/track/${trackSlug}/paper-lbo`} className="practice-card">
                    <div className="practice-icon">📝</div>
                    <div className="practice-content">
                      <div className="practice-title-row">
                        <span className="practice-title">Paper LBO Practice</span>
                        <span className="practice-badge">Timed</span>
                      </div>
                      <div className="practice-desc">
                        Timed paper LBO exercises with auto-grading. Work through Sources &amp; Uses, debt paydown, and returns under pressure.
                      </div>
                      <div className="practice-features">
                        <span className="practice-feature">
                          <span className="practice-feature-icon">⏱</span> Timed exercises
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📊</span> Auto-graded
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📈</span> 6 scenarios
                        </span>
                      </div>
                    </div>
                    <span className="practice-arrow">→</span>
                  </Link>

                  <Link href={`/track/${trackSlug}/deal-judgment`} className="practice-card">
                    <div className="practice-icon">🎯</div>
                    <div className="practice-content">
                      <div className="practice-title-row">
                        <span className="practice-title">Deal Judgment Trainer</span>
                        <span className="practice-badge">AI-Powered</span>
                      </div>
                      <div className="practice-desc">
                        Evaluate investment teasers, make invest/pass decisions, and get AI-graded feedback on your PE judgment and thesis quality.
                      </div>
                      <div className="practice-features">
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📋</span> 8 deal teasers
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">🧠</span> Thesis grading
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📖</span> Model answers
                        </span>
                      </div>
                    </div>
                    <span className="practice-arrow">→</span>
                  </Link>

                  <Link href={`/track/${trackSlug}/lbo-playground`} className="practice-card">
                    <div className="practice-icon">🧮</div>
                    <div className="practice-content">
                      <div className="practice-title-row">
                        <span className="practice-title">LBO Sensitivity Playground</span>
                        <span className="practice-badge">Interactive</span>
                      </div>
                      <div className="practice-desc">
                        Interactive LBO calculator with real-time IRR and MOIC. Adjust entry multiples, leverage, growth, and exit assumptions to build intuition.
                      </div>
                      <div className="practice-features">
                        <span className="practice-feature">
                          <span className="practice-feature-icon">🔄</span> Real-time calc
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📊</span> Year-by-year
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">🎛</span> 10 parameters
                        </span>
                      </div>
                    </div>
                    <span className="practice-arrow">→</span>
                  </Link>

                  <Link href={`/track/${trackSlug}/deal-coach`} className="practice-card">
                    <div className="practice-icon">💼</div>
                    <div className="practice-content">
                      <div className="practice-title-row">
                        <span className="practice-title">Deal Discussion Coach</span>
                        <span className="practice-badge">AI-Powered</span>
                      </div>
                      <div className="practice-desc">
                        Input your banking deal experience and get AI coaching on how to discuss it through a PE lens — with practice questions and frameworks.
                      </div>
                      <div className="practice-features">
                        <span className="practice-feature">
                          <span className="practice-feature-icon">🔄</span> PE reframing
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">💬</span> Practice Q&amp;A
                        </span>
                        <span className="practice-feature">
                          <span className="practice-feature-icon">📋</span> Key metrics
                        </span>
                      </div>
                    </div>
                    <span className="practice-arrow">→</span>
                  </Link>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
