import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

const Filters = () => {
  const { 
    apiSource, setApiSource, 
    topic, setTopic, 
    country, setCountry, 
    language, setLanguage, 
    fromDate, setFromDate, 
    toDate, setToDate 
  } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activePreset, setActivePreset] = useState('');

  const quickPresets = [
    { name: 'Breaking News', topic: 'general', country: 'us', language: 'en' },
    { name: 'Tech Updates', topic: 'technology', country: 'us', language: 'en' },
    { name: 'Business Daily', topic: 'business', country: 'us', language: 'en' },
    { name: 'World View', topic: 'world', country: 'gb', language: 'en' },
    { name: 'Sports Central', topic: 'sports', country: 'us', language: 'en' },
    { name: 'Science Today', topic: 'science', country: 'us', language: 'en' },
  ];

  const handlePresetClick = (preset) => {
    setTopic(preset.topic);
    setCountry(preset.country);
    setLanguage(preset.language);
    setActivePreset(preset.name);
    setFromDate('');
    setToDate('');
  };

  const clearFilters = () => {
    setTopic('general');
    setCountry('us');
    setLanguage('en');
    setFromDate('');
    setToDate('');
    setActivePreset('');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filters-section mb-4">
      {/* Quick Presets */}
      <div className="quick-presets mb-3">
        <h6 className="text-muted mb-2">Quick Presets</h6>
        <div className="d-flex flex-wrap gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset.name}
              className={`btn btn-sm ${activePreset === preset.name ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handlePresetClick(preset)}
            >
              {preset.name}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Collapsible Filters */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center" role="button" onClick={toggleExpanded}>
          <h6 className="mb-0">
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} me-2`}></i>
            Advanced Filters
          </h6>
          <span className="badge bg-primary">{isExpanded ? 'Hide' : 'Show'}</span>
        </div>
        
        <div className={`collapse ${isExpanded ? 'show' : ''}`}>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6 col-lg-3">
                <label htmlFor="apiSource" className="form-label">
                  <i className="bi bi-gear me-1"></i>
                  API Source
                </label>
                <select 
                  id="apiSource" 
                  className="form-select" 
                  value={apiSource} 
                  onChange={(e) => setApiSource(e.target.value)}
                >
                  <option value="gnews">GNews API</option>
                  <option value="thenewsapi">TheNewsAPI</option>
                  <option value="newsapi">NewsAPI</option>
                </select>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <label htmlFor="topic" className="form-label">
                  <i className="bi bi-tag me-1"></i>
                  Topic
                </label>
                <select 
                  id="topic" 
                  className="form-select" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                >
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
              
              <div className="col-md-6 col-lg-3">
                <label htmlFor="country" className="form-label">
                  <i className="bi bi-globe me-1"></i>
                  Country
                </label>
                <select 
                  id="country" 
                  className="form-select" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="us">🇺🇸 United States</option>
                  <option value="gb">🇬🇧 United Kingdom</option>
                  <option value="ca">🇨🇦 Canada</option>
                  <option value="au">🇦🇺 Australia</option>
                  <option value="in">🇮🇳 India</option>
                  <option value="br">🇧🇷 Brazil</option>
                  <option value="cn">🇨🇳 China</option>
                  <option value="eg">🇪🇬 Egypt</option>
                  <option value="fr">🇫🇷 France</option>
                  <option value="de">🇩🇪 Germany</option>
                  <option value="gr">🇬🇷 Greece</option>
                  <option value="hk">🇭🇰 Hong Kong</option>
                  <option value="ie">🇮🇪 Ireland</option>
                  <option value="it">🇮🇹 Italy</option>
                  <option value="jp">🇯🇵 Japan</option>
                  <option value="nl">🇳🇱 Netherlands</option>
                </select>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <label htmlFor="language" className="form-label">
                  <i className="bi bi-translate me-1"></i>
                  Language
                </label>
                <select 
                  id="language" 
                  className="form-select" 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Spanish</option>
                  <option value="fr">🇫🇷 French</option>
                  <option value="de">🇩🇪 German</option>
                  <option value="it">🇮🇹 Italian</option>
                  <option value="pt">🇵🇹 Portuguese</option>
                  <option value="ru">🇷🇺 Russian</option>
                  <option value="zh">🇨🇳 Chinese</option>
                </select>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <label htmlFor="fromDate" className="form-label">
                  <i className="bi bi-calendar3 me-1"></i>
                  From Date
                </label>
                <input 
                  type="date" 
                  id="fromDate" 
                  className="form-control" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                />
              </div>
              
              <div className="col-md-6 col-lg-3">
                <label htmlFor="toDate" className="form-label">
                  <i className="bi bi-calendar3 me-1"></i>
                  To Date
                </label>
                <input 
                  type="date" 
                  id="toDate" 
                  className="form-control" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Filters are applied automatically
                  </small>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={clearFilters}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;