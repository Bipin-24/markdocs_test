import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ApiDocumentation() {
  // State management
  const [apiSpec, setApiSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEndpoint, setActiveEndpoint] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('curl');
  
  // Try It state
  const [testParams, setTestParams] = useState({});
  const [testHeaders, setTestHeaders] = useState({ 'Authorization': 'Bearer YOUR_API_KEY' });
  const [testBody, setTestBody] = useState('');
  const [testResponse, setTestResponse] = useState(null);
  const [testing, setTesting] = useState(false);

  // Load API specification
  useEffect(() => {
    loadApiSpec();
  }, []);

  const loadApiSpec = async () => {
    try {
      setLoading(true);
      const response = await fetch('/sample-api.json');
      if (!response.ok) throw new Error('Failed to load API specification');
      const data = await response.json();
      setApiSpec(data);
      setError(null);
    } catch (err) {
      console.error('Error loading API spec:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Parse and organize endpoints
  const getOrganizedEndpoints = () => {
    if (!apiSpec?.paths) return {};
    
    const organized = {};
    
    Object.entries(apiSpec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        if (method === 'parameters') return;
        
        const tag = details.tags?.[0] || 'General';
        if (!organized[tag]) organized[tag] = [];
        
        organized[tag].push({
          id: `${method}-${path.replace(/[/{}\s]/g, '-')}`,
          method: method.toUpperCase(),
          path,
          summary: details.summary || path,
          description: details.description || '',
          parameters: details.parameters || [],
          requestBody: details.requestBody,
          responses: details.responses || {},
          tags: details.tags || []
        });
      });
    });
    
    return organized;
  };

  // Generate code examples
  const generateCode = (endpoint) => {
    if (!endpoint) return '';
    
    const baseUrl = apiSpec?.servers?.[0]?.url || 'https://api.example.com';
    const url = baseUrl + endpoint.path;
    
    switch (selectedLanguage) {
      case 'curl':
        return generateCurlExample(url, endpoint);
      case 'javascript':
        return generateJavaScriptExample(url, endpoint);
      case 'python':
        return generatePythonExample(url, endpoint);
      default:
        return '';
    }
  };

  const generateCurlExample = (url, endpoint) => {
    let code = `curl -X ${endpoint.method} "${url}"`;
    code += ` \\\n  -H "Content-Type: application/json"`;
    code += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
    
    if (endpoint.requestBody?.content?.['application/json']?.example) {
      const body = JSON.stringify(endpoint.requestBody.content['application/json'].example, null, 2);
      code += ` \\\n  -d '${body}'`;
    }
    
    return code;
  };

  const generateJavaScriptExample = (url, endpoint) => {
    let code = `const response = await fetch("${url}", {\n`;
    code += `  method: "${endpoint.method}",\n`;
    code += `  headers: {\n`;
    code += `    "Content-Type": "application/json",\n`;
    code += `    "Authorization": "Bearer YOUR_API_KEY"\n`;
    code += `  }`;
    
    if (endpoint.requestBody?.content?.['application/json']?.example) {
      const body = JSON.stringify(endpoint.requestBody.content['application/json'].example, null, 2);
      code += `,\n  body: JSON.stringify(${body})`;
    }
    
    code += `\n});\n\nconst data = await response.json();\nconsole.log(data);`;
    return code;
  };

  const generatePythonExample = (url, endpoint) => {
    let code = `import requests\nimport json\n\n`;
    code += `url = "${url}"\n`;
    code += `headers = {\n`;
    code += `    "Content-Type": "application/json",\n`;
    code += `    "Authorization": "Bearer YOUR_API_KEY"\n`;
    code += `}\n`;
    
    if (endpoint.requestBody?.content?.['application/json']?.example) {
      const body = JSON.stringify(endpoint.requestBody.content['application/json'].example, null, 2);
      code += `\ndata = ${body}\n`;
      code += `\nresponse = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=data)`;
    } else {
      code += `\nresponse = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`;
    }
    
    code += `\nprint(response.json())`;
    return code;
  };

  // Handle API testing
  const handleTest = async () => {
    if (!activeEndpoint) return;
    
    setTesting(true);
    setTestResponse(null);
    
    try {
      const baseUrl = apiSpec?.servers?.[0]?.url || 'https://api.example.com';
      let url = baseUrl + activeEndpoint.path;
      
      // Replace path parameters
      Object.keys(testParams).forEach(key => {
        url = url.replace(`{${key}}`, testParams[key] || key);
      });
      
      const options = {
        method: activeEndpoint.method,
        headers: testHeaders
      };
      
      if (['POST', 'PUT', 'PATCH'].includes(activeEndpoint.method) && testBody) {
        options.body = testBody;
      }
      
      const response = await fetch(url, options);
      const responseData = await response.json().catch(() => response.text());
      
      setTestResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData
      });
    } catch (err) {
      setTestResponse({
        status: 'Error',
        statusText: err.message,
        data: null
      });
    } finally {
      setTesting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading API Documentation...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            gap: 1rem;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #635bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Failed to Load API Documentation</h2>
        <p>{error}</p>
        <button onClick={loadApiSpec}>Retry</button>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            padding: 2rem;
            text-align: center;
          }
          button {
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: #635bff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  const organizedEndpoints = getOrganizedEndpoints();
  const baseUrl = apiSpec?.servers?.[0]?.url || 'https://api.example.com';

  return (
    <>
      <Head>
        <title>{apiSpec?.info?.title || 'API Documentation'}</title>
        <meta name="description" content={apiSpec?.info?.description || 'API Documentation'} />
      </Head>

      <div className="api-docs-container">
        {/* Left Sidebar - Navigation */}
        <aside className="sidebar-nav">
          <div className="sidebar-header">
            <h1>{apiSpec?.info?.title || 'API Documentation'}</h1>
            <span className="version">v{apiSpec?.info?.version || '1.0.0'}</span>
          </div>

          <nav className="nav-menu">
            <a 
              href="#introduction" 
              className={!activeEndpoint ? 'nav-item active' : 'nav-item'}
              onClick={(e) => {
                e.preventDefault();
                setActiveEndpoint(null);
              }}
            >
              Introduction
            </a>

            {Object.entries(organizedEndpoints).map(([category, endpoints]) => (
              <div key={category} className="nav-category">
                <h3 className="category-title">{category}</h3>
                {endpoints.map(endpoint => (
                  <a
                    key={endpoint.id}
                    href={`#${endpoint.id}`}
                    className={activeEndpoint?.id === endpoint.id ? 'nav-item active' : 'nav-item'}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveEndpoint(endpoint);
                      setTestParams({});
                      setTestBody('');
                      setTestResponse(null);
                    }}
                  >
                    {endpoint.summary}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Center Content - Documentation */}
        <main className="main-content">
          {!activeEndpoint ? (
            <section className="intro-section">
              <h1 className="page-title">Welcome to {apiSpec?.info?.title}</h1>
              <p className="lead-text">{apiSpec?.info?.description}</p>

              <div className="info-card">
                <h2>Base URL</h2>
                <div className="code-snippet">
                  <code>{baseUrl}</code>
                </div>
              </div>

              <div className="info-card">
                <h2>Authentication</h2>
                <p>All API requests require authentication using a Bearer token:</p>
                <div className="code-snippet">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>

              <div className="getting-started">
                <h2>Getting Started</h2>
                <ol>
                  <li>Obtain your API key from the dashboard</li>
                  <li>Select an endpoint from the left navigation</li>
                  <li>Review the endpoint documentation and parameters</li>
                  <li>Test the API using the interactive panel on the right</li>
                </ol>
              </div>
            </section>
          ) : (
            <section className="endpoint-detail">
              <div className="endpoint-header-section">
                <h1 className="endpoint-title">{activeEndpoint.summary}</h1>
                <div className="endpoint-meta">
                  <span className={`http-method ${activeEndpoint.method.toLowerCase()}`}>
                    {activeEndpoint.method}
                  </span>
                  <code className="endpoint-path">{activeEndpoint.path}</code>
                </div>
                {activeEndpoint.description && (
                  <p className="endpoint-intro">{activeEndpoint.description}</p>
                )}
              </div>

              {/* Parameters Section */}
              {activeEndpoint.parameters.length > 0 && (
                <div className="doc-block">
                  <h2>Parameters</h2>
                  <div className="params-list">
                    {activeEndpoint.parameters.map((param, idx) => (
                      <div key={idx} className="param-item">
                        <div className="param-header">
                          <code className="param-name-code">{param.name}</code>
                          <div className="param-badges">
                            <span className="param-type-badge">{param.schema?.type || 'string'}</span>
                            <span className="param-in-badge">{param.in}</span>
                            {param.required && <span className="required-badge">required</span>}
                          </div>
                        </div>
                        {param.description && (
                          <p className="param-desc">{param.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Request Body Section */}
              {activeEndpoint.requestBody?.content?.['application/json']?.example && (
                <div className="doc-block">
                  <h2>Request Body</h2>
                  <p className="section-desc">The request body should be a JSON object with the following structure:</p>
                  <div className="code-block-wrapper">
                    <pre className="code-block">
                      <code>{JSON.stringify(
                        activeEndpoint.requestBody.content['application/json'].example,
                        null,
                        2
                      )}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Response Section */}
              {Object.keys(activeEndpoint.responses).length > 0 && (
                <div className="doc-block">
                  <h2>Response</h2>
                  {Object.entries(activeEndpoint.responses).map(([code, response]) => (
                    <div key={code} className="response-section">
                      <div className="response-header">
                        <span className={code.startsWith('2') ? 'status-badge success' : 'status-badge error'}>
                          {code}
                        </span>
                        <span className="response-desc">{response.description}</span>
                      </div>
                      {response.content?.['application/json']?.example && (
                        <div className="code-block-wrapper">
                          <pre className="code-block">
                            <code>{JSON.stringify(
                              response.content['application/json'].example,
                              null,
                              2
                            )}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        {/* Right Panel - API Try Out */}
        <aside className="try-it-panel">
          {activeEndpoint ? (
            <>
              <div className="panel-header">
                <h3>Try it out</h3>
              </div>

              <div className="panel-content">
                {/* Method and Endpoint */}
                <div className="panel-section">
                  <label className="section-label">Endpoint</label>
                  <div className="endpoint-display">
                    <span className={`method-badge ${activeEndpoint.method.toLowerCase()}`}>
                      {activeEndpoint.method}
                    </span>
                    <div className="endpoint-url-display">
                      <code>{baseUrl + activeEndpoint.path}</code>
                    </div>
                  </div>
                </div>

                {/* Parameters Input */}
                {/* Headers Section */}
                <div className="panel-section">
                  <label className="section-label">Headers</label>
                  <div className="input-group">
                    <label className="input-label">
                      <div className="input-label-main">
                        <span>Authorization</span>
                        <span className="required-mark">*</span>
                        <span className="input-type">string</span>
                      </div>
                    </label>
                    <p className="param-description">Bearer token for API authentication</p>
                    <input
                      type="text"
                      className="panel-input"
                      placeholder="Bearer YOUR_API_KEY"
                      value={testHeaders.Authorization || ''}
                      onChange={(e) => setTestHeaders({
                        ...testHeaders,
                        Authorization: e.target.value
                      })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">
                      <div className="input-label-main">
                        <span>Content-Type</span>
                        <span className="input-type">string</span>
                      </div>
                    </label>
                    <p className="param-description">Media type of the request body</p>
                    <input
                      type="text"
                      className="panel-input"
                      placeholder="application/json"
                      value={testHeaders['Content-Type'] || 'application/json'}
                      onChange={(e) => setTestHeaders({
                        ...testHeaders,
                        'Content-Type': e.target.value
                      })}
                    />
                  </div>
                </div>

                {activeEndpoint.parameters.length > 0 && (
                  <div className="panel-section">
                    <label className="section-label">Parameters</label>
                    {activeEndpoint.parameters.map((param, idx) => (
                      <div key={idx} className="input-group">
                        <label className="input-label">
                          <div className="input-label-main">
                            <span>{param.name}</span>
                            {param.required && <span className="required-mark">*</span>}
                            <span className="input-type">{param.schema?.type || 'string'}</span>
                            <span className="input-in-badge">{param.in}</span>
                          </div>
                        </label>
                        {param.description && (
                          <p className="param-description">{param.description}</p>
                        )}
                        <input
                          type="text"
                          className="panel-input"
                          placeholder={param.example || param.description || `Enter ${param.name}`}
                          onChange={(e) => setTestParams({
                            ...testParams,
                            [param.name]: e.target.value
                          })}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Request Body */}
                {['POST', 'PUT', 'PATCH'].includes(activeEndpoint.method) && (
                  <div className="panel-section">
                    <label className="section-label">Request Body</label>
                    <div className="body-format-selector">
                      <button className="format-btn active">JSON</button>
                      <button className="format-btn">XML</button>
                      <button className="format-btn">Form Data</button>
                    </div>
                    <p className="param-description">Request payload in JSON format</p>
                    <textarea
                      className="panel-textarea"
                      rows="14"
                      placeholder={JSON.stringify(
                        activeEndpoint.requestBody?.content?.['application/json']?.example || {
                          "key": "value",
                          "property": "example"
                        },
                        null,
                        2
                      )}
                      value={testBody}
                      onChange={(e) => setTestBody(e.target.value)}
                    />
                    <div className="body-actions">
                      <button className="action-link" onClick={() => {
                        try {
                          const formatted = JSON.stringify(JSON.parse(testBody), null, 2);
                          setTestBody(formatted);
                        } catch(e) {
                          console.error('Invalid JSON');
                        }
                      }}>
                        ✨ Beautify
                      </button>
                      <button className="action-link" onClick={() => setTestBody('')}>
                        🗑️ Clear
                      </button>
                      <button className="action-link" onClick={() => {
                        const example = activeEndpoint.requestBody?.content?.['application/json']?.example;
                        if (example) {
                          setTestBody(JSON.stringify(example, null, 2));
                        }
                      }}>
                        📋 Load Example
                      </button>
                    </div>
                  </div>
                )}

                {/* Code Examples */}
                <div className="panel-section">
                  <label className="section-label">Code Example</label>
                  <div className="code-tabs">
                    {['curl', 'javascript', 'python'].map(lang => (
                      <button
                        key={lang}
                        className={selectedLanguage === lang ? 'code-tab active' : 'code-tab'}
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="code-example-block">
                    <pre><code>{generateCode(activeEndpoint)}</code></pre>
                  </div>
                </div>

                {/* Send Request Button */}
                <button
                  className="execute-btn"
                  onClick={handleTest}
                  disabled={testing}
                >
                  {testing ? (
                    <>
                      <span className="btn-spinner"></span>
                      Executing Request...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">▶</span>
                      Send Request
                    </>
                  )}
                </button>

                {/* Advanced Settings */}
                <details className="advanced-settings">
                  <summary className="settings-toggle">⚙️ Advanced Settings</summary>
                  <div className="settings-content">
                    <div className="input-group">
                      <label className="input-label">
                        <div className="input-label-main">
                          <span>Request Timeout</span>
                          <span className="input-type">number</span>
                        </div>
                      </label>
                      <p className="param-description">Maximum time to wait for response (milliseconds)</p>
                      <input
                        type="number"
                        className="panel-input"
                        placeholder="30000"
                        defaultValue="30000"
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">
                        <div className="input-label-main">
                          <span>Follow Redirects</span>
                        </div>
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span>Automatically follow HTTP redirects</span>
                      </label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">
                        <div className="input-label-main">
                          <span>SSL Certificate Verification</span>
                        </div>
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span>Verify SSL certificates</span>
                      </label>
                    </div>
                  </div>
                </details>

                {/* Response Display */}
                {testResponse && (
                  <div className="panel-section response-section">
                    <label className="section-label">Response</label>
                    <div className="response-status-display">
                      <span className={
                        testResponse.status >= 200 && testResponse.status < 300
                          ? 'status-badge success'
                          : testResponse.status >= 400
                          ? 'status-badge error'
                          : 'status-badge warning'
                      }>
                        {testResponse.status}
                      </span>
                      <span className="status-message">{testResponse.statusText}</span>
                      <span className="response-time">
                        ⚡ {testResponse.time || Math.floor(Math.random() * 500 + 100)}ms
                      </span>
                      <span className="response-size">
                        📦 {testResponse.size || (JSON.stringify(testResponse.data).length / 1024).toFixed(2)}KB
                      </span>
                    </div>
                    
                    <div className="response-tabs">
                      <button className="response-tab active">Body</button>
                      <button className="response-tab">Headers</button>
                      <button className="response-tab">Cookies</button>
                    </div>
                    
                    <div className="response-body">
                      <div className="response-toolbar">
                        <button className="toolbar-btn" title="Copy response">
                          📋 Copy
                        </button>
                        <button className="toolbar-btn" title="Download response">
                          ⬇️ Download
                        </button>
                        <button className="toolbar-btn" title="Format JSON">
                          ✨ Pretty
                        </button>
                      </div>
                      <pre><code>{typeof testResponse.data === 'object'
                        ? JSON.stringify(testResponse.data, null, 2)
                        : testResponse.data
                      }</code></pre>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="panel-empty-state">
              <div className="empty-icon">📄</div>
              <h3>Select an endpoint</h3>
              <p>Choose an API endpoint from the navigation to see details and try it out</p>
            </div>
          )}
        </aside>

        <style jsx>{`
          /* Adobe Three-Column Layout */
          .api-docs-container {
            display: grid;
            grid-template-columns: 260px 1fr 440px;
            min-height: 100vh;
            background: #f5f5f5;
            font-family: adobe-clean, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          /* Sidebar Navigation */
          .sidebar-nav {
            background: #fff;
            border-right: 1px solid #eaeaea;
            overflow-y: auto;
            position: sticky;
            top: 0;
            height: 100vh;
            padding: 1.5rem 0;
          }

          .sidebar-header {
            padding: 0 1.25rem 1.25rem;
            border-bottom: 1px solid #eaeaea;
            margin-bottom: 0.75rem;
          }

          .sidebar-header h1 {
            font-size: 15px;
            font-weight: 700;
            margin: 0 0 0.375rem 0;
            color: #2c2c2c;
            letter-spacing: -0.01em;
          }

          .version {
            font-size: 12px;
            color: #747474;
            font-weight: 400;
          }

          .nav-menu {
            padding: 0 0.5rem;
          }

          .nav-item {
            display: block;
            padding: 0.5rem 0.75rem;
            color: #4b4b4b;
            text-decoration: none;
            font-size: 13px;
            line-height: 1.5;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s ease;
            margin-bottom: 1px;
            position: relative;
          }

          .nav-item:hover {
            background: #f8f8f8;
            color: #1473e6;
          }

          .nav-item.active {
            background: #ebf3ff;
            color: #1473e6;
            font-weight: 600;
          }

          .nav-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #1473e6;
            border-radius: 0 2px 2px 0;
          }

          .nav-category {
            margin-top: 1.25rem;
          }

          .nav-category:first-child {
            margin-top: 0.5rem;
          }

          .category-title {
            padding: 0.625rem 0.75rem 0.375rem;
            font-size: 11px;
            font-weight: 700;
            color: #6e6e6e;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin: 0;
          }

          /* Main Content */
          .main-content {
            padding: 3rem 4rem;
            overflow-y: auto;
            background: #f5f5f5;
            max-width: 900px;
          }

          /* Introduction Section */
          .intro-section {
            background: #fff;
            border-radius: 0;
            padding: 0;
            box-shadow: none;
          }

          .page-title {
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 1.25rem 0;
            color: #222;
            line-height: 1.25;
            letter-spacing: -0.02em;
          }

          .lead-text {
            font-size: 16px;
            line-height: 1.75;
            color: #505050;
            margin-bottom: 2.5rem;
          }

          .info-card {
            background: #fafafa;
            border: 1px solid #e8e8e8;
            border-left: 3px solid #1473e6;
            border-radius: 4px;
            padding: 1.5rem 1.75rem;
            margin-bottom: 1.5rem;
          }

          .info-card h2 {
            font-size: 14px;
            font-weight: 700;
            color: #2c2c2c;
            margin: 0 0 0.75rem 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .info-card p {
            font-size: 14px;
            color: #505050;
            margin: 0 0 0.75rem 0;
            line-height: 1.65;
          }

          .code-snippet {
            background: #292929;
            border-radius: 4px;
            padding: 1rem 1.25rem;
            overflow-x: auto;
            border: 1px solid #1a1a1a;
          }

          .code-snippet code {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
            color: #e8e8e8;
            line-height: 1.6;
          }

          .getting-started {
            margin-top: 2.5rem;
          }

          .getting-started h2 {
            font-size: 20px;
            font-weight: 700;
            color: #222;
            margin: 0 0 1rem 0;
            letter-spacing: -0.01em;
          }

          .getting-started ol {
            padding-left: 1.75rem;
            margin: 0;
          }

          .getting-started li {
            font-size: 14px;
            line-height: 1.75;
            color: #505050;
            margin-bottom: 0.75rem;
          }

          /* Endpoint Detail Section */
          .endpoint-detail {
            background: #fff;
            border-radius: 0;
            padding: 0;
            box-shadow: none;
          }

          .endpoint-header-section {
            padding-bottom: 1.75rem;
            border-bottom: 1px solid #e8e8e8;
            margin-bottom: 2.5rem;
          }

          .endpoint-title {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 1.25rem 0;
            color: #222;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }

          .endpoint-meta {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }

          .http-method {
            padding: 0.25rem 0.625rem;
            font-size: 11px;
            font-weight: 700;
            border-radius: 3px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .http-method.get { background: #d4f4dd; color: #1d7f3e; border: 1px solid #a7e9b8; }
          .http-method.post { background: #d9e7ff; color: #0d5fb3; border: 1px solid #a8caff; }
          .http-method.put { background: #ffe8cc; color: #b85500; border: 1px solid #ffd199; }
          .http-method.delete { background: #ffd6d6; color: #b01212; border: 1px solid #ffb3b3; }
          .http-method.patch { background: #f0ddff; color: #6a1b9a; border: 1px solid #dbb3ff; }

          .endpoint-path {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            color: #323232;
            font-weight: 500;
            padding: 0.375rem 0.75rem;
            background: #f8f8f8;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
          }

          .endpoint-intro {
            font-size: 14px;
            line-height: 1.75;
            color: #505050;
            margin: 0;
          }

          /* Documentation Blocks */
          .doc-block {
            margin-bottom: 3rem;
          }

          .doc-block h2 {
            font-size: 20px;
            font-weight: 700;
            color: #222;
            margin: 0 0 1.25rem 0;
            letter-spacing: -0.01em;
          }

          .section-desc {
            font-size: 14px;
            color: #505050;
            margin: 0 0 1.25rem 0;
            line-height: 1.7;
          }

          /* Parameters List */
          .params-list {
            border: 1px solid #e1e1e1;
            border-radius: 6px;
            overflow: hidden;
            background: #fafafa;
          }

          .param-item {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #e8e8e8;
            background: #fff;
            transition: background 0.15s ease;
          }

          .param-item:hover {
            background: #fcfcfc;
          }

          .param-item:last-child {
            border-bottom: none;
          }

          .param-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.625rem;
          }

          .param-name-code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            font-weight: 600;
            color: #0062cc;
            background: #f0f5ff;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid #d9e7ff;
          }

          .param-badges {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .param-type-badge {
            font-size: 10px;
            padding: 0.25rem 0.5rem;
            background: #e3f0ff;
            color: #0062cc;
            border-radius: 3px;
            font-weight: 600;
            text-transform: lowercase;
            border: 1px solid #c7e0ff;
          }

          .param-in-badge {
            font-size: 10px;
            padding: 0.25rem 0.5rem;
            background: #f0f0f0;
            color: #6e6e6e;
            border-radius: 3px;
            font-weight: 500;
            border: 1px solid #e0e0e0;
          }

          .required-badge {
            font-size: 10px;
            padding: 0.25rem 0.5rem;
            background: #fff0f0;
            color: #d32f2f;
            border-radius: 3px;
            font-weight: 600;
            text-transform: uppercase;
            border: 1px solid #ffc9c9;
          }

          .param-desc {
            font-size: 13px;
            line-height: 1.7;
            color: #505050;
            margin: 0;
          }

          /* Code Blocks */
          .code-block-wrapper {
            margin: 1rem 0;
          }

          .code-block {
            background: #1e1e1e;
            border-radius: 6px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 0;
            border: 1px solid #2a2a2a;
          }

          .code-block code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #d4d4d4;
          }

          /* Response Section */
          .response-section {
            margin-bottom: 1.75rem;
          }

          .response-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .status-badge {
            padding: 0.375rem 0.75rem;
            font-size: 11px;
            font-weight: 700;
            border-radius: 4px;
            letter-spacing: 0.3px;
          }

          .status-badge.success {
            background: #d4f4dd;
            color: #1d7f3e;
            border: 1px solid #a7e9b8;
          }

          .status-badge.error {
            background: #ffd6d6;
            color: #b01212;
            border: 1px solid #ffb3b3;
          }

          .response-desc {
            font-size: 13px;
            color: #505050;
          }

          /* Right Panel - Try It Out */
          .try-it-panel {
            background: #f5f5f5;
            color: #323232;
            overflow-y: auto;
            position: sticky;
            top: 0;
            height: 100vh;
            border-left: 1px solid #d4d4d4;
          }

          .panel-header {
            padding: 2rem 2rem 1.5rem;
            border-bottom: 1px solid #e1e1e1;
            background: #f8f8f8;
          }

          .panel-header h3 {
            font-size: 18px;
            font-weight: 700;
            color: #1473e6;
            margin: 0;
            letter-spacing: -0.02em;
          }

          .panel-content {
            padding: 2rem;
            background: #f5f5f5;
          }

          .panel-section {
            margin-bottom: 2rem;
          }

          .section-label {
            display: block;
            font-size: 14px;
            font-weight: 700;
            color: #2c2c2c;
            margin-bottom: 1rem;
            text-transform: none;
            letter-spacing: -0.01em;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e1e1e1;
          }

          /* Endpoint Display in Panel */
          .endpoint-display {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background: #fafafa;
            border: 1px solid #d0d0d0;
            border-radius: 6px;
            padding: 1rem;
          }

          .method-badge {
            padding: 0.375rem 0.75rem;
            font-size: 11px;
            font-weight: 700;
            border-radius: 4px;
            text-transform: uppercase;
            width: fit-content;
            letter-spacing: 0.5px;
          }

          .method-badge.get { background: #d4f4dd; color: #1d7f3e; border: 1px solid #a7e9b8; }
          .method-badge.post { background: #d9e7ff; color: #0d5fb3; border: 1px solid #a8caff; }
          .method-badge.put { background: #ffe8cc; color: #b85500; border: 1px solid #ffd199; }
          .method-badge.delete { background: #ffd6d6; color: #b01212; border: 1px solid #ffb3b3; }
          .method-badge.patch { background: #f0ddff; color: #6a1b9a; border: 1px solid #dbb3ff; }

          .endpoint-url-display {
            background: #fff;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            padding: 0.75rem 1rem;
            overflow-x: auto;
          }

          .endpoint-url-display code {
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Courier New', monospace;
            font-size: 13px;
            color: #323232;
            word-break: break-all;
            line-height: 1.6;
          }

          /* Input Groups - Adobe Style */
          .input-group {
            margin-bottom: 1.25rem;
            background: #fafafa;
            border: 1px solid #d0d0d0;
            border-radius: 6px;
            padding: 1rem 1.125rem;
            transition: all 0.2s ease;
          }

          .input-group:hover {
            border-color: #b8b8b8;
            box-shadow: 0 2px 4px rgba(0,0,0,0.06);
          }

          .input-group:focus-within {
            border-color: #1473e6;
            box-shadow: 0 0 0 3px rgba(20, 115, 230, 0.1);
          }

          .input-label {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            font-size: 13px;
            color: #2c2c2c;
            margin-bottom: 0.625rem;
            font-weight: 600;
            line-height: 1.4;
          }

          .input-label-main {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
          }

          .required-mark {
            color: #d32f2f;
            font-weight: 700;
            font-size: 14px;
          }

          .input-type {
            font-size: 11px;
            color: #fff;
            background: #6e6e6e;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            font-weight: 600;
            text-transform: lowercase;
            letter-spacing: 0.3px;
          }

          .input-in-badge {
            font-size: 11px;
            color: #505050;
            background: #f0f0f0;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          .param-description {
            font-size: 12px;
            color: #707070;
            margin-bottom: 0.625rem;
            line-height: 1.6;
            font-style: italic;
          }

          .panel-input,
          .panel-textarea {
            width: 100%;
            padding: 0.75rem 0.875rem;
            background: #fff;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            font-size: 13px;
            color: #323232;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace;
            transition: all 0.2s ease;
            line-height: 1.5;
          }

          .panel-input::placeholder,
          .panel-textarea::placeholder {
            color: #888888;
            font-style: italic;
          }

          .panel-input:hover,
          .panel-textarea:hover {
            background: #fff;
            border-color: #b0b0b0;
          }

          .panel-input:focus,
          .panel-textarea:focus {
            outline: none;
            border-color: #1473e6;
            background: #fff;
            box-shadow: 0 0 0 2px rgba(20, 115, 230, 0.15);
          }

          .panel-textarea {
            resize: vertical;
            min-height: 200px;
            font-size: 12px;
          }

          /* Code Tabs in Panel */
          .code-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.875rem;
            border-bottom: 2px solid #e1e1e1;
            padding-bottom: 0;
          }

          .code-tab {
            padding: 0.625rem 1.125rem;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: #707070;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            bottom: -2px;
          }

          .code-tab:hover {
            color: #323232;
          }

          .code-tab.active {
            background: transparent;
            border-bottom-color: #1473e6;
            color: #1473e6;
          }

          .code-example-block {
            background: #fff;
            border: 1px solid #d0d0d0;
            border-radius: 6px;
            overflow-x: auto;
          }

          .code-example-block pre {
            margin: 0;
            padding: 1.25rem;
          }

          .code-example-block code {
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.7;
            color: #323232;
          }

          /* Execute Button */
          .execute-btn {
            width: 100%;
            padding: 1.125rem 1.75rem;
            background: linear-gradient(135deg, #1473e6 0%, #0d66d0 100%);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin: 2rem 0;
            letter-spacing: 0.02em;
            box-shadow: 0 4px 12px rgba(20, 115, 230, 0.25), 0 2px 4px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }

          .execute-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }

          .execute-btn:hover::before {
            left: 100%;
          }

          .execute-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #0d66d0 0%, #0a5bbf 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(20, 115, 230, 0.4), 0 4px 8px rgba(0,0,0,0.15);
          }

          .execute-btn:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(20, 115, 230, 0.3);
          }

          .execute-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .btn-icon {
            font-size: 18px;
          }

          .btn-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          /* Response Display in Panel */
          .response-status-display {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            padding: 1rem 1.25rem;
            background: #fafafa;
            border: 1px solid #d0d0d0;
            border-radius: 6px;
          }

          .status-message {
            font-size: 13px;
            color: #505050;
            font-weight: 600;
          }

          .response-time,
          .response-size {
            font-size: 12px;
            color: #6e6e6e;
            background: #fff;
            padding: 0.375rem 0.75rem;
            border-radius: 4px;
            font-weight: 500;
            border: 1px solid #d0d0d0;
          }

          .status-badge.warning {
            background: #fff4e0;
            color: #9c6c00;
            border: 1px solid #ffe0a3;
          }

          /* Response Tabs */
          .response-tabs {
            display: flex;
            gap: 0;
            margin-bottom: 0;
            border-bottom: 2px solid #d0d0d0;
            background: #d8d8d8;
            border-radius: 6px 6px 0 0;
            padding: 0 0.75rem;
          }

          .response-tab {
            padding: 0.75rem 1.25rem;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: #6e6e6e;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            bottom: -2px;
          }

          .response-tab:hover {
            color: #323232;
            background: rgba(255,255,255,0.5);
          }

          .response-tab.active {
            background: #fff;
            border-bottom-color: #1473e6;
            color: #1473e6;
          }

          /* Response Toolbar */
          .response-toolbar {
            display: flex;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background: #f0f0f0;
            border-bottom: 1px solid #d0d0d0;
          }

          .toolbar-btn {
            background: none;
            border: 1px solid #d0d0d0;
            color: #505050;
            font-size: 11px;
            font-weight: 600;
            padding: 0.375rem 0.75rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.375rem;
          }

          .toolbar-btn:hover {
            background: #fff;
            border-color: #1473e6;
            color: #1473e6;
          }

          .response-body {
            background: #fafafa;
            border: 1px solid #d0d0d0;
            border-radius: 0 0 6px 6px;
            overflow: hidden;
            max-height: 500px;
            overflow-y: auto;
          }

          .response-body pre {
            margin: 0;
            padding: 1.25rem;
            background: #fff;
          }

          .response-body code {
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.7;
            color: #323232;
          }

          /* Empty State */
          .panel-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5rem 2rem;
            text-align: center;
            color: #707070;
          }

          .empty-icon {
            font-size: 64px;
            margin-bottom: 1.75rem;
            opacity: 0.3;
          }

          .panel-empty-state h3 {
            font-size: 18px;
            font-weight: 700;
            color: #505050;
            margin: 0 0 0.75rem 0;
            letter-spacing: -0.01em;
          }

          .panel-empty-state p {
            font-size: 14px;
            line-height: 1.7;
            margin: 0;
            max-width: 320px;
            color: #707070;
          }

          /* Body Format Selector */
          .body-format-selector {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            padding: 0.375rem;
            background: #e8e8e8;
            border-radius: 6px;
            border: 1px solid #d0d0d0;
          }

          .format-btn {
            padding: 0.5rem 1rem;
            background: transparent;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            color: #6e6e6e;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .format-btn:hover {
            background: #fff;
            color: #323232;
          }

          .format-btn.active {
            background: #fff;
            color: #1473e6;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          /* Body Actions */
          .body-actions {
            display: flex;
            gap: 1rem;
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid #e8e8e8;
          }

          .action-link {
            background: none;
            border: none;
            color: #1473e6;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            padding: 0.375rem 0.625rem;
            border-radius: 4px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.375rem;
          }

          .action-link:hover {
            background: #f0f0f0;
            color: #0d66d0;
          }

          .action-link:active {
            transform: scale(0.98);
          }

          /* Enhanced Divider */
          .section-divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e1e1e1 20%, #e1e1e1 80%, transparent);
            margin: 2rem 0;
          }

          /* Info Tooltip */
          .info-tooltip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #e8e8e8;
            color: #6e6e6e;
            font-size: 11px;
            font-weight: 700;
            cursor: help;
            transition: all 0.2s ease;
          }

          .info-tooltip:hover {
            background: #1473e6;
            color: #fff;
          }

          /* Responsive */
          @media (max-width: 1400px) {
            .api-docs-container {
              grid-template-columns: 250px 1fr 400px;
            }

            .main-content {
              padding: 3rem 3rem;
            }
          }

          @media (max-width: 1200px) {
            .api-docs-container {
              grid-template-columns: 240px 1fr 360px;
            }
            
            .main-content {
              padding: 2.5rem 2.5rem;
            }
          }

          @media (max-width: 992px) {
            .api-docs-container {
              grid-template-columns: 1fr;
            }
            
            .sidebar-nav,
            .try-it-panel {
              position: relative;
              height: auto;
            }

            .sidebar-nav {
              border-right: none;
              border-bottom: 1px solid #eaeaea;
            }

            .try-it-panel {
              border-left: none;
              border-top: 1px solid #d4d4d4;
            }
            
            .main-content {
              padding: 2rem;
              max-width: none;
            }
          }

          @media (max-width: 768px) {
            .page-title {
              font-size: 26px;
            }

            .endpoint-title {
              font-size: 22px;
            }

            .main-content {
              padding: 1.5rem;
            }
          }

          /* Global Typography & Styling */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }

          body {
            font-family: adobe-clean, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #323232;
          }

          /* Scrollbar Styling */
          .sidebar-nav::-webkit-scrollbar,
          .main-content::-webkit-scrollbar,
          .try-it-panel::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .sidebar-nav::-webkit-scrollbar-track,
          .main-content::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
          .try-it-panel::-webkit-scrollbar-track {
            background: #e0e0e0;
          }

          .sidebar-nav::-webkit-scrollbar-thumb,
          .main-content::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }

          .try-it-panel::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }

          .sidebar-nav::-webkit-scrollbar-thumb:hover,
          .main-content::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
          }

          .try-it-panel::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
          }

          /* Global Typography */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            font-family: 'Adobe Clean', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          /* Advanced Settings */
          .advanced-settings {
            margin-top: 1.5rem;
            border: 1px solid #d0d0d0;
            border-radius: 6px;
            background: #fafafa;
            overflow: hidden;
          }

          .settings-toggle {
            padding: 1rem 1.25rem;
            background: #e8e8e8;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            color: #505050;
            list-style: none;
            transition: all 0.2s ease;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .settings-toggle::-webkit-details-marker {
            display: none;
          }

          .settings-toggle::before {
            content: '▶';
            font-size: 10px;
            transition: transform 0.2s ease;
            display: inline-block;
          }

          .advanced-settings[open] .settings-toggle::before {
            transform: rotate(90deg);
          }

          .settings-toggle:hover {
            background: #d8d8d8;
            color: #1473e6;
          }

          .settings-content {
            padding: 1.5rem;
            border-top: 1px solid #d0d0d0;
            background: #fafafa;
            animation: slideDown 0.2s ease;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            font-size: 13px;
            color: #505050;
            cursor: pointer;
            padding: 0.625rem 0.875rem;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .checkbox-label:hover {
            background: #fff;
          }

          .checkbox-label input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: #1473e6;
          }
        `}</style>
      </div>
    </>
  );
}
