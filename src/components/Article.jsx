import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { formatDistanceToNow } from 'date-fns';

const Article = ({ article, handleShare }) => {
  const { darkMode } = useContext(AppContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Calculate reading time (average reading speed: 200 words per minute)
  const calculateReadingTime = (text) => {
    if (!text) return 1;
    const words = text.split(' ').length;
    return Math.ceil(words / 200);
  };

  const readingTime = calculateReadingTime(article.description);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement actual bookmark storage
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [
      article.image || 'https://placehold.co/400x250?text=No+Image'
    ],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author || "Unknown"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DailyDigest",
      "logo": {
        "@type": "ImageObject",
        "url": "/path/to/your/logo.png"
      }
    },
    "description": article.description || 'No description available.'
  };

  return (
    <article className="col-lg-4 col-md-6 mb-4">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      
      <div className={`card h-100 article-card ${darkMode ? 'dark' : ''}`}>
        <div className="card-image-container">
          <img 
            src={imageError ? 'https://placehold.co/400x250?text=No+Image' : (article.image || 'https://placehold.co/400x250?text=No+Image')}
            className="card-img-top" 
            alt={article.title || 'News article image'} 
            onError={handleImageError}
            loading="lazy"
          />
          <div className="card-overlay">
            <button 
              className={`btn btn-sm bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmark}
              aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              <i className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <div className="article-meta mb-2">
            <span className="badge bg-primary me-2">{article.source || 'Unknown Source'}</span>
            <span className="badge bg-secondary me-2">{readingTime} min read</span>
            <span className="text-muted small">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
          
          <h5 className="card-title article-title">{article.title}</h5>
          <p className="card-text flex-grow-1 article-description">
            {article.description || 'No description available.'}
          </p>
          
          <div className="article-actions mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <a 
                href={article.url} 
                className="btn btn-primary btn-sm" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Read full article: ${article.title}`}
              >
                <i className="bi bi-arrow-right me-1"></i>
                Read More
              </a>
              <div className="btn-group" role="group">
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={() => handleShare(article.title, article.description, article.url)}
                  aria-label="Share this article"
                >
                  <i className="bi bi-share me-1"></i>
                  Share
                </button>
                <button 
                  className="btn btn-outline-info btn-sm"
                  onClick={() => window.open(article.url, '_blank')}
                  aria-label="Open article in new tab"
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    publishedAt: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleShare: PropTypes.func.isRequired,
};

export default Article;
