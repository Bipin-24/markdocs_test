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
      { href: '/docs/zeenea-superadmin', children: 'Super Admin' },
      { href: '/docs/zeenea-data-steward', children: 'Data Steward' },
      { href: '/docs/zeenea-data-explorer', children: 'Data Explorer' },
      { href: '/docs/zeenea-definitions', children: 'Definitions' }
    ]
  },
  {
    title: 'Features & Applications',
    links: [
      {
        href: '/docs/syntax',
        children: 'Syntax and schema',
        sublinks: [
          { href: '/docs/nodes', children: 'Introduction' },
          { href: '/docs/attributes', children: 'Examples' }
        ]
      },
    ]
  },
  {
    title: 'APIs',
    links: [
      { href: '/docs/zeenea-access-request-api', children: 'Access Request' },
      { href: '/docs/zeenea-catalog-design-api', children: 'Catalog Design' },
      { href: '/docs/zeenea-data-product-api', children: 'Data Product' },
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

