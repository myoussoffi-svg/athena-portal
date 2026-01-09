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

function LessonCard({
  title,
  variant,
  html,
}: {
  title: string;
  variant: "neutral" | "accent";
  html: string;
}) {
  const isAccent = variant === "accent";
  return (
    <div
      style={{
        marginTop: 14,
        padding: "12px 14px",
        border: isAccent
          ? "1px solid rgba(65,109,137,0.28)"
          : "1px solid rgba(0,0,0,0.10)",
        background: isAccent ? "rgba(65,109,137,0.06)" : "rgba(0,0,0,0.02)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          opacity: 0.78,
        }}
      >
        {title}
      </div>
      <div
        className="athena-prose"
        style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.6 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
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

  // Extract structured “framing” sections in a stable order.
  const outRes = extractSection(rawMd, /^##\s+Outcomes?\s*$/i);
  const agRes = extractSection(outRes.stripped, /^##\s+Agenda\s*$/i);
  const whyRes = extractSection(
    agRes.stripped,
    /^##\s+Why this matters( in a real deal)?\s*$/i
  );
  const delRes = extractSection(whyRes.stripped, /^##\s+Deliverable\s*$/i);
  const ckRes = extractSection(delRes.stripped, /^##\s+Checklist\s*$/i);
  const synRes = extractSection(ckRes.stripped, /^##\s+Synthesis\s*$/i);

  const outcomesMd = outRes.extracted;
  const agendaMd = agRes.extracted;
  const whyMd = whyRes.extracted;
  const deliverableMd = delRes.extracted;
  const checklistMd = ckRes.extracted;
  const synthesisMd = synRes.extracted;
  const bodyMd = synRes.stripped;

  const contentHtml = await mdToHtml(bodyMd);

  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const lessonNumber = idx + 1;
  const totalLessons = Math.max(lessons.length, 1);
  const progressPct = Math.min(
    100,
    Math.max(0, Math.round((lessonNumber / totalLessons) * 100))
  );

  const intentText =
    lesson.description && lesson.description.trim().length > 0
      ? `In this lesson, you will ${lesson.description.trim().replace(/\.$/, "")}.`
      : "In this lesson, you will build a concrete, repeatable workflow you can apply on a live deal.";

  const deliverableFallback =
    "Produce a 1–2 page output (memo, outline, or analysis) you could forward to a VP/Principal—clear structure, crisp bullets, and explicit assumptions.";

  const deliverableSource =
    deliverableMd && deliverableMd.trim().length > 0
      ? deliverableMd
      : deliverableFallback;

  const outcomesHtml =
    outcomesMd && outcomesMd.trim().length > 0 ? await mdToHtml(outcomesMd) : "";
  const agendaHtml =
    agendaMd && agendaMd.trim().length > 0 ? await mdToHtml(agendaMd) : "";
  const whyHtml = whyMd && whyMd.trim().length > 0 ? await mdToHtml(whyMd) : "";
  const deliverableHtml = await mdToHtml(deliverableSource);
  const checklistHtml =
    checklistMd && checklistMd.trim().length > 0
      ? await mdToHtml(checklistMd)
      : "";
  const synthesisHtml =
    synthesisMd && synthesisMd.trim().length > 0
      ? await mdToHtml(synthesisMd)
      : "";

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
        <div
          style={{ marginBottom: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}
        >
          <Link
            href={`/track/${trackSlug}/${moduleSlug}`}
            className="athenaLink"
            style={{ fontSize: "var(--athena-text-small)" }}
          >
            Back to {mod.title}
          </Link>

          <span style={{ color: "var(--athena-text-tertiary)" }}>/</span>

          <div style={{ fontSize: "var(--athena-text-meta)", color: "var(--athena-text-secondary)" }}>
            {track.title} <span style={{ color: "var(--athena-text-tertiary)" }}>/</span> {mod.title}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--athena-divider)", paddingTop: "var(--space-5)" }}>
          <Content>
            <header style={{ marginBottom: "var(--space-5)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--athena-text-meta)",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    color: "var(--athena-text-secondary)",
                  }}
                >
                  Lesson {lessonNumber} of {totalLessons}
                </div>

                <div style={{ fontSize: "var(--athena-text-meta)", color: "var(--athena-text-tertiary)" }}>{progressPct}%</div>
              </div>

              <div
                style={{
                  height: 6,
                  borderRadius: 999,
                  background: "var(--athena-border-subtle)",
                  overflow: "hidden",
                  marginBottom: "var(--space-4)",
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPct}%`,
                    background: "var(--athena-accent)",
                  }}
                />
              </div>

              <H1>{lesson.title}</H1>

              <p
                style={{
                  margin: "var(--space-3) 0 0",
                  fontSize: "var(--athena-text-body)",
                  lineHeight: "var(--athena-lh-body)",
                  color: "var(--athena-text-secondary)",
                }}
              >
                {intentText}
              </p>

            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, letterSpacing: 0.4, textTransform: "uppercase", opacity: 0.65 }}>
                Module flow
              </span>

              {prev ? (
                <span style={{ fontSize: 13, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.02)", opacity: 0.9 }}>
                  ← {prev.title}
                </span>
              ) : (
                <span style={{ fontSize: 13, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.01)", opacity: 0.5 }}>
                  Start of module
                </span>
              )}

              <span style={{ opacity: 0.35 }}>→</span>

              <span style={{ fontSize: 13, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(65,109,137,0.26)", background: "rgba(65,109,137,0.06)" }}>
                {lesson.title}
              </span>

              <span style={{ opacity: 0.35 }}>→</span>

              {next ? (
                <span style={{ fontSize: 13, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.02)", opacity: 0.9 }}>
                  {next.title} →
                </span>
              ) : (
                <span style={{ fontSize: 13, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.01)", opacity: 0.5 }}>
                  End of module
                </span>
              )}
            </div>

            {outcomesHtml ? (
              <LessonCard title="Outcomes" variant="neutral" html={outcomesHtml} />
            ) : null}

            {agendaHtml ? (
              <LessonCard title="Agenda" variant="neutral" html={agendaHtml} />
            ) : null}

            {whyHtml ? (
              <LessonCard
                title="Why this matters in a real deal"
                variant="neutral"
                html={whyHtml}
              />
            ) : null}

            <LessonCard title="Deliverable" variant="accent" html={deliverableHtml} />

            {checklistHtml ? (
              <LessonCard title="Checklist" variant="neutral" html={checklistHtml} />
            ) : null}
          </header>

          <article
            className="athena-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {synthesisHtml ? (
            <div style={{ marginTop: 22 }}>
              <LessonCard title="Synthesis" variant="neutral" html={synthesisHtml} />
            </div>
          ) : null}

          <div
            style={{
              marginTop: 34,
              paddingTop: 18,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              {prev ? (
                <Link
                  href={`/track/${trackSlug}/${moduleSlug}/${prev.slug}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.12)",
                    textDecoration: "none",
                    color: "#0B0F14",
                    fontSize: 14,
                  }}
                >
                  ← {prev.title}
                </Link>
              ) : null}
            </div>

            <div>
              {next ? (
                <Link
                  href={`/track/${trackSlug}/${moduleSlug}/${next.slug}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.12)",
                    textDecoration: "none",
                    color: "#0B0F14",
                    fontSize: 14,
                  }}
                >
                  {next.title} →
                </Link>
              ) : null}
            </div>
          </div>
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

