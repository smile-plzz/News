import React, { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../context/AppContext';

const Filters = () => {
  const {
    apiSource,
    setApiSource,
    topic,
    setTopic,
    country,
    setCountry,
    language,
    setLanguage,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activePreset, setActivePreset] = useState('');

  const topicLabels = {
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

  const languageLabels = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
  };

  const countryLabels = {
    us: '🇺🇸 United States',
    gb: '🇬🇧 United Kingdom',
    ca: '🇨🇦 Canada',
    au: '🇦🇺 Australia',
    in: '🇮🇳 India',
    br: '🇧🇷 Brazil',
    cn: '🇨🇳 China',
    eg: '🇪🇬 Egypt',
    fr: '🇫🇷 France',
    de: '🇩🇪 Germany',
    gr: '🇬🇷 Greece',
    hk: '🇭🇰 Hong Kong',
    ie: '🇮🇪 Ireland',
    it: '🇮🇹 Italy',
    jp: '🇯🇵 Japan',
    nl: '🇳🇱 Netherlands',
  };

  const apiSourceLabels = {
    gnews: 'GNews API',
    thenewsapi: 'TheNewsAPI',
    newsapi: 'NewsAPI',
  };

  const quickPresets = useMemo(
    () => [
      { name: 'Breaking News', topic: 'general', country: 'us', language: 'en', icon: 'bi-lightning-charge' },
      { name: 'Tech Updates', topic: 'technology', country: 'us', language: 'en', icon: 'bi-cpu' },
      { name: 'Business Daily', topic: 'business', country: 'us', language: 'en', icon: 'bi-graph-up' },
      { name: 'World View', topic: 'world', country: 'gb', language: 'en', icon: 'bi-globe-americas' },
      { name: 'Sports Central', topic: 'sports', country: 'us', language: 'en', icon: 'bi-trophy' },
      { name: 'Science Today', topic: 'science', country: 'us', language: 'en', icon: 'bi-bezier2' },
    ],
    []
  );

  const defaultSelections = {
    topic: 'general',
    country: 'us',
    language: 'en',
    apiSource: 'gnews',
  };

  const activeFilters = [];

  if (topic !== defaultSelections.topic) {
    activeFilters.push({ label: 'Topic', value: topicLabels[topic] || topic });
  }

  if (country !== defaultSelections.country) {
    activeFilters.push({ label: 'Country', value: countryLabels[country] || country.toUpperCase() });
  }

  if (language !== defaultSelections.language) {
    activeFilters.push({ label: 'Language', value: languageLabels[language] || language.toUpperCase() });
  }

  if (apiSource !== defaultSelections.apiSource) {
    activeFilters.push({ label: 'Source', value: apiSourceLabels[apiSource] || apiSource });
  }

  if (fromDate || toDate) {
    const range = [fromDate, toDate].filter(Boolean).join(' → ');
    activeFilters.push({ label: 'Date', value: range || 'Custom range' });
  }

  const activePresetCount = activePreset ? 1 : 0;
  const totalActiveFilters = activeFilters.length + activePresetCount;

  const handlePresetClick = (preset) => {
    setTopic(preset.topic);
    setCountry(preset.country);
    setLanguage(preset.language);
    setActivePreset(preset.name);
    setFromDate('');
    setToDate('');
  };

  const clearFilters = () => {
    setTopic(defaultSelections.topic);
    setCountry(defaultSelections.country);
    setLanguage(defaultSelections.language);
    setApiSource(defaultSelections.apiSource);
    setFromDate('');
    setToDate('');
    setActivePreset('');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (!activePreset) {
      return;
    }

    const matchingPreset = quickPresets.find((preset) => preset.name === activePreset);
    if (!matchingPreset) {
      setActivePreset('');
      return;
    }

    const matchesSelection =
      matchingPreset.topic === topic &&
      matchingPreset.country === country &&
      matchingPreset.language === language;

    if (!matchesSelection || fromDate || toDate) {
      setActivePreset('');
    }
  }, [activePreset, country, fromDate, language, quickPresets, setActivePreset, toDate, topic]);

  return (
    <div className="filters-section mb-4" id="filters">
      <div className="filters-summary mb-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="summary-icon">
            <i className="bi bi-funnel-fill"></i>
          </div>
          <div>
            <h6 className="mb-0">Filters overview</h6>
            <small className="text-muted">{totalActiveFilters} active preference{totalActiveFilters === 1 ? '' : 's'}</small>
          </div>
          <div className="flex-grow-1 d-none d-md-flex justify-content-end">
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Reset to defaults
            </button>
          </div>
        </div>
        <div className="filters-badges mt-3">
          {activePreset && (
            <span className="badge rounded-pill text-bg-primary me-2 mb-2">
              <i className="bi bi-stars me-1"></i>
              Preset: {activePreset}
            </span>
          )}
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <span
                key={`${filter.label}-${filter.value}`}
                className="badge rounded-pill text-bg-light text-muted border me-2 mb-2"
              >
                <span className="text-uppercase small fw-semibold text-secondary me-1">{filter.label}</span>
                {filter.value}
              </span>
            ))
          ) : (
            <span className="text-muted small d-inline-flex align-items-center">
              <i className="bi bi-info-circle me-1"></i>
              Using newsroom defaults for a balanced feed.
            </span>
          )}
        </div>
      </div>

      <div className="quick-presets mb-3">
        <h6 className="text-muted mb-2">Quick presets</h6>
        <div className="d-flex flex-wrap gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset.name}
              className={`btn btn-sm quick-preset-btn ${activePreset === preset.name ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handlePresetClick(preset)}
            >
              <i className={`bi ${preset.icon} me-1`}></i>
              {preset.name}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={clearFilters}
          >
            <i className="bi bi-eraser me-1"></i>
            Clear All
          </button>
        </div>
      </div>

      <div className="card">
        <button
          className="card-header d-flex justify-content-between align-items-center filters-toggle"
          type="button"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls="advancedFiltersContent"
        >
          <h6 className="mb-0">
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} me-2`}></i>
            Advanced filters
          </h6>
          <span className="badge bg-primary-subtle text-primary fw-semibold">
            {isExpanded ? 'Hide' : 'Show'}
          </span>
        </button>

        <div className={`collapse ${isExpanded ? 'show' : ''}`} id="advancedFiltersContent">
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
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Filters are applied automatically
                  </small>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={clearFilters}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset filters
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
