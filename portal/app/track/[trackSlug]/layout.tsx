import { notFound } from "next/navigation";
import { getTracks } from "@/lib/content";

export default async function TrackSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { trackSlug: string } | Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) return notFound();

  return (
    <section>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.8 }}>{track.title}</div>
      </div>

      {children}
    </section>
  );
}
