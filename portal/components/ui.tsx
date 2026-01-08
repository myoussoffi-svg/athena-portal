import React from "react";

export const ui = {
  // Athena theme tokens
  colors: {
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    ink: "#0A0A0A",
    muted: "rgba(10, 10, 10, 0.65)",
    border: "rgba(10, 10, 10, 0.08)",
    borderStrong: "rgba(10, 10, 10, 0.12)",
    accent: "#416D89",
    accentSoft: "rgba(65, 109, 137, 0.12)",
  },

  // Global page wrapper
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#0A0A0A",
    fontFamily: 'Inter, "Inter Placeholder", system-ui, sans-serif',
    fontSize: 14,
    lineHeight: "20px",
  } as React.CSSProperties,

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "28px 20px 56px",
  } as React.CSSProperties,

  crumb: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "rgba(10, 10, 10, 0.65)",
    textDecoration: "none",
  } as React.CSSProperties,

  title: {
    margin: 0,
    fontSize: 34,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
    fontWeight: 650,
  } as React.CSSProperties,

  subtitle: {
    margin: "10px 0 0",
    fontSize: 14,
    lineHeight: "20px",
    color: "rgba(10, 10, 10, 0.65)",
    maxWidth: 860,
  } as React.CSSProperties,

  divider: {
    border: 0,
    borderTop: "1px solid rgba(10, 10, 10, 0.08)",
    margin: "20px 0",
  } as React.CSSProperties,

  grid: (minColWidth = 300) =>
    ({
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`,
      gap: 14,
      alignItems: "stretch",
    }) as React.CSSProperties,

  card: {
    background: "#FFFFFF",
    border: "1px solid rgba(10, 10, 10, 0.08)",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 1px 0 rgba(10, 10, 10, 0.02)",
  } as React.CSSProperties,

  cardLink: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    borderRadius: 14,
  } as React.CSSProperties,

  cardTitle: {
    margin: 0,
    fontSize: 15,
    lineHeight: "20px",
    letterSpacing: "-0.01em",
    fontWeight: 600,
  } as React.CSSProperties,

  cardDesc: {
    margin: "6px 0 0",
    fontSize: 13,
    lineHeight: "18px",
    color: "rgba(10, 10, 10, 0.65)",
  } as React.CSSProperties,

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(65, 109, 137, 0.12)",
    color: "#416D89",
    border: "1px solid rgba(65, 109, 137, 0.22)",
  } as React.CSSProperties,

  listItem: {
    background: "#FFFFFF",
    border: "1px solid rgba(10, 10, 10, 0.08)",
    borderRadius: 14,
    padding: 14,
  } as React.CSSProperties,

  link: {
    color: "#416D89",
    textDecoration: "none",
  } as React.CSSProperties,

  small: {
    fontSize: 12.5,
    lineHeight: "18px",
    color: "rgba(10, 10, 10, 0.65)",
  } as React.CSSProperties,
};

export function Stack({
  gap = 12,
  children,
}: {
  gap?: number;
  children: React.ReactNode;
}) {
  return <div style={{ display: "grid", gap }}>{children}</div>;
}

export function Grid({
  minColWidth = 320,
  children,
}: {
  minColWidth?: number;
  children: React.ReactNode;
}) {
  return <div style={ui.grid(minColWidth)}>{children}</div>;
}

export function Card({ children }: { children: React.ReactNode }) {
  return <div style={ui.card}>{children}</div>;
}

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <header style={{ padding: "4px 0 10px" }}>
      {eyebrow ? <div style={{ marginBottom: 10 }}>{eyebrow}</div> : null}
      <h1 style={ui.title}>{title}</h1>
      {description ? <p style={ui.subtitle}>{description}</p> : null}
    </header>
  );
}

export function Meta({ children }: { children: React.ReactNode }) {
  return <div style={ui.small}>{children}</div>;
}

/**
 * Athena wordmark recreated as text (no assets).
 * Brand traits: Inter, weight 600, large letter spacing.
 * Spacing is size-aware so it does not look thin at small UI sizes.
 */
export function AthenaMark({
  size = 14,
  tone = "muted",
  align = "left",
}: {
  size?: number;
  tone?: "ink" | "muted" | "accent" | "white";
  align?: "left" | "center" | "right";
}) {
  const color =
    tone === "white"
      ? "#FFFFFF"
      : tone === "accent"
      ? "#416D89"
      : tone === "ink"
      ? "#0A0A0A"
      : "rgba(10, 10, 10, 0.60)";

  const letterSpacing =
    size >= 18 ? "0.5em" : size >= 14 ? "0.42em" : "0.38em";

  const textAlign =
    align === "center" ? "center" : align === "right" ? "right" : "left";

  return (
    <div
      aria-label="Athena"
      style={{
        fontFamily: 'Inter, "Inter Placeholder", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: size,
        letterSpacing,
        lineHeight: 1.2,
        color,
        textAlign,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      ATHENA
    </div>
  );
}

/* =========================================
   Athena Course Polish Primitives (server-safe)
   - No client state
   - No CSS framework
   - Uses <style> + className for hover states
========================================= */

export function GlobalStyles() {
  return (
    <style>{`
      :root{
        --athena-accent: #416D89;
        --athena-bg: #ffffff;
        --athena-fg: #0b0f14;
        --athena-muted: rgba(11,15,20,.72);
        --athena-subtle: rgba(11,15,20,.10);
        --athena-subtle2: rgba(11,15,20,.06);
        --athena-radius: 16px;
      }

      .a-hoverCard{
        transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
      }
      .a-hoverCard:hover{
        transform: translateY(-1px);
        border-color: rgba(65,109,137,.35);
        box-shadow: 0 10px 28px rgba(11,15,20,.10);
      }

      .a-row{
        transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
      }
      .a-row:hover{
        transform: translateY(-1px);
        background: rgba(65,109,137,.04);
        border-color: rgba(65,109,137,.30);
      }
      .a-arrow{ transition: transform 140ms ease; display:inline-block; }\r\n      .a-row:hover .a-arrow{ transform: translateX(2px); }\r\n
      .a-link{
        text-decoration: none;
        color: inherit;
      }
      .a-link:focus{
        outline: none;
      }
      .a-link:focus-visible{
        outline: 2px solid rgba(65,109,137,.55);
        outline-offset: 3px;
        border-radius: 12px;
      }
    `}</style>
  );
}

export function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        padding: "28px 22px 56px",
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "var(--athena-fg)",
        background: "var(--athena-bg)",
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>{children}</div>
    </main>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumbs" style={{ marginBottom: 14 }}>
      <ol
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          listStyle: "none",
          padding: 0,
          margin: 0,
          color: "var(--athena-muted)",
          fontSize: 11.5,
          letterSpacing: 0.15,
        }}
      >
        {items.map((it, i) => (
          <li key={`${it.label.includes("-") ? it.label.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : it.label}-${i}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {it.href ? (
              <a className="a-link" href={it.href} style={{ color: "var(--athena-muted)" }}>
                {it.label.includes("-") ? it.label.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : it.label}
              </a>
            ) : (
              <span style={{ color: "var(--athena-muted)" }}>{it.label.includes("-") ? it.label.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : it.label}</span>
            )}
            {i < items.length - 1 ? (
              <span aria-hidden="true" style={{ opacity: 0.6 }}>
                ›</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MetaRow({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  if (!left && !right) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        marginTop: 10,
        color: "var(--athena-muted)",
        fontSize: 12,
      }}
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{left}</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{right}</div>
    </div>
  );
}

export function MetaPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        background: "var(--athena-subtle2)",
        border: "1px solid var(--athena-subtle)",
      }}
    >
      {children}
    </span>
  );
}

