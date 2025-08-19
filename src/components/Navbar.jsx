import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { darkMode, setDarkMode, searchTerm, setSearchTerm } = useContext(AppContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled automatically by the context
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container-fluid">
        <button 
          className="navbar-brand d-flex align-items-center" 
          onClick={() => window.location.reload()}
        >
          <i className="bi bi-newspaper me-2"></i>
          <span className="brand-text">DailyDigest</span>
        </button>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                <i className="bi bi-house me-1"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#trending">
                <i className="bi bi-fire me-1"></i>
                Trending
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#bookmarks">
                <i className="bi bi-bookmark me-1"></i>
                Bookmarks
              </a>
            </li>
          </ul>
          
          <form className="d-flex search-form me-3" onSubmit={handleSearchSubmit}>
            <div className="search-container position-relative">
              <input 
                className={`form-control search-input ${isSearchFocused ? 'focused' : ''}`}
                type="search" 
                placeholder="Search news..." 
                aria-label="Search news articles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-link search-clear-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
              <button 
                className="btn btn-outline-primary search-btn" 
                type="submit"
                aria-label="Search"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          
          <div className="d-flex align-items-center">
            <div className="form-check form-switch me-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="darkModeSwitch" 
                checked={darkMode} 
                onChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
                <span className="ms-1 d-none d-sm-inline">
                  {darkMode ? 'Light' : 'Dark'}
                </span>
              </label>
            </div>
            
            <div className="navbar-nav">
              <a className="nav-link" href="#settings" aria-label="Settings">
                <i className="bi bi-gear"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;