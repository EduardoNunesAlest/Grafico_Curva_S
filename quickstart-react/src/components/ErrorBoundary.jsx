import React from 'react';
import { Flex, Text, Button } from '@vibe/core';

/**
 * Error Boundary para capturar erros em componentes React
 * Implementa padrão de tratamento de erros conforme MONDAY_APPS_RULES
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log estruturado conforme diretrizes
    const errorLog = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      type: 'react_error_boundary'
    };
    
    console.error(JSON.stringify(errorLog));
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          style={{ 
            padding: '40px',
            minHeight: '400px',
            background: '#fff5f5',
            borderRadius: '8px',
            border: '1px solid #feb2b2'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <Text 
              type="text1" 
              weight="bold" 
              style={{ 
                color: '#c53030',
                marginBottom: '16px',
                fontSize: '20px'
              }}
            >
              Algo deu errado
            </Text>
            
            <Text 
              type="text2" 
              style={{ 
                color: '#742a2a',
                marginBottom: '24px',
                display: 'block'
              }}
            >
              Ocorreu um erro inesperado ao carregar o componente. 
              Por favor, tente novamente ou entre em contato com o suporte.
            </Text>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginBottom: '24px',
                textAlign: 'left',
                background: '#fff',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #feb2b2'
              }}>
                <summary style={{ 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#c53030'
                }}>
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre style={{ 
                  fontSize: '12px',
                  overflow: 'auto',
                  color: '#742a2a'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <Button 
              onClick={this.handleReset}
              size="medium"
            >
              Tentar Novamente
            </Button>
          </div>
        </Flex>
      );
    }

    return this.props.children;
  }
}
