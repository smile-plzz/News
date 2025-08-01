import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      Error: {message}
    </div>
  );
};

export default ErrorMessage;