export function CourseHeader({
  eyebrow,
  title,
  description,
  metaLeft,
  metaRight,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  metaLeft?: React.ReactNode;
  metaRight?: React.ReactNode;
}) {
  return (
    <header style={{ marginBottom: 18 }}>
      {eyebrow ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "var(--athena-muted)",
            }}
          >
            {eyebrow}
          </span>
          <span style={{ width: 28, height: 1, background: "var(--athena-subtle)" }} />
        </div>
      ) : null}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              lineHeight: 1.15,
              letterSpacing: -0.4,
            }}
          >
            {title}
          </h1>

          {description ? (
            <p
              style={{
                margin: "10px 0 0",
                maxWidth: 720,
                color: "var(--athena-muted)",
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              {description}
            </p>
          ) : null}

          <MetaRow left={metaLeft} right={metaRight} />
        </div>
      </div>
    </header>
  );
}

export function Section({
  title,
  subtitle,
  right,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 10,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 16, letterSpacing: -0.2 }}>{title}</h2>
          {subtitle ? (
            <div style={{ marginTop: 4, color: "var(--athena-muted)", fontSize: 12 }}>{subtitle}</div>
          ) : null}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function LessonRow({
  href,
  index,
  title,
  description,
  right,
}: {
  href: string;
  index: number;
  title: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const n = String(index).padStart(2, "0");
  return (
    <a
      className="a-link"
      href={href}
      style={{
        display: "block",
        borderRadius: 14,
      }}
    >
      <div
        className="a-row"
        style={{
          display: "grid",
          gridTemplateColumns: "46px 1fr auto",
          gap: 14,
          alignItems: "start",
          padding: "14px 14px",
          borderRadius: 14,
          border: "1px solid var(--athena-subtle)",
          background: "white",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.3,
            background: "rgba(65,109,137,.08)",
            border: "1px solid rgba(65,109,137,.18)",
            color: "rgba(11,15,20,.88)",
          }}
          aria-hidden="true"
        >
          {n}
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 650,
              letterSpacing: -0.15,
              lineHeight: 1.25,
              marginTop: 1,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                marginTop: 6,
                color: "var(--athena-muted)",
                fontSize: 12.5,
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--athena-muted)", fontSize: 12 }}>
          {right}
          <span className="a-arrow" aria-hidden="true" style={{ opacity: 0.8 }}>
            →
          </span>
        </div>
      </div>
    </a>
  );
}

