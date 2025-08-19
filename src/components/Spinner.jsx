import React from 'react';

const Spinner = ({ size = 'medium', text = 'Loading...' }) => {
  const spinnerClasses = {
    small: 'spinner-border-sm',
    medium: 'spinner-border',
    large: 'spinner-border'
  };

  const sizeClasses = {
    small: '',
    medium: '',
    large: 'spinner-border-lg'
  };

  return (
    <div className="spinner-container text-center">
      <div className={`${spinnerClasses[size]} ${sizeClasses[size]} text-primary`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && (
        <div className="spinner-text mt-2">
          <p className="text-muted mb-0">{text}</p>
        </div>
      )}
    </div>
  );
};

export default Spinner;
