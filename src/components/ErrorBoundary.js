import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // You can also log the error to an error reporting service here
    if (typeof window !== 'undefined') {
      // Send to error tracking service (e.g., Sentry, LogRocket)
      console.error('Stack:', errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #f5222d',
          borderRadius: '4px',
          backgroundColor: '#fff2f0',
          color: '#000'
        }}>
          <h2 style={{ color: '#f5222d' }}>⚠️ Application Error</h2>
          <p>Sorry, something went wrong. Please try refreshing the page.</p>
          <details style={{
            whiteSpace: 'pre-wrap',
            marginTop: '10px',
            fontSize: '12px',
            color: '#666'
          }}>
            <summary>Error Details (for debugging)</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => {
              // Reload the page
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
