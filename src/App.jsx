import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider.jsx';
import MainContent from './components/MainContent.jsx';

const App = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
