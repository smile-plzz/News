import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Initialize states with values from localStorage or defaults
  const [topic, setTopic] = useState(() => localStorage.getItem('newsAppTopic') || 'general');
  const [country, setCountry] = useState(() => localStorage.getItem('newsAppCountry') || 'us');
  const [language, setLanguage] = useState(() => localStorage.getItem('newsAppLanguage') || 'en');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('newsAppDarkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [apiSource, setApiSource] = useState(() => localStorage.getItem('newsAppApiSource') || 'gnews');

  // State for applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    topic: localStorage.getItem('newsAppTopic') || 'general',
    country: localStorage.getItem('newsAppCountry') || 'us',
    language: localStorage.getItem('newsAppLanguage') || 'en',
    searchTerm: '',
    fromDate: '',
    toDate: '',
    apiSource: localStorage.getItem('newsAppApiSource') || 'gnews',
  });

  const pageSize = 10; // Number of articles per page
  const totalPages = Math.ceil(totalResults / pageSize);

  // Effect to save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('newsAppTopic', topic);
  }, [topic]);

  useEffect(() => {
    localStorage.setItem('newsAppCountry', country);
  }, [country]);

  useEffect(() => {
    localStorage.setItem('newsAppLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('newsAppDarkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchNews = useCallback(async (currentPageNum) => {
    setLoading(true);
    setError(null);
    setArticles([]); // Clear articles on every fetch
    setTotalResults(0); // Reset total results on every fetch

    try {
      const { topic, country, language, searchTerm, fromDate, toDate, apiSource } = appliedFilters;
      const params = new URLSearchParams({
        topic,
        country,
        language,
        searchTerm,
        fromDate,
        toDate,
        page: currentPageNum,
        apiSource,
      });

      const response = await fetch(`/api/get-news?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch news');
      }

      const data = await response.json();

      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setApiSource(data.apiSource);

    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  // Effect for fetching news when filters or page change
  useEffect(() => {
    fetchNews(page);
  }, [page, appliedFilters, fetchNews]);

  // Debounce for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setAppliedFilters(prev => ({ ...prev, searchTerm }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyFilters = () => {
    setPage(1); // Reset to first page when filters are applied
    setAppliedFilters({
      topic,
      country,
      language,
      searchTerm,
      fromDate,
      toDate,
      apiSource,
    });
  };

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

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of page buttons to display

    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(1)}>&laquo;</button>
          </li>
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)}>&lsaquo;</button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${page === number ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page + 1)}>&rsaquo;</button>
          </li>
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(totalPages)}>&raquo;</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">DailyDigest</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Nav items */}
            </ul>
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search news..." 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <div className="form-check form-switch ms-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="darkModeSwitch" 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)}
              />
              <label className="form-check-label text-light" htmlFor="darkModeSwitch">Dark Mode</label>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="my-4 text-center">Latest News</h1>
        <div className="row mb-4">
          <div className="col-12">
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="apiSource">API Source</label>
                <select id="apiSource" className="form-control" value={apiSource} onChange={(e) => setApiSource(e.target.value)}>
                  <option value="gnews">GNews API</option>
                  <option value="thenewsapi">TheNewsAPI</option>
                  <option value="newsapi">NewsAPI</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="topic">Topic</label>
                <select id="topic" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="general">General</option>
                  <option value="world">World</option>
                  <option value="nation">Nation</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="science">Science</option>
                  <option value="health">Health</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="country">Country</label>
                <select id="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="us">United States</option>
                  <option value="gb">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="in">India</option>
                  <option value="br">Brazil</option>
                  <option value="cn">China</option>
                  <option value="eg">Egypt</option>
                  <option value="fr">French</option>
                  <option value="de">Germany</option>
                  <option value="gr">Greece</option>
                  <option value="hk">Hong Kong</option>
                  <option value="ie">Ireland</option>
                  <option value="it">Italian</option>
                  <option value="jp">Japan</option>
                  <option value="nl">Netherlands</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="language">Language</label>
                <select id="language" className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
              <div className="col-12 mt-3 d-grid">
                <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
              </div>
            </div>
          </div>
        </div>

        {loading && articles.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading news...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <div className="row">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <div className="col-md-4 mb-4" key={`${article.url}-${index}`}>
                  <div className="card h-100">
                    <img 
                      src={article.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
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
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No articles found. Try a different search or filter.</p>
              </div>
            )}
          </div>
        )}

        {loading && articles.length > 0 && (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}

        {!loading && articles.length > 0 && totalPages > 1 && renderPagination()}
      </div>

      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="btn btn-primary back-to-top-btn"
          title="Back to Top"
        >
          &#9650;
        </button>
      )}
    </div>
  );
};

export default App;
