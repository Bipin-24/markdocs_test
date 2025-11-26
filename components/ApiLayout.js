import React from 'react';

export function ApiLayout({ children }) {
  return (
    <div className="api-layout">
      <div className="api-content">
        {children}
      </div>
      <style jsx>{`
        .api-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 100%;
          margin: 0;
        }

        .api-content {
          grid-column: 1 / -1;
          display: contents;
        }

        @media (max-width: 1024px) {
          .api-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export function ApiSection({ children, title, id }) {
  return (
    <div className="api-section" id={id}>
      {title && <h2 className="api-section-title">{title}</h2>}
      <div className="api-section-content">
        {children}
      </div>
      <style jsx>{`
        .api-section {
          grid-column: 1 / -1;
          display: contents;
        }

        .api-section-title {
          grid-column: 1;
          font-size: var(--font-size-5);
          line-height: var(--line-height-5);
          font-weight: 600;
          margin: 2.5rem 0 var(--default-vertical-spacing);
          color: var(--dark);
          color: var(--black);
        }

        .api-section-content {
          grid-column: 1 / -1;
          display: contents;
        }
      `}</style>
    </div>
  );
}

export function ApiDescription({ children }) {
  return (
    <div className="api-description">
      {children}
      <style jsx>{`
        .api-description {
          grid-column: 1;
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          color: var(--dark);
          padding-right: 2rem;
        }

        .api-description :global(h3) {
          font-size: var(--font-size-4);
          line-height: var(--line-height-4);
          font-weight: 600;
          margin: 2rem 0 var(--default-vertical-spacing);
          color: var(--dark);
        }

        .api-description :global(h4) {
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          font-weight: 600;
          margin: 1rem 0 var(--default-vertical-spacing);
          color: var(--dark);
        }

        .api-description :global(p) {
          padding-bottom: var(--default-vertical-spacing);
        }

        .api-description :global(p:last-child) {
          padding-bottom: 0;
        }

        .api-description :global(ul) {
          margin: var(--default-vertical-spacing) 0;
          padding-left: 1.5rem;
        }

        .api-description :global(li) {
          margin: 0.5rem 0;
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
        }

        .api-description :global(code) {
          background: var(--code-background);
          border: 1px solid var(--code-border);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: var(--font-size-2);
          font-family: var(--mono);
        }

        .api-description :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .api-description :global(th) {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 2px solid var(--code-border);
          font-weight: 600;
          font-size: var(--font-size-2);
          color: var(--dark);
        }

        .api-description :global(td) {
          padding: 0.75rem;
          border-bottom: 1px solid var(--code-background);
          font-size: var(--font-size-2);
        }

        @media (max-width: 1024px) {
          .api-description {
            grid-column: 1;
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function ApiCode({ children, title }) {
  return (
    <div className="api-code-block">
      {title && <div className="api-code-title">{title}</div>}
      <div className="api-code-content">
        {children}
      </div>
      <style jsx>{`
        .api-code-block {
          grid-column: 2;
          position: sticky;
          top: 2rem;
          align-self: start;
          background: var(--light);
          border: 1px solid var(--code-border);
          border-radius: 4px;
          overflow: hidden;
          margin: 0 0 2rem 0;
        }

        .api-code-title {
          padding: 0.75rem 1rem;
          font-size: var(--font-size-2);
          font-weight: 600;
          color: var(--dark);
          background: var(--code-background);
          border-bottom: 1px solid var(--code-border);
        }

        .api-code-content {
          padding: 0;
        }

        .api-code-content :global(pre) {
          margin: 0;
          background: var(--code-background);
          border-radius: 0;
        }

        .api-code-content :global(code) {
          font-size: var(--font-size-2);
          line-height: var(--line-height-2);
          font-family: var(--mono);
        }

        @media (max-width: 1024px) {
          .api-code-block {
            grid-column: 1;
            position: relative;
            top: 0;
            margin: 1rem 0 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}

export function ApiEndpoint({ method, path, description }) {
  const methodColors = {
    GET: 'var(--green)',
    POST: 'var(--blue)',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
    PATCH: 'var(--purple)'
  };

  return (
    <div className="api-endpoint">
      <div className="api-endpoint-header">
        <span className="api-method" style={{ color: methodColors[method] }}>
          {method}
        </span>
        <code className="api-path">{path}</code>
      </div>
      {description && <p className="api-endpoint-description">{description}</p>}
      <style jsx>{`
        .api-endpoint {
          grid-column: 1;
          margin: 2rem 0 1rem;
          padding: 1rem;
          background: var(--code-background);
          border: 1px solid var(--code-border);
          border-radius: 4px;
        }

        .api-endpoint-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .api-method {
          font-weight: 700;
          font-size: var(--font-size-2);
          font-family: var(--mono);
        }

        .api-path {
          font-family: var(--mono);
          font-size: var(--font-size-2);
          background: var(--light);
          border: 1px solid var(--code-border);
          padding: 4px 8px;
          border-radius: 4px;
          color: var(--dark);
        }

        .api-endpoint-description {
          margin-top: 0.75rem;
          font-size: var(--font-size-2);
          line-height: var(--line-height-2);
          color: var(--dark);
        }

        @media (max-width: 1024px) {
          .api-endpoint {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function ApiParameters({ children }) {
  return (
    <div className="api-parameters">
      <h4>Parameters</h4>
      <div className="api-parameters-list">
        {children}
      </div>
      <style jsx>{`
        .api-parameters {
          grid-column: 1;
          margin: 1.5rem 0;
        }

        .api-parameters h4 {
          font-size: var(--font-size-3);
          line-height: var(--line-height-3);
          font-weight: 600;
          margin: 0 0 1rem;
          color: var(--dark);
        }

        .api-parameters-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

export function ApiParameter({ name, type, required, description, children }) {
  return (
    <div className="api-parameter">
      <div className="api-parameter-header">
        <code className="api-parameter-name">{name}</code>
        {type && <span className="api-parameter-type">{type}</span>}
        {required && <span className="api-parameter-required">required</span>}
      </div>
      <div className="api-parameter-description">
        {description || children}
      </div>
      <style jsx>{`
        .api-parameter {
          padding-left: 1rem;
          border-left: 2px solid var(--code-border);
        }

        .api-parameter-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .api-parameter-name {
          font-family: var(--mono);
          font-size: var(--font-size-2);
          font-weight: 600;
          color: var(--dark);
          background: transparent;
        }

        .api-parameter-type {
          font-size: var(--font-size-2);
          color: var(--dark);
          opacity: 0.7;
          font-style: italic;
        }

        .api-parameter-required {
          font-size: var(--font-size-1);
          color: #ef4444;
          font-weight: 600;
          text-transform: uppercase;
        }

        .api-parameter-description {
          font-size: var(--font-size-2);
          line-height: var(--line-height-2);
          color: var(--dark);
        }

        .api-parameter-description :global(code) {
          background: var(--code-background);
          border: 1px solid var(--code-border);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: var(--font-size-1);
          font-family: var(--mono);
        }
      `}</style>
    </div>
  );
}
