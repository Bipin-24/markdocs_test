import React, { useState, useEffect, useMemo } from 'react';
import Markdoc from '@markdoc/markdoc';
import { config } from '../markdoc/config';

const DEFAULT_CONTENT = `---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %}

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](https://stripe.com/docs).

{% callout type="check" %}
Markdoc is open-source—check out its [source](https://github.com/markdoc/markdoc) to see how it works.
{% /callout %}

## How is Markdoc different?

Markdoc uses a fully declarative approach to composition and flow control, where other solutions… [Read more](/docs/overview).

## Next steps

- [Install Markdoc](/docs/getting-started)
- [Explore the syntax](/docs/syntax)
`;

export default function Sandbox({ height = '600px' }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [mode, setMode] = useState('split');
  const [error, setError] = useState(null);

  // Get mode from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode');
      if (urlMode && ['edit', 'preview', 'split'].includes(urlMode)) {
        setMode(urlMode);
      }
    }
  }, []);

  // Update URL when mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('mode', mode);
      window.history.replaceState({}, '', url);
    }
  }, [mode]);

  const rendered = useMemo(() => {
    try {
      setError(null);
      const ast = Markdoc.parse(content);
      
      // Extract and parse frontmatter - Markdoc stores it as a YAML string
      let frontmatter = {};
      if (ast.attributes.frontmatter) {
        // Parse YAML frontmatter string into object
        const yaml = ast.attributes.frontmatter;
        const lines = yaml.split('\n');
        lines.forEach(line => {
          const match = line.match(/^(\w+):\s*(.+)$/);
          if (match) {
            frontmatter[match[1]] = match[2].trim();
          }
        });
      }
      
      const transformed = Markdoc.transform(ast, {
        ...config,
        variables: {
          markdoc: {
            frontmatter: frontmatter
          }
        }
      });
      
      return Markdoc.renderers.react(transformed, React, { components: config.components });
    } catch (err) {
      console.error('Markdoc rendering error:', err);
      setError(err.message);
      return null;
    }
  }, [content]);

  return (
    <div className="sandbox-container" style={{ height }}>
      {/* Toolbar */}
      <div className="sandbox-toolbar">
        <div className="sandbox-toolbar-buttons">
          <button
            className={mode === 'edit' ? 'active' : ''}
            onClick={() => setMode('edit')}
            title="Edit Mode"
          >
            Edit
          </button>
          <button
            className={mode === 'split' ? 'active' : ''}
            onClick={() => setMode('split')}
            title="Split Mode"
          >
            Split
          </button>
          <button
            className={mode === 'preview' ? 'active' : ''}
            onClick={() => setMode('preview')}
            title="Preview Mode"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className={`sandbox-content mode-${mode}`}>
        {(mode === 'edit' || mode === 'split') && (
          <div className="sandbox-editor">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter Markdoc content..."
              spellCheck={false}
            />
          </div>
        )}

        {(mode === 'preview' || mode === 'split') && (
          <div className="sandbox-preview">
            {error ? (
              <div className="sandbox-error">
                <strong>Error:</strong>
                <pre>{error}</pre>
              </div>
            ) : (
              <article className="sandbox-rendered">{rendered}</article>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .sandbox-container {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--code-border);
          border-radius: 4px;
          overflow: hidden;
          background: var(--light);
        }

        .sandbox-toolbar {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
          background: var(--light);
          border-bottom: 1px solid var(--code-border);
        }

        .sandbox-toolbar-buttons {
          display: flex;
          gap: 0;
          border: 1px solid var(--code-border);
          border-radius: 4px;
          overflow: hidden;
        }

        .sandbox-toolbar-buttons button {
          padding: 0.5rem 1.5rem;
          border: none;
          border-right: 1px solid var(--code-border);
          background: var(--light);
          font-size: var(--font-size-2);
          font-weight: 500;
          color: var(--dark);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sandbox-toolbar-buttons button:last-child {
          border-right: none;
        }

        .sandbox-toolbar-buttons button:hover {
          background: var(--code-background);
        }

        .sandbox-toolbar-buttons button.active {
          background: var(--dark);
          color: var(--light);
        }

        .sandbox-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .sandbox-content.mode-edit .sandbox-editor {
          width: 100%;
        }

        .sandbox-content.mode-preview .sandbox-preview {
          width: 100%;
        }

        .sandbox-content.mode-split .sandbox-editor,
        .sandbox-content.mode-split .sandbox-preview {
          width: 50%;
        }

        .sandbox-editor {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--code-border);
          overflow: hidden;
          background: #1a1a1a;
        }

        .sandbox-editor textarea {
          flex: 1;
          width: 100%;
          padding: 1.5rem;
          border: none;
          font-family: var(--mono);
          font-size: var(--font-size-2);
          line-height: var(--line-height-3);
          color: #e8e8e8;
          background: #1a1a1a;
          resize: none;
          outline: none;
          tab-size: 2;
        }

        .sandbox-editor textarea::selection {
          background: rgba(255, 255, 255, 0.2);
        }

        .sandbox-preview {
          flex: 1;
          overflow-y: auto;
          background: var(--light);
        }

        .sandbox-rendered {
          padding: 2rem;
          max-width: 800px;
        }

        .sandbox-error {
          padding: 1rem;
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 4px;
          margin: 1rem;
        }

        .sandbox-error strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: var(--font-size-3);
          font-weight: 600;
        }

        .sandbox-error pre {
          margin: 0;
          font-family: var(--mono);
          font-size: var(--font-size-2);
          white-space: pre-wrap;
          word-break: break-word;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sandbox-content.mode-split {
            flex-direction: column;
          }

          .sandbox-content.mode-split .sandbox-editor,
          .sandbox-content.mode-split .sandbox-preview {
            width: 100%;
            height: 50%;
          }

          .sandbox-editor {
            border-right: none;
            border-bottom: 1px solid var(--code-border);
          }
        }

        /* Style the rendered content to match article styling */
        .sandbox-rendered {
          padding: 2rem;
          max-width: 100%;
        }

        .sandbox-rendered :global(h1),
        .sandbox-rendered :global(.h1) {
          font-size: var(--font-size-7);
          line-height: var(--line-height-7);
          font-weight: 600;
          padding-bottom: var(--default-vertical-spacing);
          color: var(--dark);
        }

        .sandbox-rendered :global(h2),
        .sandbox-rendered :global(.h2) {
          font-size: var(--font-size-5);
          line-height: var(--line-height-5);
          font-weight: 600;
          margin-top: 2.5rem;
          padding-bottom: var(--default-vertical-spacing);
          color: var(--dark);
        }

        .sandbox-rendered :global(h3),
        .sandbox-rendered :global(.h3) {
          font-size: var(--font-size-4);
          line-height: var(--line-height-4);
          font-weight: 600;
          margin-top: 2rem;
          padding-bottom: var(--default-vertical-spacing);
          color: var(--dark);
        }

        .sandbox-rendered :global(h4),
        .sandbox-rendered :global(.h4) {
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          font-weight: 600;
          margin-top: 1rem;
          padding-bottom: var(--default-vertical-spacing);
          color: var(--dark);
        }

        .sandbox-rendered :global(p) {
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          padding-bottom: var(--default-vertical-spacing);
          text-rendering: optimizeLegibility;
          color: var(--dark);
        }

        .sandbox-rendered :global(p:last-child) {
          padding-bottom: 0;
        }

        .sandbox-rendered :global(code) {
          background: var(--code-background);
          border: 1px solid var(--code-border);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: var(--font-size-2);
          font-family: var(--mono);
        }

        .sandbox-rendered :global(pre) {
          background: var(--code-background);
          padding: 0;
          border-radius: 4px;
          overflow-x: auto;
          margin: 0 0 var(--default-vertical-spacing);
        }

        .sandbox-rendered :global(pre code) {
          background: transparent;
          border: none;
          padding: 0;
          font-size: var(--font-size-2);
          line-height: var(--line-height-2);
        }

        .sandbox-rendered :global(hr) {
          border: none;
          border-top: 1px solid var(--code-border);
          margin: 2rem 0;
        }

        .sandbox-rendered :global(strong),
        .sandbox-rendered :global(b) {
          font-weight: 600;
          color: var(--dark);
        }

        .sandbox-rendered :global(ul),
        .sandbox-rendered :global(ol) {
          margin: 0 0 var(--default-vertical-spacing);
          padding-left: 2rem;
        }

        .sandbox-rendered :global(li) {
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          margin-bottom: 0.5rem;
        }

        .sandbox-rendered :global(a) {
          color: var(--dark);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 1px;
        }

        .sandbox-rendered :global(a:hover) {
          opacity: 0.75;
        }

        .sandbox-rendered :global(blockquote) {
          padding-left: 1rem;
          border-left: 2px solid var(--code-border);
          margin: 0 0 var(--default-vertical-spacing);
        }

        .sandbox-rendered :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 0 0 var(--default-vertical-spacing);
        }

        .sandbox-rendered :global(th) {
          text-align: left;
          padding: 0.75rem;
          background: var(--code-background);
          border: 1px solid var(--code-border);
          font-weight: 600;
          font-size: var(--font-size-2);
          color: var(--dark);
        }

        .sandbox-rendered :global(td) {
          padding: 0.75rem;
          border: 1px solid var(--code-border);
          font-size: var(--font-size-2);
          color: var(--dark);
        }

        /* Callout styling */
        .sandbox-rendered :global(.callout) {
          margin: 0 0 var(--default-vertical-spacing);
        }

        /* Fix list items inside paragraphs */
        .sandbox-rendered :global(li p) {
          padding-bottom: 0;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
