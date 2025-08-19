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
        // Show a toast notification instead of alert
        showToast('Link copied to clipboard!', 'success');
      } catch (error) {
        console.error('Failed to copy:', error);
        showToast('Failed to copy link', 'error');
      }
    }
  };

  const showToast = (message, type = 'info') => {
    // Simple toast implementation - you can enhance this with a proper toast library
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
      <div class="toast-body">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const renderContent = () => {
    if (loading && articles.length === 0) {
      return (
        <div className="text-center py-5">
          <Spinner />
          <p className="mt-3 text-muted">Loading latest news...</p>
        </div>
      );
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (articles.length === 0) {
      return (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h3 className="mt-3">No articles found</h3>
          <p className="text-muted">Try adjusting your search terms or filters to find more content.</p>
        </div>
      );
    }

    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-newspaper me-2"></i>
            Showing {articles.length} of {totalResults} articles
          </h5>
          {totalResults > articles.length && (
            <span className="badge bg-primary">
              {Math.ceil(totalResults / 20)} pages available
            </span>
          )}
        </div>
        
        <NewsList articles={articles} handleShare={handleShare} />
        
        {loading && articles.length > 0 && (
          <div className="text-center my-4">
            <Spinner />
            <p className="mt-2 text-muted">Loading more articles...</p>
          </div>
        )}

        {!loading && articles.length > 0 && articles.length < totalResults && (
          <div className="text-center my-4">
            <button 
              className="btn btn-primary btn-lg px-4" 
              onClick={handleLoadMore}
              disabled={loading}
            >
              <i className="bi bi-arrow-down me-2"></i>
              Load More Articles
            </button>
            <p className="text-muted mt-2">
              {articles.length} of {totalResults} articles loaded
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="main-content">
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="main-title mb-2">
                  <i className="bi bi-newspaper me-3"></i>
                  Latest News
                </h1>
                <p className="text-muted mb-0">
                  Stay informed with the latest headlines from around the world
                </p>
              </div>
              <div className="d-none d-md-block">
                <div className="stats-card">
                  <div className="stats-item">
                    <i className="bi bi-globe text-primary"></i>
                    <span className="stats-number">{totalResults}</span>
                    <span className="stats-label">Articles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Filters />
        {renderContent()}
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  );
};

export default MainContent;
