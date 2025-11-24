import React from 'react';
import { TableOfContents } from './Shell/TableOfContents';

export function Document({ toc = [], children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <article style={{ flex: 1 }}>{children}</article>
      <aside style={{ marginLeft: '2rem' }}>
        <TableOfContents toc={toc} />
      </aside>
    </div>
  );
}
