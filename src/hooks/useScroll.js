import { useState, useEffect } from 'react';

const useScroll = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { showBackToTop, scrollToTop };
};

export default useScroll;
