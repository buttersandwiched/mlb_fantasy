import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
            <h1>Something went wrong.</h1>
        </div>
      );

    }
    return this.props.children;
  }
}

export default ErrorBoundary;