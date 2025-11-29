import * as React from 'react';
import Link from 'next/link';

export function QuickStart() {
  return (
    <div className="quickstart-container">
      <div className="quickstart-section">
        <h2>Get started quickly</h2>
        <p>Choose your path to integrate with our platform</p>
      </div>

      <div className="quickstart-grid">
        <Link href="/docs/getting-started" className="quickstart-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Quick Start</h3>
          <p>Get up and running in minutes with our step-by-step guide</p>
          <span className="card-arrow">→</span>
        </Link>

        <Link href="/docs/api" className="quickstart-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>API Reference</h3>
          <p>Explore our complete API documentation and endpoints</p>
          <span className="card-arrow">→</span>
        </Link>

        <Link href="/sandbox" className="quickstart-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Try It Out</h3>
          <p>Test APIs and explore features in our interactive sandbox</p>
          <span className="card-arrow">→</span>
        </Link>

        <Link href="/docs/examples" className="quickstart-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Examples</h3>
          <p>Learn from real-world examples and sample projects</p>
          <span className="card-arrow">→</span>
        </Link>
      </div>

      <style jsx>{`
        .quickstart-container {
          margin: 3rem 0;
        }

        .quickstart-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .quickstart-section h2 {
          font-size: var(--font-size-6);
          margin-bottom: 0.75rem;
          margin-top: 0;
        }

        .quickstart-section p {
          font-size: var(--font-size-4);
          color: var(--black-light);
          margin: 0;
        }

        .quickstart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .quickstart-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          background: var(--light);
          border: 1px solid var(--code-border);
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .quickstart-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue), var(--purple));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .quickstart-card:hover {
          border-color: var(--blue);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }

        .quickstart-card:hover::before {
          transform: scaleX(1);
        }

        .quickstart-card:hover .card-arrow {
          transform: translateX(4px);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gray-light);
          border-radius: 10px;
          margin-bottom: 1.25rem;
          color: var(--blue);
        }

        .quickstart-card h3 {
          font-size: var(--font-size-4);
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .quickstart-card p {
          font-size: var(--font-size-2);
          color: var(--black-light);
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }

        .card-arrow {
          display: inline-block;
          margin-top: 1rem;
          font-size: 24px;
          color: var(--blue);
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .quickstart-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
