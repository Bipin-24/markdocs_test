import * as React from 'react';
import { useState } from 'react';

export function ApiTryIt({ 
  endpoint = '/api/example', 
  method = 'GET',
  description = 'Try this API endpoint',
  parameters = [],
  // headers prop is available for future use
  body = null
}) {
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [url, setUrl] = useState(endpoint);
  const [params, setParams] = useState({});
  const [requestHeaders, setRequestHeaders] = useState({});
  const [requestBody, setRequestBody] = useState(body ? JSON.stringify(body, null, 2) : '');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('params');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);

    try {
      // Build URL with query parameters for GET requests
      let fullUrl = url;
      if (selectedMethod === 'GET' && Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        fullUrl = `${url}?${queryString}`;
      }

      const options = {
        method: selectedMethod,
        headers: {
          'Content-Type': 'application/json',
          ...requestHeaders
        }
      };

      if (['POST', 'PUT', 'PATCH'].includes(selectedMethod) && requestBody) {
        options.body = requestBody;
      }

      const startTime = Date.now();
      const res = await fetch(fullUrl, options);
      const endTime = Date.now();
      
      const data = await res.json().catch(() => ({}));

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: data,
        time: endTime - startTime
      });
    } catch (error) {
      setResponse({
        error: true,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const getMethodColor = (m) => {
    const colors = {
      GET: '#0073e6',
      POST: '#0a993e',
      PUT: '#ff9500',
      PATCH: '#9333ea',
      DELETE: '#e60000'
    };
    return colors[m] || '#666';
  };

  return (
    <div className="api-tryit">
      <div className="tryit-header">
        <h4>Try it out</h4>
        <p>{description}</p>
      </div>

      <div className="tryit-request">
        <div className="request-line">
          <select 
            value={selectedMethod} 
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="method-select"
            style={{ color: getMethodColor(selectedMethod) }}
          >
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            placeholder="Enter endpoint URL"
          />
          <button 
            onClick={handleSendRequest} 
            disabled={loading}
            className="send-btn"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className="tabs">
          <button 
            className={activeTab === 'params' ? 'active' : ''} 
            onClick={() => setActiveTab('params')}
          >
            Parameters
          </button>
          <button 
            className={activeTab === 'headers' ? 'active' : ''} 
            onClick={() => setActiveTab('headers')}
          >
            Headers
          </button>
          {['POST', 'PUT', 'PATCH'].includes(selectedMethod) && (
            <button 
              className={activeTab === 'body' ? 'active' : ''} 
              onClick={() => setActiveTab('body')}
            >
              Body
            </button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'params' && (
            <div className="params-editor">
              {parameters.length > 0 ? (
                parameters.map(param => (
                  <div key={param.name} className="param-row">
                    <label>{param.name}</label>
                    <input
                      type="text"
                      placeholder={param.description || param.name}
                      value={params[param.name] || ''}
                      onChange={(e) => setParams({...params, [param.name]: e.target.value})}
                    />
                    {param.required && <span className="required">*</span>}
                  </div>
                ))
              ) : (
                <p className="empty-state">No parameters required</p>
              )}
            </div>
          )}

          {activeTab === 'headers' && (
            <div className="headers-editor">
              <textarea
                placeholder={'{\n  "Authorization": "Bearer YOUR_TOKEN",\n  "Custom-Header": "value"\n}'}
                value={JSON.stringify(requestHeaders, null, 2)}
                onChange={(e) => {
                  try {
                    setRequestHeaders(JSON.parse(e.target.value));
                  } catch(err) {
                    // Invalid JSON, ignore
                  }
                }}
                rows={6}
              />
            </div>
          )}

          {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(selectedMethod) && (
            <div className="body-editor">
              <textarea
                placeholder={'{\n  "key": "value"\n}'}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={10}
              />
            </div>
          )}
        </div>
      </div>

      {response && (
        <div className="tryit-response">
          <div className="response-header">
            <h4>Response</h4>
            {!response.error && (
              <div className="response-meta">
                <span className={`status status-${Math.floor(response.status / 100)}xx`}>
                  {response.status} {response.statusText}
                </span>
                <span className="time">{response.time}ms</span>
              </div>
            )}
          </div>
          <pre className="response-body">
            {response.error ? (
              <span className="error">{response.message}</span>
            ) : (
              JSON.stringify(response.data, null, 2)
            )}
          </pre>
        </div>
      )}

      <style jsx>{`
        .api-tryit {
          margin: 2rem 0;
          border: 1px solid var(--code-border);
          border-radius: 12px;
          overflow: hidden;
          background: var(--light);
        }

        .tryit-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--code-border);
          background: var(--gray-light);
        }

        .tryit-header h4 {
          margin: 0 0 0.5rem 0;
          font-size: var(--font-size-4);
        }

        .tryit-header p {
          margin: 0;
          font-size: var(--font-size-2);
          color: var(--black-light);
        }

        .tryit-request {
          padding: 1.5rem;
        }

        .request-line {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .method-select {
          padding: 10px 16px;
          border: 1px solid var(--code-border);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          background: var(--light);
          cursor: pointer;
          min-width: 100px;
        }

        .url-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid var(--code-border);
          border-radius: 6px;
          font-size: 14px;
          font-family: var(--mono);
          background: var(--light);
          color: var(--text);
        }

        .url-input:focus {
          outline: none;
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(0, 115, 230, 0.1);
        }

        .send-btn {
          padding: 10px 24px;
          background: var(--blue);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 100px;
        }

        .send-btn:hover:not(:disabled) {
          background: #0060c0;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--code-border);
          margin-bottom: 1rem;
        }

        .tabs button {
          padding: 8px 16px;
          border: none;
          background: none;
          font-size: 14px;
          color: var(--black-light);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .tabs button:hover {
          color: var(--text);
        }

        .tabs button.active {
          color: var(--blue);
          border-bottom-color: var(--blue);
          font-weight: 600;
        }

        .tab-content {
          min-height: 150px;
        }

        .params-editor, .headers-editor, .body-editor {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .param-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .param-row label {
          min-width: 150px;
          font-size: 14px;
          font-weight: 500;
        }

        .param-row input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--code-border);
          border-radius: 4px;
          font-size: 14px;
          background: var(--light);
          color: var(--text);
        }

        .param-row .required {
          color: var(--magenta);
          font-weight: bold;
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          color: var(--black-light);
          font-size: 14px;
        }

        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--code-border);
          border-radius: 6px;
          font-family: var(--mono);
          font-size: 13px;
          line-height: 1.5;
          resize: vertical;
          background: var(--code-background);
          color: var(--text);
        }

        textarea:focus {
          outline: none;
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(0, 115, 230, 0.1);
        }

        .tryit-response {
          border-top: 1px solid var(--code-border);
          background: var(--code-background);
        }

        .response-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--code-border);
        }

        .response-header h4 {
          margin: 0;
          font-size: var(--font-size-3);
        }

        .response-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .status {
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-2xx {
          background: #d4f8d4;
          color: #0a993e;
        }

        .status-4xx, .status-5xx {
          background: #ffe0e0;
          color: #e60000;
        }

        .time {
          font-size: 12px;
          color: var(--black-light);
          font-family: var(--mono);
        }

        .response-body {
          padding: 1.5rem;
          margin: 0;
          font-family: var(--mono);
          font-size: 13px;
          line-height: 1.6;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .error {
          color: var(--magenta);
        }

        @media (max-width: 768px) {
          .request-line {
            flex-direction: column;
          }

          .param-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .param-row label {
            min-width: auto;
          }

          .param-row input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