export function Divider() {
  return (
    <div
      role="separator"
      aria-hidden="true"
      style={{
        height: 1,
        background: "var(--athena-subtle)",
        margin: "18px 0",
      }}
    />
  );
}

/* ===========================================
   Athena Visual System v1 - Primitives
   Using CSS classes from globals.css
   =========================================== */

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="athenaShell">
      {children}
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="athenaContent">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        margin: 0,
        fontSize: "var(--athena-h1)",
        lineHeight: "var(--athena-lh-tight)",
        color: "var(--athena-text-primary)",
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: 0,
        fontSize: "var(--athena-h2)",
        lineHeight: "var(--athena-lh-tight)",
        color: "var(--athena-text-primary)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: "var(--athena-h3)",
        lineHeight: "var(--athena-lh-tight)",
        color: "var(--athena-text-primary)",
      }}
    >
      {children}
    </h3>
  );
}

export function ACard({ children }: { children: React.ReactNode }) {
  return (
    <div className="athenaCard">
      {children}
    </div>
  );
}

export function Block({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "accent";
}) {
  const accentStyle = variant === "accent" ? {
    background: "rgba(79, 70, 229, 0.08)",
    borderColor: "rgba(79, 70, 229, 0.25)",
  } : {};

  return (
    <div className="athenaBlock" style={accentStyle}>
      {children}
    </div>
  );
}

export function ADivider() {
  return <div className="athenaDivider" role="separator" aria-hidden="true" />;
}

export function ALink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="athenaLink" href={href}>
      {children}
    </a>
  );
}









