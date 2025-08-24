import React from 'react';

/**
 * ErrorBoundary: catches render errors under Admin/Account areas so the UI
 * doesn't appear blank. Renders a friendly message + error detail in dev.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Something went wrong.</h2>
          <p className="text-sm text-gray-600">
            Please try again or contact support.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {String(this.state.error?.message || this.state.error)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
