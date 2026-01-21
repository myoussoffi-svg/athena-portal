import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getTracks,
  getModulesForTrack,
  getCaseStudiesForModule,
  getCaseStudyBySlug,
} from "@/lib/content";

import { GlobalStyles, Breadcrumbs } from "@/components/ui";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";

type Params = { trackSlug: string; moduleSlug: string; caseStudySlug: string };

export default async function CaseStudyPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug, moduleSlug, caseStudySlug } = await Promise.resolve(params);

  const track = getTracks().find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const mod = getModulesForTrack(trackSlug).find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const caseStudies = getCaseStudiesForModule(trackSlug, moduleSlug);
  const caseStudy = getCaseStudyBySlug(trackSlug, moduleSlug, caseStudySlug);
  if (!caseStudy) notFound();

  const idx = caseStudies.findIndex((cs) => cs.slug === caseStudySlug);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  const caseStudyNumber = idx + 1;
  const totalCaseStudies = caseStudies.length;

  return (
    <>
      <GlobalStyles />
      <style>{`
        .case-study-page {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          color: #0A0A0A;
          background: #FFFFFF;
          min-height: 100vh;
        }
        .case-study-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 28px 24px 56px;
        }
        .case-study-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .case-study-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(65, 109, 137, 0.08);
          border: 1px solid rgba(65, 109, 137, 0.15);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #416D89;
          letter-spacing: 0.3px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .case-study-title {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #0A0A0A;
        }
        .case-study-subtitle {
          margin: 0;
          font-size: 16px;
          color: rgba(10, 10, 10, 0.6);
          line-height: 1.5;
        }
        .case-study-nav {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid rgba(10, 10, 10, 0.08);
        }
        .case-study-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(65, 109, 137, 0.04);
          border: 1px solid rgba(65, 109, 137, 0.12);
          border-radius: 10px;
          text-decoration: none;
          color: #416D89;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s ease;
        }
        .case-study-nav-link:hover {
          background: rgba(65, 109, 137, 0.08);
          border-color: rgba(65, 109, 137, 0.2);
        }
        .case-study-nav-link.disabled {
          opacity: 0.4;
          pointer-events: none;
        }
        .case-study-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
          text-decoration: none;
          padding: 8px 0;
          margin-top: 24px;
          transition: color 0.15s;
        }
        .case-study-back:hover {
          color: #416D89;
        }
        @media (max-width: 640px) {
          .case-study-container {
            padding: 20px 16px 40px;
          }
          .case-study-title {
            font-size: 24px;
          }
          .case-study-nav {
            flex-direction: column;
          }
        }
      `}</style>

      <main className="case-study-page">
        <div className="case-study-container">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Tracks", href: "/track" },
              { label: track.title, href: `/track/${trackSlug}` },
              { label: mod.title, href: `/track/${trackSlug}/${moduleSlug}` },
              { label: caseStudy.title },
            ]}
          />

          {/* Header */}
          <header className="case-study-header">
            <div className="case-study-badge">
              Case Study {caseStudyNumber} of {totalCaseStudies}
            </div>
            <h1 className="case-study-title">{caseStudy.title}</h1>
            {caseStudy.subtitle && (
              <p className="case-study-subtitle">{caseStudy.subtitle}</p>
            )}
          </header>

          {/* Content */}
          <CaseStudyContent
            caseStudySlug={caseStudySlug}
            moduleSlug={moduleSlug}
            content={caseStudy.content ?? ""}
          />

          {/* Navigation */}
          <nav className="case-study-nav">
            {prev ? (
              <Link
                href={`/track/${trackSlug}/${moduleSlug}/case-study/${prev.slug}`}
                className="case-study-nav-link"
              >
                ← Previous: {prev.title}
              </Link>
            ) : (
              <span className="case-study-nav-link disabled">← Previous</span>
            )}
            {next ? (
              <Link
                href={`/track/${trackSlug}/${moduleSlug}/case-study/${next.slug}`}
                className="case-study-nav-link"
              >
                Next: {next.title} →
              </Link>
            ) : (
              <span className="case-study-nav-link disabled">Next →</span>
            )}
          </nav>

          {/* Back Link */}
          <Link href={`/track/${trackSlug}/${moduleSlug}`} className="case-study-back">
            ← Back to {mod.title}
          </Link>
        </div>
      </main>
    </>
  );
}
