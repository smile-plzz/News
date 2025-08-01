import React, { useState, useEffect } from 'react';

const TopHeadlines = ({ category }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      setError(null);

      const GNEWS_TOKEN = import.meta.env.VITE_GNEWS_TOKEN;

      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&topic=${category}&lang=en&max=10`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors ? errorData.errors[0] : 'Failed to fetch headlines');
        }
        const data = await response.json();
        setHeadlines(data.articles);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchHeadlines();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-5">
      <h2 className="text-center mb-4">Top Headlines in {category}</h2>
      <div className="list-group">
        {headlines.map((headline, index) => (
          <a href={headline.url} key={index} className="list-group-item list-group-item-action">
            {headline.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopHeadlines;
