import Link from "next/link";
import { notFound } from "next/navigation";

import { getTracks, getModulesForTrack, getLessonsForModule, getCaseStudiesForModule } from "@/lib/content";
import { GlobalStyles } from "@/components/ui";
import { ModuleLessonList } from "@/components/progress";
import { QuizLauncher } from "@/components/quiz";
import { CaseStudiesLauncher } from "@/components/case-studies";

type Params = { trackSlug: string; moduleSlug: string };

// Module icons mapping
const moduleIcons: Record<string, string> = {
  '01-fit-story-behavioral': '👥',
  '02-valuation-modeling': '📊',
  '03-accounting-foundations': '📖',
  '04-lbos-advanced-topics': '📈',
};

// Modules with quiz banks
const modulesWithQuiz = ['02-valuation-modeling', '03-accounting-foundations', '04-lbos-advanced-topics'];

// Modules with case studies
const modulesWithCaseStudies = ['02-valuation-modeling', '03-accounting-foundations', '04-lbos-advanced-topics', '04-paper-lbo-tests'];

export default async function ModulePage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug, moduleSlug } = await Promise.resolve(params);

  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const modules = getModulesForTrack(trackSlug);
  const mod = modules.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const moduleIndex = modules.findIndex((m) => m.slug === moduleSlug);
  const moduleNumber = moduleIndex + 1;

  const lessons = getLessonsForModule(trackSlug, moduleSlug);
  const caseStudies = getCaseStudiesForModule(trackSlug, moduleSlug);
  const hasQuiz = modulesWithQuiz.includes(moduleSlug);
  const hasCaseStudies = modulesWithCaseStudies.includes(moduleSlug) && caseStudies.length > 0;
  const moduleIcon = moduleIcons[moduleSlug] || '📚';

  // Estimate reading time (~5 min per lesson)
  const estimatedTime = lessons.length * 5;

  return (
    <>
      <GlobalStyles />
      <style>{`
        .module-hero {
          background: linear-gradient(180deg, #416D89 0%, #4a7a96 70%, #FFFFFF 100%);
          color: white;
          padding: 48px 24px 40px;
          position: relative;
          overflow: hidden;
        }
        .module-hero::before {
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
        .module-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .module-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 24px;
          transition: color 0.15s;
        }
        .module-breadcrumb:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .module-breadcrumb svg {
          width: 16px;
          height: 16px;
        }
        .module-header-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 16px;
        }
        .module-icon-large {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
        }
        .module-header-content {
          flex: 1;
        }
        .module-number-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.3px;
          margin-bottom: 12px;
        }
        .module-title {
          margin: 0 0 12px;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .module-description {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
        }
        .module-stats {
          display: flex;
          gap: 16px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .module-stat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 10px 14px;
        }
        .module-stat-icon {
          font-size: 18px;
        }
        .module-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px 64px;
        }
        .module-section {
          margin-bottom: 40px;
        }
        .module-section:last-child {
          margin-bottom: 0;
        }
        .module-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .module-section-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #0A0A0A;
        }
        .module-section-subtitle {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.5);
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
          text-decoration: none;
          padding: 8px 0;
          transition: color 0.15s;
        }
        .back-link:hover {
          color: #416D89;
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 40px 0;
          color: rgba(10, 10, 10, 0.35);
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.03) 100%);
        }
        .section-divider-line.reverse {
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.03) 0%, rgba(10, 10, 10, 0.08) 100%);
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
        @media (max-width: 640px) {
          .module-hero {
            padding: 36px 20px 36px;
          }
          .module-header-row {
            flex-direction: column;
            gap: 16px;
          }
          .module-title {
            font-size: 26px;
          }
          .module-content {
            padding: 32px 20px 48px;
          }
          .module-stats {
            gap: 12px;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Hero Section */}
        <div className="module-hero">
          <div className="module-hero-inner">
            <Link href={`/track/${trackSlug}`} className="module-breadcrumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {track.title}
            </Link>

            <div className="module-header-row">
              <div className="module-icon-large">{moduleIcon}</div>
              <div className="module-header-content">
                <div className="module-number-badge">
                  Module {moduleNumber} of {modules.length}
                </div>
                <h1 className="module-title">{mod.title ?? moduleSlug}</h1>
                {mod.description && (
                  <p className="module-description">{mod.description}</p>
                )}
              </div>
            </div>

            <div className="module-stats">
              <div className="module-stat">
                <span className="module-stat-icon">📄</span>
                <span>{lessons.length} Lessons</span>
              </div>
              <div className="module-stat">
                <span className="module-stat-icon">⏱</span>
                <span>~{estimatedTime} min</span>
              </div>
              {hasQuiz && (
                <div className="module-stat">
                  <span className="module-stat-icon">✅</span>
                  <span>Quiz Available</span>
                </div>
              )}
              {hasCaseStudies && (
                <div className="module-stat">
                  <span className="module-stat-icon">📋</span>
                  <span>{caseStudies.length} Case {caseStudies.length === 1 ? 'Study' : 'Studies'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="module-content">
          {/* Lessons Section */}
          <section className="module-section">
            <div className="module-section-header">
              <h2 className="module-section-title">Lessons</h2>
              <span className="module-section-subtitle">
                {lessons.length} lessons
              </span>
            </div>

            {lessons.length ? (
              <ModuleLessonList
                trackSlug={trackSlug}
                moduleSlug={moduleSlug}
                lessons={lessons.map((l) => ({
                  slug: l.slug,
                  title: l.title ?? l.slug,
                  description: l.description,
                }))}
              />
            ) : (
              <div style={{ padding: 24, textAlign: "center", color: "rgba(10, 10, 10, 0.5)" }}>
                No lessons available yet.
              </div>
            )}
          </section>

          {/* Section Divider - only show if there's a quiz */}
          {hasQuiz && (
            <div className="section-divider">
              <div className="section-divider-line" />
              <div className="section-divider-icon">✏️</div>
              <div className="section-divider-line reverse" />
            </div>
          )}

          {/* Quiz Bank Section */}
          {hasQuiz && (
            <section className="module-section">
              <div className="module-section-header">
                <h2 className="module-section-title">Quiz Bank</h2>
                <span className="module-section-subtitle">Test your knowledge</span>
              </div>
              <QuizLauncher trackSlug={trackSlug} moduleSlug={moduleSlug} />
            </section>
          )}

          {/* Section Divider - for case studies */}
          {hasCaseStudies && (
            <div className="section-divider">
              <div className="section-divider-line" />
              <div className="section-divider-icon">📋</div>
              <div className="section-divider-line reverse" />
            </div>
          )}

          {/* Case Studies Section */}
          {hasCaseStudies && (
            <section className="module-section">
              <div className="module-section-header">
                <h2 className="module-section-title">Case Studies</h2>
                <span className="module-section-subtitle">Interactive exercises</span>
              </div>
              <CaseStudiesLauncher
                trackSlug={trackSlug}
                moduleSlug={moduleSlug}
                caseStudies={caseStudies}
              />
            </section>
          )}

          {/* Back Link */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(10, 10, 10, 0.06)" }}>
            <Link href={`/track/${trackSlug}`} className="back-link">
              ← Back to {track.title}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

