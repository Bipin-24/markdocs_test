import * as React from 'react';

export function Section({ children, className }) {
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
