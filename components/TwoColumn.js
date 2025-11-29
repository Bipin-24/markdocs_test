import * as React from 'react';

export function TwoColumn({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="two-column-box">
      <div className="col-left">{first}</div>
      <div className="col-right">{rest}</div>
      <style jsx>
        {`
          .two-column-box {
            background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
            border-radius: 16px;
            padding: 1.5rem 2.5rem;
            margin: 2rem auto;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2.5rem;
            align-items: center;
            max-width: var(--landing-page-max-width);
          }

          .col-left :global(h3) {
            margin: 0;
            padding: 0;
          }

          .col-right {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .col-right :global(p) {
            margin: 0;
            padding: 0;
          }

          .col-right :global(.primary) {
            align-self: flex-start;
          }

          @media (max-width: 900px) {
            .two-column-box {
              grid-template-columns: 1fr;
              padding: 1.5rem;
              gap: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
}
