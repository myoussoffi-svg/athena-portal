import { notFound } from 'next/navigation';
import { getTracks } from '@/lib/content';
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  ui,
} from '@/components/ui';
import { InterviewLanding } from './InterviewLanding';

type Params = { trackSlug: string };

export default async function InterviewPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  // Verify the track exists
  const tracks = await getTracks();
  const track = tracks.find((t: { slug: string }) => t.slug === trackSlug);

  if (!track) {
    notFound();
  }

  return (
    <>
      <GlobalStyles />

      <div style={ui.page}>
        <div style={ui.container}>
          <Breadcrumbs
            items={[
              { label: 'Tracks', href: '/track' },
              { label: track.title ?? trackSlug, href: `/track/${trackSlug}` },
              { label: 'Interview Simulator' },
            ]}
          />

          <CourseHeader
            eyebrow="Interview Simulator"
            title="Mock Interview"
            description="Practice your interview skills with an AI-powered mock interview. You'll answer behavioral and technical questions while being recorded, then receive detailed feedback on your performance."
          />

          <hr style={ui.divider} />

          <InterviewLanding trackSlug={trackSlug} />
        </div>
      </div>
    </>
  );
}
