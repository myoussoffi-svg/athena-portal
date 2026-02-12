import Link from "next/link";
import { notFound } from "next/navigation";

// Force dynamic rendering to always read fresh content
export const dynamic = 'force-dynamic';

import {
  getTracks,
  getModulesForTrack,
  getLessonsForModule,
  getLessonBySlug,
} from "@/lib/content";

import { GlobalStyles, Breadcrumbs } from "@/components/ui";
import { LessonProgressWrapper, LessonCompletionBadge } from "@/components/progress";
import { ModuleOutline, LessonVideo, ReadingProgress } from "@/components/lesson";
import { LessonContent } from "@/components/blocks";
import { extractBlocks, segmentContent } from "@/lib/blocks";

import { remark } from "remark";
import html from "remark-html";

type Params = { trackSlug: string; moduleSlug: string; lessonSlug: string };

function extractSection(md: string, headingRegex: RegExp) {
  const lines = (md ?? "").split(/\r?\n/);

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = (lines[i] ?? "").trim();
    if (headingRegex.test(line)) {
      start = i;
      break;
    }
  }

  if (start === -1) return { extracted: "", stripped: md ?? "" };

  let end = lines.length;
  for (let j = start + 1; j < lines.length; j++) {
    const line = (lines[j] ?? "").trim();
    if (/^##\s+/.test(line)) {
      end = j;
      break;
    }
  }

  const extractedBody = lines.slice(start + 1, end).join("\n").trim();
  const strippedLines = [...lines.slice(0, start), ...lines.slice(end)];
  const stripped =
    strippedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

  return { extracted: extractedBody, stripped };
}

async function mdToHtml(md: string) {
  const processed = await remark().use(html).process(md ?? "");
  return processed.toString();
}

/**
 * Strip the first H1 heading from markdown content to avoid duplicate titles.
 * The page already displays the lesson title in the header.
 */
