"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import type { Documentation } from "@/lib/types";

export function DocEditor({
  doc,
  onSave,
}: {
  doc: Documentation;
  onSave: (content: string) => Promise<void>;
}) {
  const [content, setContent] = useState(doc.content || "");
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await onSave(content);
    setSaving(false);
  }, [content, onSave]);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar hint */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Write your documentation content using HTML markup. Supports headings,
          code blocks, lists, tables, and images.
        </p>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--neon-cyan)] text-[var(--background)] hover:bg-[var(--neon-cyan)]/90"
        >
          <Save size={16} className="mr-2" />
          {saving ? "Saving..." : "Save Content"}
        </Button>
      </div>

      {/* Editor area */}
      <div className="tiptap-editor rounded-xl border border-border bg-card">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[500px] rounded-xl bg-transparent p-6 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
          placeholder="Write documentation content here...

Supports HTML markup:
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>Paragraph text</p>
<pre><code>Code blocks</code></pre>
<ul><li>List items</li></ul>
<table><tr><th>Header</th></tr></table>"
        />
      </div>

      {/* Preview */}
      {content && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Preview
          </p>
          <div
            className="prose-docs rounded-xl border border-border bg-card p-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
}
