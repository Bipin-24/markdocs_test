/* global Prism */
import 'prismjs';

import * as React from 'react';
import copy from 'copy-to-clipboard';

import { Icon } from './Icon';

Prism.languages.markdoc = {
  tag: {
    pattern: /{%(.|\n)*?%}/i,
    inside: {
      tagType: {
        pattern: /^({%\s*\/?)(\w|-)*\b/i,
        lookbehind: true
      },
      id: /#(\w|-)*\b/,
      string: /".*?"/,
      equals: /=/,
      number: /\b\d+\b/i,
      variable: {
        pattern: /\$[\w.]+/i,
        inside: {
          punctuation: /\./i
        }
      },
      function: /\b\w+(?=\()/,
      punctuation: /({%|\/?%})/i,
      boolean: /false|true/
    }
  },
  variable: {
    pattern: /\$\w+/i
  },
  function: {
    pattern: /\b\w+(?=\()/i
  }
};

export function Code({ children, 'data-language': language }) {
  const [copied, setCopied] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current, false);
    }
  }, [children]);

  React.useEffect(() => {
    if (copied) {
      copy(ref.current.innerText);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied]);

  const lang = language === 'md' ? 'markdoc' : language || 'markdoc';

  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];

  return (
    <div className="code" aria-live="polite">
      <pre
        // Prevents "Failed to execute 'removeChild' on 'Node'" error
        // https://stackoverflow.com/questions/54880669/react-domexception-failed-to-execute-removechild-on-node-the-node-to-be-re
        key={children}
        ref={ref}
        className={`language-${lang}`}
        data-line-numbers={lines.length}
      >
        <code className={`language-${lang}`}>{children}</code>
      </pre>
      {isMounted && (
        <div className="line-numbers-gutter" aria-hidden="true">
          {lines.map((_, i) => (
            <div key={i} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setCopied(true)}>
        <Icon icon={copied ? 'copied' : 'copy'} />
      </button>
      <style jsx>
        {`
          .code {
            position: relative;
            display: flex;
          }
          .line-numbers-gutter {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 45px;
            background: rgba(0, 0, 0, 0.2);
            border-right: 1px solid rgba(255, 255, 255, 0.15);
            padding: 16px 8px;
            text-align: right;
            user-select: none;
            pointer-events: none;
            overflow: hidden;
          }
          .line-number {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 13px;
            line-height: 20px;
            color: #8892a6;
            display: block;
          }
          .code pre {
            padding-left: 60px !important;
            margin: 0 !important;
            flex: 1;
          }
          .code button {
            appearance: none;
            position: absolute;
            color: #e3e8ef;
            background: rgba(255, 255, 255, 0.1);
            top: ${lines.length === 1 ? '17px' : '13px'};
            right: 11px;
            padding: 6px 8px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
          }
          .code button:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
        `}
      </style>
    </div>
  );
}
