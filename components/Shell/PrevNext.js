import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Define all pages in order - this creates the navigation sequence
const navigationOrder = [
  // Intelligent Platform
  { href: '/docs/overview', title: 'Introduction' },
  
  // Get started
  { href: '/docs/Getting_Started/zeenea-supported-browsers', title: 'Supported Browsers' },
  { href: '/docs/Getting_Started/copyright', title: 'Copyright' },
  { href: '/docs/zeenea-definitions', title: 'Definitions' },
  { href: '/docs/Getting_Started/your-first-steps', title: 'Your First Steps' },
  { href: '/docs/zeenea-superadmin', title: 'Super Admin' },
  { href: '/docs/zeenea-data-steward', title: 'Data Steward' },
  { href: '/docs/zeenea-data-explorer', title: 'Data Explorer' },
  
  // Features - Zeenea Administration
  { href: '/docs/New_files/zeenea-administration', title: 'Zeenea Administration' },
  { href: '/docs/Zeenea_Administration/zeenea-managing-users', title: 'Manage Users' },
  { href: '/docs/Zeenea_Administration/zeenea-managing-groups', title: 'Manage Groups' },
  
  // Features - Zeenea Studio
  { href: '/docs/New_files/zeenea-studio', title: 'Zeenea Studio' },
  { href: '/docs/Zeenea_Studio/zeenea-studio-overview', title: 'Studio Overview' },
  
  // Features - Zeenea Explorer
  { href: '/docs/New_files/zeenea-explorer', title: 'Zeenea Explorer' },
  { href: '/docs/Zeenea_Explorer/zeenea-explorer-overview', title: 'Explorer Overview' },
  
  // Integrations - Scanners
  { href: '/docs/New_files/scanners', title: 'Scanners' },
  { href: '/docs/Scanners/zeenea-scanner-setup', title: 'Scanner Setup' },
  
  // Integrations - Connectors
  { href: '/docs/New_files/connectors', title: 'Connectors' },
  { href: '/docs/zeenea-connector-looker', title: 'Looker' },
  { href: '/docs/zeenea-connectors-list', title: 'List' },
  { href: '/docs/zeenea-dataset-detection', title: 'Dataset' },
  
  // Integrations - APIs
  { href: '/docs/New_files/apis', title: 'APIs' },
  { href: '/docs/zeenea-access-request-api', title: 'Access Request API' },
  { href: '/docs/zeenea-catalog-design-api', title: 'Catalog Design API' },
  { href: '/docs/zeenea-data-product-api', title: 'Data Product API' },
  { href: '/docs/zeenea-graphql-api-v2-limitations', title: 'GraphQL' },
  
  // Markdoc - Additional
  { href: '/docs/syntax', title: 'Syntax and schema' },
  { href: '/docs/nodes', title: 'Nodes Introduction' },
  { href: '/docs/attributes', title: 'Attributes Examples' },
  
  // Resources
  { href: '/docs/markdoc-features-guide', title: 'Markdoc Features Guide' },
  { href: '/docs/quick-links', title: 'Quick Links' },
  { href: '/docs/diagrams-and-visualization', title: 'Diagrams & Visualization' },
];

export function PrevNext() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Find current page index
  const currentIndex = navigationOrder.findIndex(page => page.href === currentPath);

  // If page not found in navigation order, don't show navigation
  if (currentIndex === -1) {
    return null;
  }

  const prevPage = currentIndex > 0 ? navigationOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < navigationOrder.length - 1 ? navigationOrder[currentIndex + 1] : null;

  // If neither prev nor next exists, don't render anything
  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <nav className="prev-next-nav">
      <div className="prev-next-container">
        {prevPage ? (
          <Link href={prevPage.href} className="prev-link">
            <div className="nav-card prev">
              <span className="nav-label">← Previous</span>
              <span className="nav-title">{prevPage.title}</span>
            </div>
          </Link>
        ) : (
          <div /> // Empty div to maintain spacing
        )}
        
        {nextPage ? (
          <Link href={nextPage.href} className="next-link">
            <div className="nav-card next">
              <span className="nav-label">Next →</span>
              <span className="nav-title">{nextPage.title}</span>
            </div>
          </Link>
        ) : (
          <div /> // Empty div to maintain spacing
        )}
      </div>

      <style jsx>
        {`
          .prev-next-nav {
            margin: 3rem 0 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--gray-medium);
          }

          .prev-next-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.875rem;
            width: 100%;
          }

          .prev-next-container :global(a) {
            text-decoration: none;
          }

          .nav-card {
            display: flex;
            flex-direction: column;
            padding: 0.875rem 1rem;
            border: 1px solid var(--gray-medium);
            border-radius: 6px;
            transition: all 0.2s ease;
            background: var(--gray-light);
            min-height: 60px;
          }

          .dark .nav-card {
            background: rgba(255, 255, 255, 0.03);
            border-color: var(--gray-dark);
          }

          .nav-card:hover {
            border-color: var(--blue);
            background: var(--white);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transform: translateY(-1px);
          }

          .dark .nav-card:hover {
            background: var(--black-light);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .nav-card.prev {
            text-align: left;
          }

          .nav-card.next {
            text-align: right;
          }

          .nav-label {
            display: block;
            font-size: 0.75rem;
            font-weight: 500;
            color: var(--gray);
            margin-bottom: 0.375rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .nav-title {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--dark);
            line-height: 1.3;
          }

          .dark .nav-title {
            color: var(--light);
          }

          .nav-card:hover .nav-title {
            color: var(--blue);
          }

          @media screen and (max-width: 768px) {
            .prev-next-nav {
              padding-top: 1rem;
              margin: 2rem 0 1rem;
            }

            .prev-next-container {
              grid-template-columns: 1fr;
              gap: 0.625rem;
            }

            .nav-card {
              padding: 0.75rem 0.875rem;
              min-height: 55px;
            }

            .nav-card.next {
              text-align: left;
            }

            .nav-label {
              font-size: 0.6875rem;
              margin-bottom: 0.25rem;
            }

            .nav-title {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </nav>
  );
}
