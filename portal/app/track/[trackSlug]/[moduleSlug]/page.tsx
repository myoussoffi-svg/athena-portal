import Link from "next/link";
import { notFound } from "next/navigation";

import { getTracks, getModulesForTrack, getLessonsForModule } from "@/lib/content";
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  Section,
  LessonRow,
  Stack,
  ui,
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

  const moduleIndex = modules.findIndex((m) => m.slug === moduleSlug);
  const modulePosition = `Module ${moduleIndex + 1} / ${modules.length}`;

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
            eyebrow={modulePosition}
            title={mod.title ?? moduleSlug}
            description={mod.description ? mod.description : undefined}
          />

          <hr style={ui.divider} />

          <Stack gap={12}>
            <Section
              title="Lessons"
              subtitle={lessons.length ? `${lessons.length} lessons` : undefined}
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
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid rgba(10, 10, 10, 0.08)",
              }}
            >
              <Link
                href={`/track/${trackSlug}`}
                style={{
                  fontSize: 13,
                  color: "rgba(10, 10, 10, 0.55)",
                  textDecoration: "none",
                }}
              >
                ← Back to track
              </Link>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
}

