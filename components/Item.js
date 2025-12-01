import * as React from 'react';
import Link from 'next/link';
import { Ascii } from './Ascii';

export function Item({ icon, href, title, children, ...props }) {
  // If href and title are provided (for docs card links), render as a card link
  if (href && title) {
    return (
      <Link href={href} className="item-card-link">
        <div className="item-card">
          <h3 className="item-title">{title}</h3>
          {children && <p className="item-description">{children}</p>}
          <span className="item-arrow">→</span>
          
          <style jsx>
            {`
              .item-card {
                position: relative;
                padding: 1.25rem;
                border: 1px solid var(--gray-medium);
                border-radius: 8px;
                background: var(--white);
                transition: all 0.2s ease;
                height: 100%;
                display: flex;
                flex-direction: column;
              }

              .dark .item-card {
                background: var(--black-light);
                border-color: var(--gray-dark);
              }

              .item-card:hover {
                border-color: var(--blue);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
              }

              .dark .item-card:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              }

              .item-title {
                margin: 0 0 0.5rem 0;
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--dark);
                line-height: 1.4;
              }

              .dark .item-title {
                color: var(--light);
              }

              .item-card:hover .item-title {
                color: var(--blue);
              }

              .item-description {
                margin: 0;
                font-size: 0.9375rem;
                color: var(--gray);
                line-height: 1.6;
                flex-grow: 1;
              }

              .dark .item-description {
                color: var(--gray-light);
              }

              .item-arrow {
                position: absolute;
                top: 1.25rem;
                right: 1.25rem;
                font-size: 1.25rem;
                color: var(--gray);
                transition: transform 0.2s ease;
              }

              .item-card:hover .item-arrow {
                color: var(--blue);
                transform: translateX(4px);
              }

              :global(.item-card-link) {
                text-decoration: none;
                display: block;
              }

              @media screen and (max-width: 768px) {
                .item-card {
                  padding: 1rem;
                }

                .item-title {
                  font-size: 1rem;
                  margin-right: 1.5rem;
                }

                .item-description {
                  font-size: 0.875rem;
                }

                .item-arrow {
                  top: 1rem;
                  right: 1rem;
                  font-size: 1.125rem;
                }
              }
            `}
          </style>
        </div>
      </Link>
    );
  }

  // Default behavior for landing page items
  return (
    <>
      {icon && <Ascii primary={icon} />}
      <div {...props}>{children}</div>
    </>
  );
}
