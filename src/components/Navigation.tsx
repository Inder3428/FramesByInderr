import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

const links = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-xl md:text-2xl font-thin tracking-[0.3em] cursor-pointer relative z-[101]"
        >
          <Link to="/">INDERPREET</Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 md:gap-10">
          {links.map((item) => (
            <motion.a
              key={item.label}
              href={item.path}
              whileHover={{ opacity: 0.7 }}
              whileTap={{ scale: 0.95 }}
              className={`text-[10px] md:text-xs font-light tracking-[0.2em] transition-all duration-300 relative z-[101] ${
                location.hash === item.path.replace('/#', '#')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
