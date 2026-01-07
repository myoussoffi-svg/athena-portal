import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getTracks,
  getModulesForTrack,
  getLessonsForModule,
  getLessonBySlug,
} from "@/lib/content";

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

  const module = getModulesForTrack(trackSlug).find((m) => m.slug === moduleSlug);
  if (!module) notFound();

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

  const Card = ({
    title,
    variant,
    html,
  }: {
    title: string;
    variant: "neutral" | "accent";
    html: string;
  }) => {
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
  };

  return (
    <main
      style={{
        padding: "28px 20px 84px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        maxWidth: 980,
        margin: "0 auto",
        color: "#0B0F14",
      }}
    >
      <div
        style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}
      >
        <Link
          href={`/track/${trackSlug}/${moduleSlug}`}
          style={{ color: "#416D89", textDecoration: "none", fontSize: 14 }}
        >
          ← Back to {module.title}
        </Link>

        <span style={{ opacity: 0.35 }}>•</span>

        <div style={{ fontSize: 13, opacity: 0.75 }}>
          {track.title} <span style={{ opacity: 0.55 }}>/</span> {module.title}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 22 }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <header style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                Lesson {lessonNumber} of {totalLessons}
              </div>

              <div style={{ fontSize: 12, opacity: 0.65 }}>{progressPct}%</div>
            </div>

            <div
              style={{
                height: 6,
                borderRadius: 999,
                background: "rgba(0,0,0,0.08)",
                overflow: "hidden",
                marginBottom: 16,
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "#416D89",
                }}
              />
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: -0.2,
              }}
            >
              {lesson.title}
            </h1>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: 15.5,
                lineHeight: 1.65,
                opacity: 0.9,
              }}
            >
              {intentText}
            </p>

            {outcomesHtml ? (
              <Card title="Outcomes" variant="neutral" html={outcomesHtml} />
            ) : null}

            {agendaHtml ? (
              <Card title="Agenda" variant="neutral" html={agendaHtml} />
            ) : null}

            {whyHtml ? (
              <Card
                title="Why this matters in a real deal"
                variant="neutral"
                html={whyHtml}
              />
            ) : null}

            <Card title="Deliverable" variant="accent" html={deliverableHtml} />

            {checklistHtml ? (
              <Card title="Checklist" variant="neutral" html={checklistHtml} />
            ) : null}
          </header>

          <article
            className="athena-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {synthesisHtml ? (
            <div style={{ marginTop: 22 }}>
              <Card title="Synthesis" variant="neutral" html={synthesisHtml} />
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
        </div>
      </div>

      <style>{`
        .athena-prose { font-size: 15.5px; line-height: 1.68; letter-spacing: -0.1px; }
        .athena-prose p { margin: 14px 0; opacity: 0.94; }
        .athena-prose h1, .athena-prose h2, .athena-prose h3 { color: #0B0F14; letter-spacing: -0.2px; }
        .athena-prose h2 { margin: 26px 0 10px; font-size: 18px; line-height: 1.35; }
        .athena-prose h3 { margin: 20px 0 8px; font-size: 16px; line-height: 1.4; opacity: 0.98; }
        .athena-prose ul, .athena-prose ol { margin: 12px 0 12px 22px; padding: 0; }
        .athena-prose li { margin: 6px 0; }
        .athena-prose blockquote {
          margin: 18px 0; padding: 12px 14px;
          border-left: 3px solid rgba(65,109,137,0.55);
          background: rgba(65,109,137,0.06);
          border-radius: 12px;
        }
        .athena-prose code { font-size: 0.92em; background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 8px; }
        .athena-prose pre { background: rgba(0,0,0,0.06); padding: 14px 16px; border-radius: 14px; overflow: auto; }
        .athena-prose pre code { background: transparent; padding: 0; }
        .athena-prose hr { border: none; border-top: 1px solid rgba(0,0,0,0.10); margin: 22px 0; }
        .athena-prose a { color: #416D89; text-decoration: none; }
        .athena-prose a:hover { text-decoration: underline; }

        .athena-prose input[type="checkbox"] { transform: translateY(1px); margin-right: 8px; }
        .athena-prose li > p { margin: 0; }
      `}</style>
    </main>
  );
}
