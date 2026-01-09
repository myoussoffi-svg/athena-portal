import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getTracks,
  getModulesForTrack,
  getLessonsForModule,
  getLessonBySlug,
} from "@/lib/content";

import { Shell, Content, H1 } from "@/components/ui";

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

  const contentHtml = await mdToHtml(bodyMd);

  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const lessonNumber = idx + 1;
  const totalLessons = Math.max(lessons.length, 1);

  // Clean deliverable text (strip markdown formatting for inline display)
  const deliverableText = deliverableMd?.trim() || null;

  return (
    <Shell>
      <main
        style={{
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          color: "var(--athena-text-primary)",
          background: "var(--athena-bg-primary)",
          minHeight: "100vh",
          paddingBottom: "var(--space-8)",
        }}
      >
        <nav style={{ marginBottom: "var(--space-4)" }}>
          <Link
            href={`/track/${trackSlug}/${moduleSlug}`}
            style={{
              fontSize: 13,
              color: "var(--athena-text-tertiary)",
              textDecoration: "none",
            }}
          >
            ← Back to module
          </Link>
        </nav>

        <div style={{ borderTop: "1px solid var(--athena-divider)", paddingTop: "var(--space-5)" }}>
          <Content>
            <header style={{ marginBottom: "var(--space-6)" }}>
              <H1>{lesson.title}</H1>

              <div
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: 13,
                  color: "var(--athena-text-tertiary)",
                }}
              >
                Lesson {lessonNumber} of {totalLessons}
              </div>

              {deliverableText ? (
                <div
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: 13,
                    color: "var(--athena-text-secondary)",
                  }}
                >
                  <span style={{ color: "var(--athena-text-tertiary)" }}>Deliverable:</span>{" "}
                  {deliverableText}
                </div>
              ) : null}
            </header>

            <article
              className="athena-prose"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <nav
              style={{
                marginTop: "var(--space-7)",
                paddingTop: "var(--space-5)",
                borderTop: "1px solid var(--athena-divider)",
                display: "flex",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div>
                {prev ? (
                  <Link
                    href={`/track/${trackSlug}/${moduleSlug}/${prev.slug}`}
                    style={{
                      fontSize: 13,
                      color: "var(--athena-text-tertiary)",
                      textDecoration: "none",
                    }}
                  >
                    ← Previous
                  </Link>
                ) : null}
              </div>

              <div>
                {next ? (
                  <Link
                    href={`/track/${trackSlug}/${moduleSlug}/${next.slug}`}
                    style={{
                      fontSize: 13,
                      color: "var(--athena-text-tertiary)",
                      textDecoration: "none",
                    }}
                  >
                    Next →
                  </Link>
                ) : null}
              </div>
            </nav>
          </Content>
        </div>

        <style>{`
          .athena-prose { font-size: var(--athena-text-body); line-height: var(--athena-lh-body); color: var(--athena-text-primary); }
          .athena-prose p { margin: 16px 0; color: var(--athena-text-secondary); }
          .athena-prose > p:first-child { margin-top: 0; }
          .athena-prose h1, .athena-prose h2, .athena-prose h3 { color: var(--athena-text-primary); letter-spacing: -0.2px; }
          .athena-prose h2 { margin: 36px 0 12px; padding-top: 20px; border-top: 1px solid var(--athena-divider); font-size: var(--athena-h2); line-height: var(--athena-lh-tight); }
          .athena-prose h3 { margin: 24px 0 8px; font-size: var(--athena-h3); line-height: 1.4; }
          .athena-prose ul, .athena-prose ol { margin: 16px 0 16px 24px; padding: 0; }
          .athena-prose li { margin: 8px 0; color: var(--athena-text-secondary); }
          .athena-prose li::marker { color: var(--athena-text-tertiary); }
          .athena-prose strong { color: var(--athena-text-primary); }
          .athena-prose blockquote {
            margin: 20px 0; padding: 14px 18px;
            border-left: 4px solid var(--athena-accent);
            background: var(--athena-bg-secondary);
            border-radius: var(--radius-md);
          }
          .athena-prose code { font-size: 0.95em; background: var(--athena-bg-secondary); padding: 2px 6px; border-radius: var(--radius-sm); color: var(--athena-text-primary); }
          .athena-prose pre { background: var(--athena-bg-secondary); padding: 16px 20px; border-radius: var(--radius-md); overflow: auto; line-height: 1.55; border: 1px solid var(--athena-border-subtle); }
          .athena-prose pre code { background: transparent; padding: 0; }
          .athena-prose hr { border: none; border-top: 1px solid var(--athena-divider); margin: 28px 0; }
          .athena-prose a { color: var(--athena-accent); text-decoration: none; }
          .athena-prose a:hover { text-decoration: underline; }

          .athena-prose input[type="checkbox"] { transform: translateY(1px); margin-right: 8px; }
          .athena-prose li > p { margin: 0; }
        `}</style>
      </main>
    </Shell>
  );
}

