import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const Visibilidad_nav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const navBarCollapse = document.getElementById('navbarSupportedContent');
    const heroArea = document.getElementById('heroArea');

    const checkHeight = () => {
      if (window.innerHeight < window.innerHeight * 0.78) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, [location]);

  const handleToggle = () => {
    const heroArea = document.getElementById('heroArea');
    const navBarCollapse = document.getElementById('navbarSupportedContent');

    if (heroArea) {
      heroArea.classList.toggle('min-height-78vh');
    }

    if (heroArea && heroArea.classList.contains('min-height-78vh')) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (navBarCollapse && navBarCollapse.classList.contains('show')) {
      navBarCollapse.classList.remove('show');
    }
  };

  return { isVisible, handleToggle };
};
