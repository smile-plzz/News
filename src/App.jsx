import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('general');
  const [country, setCountry] = useState('us');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      let url = `https://gnews.io/api/v4/top-headlines?token=70f8f36aed5c9ccfb722c933455bc237&topic=${topic}&country=${country}`;
      if (searchTerm) {
        url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=70f8f36aed5c9ccfb722c933455bc237&lang=en`;
      }
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]); // Clear articles on error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [topic, country, searchTerm]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Modern News</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Add more nav items here if needed */}
            </ul>
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); fetchNews(); }}>
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
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="my-4 text-center">Latest News</h1>
        <div className="row mb-4">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="country">Country</label>
            <select id="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="us">United States</option>
              <option value="gb">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="in">India</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading news...</p>
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
      </div>
    </div>
  );
};

export default App;