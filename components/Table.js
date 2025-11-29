import React from 'react';

export function Table({ children }) {
  return (
    <div className="table-container">
      {children}
      <style jsx>{`
        .table-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
        }
        
        .table-container :global(ul) {
          display: contents;
        }
        
        .table-container :global(li) {
          list-style: none;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .table-container :global(li > *:first-child) {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .table-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
