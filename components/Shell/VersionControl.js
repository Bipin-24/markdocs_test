import React from 'react';
import { AppLink as Link } from '../AppLink';

export function VersionControl() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedVersion, setSelectedVersion] = React.useState('latest');
  const dropdownRef = React.useRef(null);

  const versions = [
    { value: 'latest', label: '1.0', url: '/docs/overview', external: false },
    { value: 'v2.4.0', label: '2.0v', url: '/docs/overview?version=2.4.0', external: false },
    { value: 'v2.3.0', label: '2.2v', url: 'https://tirthanportal.vercel.app/', external: true },
    { value: 'v2.2.0', label: '2.4v', url: '/docs/overview?version=2.2.0', external: false },
    { value: 'v2.1.0', label: '3.0v', url: 'https://example.com/v2.1.0/docs', external: true }
  ];


  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleVersionClick = (value) => {
    setSelectedVersion(value);
    setIsOpen(false);
  };

  return (
    <div className="version-control" ref={dropdownRef}>
      <button 
        className="version-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select documentation version"
        aria-expanded={isOpen}
      >
        <span className="version-label">Ver.</span>

      </button>
      
      {isOpen && (
        <div className="version-dropdown">
          {versions.map((version) => (
            version.external ? (
              <a
                key={version.value}
                href={version.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`version-option ${version.value === selectedVersion ? 'active' : ''}`}
                onClick={() => handleVersionClick(version.value)}
              >
                {version.label}
              </a>
            ) : (
              <Link
                key={version.value}
                href={version.url}
                className={`version-option ${version.value === selectedVersion ? 'active' : ''}`}
                onClick={() => handleVersionClick(version.value)}
              >
                {version.label}
              </Link>
            )
          ))}
        </div>
      )}
      
      <style jsx>{`
        .version-control {
          position: relative;
          display: flex;
          align-items: center;
        }

        .version-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          font-size: 15px;
          font-weight: 400;
          color: var(--text);
          cursor: pointer;
          padding: 0;
          font-family: var(--sans);
        }

        .version-trigger:hover {
          opacity: 1;
        }

        /* Prevent primary link arrow from appearing */
        :global(.primary) .version-trigger::after {
          content: none !important;
        }

        .version-label {
          font-size: 15px;
          font-weight: 600;
          color: #0066cc;
        }

        .version-number {
          font-size: 15px;
          font-weight: 600;
          color: #0066cc;
        }

        .version-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--light);
          border: 1px solid var(--gray-medium);
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 6px 0;
          min-width: 120px;
          z-index: 1000;
        }

        :global(.dark) .version-dropdown {
          background: var(--black-medium);
          border-color: var(--black-light);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .version-dropdown :global(.version-option) {
          display: block;
          padding: 8px 16px;
          font-size: 14px;
          color: var(--text);
          text-decoration: none;
          transition: background 150ms ease;
        }

        /* Prevent arrows from appearing in dropdown */
        .version-dropdown :global(.version-option::after) {
          content: none !important;
        }

        .version-dropdown :global(a.version-option::after) {
          content: none !important;
        }

        .version-dropdown :global(.version-option:hover) {
          background: var(--gray-light);
          opacity: 1;
        }

        :global(.dark) .version-dropdown :global(.version-option:hover) {
          background: var(--black-light);
        }

        .version-dropdown :global(.version-option.active) {
          background: var(--gray-light);
          font-weight: 500;
        }

        :global(.dark) .version-dropdown :global(.version-option.active) {
          background: var(--black-light);
        }
      `}</style>
    </div>
  );
}
