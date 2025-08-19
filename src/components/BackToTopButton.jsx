import React from 'react';
import PropTypes from 'prop-types';

const BackToTopButton = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <button
      className="back-to-top-btn"
      onClick={onClick}
      aria-label="Back to top"
      title="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

BackToTopButton.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BackToTopButton;
