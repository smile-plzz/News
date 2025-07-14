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

      try {
        // Fetch top headlines to analyze for keywords
        const response = await fetch('https://gnews.io/api/v4/top-headlines?token=70f8f36aed5c9ccfb722c933455bc237&lang=en&max=100');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors ? errorData.errors[0] : 'Failed to fetch trending data');
        }
        const data = await response.json();
        
        // Process titles to extract keywords
        const titles = data.articles.map(article => article.title).join(' ');
        const processedKeywords = processText(titles);
        setKeywords(processedKeywords);

      } catch (err) {
        console.error("Error processing keywords:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
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
