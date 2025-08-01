import React from 'react';

const Navbar = ({ darkMode, setDarkMode, searchTerm, setSearchTerm, handleApplyFilters }) => {
  return (
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
  );
};

export default Navbar;
