import Link from "next/link";
import { getTracks } from "@/lib/content";
import {
  CourseHeader,
  GlobalStyles,
  PageShell,
  Section,
  Grid,
  Card,
  Stack,
  Meta,
  MetaPill,
  ui,
} from "@/components/ui";

export default function TrackIndexPage() {
  const tracks = getTracks();

  return (
    <>
      <GlobalStyles />
      <div style={ui.page}>
        <div style={ui.container}>
          <PageShell>
            <CourseHeader
              eyebrow="Tracks"
              title="Athena Courses"
              description="Choose a track to start learning. Each track is organized into modules and lessons."
              metaLeft={
                <>
                  <MetaPill>
                    <span style={{ fontWeight: 650 }}>Track → Module → Lesson</span>
                  </MetaPill>
                  <MetaPill>
                    <span style={{ fontWeight: 650 }}>{tracks.length} tracks</span>
                  </MetaPill>
                </>
              }
              metaRight={
                <>
                  <MetaPill>
                    <span style={{ fontWeight: 650 }}>Premium format</span>
                  </MetaPill>
                </>
              }
            />

            <Section
              title="Available tracks"
              subtitle="Pick a track, then progress module-by-module. Lessons are short, focused units with concrete outputs."
            >
              <Grid minColWidth={320}>
                {tracks.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/track/${t.slug}`}
                    style={ui.cardLink}
                    className="a-link"
                  >
                    <div className="a-hoverCard" style={{ borderRadius: 14 }}>
                      <Card>
                        <Stack gap={8}>
                          <div style={ui.cardTitle}>{t.title}</div>
                          {t.description ? (
                            <div style={ui.cardDesc}>{t.description}</div>
                          ) : (
                            <div style={ui.cardDesc}>
                              A structured sequence of modules and lessons.
                            </div>
                          )}
                          <Meta>View modules →</Meta>
                        </Stack>
                      </Card>
                    </div>
                  </Link>
                ))}
              </Grid>
            </Section>
          </PageShell>
        </div>
      </div>
    </>
  );
}