function stripFirstH1(md: string): string {
  const lines = (md ?? "").split(/\r?\n/);

  // Find the first H1 line (# Title)
  const h1Index = lines.findIndex(line => /^#\s+/.test(line.trim()));

  if (h1Index === -1) return md;

  // Remove the H1 line and any immediately following blank lines
  const before = lines.slice(0, h1Index);
  let afterStart = h1Index + 1;

  // Skip blank lines after the H1
  while (afterStart < lines.length && lines[afterStart].trim() === "") {
    afterStart++;
  }

  const after = lines.slice(afterStart);
  return [...before, ...after].join("\n").trim();
}

export default async function LessonPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug, moduleSlug, lessonSlug } = await Promise.resolve(params);

  const track = getTracks().find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const mod = getModulesForTrack(trackSlug).find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const lessons = getLessonsForModule(trackSlug, moduleSlug);
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) notFound();

  const lesson = getLessonBySlug(trackSlug, moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const rawMd = lesson.content ?? "";

  // Extract deliverable section only; strip all framing sections from body
  const outRes = extractSection(rawMd, /^##\s+Outcomes?\s*$/i);
  const agRes = extractSection(outRes.stripped, /^##\s+Agenda\s*$/i);
  const whyRes = extractSection(
    agRes.stripped,
    /^##\s+Why this matters( in a real deal)?\s*$/i
  );
  const delRes = extractSection(whyRes.stripped, /^##\s+Deliverable\s*$/i);
  const ckRes = extractSection(delRes.stripped, /^##\s+Checklist\s*$/i);
  const synRes = extractSection(ckRes.stripped, /^##\s+Synthesis\s*$/i);

  const deliverableMd = delRes.extracted;
  const bodyMd = synRes.stripped;

  // Strip the first H1 to avoid duplicate title (page header already shows lesson.title)
  const bodyWithoutH1 = stripFirstH1(bodyMd);

  // Extract interactive blocks from markdown
  const { cleanMarkdown, blocks } = extractBlocks(bodyWithoutH1);
  const contentHtml = await mdToHtml(cleanMarkdown);
  const contentSegments = segmentContent(contentHtml, blocks);

  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const lessonNumber = idx + 1;
  const totalLessons = Math.max(lessons.length, 1);

  // Clean deliverable text (strip markdown formatting for inline display)
  const deliverableText = deliverableMd?.trim() || null;

  return (
    <>
      <GlobalStyles />
      <ReadingProgress />
      <main
        style={{
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: "var(--athena-fg)",
          background: "var(--athena-bg)",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 56px" }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Tracks", href: "/track" },
              { label: track.title ?? trackSlug, href: `/track/${trackSlug}` },
              { label: mod.title ?? moduleSlug, href: `/track/${trackSlug}/${moduleSlug}` },
              { label: lesson.title ?? lessonSlug },
            ]}
          />

          {/* Main layout with sidebar */}
          <div style={{ display: "flex", gap: 48, marginTop: 8 }}>
            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>
              {/* Enhanced Lesson Header */}
              <header className="lesson-header">
                {/* Module Badge - Links back to module */}
                <div className="lesson-header-meta">
                  <Link href={`/track/${trackSlug}/${moduleSlug}`} className="module-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {mod.title ?? moduleSlug}
                  </Link>
                  <span className="lesson-indicator">
                    Lesson {lessonNumber} of {totalLessons}
                  </span>
                  <span className="reading-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    ~5 min read
                  </span>
                  <LessonCompletionBadge
                    trackSlug={trackSlug}
                    moduleSlug={moduleSlug}
                    lessonSlug={lessonSlug}
                  />
                </div>

                <h1 className="lesson-title">{lesson.title}</h1>

                {deliverableText && (
                  <p className="lesson-deliverable">
                    <strong>Deliverable:</strong> {deliverableText}
                  </p>
                )}

                <div className="lesson-header-divider">
                  <div className="divider-line" />
                  <div className="divider-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div className="divider-line" />
                </div>
              </header>

              {lesson.video && <LessonVideo video={lesson.video} />}

              <LessonContent
                segments={contentSegments}
                className="athena-prose"
              />

              {/* Footer with completion and navigation */}
              <div
                style={{
                  marginTop: 48,
                  paddingTop: 24,
                  borderTop: "1px solid var(--athena-subtle)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <LessonProgressWrapper
                    trackSlug={trackSlug}
                    moduleSlug={moduleSlug}
                    lessonSlug={lessonSlug}
                  />
                </div>

                {/* Enhanced Navigation */}
                <nav className="lesson-nav">
                  {prev ? (
                    <Link
                      href={`/track/${trackSlug}/${moduleSlug}/${prev.slug}`}
                      className="lesson-nav-link lesson-nav-prev"
                    >
                      <span className="lesson-nav-arrow">←</span>
                      <span className="lesson-nav-content">
                        <span className="lesson-nav-label">Previous Lesson</span>
                        <span className="lesson-nav-title">{prev.title ?? prev.slug}</span>
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {next ? (
                    <Link
                      href={`/track/${trackSlug}/${moduleSlug}/${next.slug}`}
                      className="lesson-nav-link lesson-nav-next"
                    >
                      <span className="lesson-nav-content">
                        <span className="lesson-nav-label">Next Lesson</span>
                        <span className="lesson-nav-title">{next.title ?? next.slug}</span>
                      </span>
                      <span className="lesson-nav-arrow">→</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/track/${trackSlug}/${moduleSlug}`}
                      className="lesson-nav-link lesson-nav-next lesson-nav-module"
                    >
                      <span className="lesson-nav-content">
                        <span className="lesson-nav-label">Module Complete</span>
                        <span className="lesson-nav-title">Back to {mod.title ?? moduleSlug}</span>
                      </span>
                      <span className="lesson-nav-arrow">→</span>
                    </Link>
                  )}
                </nav>
              </div>
            </div>

            {/* Module outline sidebar - hidden on mobile */}
            <div className="lesson-sidebar">
              <ModuleOutline
                trackSlug={trackSlug}
                moduleSlug={moduleSlug}
                moduleTitle={mod.title ?? moduleSlug}
                lessons={lessons.map((l) => ({ slug: l.slug, title: l.title ?? l.slug }))}
                currentLessonSlug={lessonSlug}
              />
            </div>
          </div>
        </div>

        <style>{`
          /* Lesson Header Styles */
          .lesson-header {
            margin-bottom: 32px;
          }
          .lesson-header-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 16px;
          }
          .module-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%);
            border: 1px solid rgba(65, 109, 137, 0.2);
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            color: #416D89;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .module-badge:hover {
            background: linear-gradient(135deg, rgba(65, 109, 137, 0.15) 0%, rgba(65, 109, 137, 0.22) 100%);
            border-color: rgba(65, 109, 137, 0.35);
            transform: translateX(-2px);
          }
          .module-badge svg {
            opacity: 0.7;
            transition: transform 0.2s ease;
          }
          .module-badge:hover svg {
            transform: translateX(-2px);
            opacity: 1;
          }
          .lesson-indicator {
            font-size: 12px;
            color: var(--athena-muted);
            font-weight: 500;
          }
          .reading-time {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
            color: var(--athena-muted);
            margin-left: auto;
          }
          .reading-time svg {
            opacity: 0.6;
          }
          .lesson-title {
            margin: 0 0 16px;
            font-size: 32px;
            line-height: 1.2;
            letter-spacing: -0.5px;
            font-weight: 700;
            color: var(--athena-fg);
          }
          .lesson-deliverable {
            margin: 0 0 24px;
            padding: 14px 18px;
            background: linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%);
            border: 1px solid rgba(65, 109, 137, 0.12);
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.6;
            color: var(--athena-muted);
          }
          .lesson-deliverable strong {
            color: #416D89;
            font-weight: 600;
          }
          .lesson-header-divider {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
          }
          .divider-line {
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.03) 100%);
          }
          .divider-line:last-child {
            background: linear-gradient(90deg, rgba(10, 10, 10, 0.03) 0%, rgba(10, 10, 10, 0.08) 100%);
          }
          .divider-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(65, 109, 137, 0.06);
            border: 1px solid rgba(65, 109, 137, 0.1);
            color: #416D89;
          }

          /* Prose Styles */
          .athena-prose { font-size: 15px; line-height: 1.7; color: var(--athena-fg); }
          .athena-prose p { margin: 18px 0; color: var(--athena-muted); }
          .athena-prose > p:first-child { margin-top: 0; }
          .athena-prose h1, .athena-prose h2, .athena-prose h3 { color: var(--athena-fg); letter-spacing: -0.2px; }
          .athena-prose h2 {
            position: relative;
            margin: 48px 0 20px;
            padding: 16px 0 16px 20px;
            font-size: 20px;
            line-height: 1.3;
            font-weight: 700;
            border-left: 4px solid #416D89;
            background: linear-gradient(90deg, rgba(65, 109, 137, 0.04) 0%, transparent 100%);
            border-radius: 0 8px 8px 0;
          }
          .athena-prose h2::before {
            content: '';
            position: absolute;
            top: 0;
            left: -4px;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, #416D89 0%, #5a8aa8 100%);
            border-radius: 2px;
          }
          .athena-prose h3 {
            margin: 32px 0 14px;
            padding-bottom: 8px;
            font-size: 16px;
            line-height: 1.4;
            font-weight: 600;
            border-bottom: 1px solid rgba(10, 10, 10, 0.06);
          }
          .athena-prose ul, .athena-prose ol { margin: 18px 0 18px 24px; padding: 0; }
          .athena-prose li { margin: 10px 0; color: var(--athena-muted); }
          .athena-prose li::marker { color: rgba(10, 10, 10, 0.35); }
          .athena-prose strong { color: var(--athena-fg); }
          .athena-prose blockquote {
            margin: 24px 0; padding: 16px 20px;
            border-left: 4px solid var(--athena-accent);
            background: rgba(65, 109, 137, 0.05);
            border-radius: 8px;
          }
          .athena-prose blockquote p { margin: 0; color: var(--athena-fg); }
          .athena-prose code { font-size: 0.9em; background: rgba(10, 10, 10, 0.05); padding: 2px 6px; border-radius: 4px; color: var(--athena-fg); }
          .athena-prose pre { background: rgba(10, 10, 10, 0.03); padding: 16px 20px; border-radius: 8px; overflow: auto; line-height: 1.55; border: 1px solid var(--athena-subtle); }
          .athena-prose pre code { background: transparent; padding: 0; }
          .athena-prose hr { border: none; border-top: 1px solid var(--athena-subtle); margin: 32px 0; }
          .athena-prose a { color: var(--athena-accent); text-decoration: none; }
          .athena-prose a:hover { text-decoration: underline; }
          .athena-prose input[type="checkbox"] { transform: translateY(1px); margin-right: 8px; }
          .athena-prose li > p { margin: 0; }

          /* Enhanced Navigation Styles */
          .lesson-nav {
            display: flex;
            justify-content: space-between;
            gap: 16px;
          }
          .lesson-nav-link {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 20px;
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.2s ease;
            max-width: 48%;
          }
          .lesson-nav-prev {
            background: rgba(10, 10, 10, 0.02);
            border: 1px solid rgba(10, 10, 10, 0.08);
          }
          .lesson-nav-prev:hover {
            background: rgba(10, 10, 10, 0.04);
            border-color: rgba(10, 10, 10, 0.15);
            transform: translateX(-4px);
          }
          .lesson-nav-next {
            background: linear-gradient(135deg, rgba(65, 109, 137, 0.08) 0%, rgba(65, 109, 137, 0.12) 100%);
            border: 1px solid rgba(65, 109, 137, 0.2);
            margin-left: auto;
          }
          .lesson-nav-next:hover {
            background: linear-gradient(135deg, rgba(65, 109, 137, 0.12) 0%, rgba(65, 109, 137, 0.18) 100%);
            border-color: rgba(65, 109, 137, 0.3);
            transform: translateX(4px);
          }
          .lesson-nav-module {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.12) 100%);
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          .lesson-nav-module:hover {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(52, 211, 153, 0.18) 100%);
            border-color: rgba(16, 185, 129, 0.3);
          }
          .lesson-nav-arrow {
            font-size: 18px;
            color: var(--athena-muted);
            flex-shrink: 0;
            transition: transform 0.2s ease;
          }
          .lesson-nav-next .lesson-nav-arrow {
            color: #416D89;
          }
          .lesson-nav-module .lesson-nav-arrow {
            color: rgb(16, 185, 129);
          }
          .lesson-nav-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
          }
          .lesson-nav-prev .lesson-nav-content {
            text-align: left;
          }
          .lesson-nav-next .lesson-nav-content {
            text-align: right;
          }
          .lesson-nav-label {
            font-size: 11px;
            font-weight: 500;
            color: var(--athena-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .lesson-nav-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--athena-fg);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .lesson-nav-next .lesson-nav-title {
            color: #416D89;
          }
          .lesson-nav-module .lesson-nav-title {
            color: rgb(16, 185, 129);
          }

          .lesson-sidebar { display: block; }
          @media (max-width: 1024px) {
            .lesson-sidebar { display: none; }
          }
          @media (max-width: 640px) {
            .lesson-title { font-size: 26px; }
            .lesson-header-meta { gap: 8px; }
            .reading-time { margin-left: 0; width: 100%; margin-top: 4px; }
            .lesson-nav { flex-direction: column; }
            .lesson-nav-link { max-width: 100%; }
            .lesson-nav-next { margin-left: 0; }
            .lesson-nav-prev .lesson-nav-content,
            .lesson-nav-next .lesson-nav-content { text-align: left; }
          }
        `}</style>
      </main>
    </>
  );
}

