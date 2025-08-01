import React, { useContext } from 'react';
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

  const handleApplyFilters = () => {
    // This function is now empty because the filters are applied automatically
    // when the state changes in the AppContext.
  };

  return (
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
  );
};

export default Filters;