import Link from "next/link";
import { getTracks } from "@/lib/content";

export default function HomePage() {
  const tracks = getTracks();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-semibold">Athena Course Portal</h1>
      <p className="mt-2 text-slate-600">
        Choose a track. Content is loaded from{" "}
        <code className="rounded bg-slate-100 px-1">/content</code>.
      </p>

      <div className="mt-8 grid gap-4">
        {tracks.map((t) => (
          <Link
            key={t.slug}
            href={`/track/${t.slug}`}
            className="rounded-xl border p-5 hover:bg-slate-50"
          >
            <div className="text-lg font-medium">{t.title}</div>
            <div className="mt-1 text-sm text-slate-600">{t.slug}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
