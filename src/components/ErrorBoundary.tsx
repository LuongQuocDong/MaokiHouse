import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center p-5"
          style={{ minHeight: '60vh' }}
        >
          <h2 className="font-display mb-3" style={{ color: 'var(--color-ink)' }}>
            Something went wrong
          </h2>
          <p className="text-muted mb-4">Please reload the page. If the problem persists, contact the administrator.</p>
          <button type="button" className="pill-btn" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
