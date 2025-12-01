import React from 'react';
import { useRouter } from 'next/router';
import { TableOfContents } from './Shell/TableOfContents';
import { Feedback } from './Feedback';
import { PrevNext } from './Shell/PrevNext';

export function Document({ toc = [], children }) {
  const router = useRouter();
  
  // Exclude feedback from landing page and sandbox pages
  const excludedPaths = ['/', '/sandbox'];
  const showFeedback = !excludedPaths.includes(router.pathname);
  const showPrevNext = !excludedPaths.includes(router.pathname);
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <article style={{ flex: 1 }}>
        {children}
        {showPrevNext && <PrevNext />}
        {showFeedback && <Feedback />}
      </article>
      <aside style={{ marginLeft: '2rem' }}>
        <TableOfContents toc={toc} />
      </aside>
    </div>
  );
}
