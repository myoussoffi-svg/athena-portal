import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { getTracks } from "@/lib/content";
import { isTrackVisible } from "@/lib/feature-flags";
import { GlobalStyles, ComingSoon } from "@/components/ui";
import { DealCoachClient } from "./DealCoachClient";

type Params = { trackSlug: string };

export const metadata = {
  title: 'Deal Discussion Coach | Athena',
  description: 'AI-powered coaching to reframe your banking deal experience for PE interviews.',
};

export default async function DealCoachPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { trackSlug } = await Promise.resolve(params);

  const { userId } = await auth();
  if (!userId) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2 style={{ fontSize: 24, marginBottom: 12 }}>Sign in required</h2>
            <p style={{ color: "rgba(10, 10, 10, 0.6)", marginBottom: 20 }}>
              Please sign in to access the Deal Discussion Coach.
            </p>
            <Link href="/sign-in" style={{ display: "inline-block", padding: "12px 24px", background: "#416D89", color: "white", borderRadius: 8, textDecoration: "none", fontWeight: 500, fontSize: 14 }}>
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!isTrackVisible(trackSlug)) {
    return <><GlobalStyles /><ComingSoon courseName="This course" backHref="/track" backLabel="Back to Tracks" /></>;
  }

  const tracks = getTracks();
  const track = tracks.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  return (
    <>
      <GlobalStyles />
      <style>{`
        .dc-page { min-height: 100vh; background: #FFFFFF; font-family: Inter, system-ui, sans-serif; }
        .dc-header { background: linear-gradient(180deg, #416D89 0%, #4a7a96 50%, #FFFFFF 100%); padding: 48px 24px 60px; margin-bottom: -32px; }
        .dc-header-inner { max-width: 900px; margin: 0 auto; }
        .dc-breadcrumb { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none; margin-bottom: 16px; transition: color 0.15s; }
        .dc-breadcrumb:hover { color: rgba(255,255,255,0.95); }
        .dc-breadcrumb svg { width: 16px; height: 16px; }
        .dc-title { margin: 0; font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.02em; }
        .dc-subtitle { margin: 8px 0 0; font-size: 15px; color: rgba(255,255,255,0.85); max-width: 560px; }
        .dc-content { max-width: 900px; margin: 0 auto; padding: 0 24px 64px; }
        @media (max-width: 640px) { .dc-header { padding: 36px 20px 52px; } .dc-title { font-size: 26px; } .dc-content { padding: 0 16px 48px; } }
      `}</style>

      <div className="dc-page">
        <div className="dc-header">
          <div className="dc-header-inner">
            <Link href={`/track/${trackSlug}`} className="dc-breadcrumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              {track.title}
            </Link>
            <h1 className="dc-title">Deal Discussion Coach</h1>
            <p className="dc-subtitle">
              Input your banking deal experience and get AI-powered coaching on how to discuss it through a PE lens in interviews.
            </p>
          </div>
        </div>
        <div className="dc-content">
          <DealCoachClient />
        </div>
      </div>
    </>
  );
}
