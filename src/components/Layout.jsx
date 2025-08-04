import React from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import BackToTopButton from './BackToTopButton';

const Layout = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <BackToTopButton />
    </>
  );
};

export default Layout;