"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string; level: number };

function cleanHeadingText(s: string) {
  return (s || "")
    .replace(/^\s*#\s*/, "")
    .replace(/\\s\*.*?\\s\*/g, "") // strips accidental literal "\s*..."
    .trim();
}

export function LessonOutline() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(".md h2, .md h3")
    );

    const collected = headings
      .map((el) => ({
        id: el.id,
        text: cleanHeadingText(el.innerText || ""),
        level: el.tagName === "H2" ? 2 : 3,
      }))
      .filter((h) => h.id && h.text);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional DOM read after mount
    setItems((prev) => {
      if (prev.length === collected.length && prev.every((p, i) => Object.is(p.id, collected[i]?.id))) {
        return prev;
      }
      return collected;
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="lessonOutline" aria-label="On this page">
      <div className="lessonOutline__title">On this page</div>
      <ul className="lessonOutline__list">
        {items.map((h) => (
          <li
            key={h.id}
            className={
              h.level === 3
                ? "lessonOutline__item lessonOutline__item--sub"
                : "lessonOutline__item"
            }
          >
            <a className="lessonOutline__link" href={`#${h.id}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
