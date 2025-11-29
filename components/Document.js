import React from 'react';
import { useRouter } from 'next/router';
import { TableOfContents } from './Shell/TableOfContents';
import { Feedback } from './Feedback';

export function Document({ toc = [], children }) {
  const router = useRouter();
  
  // Exclude feedback from landing page and sandbox pages
  const excludedPaths = ['/', '/sandbox'];
  const showFeedback = !excludedPaths.includes(router.pathname);
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <article style={{ flex: 1 }}>
        {children}
        {showFeedback && <Feedback />}
      </article>
      <aside style={{ marginLeft: '2rem' }}>
        <TableOfContents toc={toc} />
      </aside>
    </div>
  );
}
