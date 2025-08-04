import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider.jsx';
import MainContent from './components/MainContent.jsx';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <AppProvider>
      <Helmet>
        <title>DailyDigest - Your Daily News Source</title>
        <meta name="description" content="Get your daily dose of news with DailyDigest. Covering various topics and countries." />
      </Helmet>
      <MainContent />
    </AppProvider>
  );
};

export default App;
