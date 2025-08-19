import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppProvider from './context/AppProvider.jsx';
import Layout from './components/Layout.jsx';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <AppProvider>
      <Helmet>
        <title>DailyDigest - Your Daily News Source</title>
        <meta name="description" content="Get your daily dose of news with DailyDigest. Covering various topics and countries." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </Helmet>
      <Layout />
    </AppProvider>
  );
};

export default App;
