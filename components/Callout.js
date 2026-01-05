import * as React from 'react';

import { Icon } from './Icon';

const TYPE_MAP = {
  note: {
    icon: 'information-circle',
    iconColor: '#0066cc',
    backgroundColor: '#e6f2ff',
    borderColor: '#b3d9ff',
    textColor: '#1a1a1a'
  },
  warning: {
    icon: 'warning',
    iconColor: '#d97917',
    backgroundColor: '#fff4e6',
    borderColor: '#ffd699',
    textColor: '#1a1a1a'
  },
  check: {
    icon: 'checkmark-circle',
    iconColor: '#0a993e',
    backgroundColor: '#e6f7ed',
    borderColor: '#b3e6cc',
    textColor: '#1a1a1a'
  },
  error: {
    icon: 'warning',
    iconColor: '#ed5f74',
    backgroundColor: '#ffebee',
    borderColor: '#ffcdd2',
    textColor: '#1a1a1a'
  },
  important: {
    icon: 'warning',
    iconColor: '#7c3aed',
    backgroundColor: '#f3e8ff',
    borderColor: '#d8b4fe',
    textColor: '#1a1a1a'
  },
  caution: {
    icon: 'warning',
    iconColor: '#ea580c',
    backgroundColor: '#fff7ed',
    borderColor: '#fed7aa',
    textColor: '#1a1a1a'
  }
};

export function Callout({ title, children, type }) {
  const { icon, iconColor, backgroundColor, borderColor, textColor } = TYPE_MAP[type] || TYPE_MAP.note;

  return (
    <div className="callout">
      <div className="flex content">
        <div className="flex icon">
          <Icon icon={icon} color={iconColor} />
        </div>
        <div className="flex column">
          <strong>{title}</strong>
          <span>{children}</span>
        </div>
      </div>
      <style jsx>
        {`
          .callout {
            padding: 0.5rem 0 2rem;
          }
          .content {
            color: ${textColor};
            background: ${backgroundColor};
            border: 1px solid ${borderColor};
            line-height: 20px;
            padding: 12px 20px;
            border-radius: 4px;
          }
          .icon {
            padding-right: 8px;
            align-items: center;
          }
          .callout :global(p:first-of-type) {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
