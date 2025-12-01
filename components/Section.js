import * as React from 'react';
import { useRouter } from 'next/router';

export function Section({ children, className }) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If className is provided, it's a landing page section (e.g., .hero, .value-props)
  // Only apply docs grid layout if no className AND we're on a docs page
  const isDocsCardGrid = !className && mounted && router.pathname.startsWith('/docs');

  // If it's a docs page without className, render as a grid of cards
  if (isDocsCardGrid) {
    return (
      <div className="docs-section">
        <div className="docs-grid">
          {children}
        </div>
        <style jsx>
          {`
            .docs-section {
              margin: 1.5rem 0;
            }

            .docs-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 1rem;
              width: 100%;
            }

            @media screen and (max-width: 768px) {
              .docs-grid {
                grid-template-columns: 1fr;
                gap: 0.875rem;
              }
            }

            @media screen and (min-width: 769px) and (max-width: 1024px) {
              .docs-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
          `}
        </style>
      </div>
    );
  }

  // Default behavior for landing pages
  return (
    <div className={['section', className].filter(Boolean).join(' ')}>
      <section>{children}</section>
      <style jsx>
        {`
          div {
            width: 100%;
            background: var(--light);
            padding: 60px 0 70px;
          }
          
          div.hero {
            padding-bottom: 20px;
          }
          
          div.value-props {
            padding-top: 10px;
          }
          
          section {
            margin: 0 auto;
            max-width: var(--landing-page-max-width);
          }
          @media screen and (max-width: 1000px) {
            div {
              padding: 3rem 0 3.5rem;
            }
            
            div.hero {
              padding-bottom: 1rem;
            }
            
            div.value-props {
              padding-top: 0.5rem;
            }
          }
          @media screen and (max-width: 600px) {
            div {
              padding: 2.5rem 0 2.5rem;
            }
          }
        `}
      </style>
    </div>
  );
}
