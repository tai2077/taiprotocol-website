import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ errorInfo });
        this.props.onError?.(error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, rgba(255, 60, 60, 0.05) 0%, transparent 100%)',
                    border: '1px solid rgba(255, 60, 60, 0.2)',
                    borderRadius: '8px',
                    margin: '20px',
                    color: '#ff6b6b',
                    fontFamily: 'monospace'
                }}>
                    <h3 style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        letterSpacing: '0.1em'
                    }}>
                        [!] SYSTEM_ERROR
                    </h3>
                    <p style={{
                        margin: '0 0 20px 0',
                        fontSize: '12px',
                        opacity: 0.8
                    }}>
                        A component failed to render. Click retry to reload.
                    </p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{
                            textAlign: 'left',
                            marginBottom: '20px',
                            padding: '12px',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '4px',
                            fontSize: '10px',
                            maxHeight: '150px',
                            overflow: 'auto'
                        }}>
                            <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                                Error Details
                            </summary>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {this.state.error.message}
                                {'\n\n'}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                    <button
                        onClick={this.handleRetry}
                        style={{
                            padding: '10px 24px',
                            background: 'rgba(173, 255, 47, 0.1)',
                            color: '#adff2f',
                            border: '1px solid rgba(173, 255, 47, 0.3)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            letterSpacing: '0.05em',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(173, 255, 47, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(173, 255, 47, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(173, 255, 47, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(173, 255, 47, 0.3)';
                        }}
                    >
                        RETRY
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
