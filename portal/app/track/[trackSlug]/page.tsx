import Link from "next/link";
import { notFound } from "next/navigation";

import { getTracks, getModulesForTrack } from "@/lib/content";
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  MetaPill,
  Section,
  Grid,
  Card,
  Stack,
  Meta,
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
  const track = tracks.find((t: any) => t.slug === trackSlug);

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
            metaLeft={
              <>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>
                    {modules?.length ?? 0} modules
                  </span>
                </MetaPill>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>Track → Module → Lesson</span>
                </MetaPill>
              </>
            }
            metaRight={
              <>
                <MetaPill>
                  <span style={{ fontWeight: 650 }}>Sequence-based</span>
                </MetaPill>
              </>
            }
          />

          <hr style={ui.divider} />

          <Section
            title="Modules"
            subtitle="Work top-to-bottom. Each module contains lessons with concrete deliverables."
          >
            {modules && modules.length > 0 ? (
              <Grid minColWidth={360}>
                {modules.map((m: any) => (
                  <Link
                    key={m.slug}
                    href={`/track/${trackSlug}/${m.slug}`}
                    style={ui.cardLink}
                    className="a-link"
                  >
                    <div className="a-hoverCard" style={{ borderRadius: 14 }}>
                      <Card>
                        <Stack gap={8}>
                          <div style={ui.cardTitle}>{m.title ?? m.slug}</div>
                          {m.description ? (
                            <div style={ui.cardDesc}>{m.description}</div>
                          ) : (
                            <div style={ui.cardDesc}>
                              A focused set of lessons designed to be completed in sequence.
                            </div>
                          )}
                          <Meta>Open module →</Meta>
                        </Stack>
                      </Card>
                    </div>
                  </Link>
                ))}
              </Grid>
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
