import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('general');
  const [country, setCountry] = useState('us');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = async (loadMore = false) => {
    setLoading(true);
    setError(null);

    let url = `https://gnews.io/api/v4/top-headlines?token=70f8f36aed5c9ccfb722c933455bc237&topic=${topic}&country=${country}&page=${page}`;
    if (searchTerm) {
      url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=70f8f36aed5c9ccfb722c933455bc237&lang=en&page=${page}`;
    }

    if (fromDate) {
      url += `&from=${fromDate}T00:00:00Z`;
    }
    if (toDate) {
      url += `&to=${toDate}T23:59:59Z`;
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors[0] : 'Failed to fetch news');
      }
      const data = await response.json();
      if (loadMore) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      } else {
        setArticles(data.articles);
      }
      setTotalResults(data.totalArticles);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page when filters change
    setArticles([]); // Clear articles when filters change
    setTotalResults(0); // Reset total results
    fetchNews();
  }, [topic, country, searchTerm, fromDate, toDate]);

  useEffect(() => {
    if (page > 1) {
      fetchNews(true); // Fetch more when page changes (for load more)
    }
  }, [page]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Modern News</a>
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
                      <a href={article.url} className="btn btn-primary mt-auto" target="_blank" rel="noopener noreferrer">Read More</a>
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
          <div className="text-center my-4">
            <button className="btn btn-secondary" onClick={handleLoadMore}>
              Load More ({articles.length}/{totalResults})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;