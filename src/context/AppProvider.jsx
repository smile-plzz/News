import React, { useState } from 'react';
import AppContext from './AppContext';
import useLocalStorage from '../hooks/useLocalStorage';

const AppProvider = ({ children }) => {
  const [topic, setTopic] = useLocalStorage('newsAppTopic', 'general');
  const [country, setCountry] = useLocalStorage('newsAppCountry', 'us');
  const [language, setLanguage] = useLocalStorage('newsAppLanguage', 'en');
  const [darkMode, setDarkMode] = useLocalStorage('newsAppDarkMode', false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [apiSource, setApiSource] = useLocalStorage('newsAppApiSource', 'gnews');

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