import { useState, useEffect, useCallback } from 'react';

const useNews = (appliedFilters) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [apiSource, setApiSource] = useState(appliedFilters.apiSource);

  const fetchNews = useCallback(async (loadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      const { topic, country, language, searchTerm, fromDate, toDate, apiSource } = appliedFilters;
      const params = new URLSearchParams({
        topic,
        country,
        language,
        searchTerm,
        fromDate,
        toDate,
        page,
        apiSource,
      });

      const response = await fetch(`/api/get-news?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch news');
      }

      const data = await response.json();

      if (loadMore) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      } else {
        setArticles(data.articles);
      }
      setTotalResults(data.totalResults);
      setApiSource(data.apiSource);

    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setTotalResults(0);
    fetchNews(false);
  }, [appliedFilters, fetchNews]);

  useEffect(() => {
    if (page > 1) {
      fetchNews(true);
    }
  }, [page, fetchNews]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return { articles, loading, error, page, totalResults, apiSource, handleLoadMore };
};

export default useNews;
