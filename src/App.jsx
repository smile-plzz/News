import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import NewsList from './components/NewsList';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import BackToTopButton from './components/BackToTopButton';
import useLocalStorage from './hooks/useLocalStorage';
import useScroll from './hooks/useScroll';
import useNews from './hooks/useNews';

const App = () => {
  const [topic, setTopic] = useLocalStorage('newsAppTopic', 'general');
  const [country, setCountry] = useLocalStorage('newsAppCountry', 'us');
  const [language, setLanguage] = useLocalStorage('newsAppLanguage', 'en');
  const [darkMode, setDarkMode] = useLocalStorage('newsAppDarkMode', false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [apiSource, setApiSource] = useLocalStorage('newsAppApiSource', 'gnews');

  const [appliedFilters, setAppliedFilters] = useState({
    topic,
    country,
    language,
    searchTerm,
    fromDate,
    toDate,
    apiSource,
  });

  const { showBackToTop, scrollToTop } = useScroll();
  const { articles, loading, error, page, totalResults, handleLoadMore } = useNews(appliedFilters);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setAppliedFilters(prev => ({ ...prev, searchTerm }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      topic,
      country,
      language,
      searchTerm,
      fromDate,
      toDate,
      apiSource,
    });
  };

  const handleShare = async (title, description, url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleApplyFilters={handleApplyFilters} 
      />

      <div className="container mt-4">
        <h1 className="my-4 text-center">Latest News</h1>
        <Filters 
          apiSource={apiSource}
          setApiSource={setApiSource}
          topic={topic}
          setTopic={setTopic}
          country={country}
          setCountry={setCountry}
          language={language}
          setLanguage={setLanguage}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleApplyFilters={handleApplyFilters}
        />

        {loading && articles.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <NewsList articles={articles} handleShare={handleShare} />
        )}

        {loading && articles.length > 0 && (
            <Spinner />
        )}

        {!loading && articles.length > 0 && articles.length < totalResults && (
          <div className="text-center my-4">
            <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  );
};

export default App;
