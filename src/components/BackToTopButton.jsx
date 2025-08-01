import React from 'react';

const BackToTopButton = ({ show, onClick }) => {
  return (
    <>
      {show && (
        <button 
          onClick={onClick} 
          className="btn btn-primary back-to-top-btn"
          title="Back to Top"
        >
          &#9650;
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
