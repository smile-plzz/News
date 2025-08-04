import React from 'react';
import Filters from './Filters';
import NewsList from './NewsList';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import BackToTopButton from './BackToTopButton';
import useScroll from '../hooks/useScroll';
import useNews from '../hooks/useNews';

const MainContent = () => {
  const { showBackToTop, scrollToTop } = useScroll();
  const { articles, loading, error, totalResults, handleLoadMore } = useNews();

  const handleShare = async (title, description, url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="my-4 text-center">Latest News</h1>
        <Filters />

        {loading && articles.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <NewsList articles={articles} handleShare={handleShare} />
        )}

        {loading && articles.length > 0 && (
            <Spinner />
        )}

        {!loading && articles.length > 0 && articles.length < totalResults && (
          <div className="text-center my-4">
            <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  );
};

export default MainContent;
