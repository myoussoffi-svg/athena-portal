import Link from "next/link";
import { notFound } from "next/navigation";

import { getTracks, getModulesForTrack, getLessonsForModule } from "@/lib/content";
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  Section,
  LessonRow,
  MetaPill,
  Stack,
  ui,
  AthenaMark,
} from "@/components/ui";

type Params = { trackSlug: string; moduleSlug: string };

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

  const lessons = getLessonsForModule(trackSlug, moduleSlug);

  return (
    <>
      <GlobalStyles />

      <div style={ui.page}>
        <div style={ui.container}>
          <Breadcrumbs
            items={[
              { label: "Tracks", href: "/track" },
              { label: track.title ?? trackSlug, href: `/track/${trackSlug}` },
              { label: mod.title ?? moduleSlug },
            ]}
          />

          <CourseHeader
            eyebrow="Module"
            title={mod.title ?? moduleSlug}
            description={mod.description ? mod.description : undefined}
            metaLeft={
              <>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>{lessons.length} lessons</span>
                </MetaPill>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>Deliverable-driven</span>
                </MetaPill>
              </>
            }
            metaRight={
              <>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>Track → Module → Lesson</span>
                </MetaPill>
              </>
            }
          />

          <hr style={ui.divider} />

          <Stack gap={12}>
            <Section
              title="Lessons"
              subtitle="Each lesson is a focused unit designed to be completed in one sitting."
            >
              {lessons.length ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {lessons.map((l, idx) => (
                    <LessonRow
                      key={l.slug}
                      href={`/track/${trackSlug}/${moduleSlug}/${l.slug}`}
                      index={idx + 1}
                      title={l.title ?? l.slug}
                      description={l.description ? l.description : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ opacity: 0.8 }}>
                  No lessons found for <code>{moduleSlug}</code>.
                </div>
              )}
            </Section>

            <div
              style={{
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid rgba(10, 10, 10, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <AthenaMark size={12} tone="muted" />
              <div style={ui.small}>
                <span style={{ marginRight: 10 }}>Module</span>
                <span aria-hidden="true" style={{ opacity: 0.6, marginRight: 10 }}>
                  ·
                </span>
                <Link href={`/track/${trackSlug}`} className="a-link" style={{ color: ui.colors.muted }}>
                  Back to track
                </Link>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
}

