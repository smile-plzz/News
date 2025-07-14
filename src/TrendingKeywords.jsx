import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const processText = (text) => {
  const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'is', 'are', 'was', 'were', 'for', 'of', 'to', 'and', 'a', 'in', 'it', 'that', 'with', 'as', 'at', 'by', 'from', 'about', 'more', 'has', 'have', 'had', 'but', 'or', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs']);
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/); // Split into words

  const wordCounts = {};
  words.forEach(word => {
    if (word && !stopWords.has(word) && isNaN(word)) { // Exclude stop words and numbers
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });

  // Get the top 10 keywords
  const sortedKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  return sortedKeywords;
};

const TrendingKeywords = () => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndProcessKeywords = async () => {
      setLoading(true);
      setError(null);

      const GNEWS_TOKEN = import.meta.env.VITE_GNEWS_TOKEN;
      const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;
      const THENEWSAPI_TOKEN = import.meta.env.VITE_THENEWSAPI_TOKEN;

      let titles = '';
      let success = false;

      // Try GNews first
      if (GNEWS_TOKEN) {
        try {
          const gnewsResponse = await fetch(`https://gnews.io/api/v4/top-headlines?token=${GNEWS_TOKEN}&lang=en&max=100`);
          if (!gnewsResponse.ok) {
            const errorData = await gnewsResponse.json();
            throw new Error(errorData.errors ? errorData.errors[0] : 'Failed to fetch trending data from GNews');
          }
          const gnewsData = await gnewsResponse.json();
          titles = gnewsData.articles.map(article => article.title).join(' ');
          success = true;
        } catch (err) {
          console.error("Error fetching from GNews:", err);
          setError(err.message);
        }
      }

      // If GNews failed or no token, try TheNewsAPI
      if (!success && THENEWSAPI_TOKEN) {
        try {
          const thenewsapiResponse = await fetch(`https://api.thenewsapi.com/v1/news/top?api_token=${THENEWSAPI_TOKEN}&language=en&limit=100`);
          if (!thenewsapiResponse.ok) {
            const errorData = await thenewsapiResponse.json();
            throw new Error(errorData.message || 'Failed to fetch trending data from TheNewsAPI');
          }
          const thenewsapiData = await thenewsapiResponse.json();
          titles = thenewsapiData.data.map(article => article.title).join(' ');
          success = true;
        } catch (err) {
          console.error("Error fetching from TheNewsAPI:", err);
          setError(err.message);
        }
      }

      // If TheNewsAPI failed or no token, try NewsAPI
      if (!success && NEWSAPI_KEY) {
        try {
          const newsapiResponse = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${NEWSAPI_KEY}&language=en&pageSize=100`);
          if (!newsapiResponse.ok) {
            const errorData = await newsapiResponse.json();
            throw new Error(errorData.message || 'Failed to fetch trending data from NewsAPI');
          }
          const newsapiData = await newsapiResponse.json();
          titles = newsapiData.articles.map(article => article.title).join(' ');
          success = true;
        } catch (err) {
          console.error("Error fetching from NewsAPI:", err);
          setError(err.message);
        }
      }

      if (success) {
        const processedKeywords = processText(titles);
        setKeywords(processedKeywords);
        setError(null); // Clear any previous errors if successful
      } else {
        setError('Failed to fetch trending keywords from all available APIs.');
        setKeywords([]);
      }
      setLoading(false);
    };

    fetchAndProcessKeywords();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Analyzing trends...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="my-5">
      <h2 className="text-center mb-4">Top 10 Trending Keywords</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={keywords}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Keyword Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendingKeywords;
