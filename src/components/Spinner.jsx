import React from 'react';

const Spinner = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading news...</p>
    </div>
  );
};

export default Spinner;
