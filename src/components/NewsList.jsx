import React from 'react';
import Article from './Article';

const NewsList = ({ articles, handleShare }) => {
  return (
    <section className="row">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Article key={`${article.url}-${index}`} article={article} handleShare={handleShare} />
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No articles found. Try a different search or filter.</p>
        </div>
      )}
    </section>
  );
};

export default NewsList;
