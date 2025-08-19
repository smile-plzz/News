import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../constants';

const AppProvider = ({ children }) => {
  const [topic, setTopic] = useLocalStorage(LOCAL_STORAGE_KEYS.TOPIC, 'general');
  const [country, setCountry] = useLocalStorage(LOCAL_STORAGE_KEYS.COUNTRY, 'us');
  const [language, setLanguage] = useLocalStorage(LOCAL_STORAGE_KEYS.LANGUAGE, 'en');
  const [darkMode, setDarkMode] = useLocalStorage(LOCAL_STORAGE_KEYS.DARK_MODE, false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [apiSource, setApiSource] = useLocalStorage(LOCAL_STORAGE_KEYS.API_SOURCE, 'gnews');

  // Apply dark mode to body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Check for system preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE)) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Set initial dark mode based on system preference if not set
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE)) {
      setDarkMode(mediaQuery.matches);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setDarkMode]);

  const value = {
    topic,
    setTopic,
    country,
    setCountry,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    searchTerm,
    setSearchTerm,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    apiSource,
    setApiSource,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;