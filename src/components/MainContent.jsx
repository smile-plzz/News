import React, { useContext } from 'react';
import Filters from './Filters';
import NewsList from './NewsList';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import BackToTopButton from './BackToTopButton';
import useScroll from '../hooks/useScroll';
import useNews from '../hooks/useNews';
import AppContext from '../context/AppContext';
import { formatDistanceToNow } from 'date-fns';

const TOPIC_LABELS = {
  general: 'General',
  world: 'World',
  nation: 'Nation',
  business: 'Business',
  technology: 'Technology',
  entertainment: 'Entertainment',
  sports: 'Sports',
  science: 'Science',
  health: 'Health',
  international: 'International',
};

const LANGUAGE_LABELS = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
};

const COUNTRY_LABELS = {
  us: 'United States',
  gb: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
  in: 'India',
  br: 'Brazil',
  cn: 'China',
  eg: 'Egypt',
  fr: 'France',
  de: 'Germany',
  gr: 'Greece',
  hk: 'Hong Kong',
  ie: 'Ireland',
  it: 'Italy',
  jp: 'Japan',
  nl: 'Netherlands',
};

const API_SOURCE_LABELS = {
  gnews: 'GNews API',
  thenewsapi: 'TheNewsAPI',
  newsapi: 'NewsAPI',
};

const MainContent = () => {
  const { showBackToTop, scrollToTop } = useScroll();
  const { articles, loading, error, totalResults, handleLoadMore } = useNews();
  const { topic, country, language, apiSource } = useContext(AppContext);

  const formattedTopic = TOPIC_LABELS[topic] || 'General';
  const formattedLanguage = LANGUAGE_LABELS[language] || language?.toUpperCase();
  const formattedCountry = COUNTRY_LABELS[country] || country?.toUpperCase();
  const formattedApiSource = API_SOURCE_LABELS[apiSource] || 'Curated Feed';
  const totalLoaded = articles.length;
  const latestPublished = articles[0]?.publishedAt;
  const lastUpdated = latestPublished
    ? formatDistanceToNow(new Date(latestPublished), { addSuffix: true })
    : 'Awaiting updates';
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / 20) : 0;

  const highlightMetrics = [
    {
      icon: 'bi-journal-richtext',
      label: 'Articles loaded',
      value: totalLoaded.toLocaleString(),
    },
    {
      icon: 'bi-geo-alt',
      label: 'Region',
      value: formattedCountry,
    },
    {
      icon: 'bi-translate',
      label: 'Language',
      value: formattedLanguage,
    },
    {
      icon: 'bi-grid',
      label: 'Pages available',
      value: totalPages.toLocaleString(),
    },
  ];

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
        showToast('Link copied to clipboard!', 'success');
      } catch (error) {
        console.error('Failed to copy:', error);
        showToast('Failed to copy link', 'error');
      }
    }
  };

  const showToast = (message, type = 'info') => {
    document.querySelectorAll('.toast').forEach((existingToast) => existingToast.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';

    const icon = document.createElement('i');
    icon.className = `bi ${
      type === 'success'
        ? 'bi-check-circle'
        : type === 'error'
          ? 'bi-exclamation-circle'
          : 'bi-info-circle'
    } me-2`;
    icon.setAttribute('aria-hidden', 'true');

    toastBody.append(icon, message);
    toast.appendChild(toastBody);
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
        <div className="content-summary card-surface d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
          <div>
            <h5 className="mb-1">
              <i className="bi bi-newspaper me-2"></i>
              Showing {articles.length.toLocaleString()} of {totalResults.toLocaleString()} articles
            </h5>
            <p className="text-muted mb-0 small">Stories update automatically as new headlines arrive.</p>
          </div>
          {totalResults > articles.length && (
            <span className="badge rounded-pill text-bg-primary-subtle text-primary fw-semibold">
              {totalPages.toLocaleString()} pages available
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
              {articles.length.toLocaleString()} of {totalResults.toLocaleString()} articles loaded
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="main-content">
      <div className="container mt-4">
        <div className="insight-banner" id="home">
          <div className="row g-3 align-items-stretch">
            <div className="col-lg-8">
              <div className="insight-card h-100 p-4">
                <span className="badge rounded-pill text-bg-primary-subtle text-primary fw-semibold mb-3">
                  Updated {lastUpdated}
                </span>
                <h1 className="main-title mb-3">
                  <i className="bi bi-newspaper me-3"></i>
                  Latest News
                </h1>
                <p className="insight-description mb-4">
                  Curated {formattedTopic.toLowerCase()} headlines for readers in {formattedCountry}, delivered in {formattedLanguage} via {formattedApiSource}.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <a className="btn btn-primary btn-sm" href="#filters">
                    <i className="bi bi-sliders2 me-2"></i>
                    Adjust filters
                  </a>
                  <button className="btn btn-outline-primary btn-sm" type="button" onClick={scrollToTop}>
                    <i className="bi bi-arrow-up-circle me-2"></i>
                    Back to top
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="insight-metrics-card h-100 p-4">
                <h6 className="text-muted text-uppercase fw-semibold mb-3">At a glance</h6>
                <ul className="list-unstyled mb-0 insight-metrics-list">
                  {highlightMetrics.map((metric) => (
                    <li key={metric.label} className="insight-metric-item">
                      <span className="metric-icon">
                        <i className={`bi ${metric.icon}`}></i>
                      </span>
                      <div>
                        <span className="metric-label">{metric.label}</span>
                        <span className="metric-value">{metric.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
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
