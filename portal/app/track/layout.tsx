import React from "react";
import Link from "next/link";
import { ui, AthenaMark } from "@/components/ui";

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={ui.page}>
      <div style={ui.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Link href="/track" style={ui.crumb}>
            Tracks
          </Link>

          <AthenaMark size={14} tone="ink" align="right" />
        </div>

        {children}
      </div>
    </main>
  );
}
