import { promises as fs } from 'fs';
import path from 'path';
import Head from 'next/head';

export default function FeedbackViewer({ feedback, error }) {
  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Feedback Viewer</h1>
        <p style={{ color: 'red' }}>Error loading feedback: {error}</p>
      </div>
    );
  }

  const totalFeedback = feedback.length;
  const helpfulCount = feedback.filter(f => f.helpful).length;
  const notHelpfulCount = feedback.filter(f => !f.helpful).length;
  const withComments = feedback.filter(f => f.comment && f.comment.trim() !== '').length;

  // Group feedback by page
  const feedbackByPage = feedback.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = [];
    }
    acc[item.page].push(item);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Feedback Viewer - Documentation Feedback</title>
      </Head>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>📊 User Feedback Dashboard</h1>
        
        {/* Summary Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a2540' }}>
              {totalFeedback}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Total Responses</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a993e' }}>
              {helpfulCount}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Helpful ({totalFeedback > 0 ? Math.round(helpfulCount / totalFeedback * 100) : 0}%)</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
              {notHelpfulCount}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Not Helpful ({totalFeedback > 0 ? Math.round(notHelpfulCount / totalFeedback * 100) : 0}%)</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#635bff' }}>
              {withComments}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>With Comments</div>
          </div>
        </div>

        {/* Feedback by Page */}
        <h2 style={{ marginBottom: '1rem' }}>Feedback by Page</h2>
        {Object.keys(feedbackByPage).length === 0 ? (
          <p style={{ color: '#425466', fontStyle: 'italic' }}>No feedback yet. Be the first to provide feedback!</p>
        ) : (
          Object.entries(feedbackByPage).map(([page, items]) => {
            const pageHelpful = items.filter(f => f.helpful).length;
            const pageTotal = items.length;
            
            return (
              <div key={page} style={{ 
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'white',
                border: '1px solid #e3e8ee',
                borderRadius: '8px'
              }}>
                <h3 style={{ 
                  marginBottom: '0.5rem',
                  color: '#0a2540'
                }}>
                  {page}
                </h3>
                <div style={{ 
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  color: '#425466'
                }}>
                  {pageHelpful} of {pageTotal} found helpful ({pageTotal > 0 ? Math.round(pageHelpful / pageTotal * 100) : 0}%)
                </div>
                
                {/* Individual feedback items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map((item, index) => (
                    <div key={index} style={{ 
                      padding: '1rem',
                      background: '#f6f9fc',
                      borderRadius: '6px',
                      borderLeft: `4px solid ${item.helpful ? '#0a993e' : '#dc3545'}`
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ 
                          fontWeight: 'bold',
                          color: item.helpful ? '#0a993e' : '#dc3545'
                        }}>
                          {item.helpful ? '👍 Helpful' : '👎 Not Helpful'}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#425466' }}>
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      
                      {item.comment && item.comment.trim() !== '' && (
                        <div style={{ 
                          marginTop: '0.5rem',
                          padding: '0.75rem',
                          background: 'white',
                          borderRadius: '4px',
                          fontStyle: 'italic',
                          color: '#0a2540'
                        }}>
                          &ldquo;{item.comment}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const feedbackFile = path.join(dataDir, 'feedback.json');
    
    try {
      const data = await fs.readFile(feedbackFile, 'utf8');
      const feedback = JSON.parse(data);
      
      // Sort by timestamp, newest first
      feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      return {
        props: {
          feedback,
          error: null
        }
      };
    } catch (error) {
      // File doesn't exist yet
      return {
        props: {
          feedback: [],
          error: null
        }
      };
    }
  } catch (error) {
    return {
      props: {
        feedback: [],
        error: error.message
      }
    };
  }
}
