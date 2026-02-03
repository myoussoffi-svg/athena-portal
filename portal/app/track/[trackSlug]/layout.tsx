import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getTracks } from "@/lib/content";
import { checkTrackAccess } from "@/lib/access-control";

export default async function TrackSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { trackSlug: string } | Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  // Verify track exists
  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) return notFound();

  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    // Redirect to sign-in with return URL
    redirect(`/sign-in?redirect_url=/track/${trackSlug}`);
  }

  // Check access
  const accessResult = await checkTrackAccess(userId, trackSlug);

  if (!accessResult.hasAccess) {
    // Redirect to purchase page
    redirect(`/courses/${trackSlug}`);
  }

  return (
    <section>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.8 }}>{track.title}</div>
      </div>

      {children}
    </section>
  );
}
