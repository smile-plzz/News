import React from 'react';
import { Helmet } from 'react-helmet-async';

const Article = ({ article, handleShare }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [
      article.image || 'https://placehold.co/300x200?text=No+Image'
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
        "url": "/path/to/your/logo.png" // Replace with your actual logo URL
      }
    },
    "description": article.description || 'No description available.'
  };

  return (
    <article className="col-md-4 mb-4">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <div className="card h-100">
        <img 
          src={article.image || 'https://placehold.co/300x200?text=No+Image'} 
          className="card-img-top" 
          alt={article.title || 'News article image'} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text flex-grow-1">{article.description || 'No description available.'}</p>
          <p className="card-text"><small className="text-muted">Published: <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleString()}</time></small></p>
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
    </article>
  );
};

export default Article;
