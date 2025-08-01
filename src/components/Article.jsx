import React from 'react';

const Article = ({ article, handleShare }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src={article.image || 'https://placehold.co/300x200?text=No+Image'} 
          className="card-img-top" 
          alt={article.title} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text flex-grow-1">{article.description || 'No description available.'}</p>
          <p className="card-text"><small className="text-muted">Published: {new Date(article.publishedAt).toLocaleString()}</small></p>
          <div className="d-flex justify-content-between align-items-center">
            <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
            <button 
              className="btn btn-info" 
              onClick={() => handleShare(article.title, article.description, article.url)}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
