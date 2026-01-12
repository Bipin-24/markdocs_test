import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Intelligent Platform',
    links: [
      { href: '/docs/overview', children: 'Introduction' },
    ]
  },
  {
    title: 'Get started',
    links: [
      { href: '/docs/Getting_Started/zeenea-supported-browsers', children: 'Supported Browsers' },
      { href: '/docs/Getting_Started/copyright', children: 'Copyright' },
      { href: '/docs/zeenea-definitions', children: 'Definitions' },
      {
        href: '/docs/Getting_Started/your-first-steps',
        children: 'Your First Steps',
        sublinks: [
          { href: '/docs/zeenea-superadmin', children: 'Super Admin' },
          { href: '/docs/zeenea-data-steward', children: 'Data Steward' },
          { href: '/docs/zeenea-data-explorer', children: 'Data Explorer' }
        ]
      },
    ]
  },
  {
    title: 'Features',
    links: [
      {
        href: '/docs/New_files/zeenea-administration',
        children: 'Zeenea Administration',
        sublinks: [
          { href: '/docs/Zeenea_Administration/zeenea-managing-users', children: 'Manage Users' },
          { href: '/docs/Zeenea_Administration/zeenea-managing-groups', children: 'Manage Groups' },
        ]
      },
       {
        href: '/docs/New_files/zeenea-studio',
        children: 'Zeenea Studio',
        sublinks: [
          { href: '/docs/Zeenea_Studio/zeenea-studio-overview', children: 'Studio Overview' }
        ]
      },
      {
        href: '/docs/New_files/zeenea-explorer',
        children: 'Zeenea Explorer',
        sublinks: [
          { href: '/docs/Zeenea_Explorer/zeenea-explorer-overview', children: 'Explorer Overview' }
        ]
      },
    ]
  },
  {
    title: 'Integrations',
    links: [
      {
        href: '/docs/New_files/scanners',
        children: 'Scanners',
        sublinks: [
          { href: '/docs/Scanners/zeenea-scanner-setup', children: 'Scanner Setup' },
      
        ]
      },
       {
        href: '/docs/New_files/connectors',
        children: 'Connectors',
        sublinks: [
          { href: '/docs/zeenea-connector-looker', children: 'Looker' },
          { href: '/docs/zeenea-connectors-list', children: 'List' },
          { href: '/docs/zeenea-dataset-detection', children: 'Dataset' },
        ]
      },
      {
        href: '/docs/New_files/api',
        children: 'APIs',
        sublinks: [
          { href: '/docs/zeenea-access-request-api', children: 'Access Request' },
          { href: '/docs/zeenea-catalog-design-api', children: 'Catalog Design' },
          { href: '/docs/zeenea-data-product-api', children: 'Data Product' },
          { href: '/docs/zeenea-graphql-api-v2-limitations', children: 'GraphQL' },
        ]
      },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs/markdoc-features-guide', children: '📚 Markdoc Features Guide' },
      { href: '/docs/quick-links', children: '🔗 Quick Links' },
      { href: '/docs/diagrams-and-visualization', children: '🎨 Diagrams & Visualization' },
    ]
  },
];

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>

          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;

              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link href={link.href}>{link.children}</Link>

                  {/* Render sublinks */}
                  {link.sublinks && (
                    <ul className="sub-level">
                      {link.sublinks.map((sub) => {
                        const subActive = router.pathname === sub.href;
                        return (
                          <li key={sub.href} className={subActive ? 'active' : ''}>
                            <Link href={sub.href}>{sub.children}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--nav-height);
            height: calc(100vh - var(--nav-height));
            flex: 0 0 240px;
            overflow-y: auto;
            padding: 2rem 0 2rem 2rem;
          }

          h3 {
            font-weight: 500;
            margin: 0.5rem 0 0;
            padding-bottom: 0.5rem;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          li {
            list-style-type: none;
            margin: 0 0 0.7rem 0.7rem;
            font-size: 14px;
            font-weight: 400;
          }

          li a {
            text-decoration: none;
          }

          li a:hover,
          li.active > a {
            text-decoration: underline;
          }

          /* --- SUB-LEVEL STYLING --- */
          .sub-level {
            margin-top: 0.3rem;
            margin-left: 1rem;
            padding-left: 0.5rem;
            border-left: 1px solid var(--gray-medium);
          }

          .sub-level li {
            margin: 0.35rem 0;
            font-size: 13px;
            font-weight: 300;
          }

          .sub-level li.active > a {
            font-weight: 400;
            text-decoration: underline;
          }

          @media screen and (max-width: 600px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}

