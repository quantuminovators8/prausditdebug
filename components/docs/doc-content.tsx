"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function DocContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Parse headings from HTML content for TOC
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3");
    const items: TocItem[] = [];
    headings.forEach((heading, i) => {
      const id = `heading-${i}`;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.charAt(1));
      items.push({ id, text, level });
    });
    setToc(items);
  }, [content]);

  // Inject IDs into content headings
  let headingIndex = 0;
  const processedContent = content.replace(
    /<(h[1-3])([^>]*)>/g,
    (_match, tag, attrs) => {
      const id = `heading-${headingIndex++}`;
      return `<${tag}${attrs} id="${id}">`;
    }
  );

  // Add copy buttons to code blocks
  const contentWithCopy = processedContent.replace(
    /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_match, attrs, code) => {
      return `<div class="relative group"><pre><code${attrs}>${code}</code></pre><button class="copy-btn absolute top-2 right-2 opacity-0 group-hover:opacity-100 rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground transition-opacity hover:text-foreground" data-code="${encodeURIComponent(code)}">Copy</button></div>`;
    }
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("copy-btn")) {
        const code = decodeURIComponent(
          target.getAttribute("data-code") || ""
        );
        // Strip HTML tags
        const text = code.replace(/<[^>]*>/g, "");
        navigator.clipboard.writeText(text);
        target.textContent = "Copied!";
        setTimeout(() => {
          target.textContent = "Copy";
        }, 2000);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-foreground">{title}</h1>

      {/* Table of Contents */}
      {toc.length > 2 && (
        <div className="mb-8 rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            On this page
          </p>
          <nav className="flex flex-col gap-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Content */}
      <div
        className="prose-docs"
        dangerouslySetInnerHTML={{ __html: contentWithCopy }}
      />
    </div>
  );
}
