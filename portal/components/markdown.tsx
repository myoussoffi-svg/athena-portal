import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";

/**
 * Supports callouts via remark-directive without forcing markdown rewrites.
 * Usage in markdown:
 *
 * :::ic-lens
 * **IC lens:** What would the IC challenge here?
 * :::
 *
 * :::common-mistake
 * ...
 * :::
 *
 * :::judgment
 * ...
 * :::
 */
function remarkCallouts() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], (node: unknown) => {
      const n = node as { type?: string; name?: string; data?: Record<string, unknown> };
      if (!n || n.type !== "containerDirective") return;

      const name = String(n.name || "").toLowerCase();
      const allowed = new Set(["ic-lens", "common-mistake", "judgment"]);
      if (!allowed.has(name)) return;

      const data = (n.data ||= {}) as Record<string, unknown>;
      data.hName = "aside";
      data.hProperties = {
        ...((data.hProperties as Record<string, unknown>) || {}),
        "data-callout": name,
        className: `callout callout--${name}`,
      };
    });
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function textFrom(node: unknown): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFrom).join("");
  if (typeof node === "object" && "props" in node) return textFrom((node as { props?: { children?: unknown } }).props?.children);
  return "";
}

function Heading({
  as: Tag,
  children,
}: {
  as: "h2" | "h3" | "h4";
  children: React.ReactNode;
}) {
  // ReactMarkdown children are often nested nodes; extract plain text robustly.
  const plain = textFrom(children).trim();
  const id = plain ? slugify(plain) : undefined;

  return (
    <Tag id={id} className="md-heading">
      <a
        className="md-heading__anchor"
        href={id ? `#${id}` : undefined}
        aria-label="Link to section"
      >•</a>
      <span className="md-heading__text">{children}</span>
    </Tag>
  );
}
export function Markdown({ content }: { content: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCallouts]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
          rehypeHighlight,
        ]}
        components={{
          h1: ({ children }) => <h1 className="md-title">{children}</h1>,
          h2: ({ children }) => <Heading as="h2">{children}</Heading>,
          h3: ({ children }) => <Heading as="h3">{children}</Heading>,
          h4: ({ children }) => <Heading as="h4">{children}</Heading>,
          p: ({ children }) => <p className="md-p">{children}</p>,
          ul: ({ children }) => <ul className="md-ul">{children}</ul>,
          ol: ({ children }) => <ol className="md-ol">{children}</ol>,
          li: ({ children }) => <li className="md-li">{children}</li>,
          blockquote: ({ children }) => <blockquote className="md-quote">{children}</blockquote>,
          code: ({ className, children, ...props }) => {
            const isInline = !className && !(props.node?.position?.start.line !== props.node?.position?.end.line);
            if (isInline) return <code className="md-code-inline">{children}</code>;
            return (
              <pre className="md-code-block">
                <code className={className}>{children}</code>
              </pre>
            );
          },
          table: ({ children }) => <div className="md-tableWrap"><table className="md-table">{children}</table></div>,
          th: ({ children }) => <th className="md-th">{children}</th>,
          td: ({ children }) => <td className="md-td">{children}</td>,
          hr: () => <hr className="md-hr" />,
          a: ({ href, children }) => (
            <a className="md-a" href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}



