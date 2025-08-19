import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, onRetry }) => {
  const getErrorIcon = (message) => {
    if (message.includes('API key') || message.includes('Authentication')) {
      return 'bi-shield-exclamation';
    }
    if (message.includes('rate limit') || message.includes('429')) {
      return 'bi-clock-history';
    }
    if (message.includes('network') || message.includes('fetch')) {
      return 'bi-wifi-off';
    }
    return 'bi-exclamation-triangle';
  };

  const getErrorType = (message) => {
    if (message.includes('API key') || message.includes('Authentication')) {
      return 'Configuration Error';
    }
    if (message.includes('rate limit') || message.includes('429')) {
      return 'Rate Limit Exceeded';
    }
    if (message.includes('network') || message.includes('fetch')) {
      return 'Network Error';
    }
    return 'Error';
  };

  const getErrorMessage = (message) => {
    if (message.includes('API key')) {
      return 'Please check your API configuration. You may need to set up your API keys in the environment variables.';
    }
    if (message.includes('rate limit')) {
      return 'You have exceeded the API rate limit. Please wait a moment and try again.';
    }
    if (message.includes('network')) {
      return 'Unable to connect to the news service. Please check your internet connection and try again.';
    }
    return message;
  };

  const errorIcon = getErrorIcon(message);
  const errorType = getErrorType(message);
  const errorMessage = getErrorMessage(message);

  return (
    <div className="error-message-container text-center py-5">
      <div className="error-card">
        <div className="error-icon mb-3">
          <i className={`bi ${errorIcon} display-1 text-danger`}></i>
        </div>
        
        <h3 className="error-title mb-3">{errorType}</h3>
        
        <div className="error-details mb-4">
          <p className="error-text text-muted mb-3">{errorMessage}</p>
          
          <div className="error-suggestions">
            <h6 className="text-muted mb-2">Try these solutions:</h6>
            <ul className="list-unstyled text-start">
              {message.includes('API key') && (
                <li><i className="bi bi-check-circle text-success me-2"></i>Verify your API keys are correctly configured</li>
              )}
              {message.includes('rate limit') && (
                <li><i className="bi bi-clock text-warning me-2"></i>Wait a few minutes before trying again</li>
              )}
              {message.includes('network') && (
                <li><i className="bi bi-wifi text-info me-2"></i>Check your internet connection</li>
              )}
              <li><i className="bi bi-arrow-clockwise text-primary me-2"></i>Try refreshing the page</li>
              <li><i className="bi bi-gear text-secondary me-2"></i>Switch to a different news source</li>
            </ul>
          </div>
        </div>
        
        <div className="error-actions">
          {onRetry && (
            <button 
              className="btn btn-primary me-2" 
              onClick={onRetry}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Try Again
            </button>
          )}
          
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
