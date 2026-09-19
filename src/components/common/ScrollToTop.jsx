import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map();

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(location.key, window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key]);

  useLayoutEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
      return;
    }

    const savedY = scrollPositions.get(location.key);
    if (savedY === undefined) return;

    let rafId;
    const tryRestore = (attemptsLeft) => {
      window.scrollTo(0, savedY);
      if (attemptsLeft > 0) {
        rafId = requestAnimationFrame(() => tryRestore(attemptsLeft - 1));
      }
    };
    tryRestore(5);

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.key, navigationType]);

  return null;
}
