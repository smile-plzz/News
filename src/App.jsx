import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('general');
  const [country, setCountry] = useState('us');

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=70f8f36aed5c9ccfb722c933455bc237&topic=${topic}&country=${country}`);
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchNews();
  }, [topic, country]);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Modern News</h1>
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
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src={article.image} className="card-img-top" alt={article.title} />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;