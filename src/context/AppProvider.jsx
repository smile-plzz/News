import React, { useState } from 'react';
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