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
  const loader = React.useRef(null);

  // New state for applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    topic: localStorage.getItem('newsAppTopic') || 'general',
    country: localStorage.getItem('newsAppCountry') || 'us',
    language: localStorage.getItem('newsAppLanguage') || 'en',
    searchTerm: '',
    fromDate: '',
    toDate: '',
    apiSource: localStorage.getItem('newsAppApiSource') || 'gnews',
  });

  // Effect to save preferences to localStorage whenever they change
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

  const fetchNews = useCallback(async (loadMore = false) => {
    setLoading(true);
    setError(null);

    const GNEWS_TOKEN = import.meta.env.VITE_GNEWS_TOKEN;
    const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;
    const THENEWSAPI_TOKEN = import.meta.env.VITE_THENEWSAPI_TOKEN;

    const attemptFetch = async (source) => {
      let url;
      let fetchedArticles = [];
      let totalArticles = 0;

      try {
        if (source === 'gnews') {
          if (appliedFilters.topic === 'international') {
            const internationalCountries = ['us', 'gb', 'ca', 'au', 'de', 'fr', 'jp', 'in', 'br', 'cn', 'eg', 'gr', 'hk', 'ie', 'it', 'nl'];
            const randomCountry = internationalCountries[Math.floor(Math.random() * internationalCountries.length)];
            url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&country=${randomCountry}&lang=${appliedFilters.language}&page=${page}`;
          
          } else if (appliedFilters.searchTerm) {
            url = `https://gnews.io/api/v4/search?q=${appliedFilters.searchTerm}&token=${GNEWS_TOKEN}&lang=${appliedFilters.language}&page=${page}`;
          } else {
            url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&topic=${appliedFilters.topic}&country=${appliedFilters.country}&lang=${appliedFilters.language}&page=${page}`;
          }

          if (appliedFilters.fromDate) {
            url += `&from=${appliedFilters.fromDate}T00:00:00Z`;
          }
          if (appliedFilters.toDate) {
            url += `&to=${appliedFilters.toDate}T23:59:59Z`;
          }

          const response = await fetch(url);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors[0] : 'Failed to fetch news from GNews');
          }
          const data = await response.json();
          fetchedArticles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image,
            publishedAt: article.publishedAt,
            source: article.source.name,
          }));
          totalArticles = data.totalArticles;

        } else if (source === 'thenewsapi') {
          // TheNewsAPI integration
          let thenewsapiUrl;
          if (appliedFilters.topic === 'international' || appliedFilters.topic === 'trendy') {
            thenewsapiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${THENEWSAPI_TOKEN}&language=${appliedFilters.language}&limit=100`;
          } else if (appliedFilters.searchTerm) {
            thenewsapiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_TOKEN}&search=${appliedFilters.searchTerm}&language=${appliedFilters.language}&limit=100`;
          } else {
            thenewsapiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${THENEWSAPI_TOKEN}&categories=${appliedFilters.topic}&language=${appliedFilters.language}&limit=100`;
          }

          if (appliedFilters.fromDate) {
            thenewsapiUrl += `&published_after=${appliedFilters.fromDate}T00:00:00`;
          }
          if (appliedFilters.toDate) {
            thenewsapiUrl += `&published_before=${appliedFilters.toDate}T23:59:59`;
          }

          const response = await fetch(thenewsapiUrl);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch news from TheNewsAPI');
          }
          const data = await response.json();
          fetchedArticles = data.data.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image_url,
            publishedAt: article.published_at,
            source: article.source,
          }));
          totalArticles = data.meta.found;

        } else if (source === 'newsapi') {
          // NewsAPI integration
          let newsApiUrl;
          if (appliedFilters.topic === 'international' || appliedFilters.topic === 'trendy') {
            newsApiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${NEWSAPI_KEY}&language=${appliedFilters.language}&page=${page}`;
          } else if (appliedFilters.searchTerm) {
            newsApiUrl = `https://newsapi.org/v2/everything?q=${appliedFilters.searchTerm}&apiKey=${NEWSAPI_KEY}&language=${appliedFilters.language}&page=${page}`;
          } else {
            newsApiUrl = `https://newsapi.org/v2/top-headlines?category=${appliedFilters.topic}&country=${appliedFilters.country}&apiKey=${NEWSAPI_KEY}&language=${appliedFilters.language}&page=${page}`;
          }

          if (appliedFilters.fromDate) {
            newsApiUrl += `&from=${appliedFilters.fromDate}T00:00:00`;
          }
          if (appliedFilters.toDate) {
            newsApiUrl += `&to=${appliedFilters.toDate}T23:59:59`;
          }

          const response = await fetch(newsApiUrl);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch news from NewsAPI');
          }
          const data = await response.json();
          fetchedArticles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source.name,
          }));
          totalArticles = data.totalResults;
        }

        if (loadMore) {
          setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
        } else {
          setArticles(fetchedArticles);
        }
        setTotalResults(totalArticles);
        setApiSource(source); // Update the UI to show the current API source
        return true; // Indicate success

      } catch (err) {
        console.error(`Error fetching news from ${source}:`, err);
        setError(err.message);
        return false; // Indicate failure
      }
    };

    const primarySource = appliedFilters.apiSource;
    const fallbackOrder = ['gnews', 'thenewsapi', 'newsapi'];
    let currentSourceIndex = fallbackOrder.indexOf(primarySource);

    let success = false;
    while (!success && currentSourceIndex < fallbackOrder.length) {
      const currentSource = fallbackOrder[currentSourceIndex];
      console.log(`Attempting to fetch from ${currentSource}...`);
      success = await attemptFetch(currentSource);
      if (!success) {
        currentSourceIndex++;
      }
    }

    if (!success) {
      setError('All available APIs failed to fetch news. Please try again later.');
      setArticles([]);
      setTotalResults(0);
    }

    setLoading(false);
  }, [appliedFilters, page]);

  // Effect to trigger fetch when appliedFilters change
  useEffect(() => {
    setPage(1); // Reset page when filters change
    setArticles([]); // Clear articles when filters change
    setTotalResults(0); // Reset total results
    fetchNews();
  }, [appliedFilters, fetchNews]);

  // Debounce for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setAppliedFilters(prev => ({ ...prev, searchTerm }));
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && articles.length < totalResults) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 1.0 });

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loader, loading, articles.length, totalResults]);

  const handleScroll = () => {
    if (window.pageYOffset > 300) { // Show button after scrolling down 300px
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">DailyDigest</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Add more nav items here if needed */}
            </ul>
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); setPage(1); fetchNews(); }}>
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

        {loading ? (
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
                <div className="col-md-4 mb-4" key={index}>
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

        {!loading && articles.length > 0 && articles.length < totalResults && (
          <div ref={loader} style={{ height: '50px', margin: '20px 0' }}></div>
        )}
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