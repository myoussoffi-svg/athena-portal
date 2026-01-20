import { notFound } from 'next/navigation';
import { getTracks, getModulesForTrack } from '@/lib/content';
import { GlobalStyles, ui } from '@/components/ui';
import { QuizContainer } from '@/components/quiz';

type Params = { trackSlug: string; moduleSlug: string };
type SearchParams = { mode?: string };

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Params | Promise<Params>;
  searchParams: SearchParams | Promise<SearchParams>;
}) {
  const { trackSlug, moduleSlug } = await Promise.resolve(params);
  const { mode } = await Promise.resolve(searchParams);

  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const modules = getModulesForTrack(trackSlug);
  const mod = modules.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  // Determine initial mode from URL
  const initialMode = mode === 'review' ? 'review' : mode === 'new' ? 'new' : 'all';

  return (
    <>
      <GlobalStyles />
      <div style={ui.page}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <QuizContainer
            trackSlug={trackSlug}
            moduleSlug={moduleSlug}
            moduleTitle={mod.title ?? moduleSlug}
            initialMode={initialMode as 'all' | 'new' | 'review'}
          />
        </div>
      </div>
    </>
  );
}
