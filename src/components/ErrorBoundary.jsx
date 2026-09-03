import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Arcube ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#192420] text-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#141e1a] border border-[#D0AE89]/40 flex items-center justify-center text-[#D0AE89] mb-4 text-xl font-display">
            A
          </div>
          <h1 className="text-2xl font-display font-light mb-2 text-[#F5F0E8]">ARCUBE</h1>
          <p className="text-sm text-[#cfc8bc] mb-6 max-w-sm">
            Something unexpected occurred while rendering. Tap below to reload.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-sm bg-[#D0AE89] text-[#192420] text-xs font-medium tracking-wider uppercase transition-all"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
