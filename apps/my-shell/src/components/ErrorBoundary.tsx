import React, { Component, ErrorInfo } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error or send it to an error tracking service
    console.error("Error loading microfrontend:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div>Error loading the microfrontend. Please try again later.</div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
