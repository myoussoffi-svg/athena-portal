import { notFound } from "next/navigation";

import { getTracks, getModulesForTrack } from "@/lib/content";
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  Section,
  LessonRow,
  ui,
} from "@/components/ui";

type Params = { trackSlug: string };

export default async function Page({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

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

      <div style={ui.page}>
        <div style={ui.container}>
          <Breadcrumbs
            items={[
              { label: "Tracks", href: "/track" },
              { label: track.title ?? trackSlug },
            ]}
          />

          <CourseHeader
            eyebrow="Track"
            title={track.title ?? trackSlug}
            description={track.description ? track.description : undefined}
          />

          <hr style={ui.divider} />

          <Section
            title="Modules"
            subtitle={modules?.length ? `${modules.length} modules` : undefined}
          >
            {modules && modules.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {modules.map((m: { slug: string; title: string; description?: string }, idx: number) => (
                  <LessonRow
                    key={m.slug}
                    href={`/track/${trackSlug}/${m.slug}`}
                    index={idx + 1}
                    title={m.title ?? m.slug}
                    description={m.description ? m.description : undefined}
                  />
                ))}
              </div>
            ) : (
              <div style={{ opacity: 0.8 }}>
                No modules found for <code>{trackSlug}</code>.
              </div>
            )}
          </Section>
        </div>
      </div>
    </>
  );
}


