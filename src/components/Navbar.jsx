import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { darkMode, setDarkMode, searchTerm, setSearchTerm } = useContext(AppContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled automatically by the context when the term changes
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${darkMode ? 'navbar-dark' : 'navbar-light'}`}
    >
      <div className="container-fluid">
        <button
          type="button"
          className="navbar-brand d-flex align-items-center gap-3"
          onClick={() => window.location.reload()}
          aria-label="Reload DailyDigest and return to the top of the page"
        >
          <span className="brand-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="bi bi-newspaper"></i>
          </span>
          <span className="d-flex flex-column align-items-start brand-copy">
            <span className="brand-text">DailyDigest</span>
            <small className="brand-subtitle">Your personalised morning briefing</small>
          </span>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-pill-group">
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

          <form className="d-flex search-form me-lg-3" onSubmit={handleSearchSubmit}>
            <div className="search-container position-relative">
              <input
                className={`form-control search-input ${isSearchFocused ? 'focused' : ''}`}
                type="search"
                placeholder="Search news..."
                aria-label="Search news articles"
                aria-describedby="searchHint"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <span id="searchHint" className="visually-hidden">
                Results update automatically as you type
              </span>
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

          <div className="d-flex align-items-center nav-quick-actions">
            <a className="btn btn-primary btn-sm nav-cta d-none d-lg-inline-flex" href="#filters">
              <i className="bi bi-sliders2 me-2"></i>
              Personalize Feed
            </a>

            <div className="nav-divider d-none d-lg-block" aria-hidden="true"></div>

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
