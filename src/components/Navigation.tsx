import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  /* Navbar scroll */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Force close on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    setMenuOpen(false);        // ✅ CLOSE FIRST
    navigate(path);            // ✅ THEN NAVIGATE
  };

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNavigate("/")}
          className="text-xl md:text-2xl font-thin tracking-[0.3em] cursor-pointer"
        >
          INDERPREET
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((item) => (
            <div
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`text-xs tracking-[0.2em] cursor-pointer ${
                isActive(item.path)
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span className={`w-6 h-0.5 bg-white ${menuOpen && "rotate-45 translate-y-[7px]"}`} />
          <span className={`w-6 h-0.5 bg-white ${menuOpen && "opacity-0"}`} />
          <span className={`w-6 h-0.5 bg-white ${menuOpen && "-rotate-45 -translate-y-[7px]"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl py-10 flex flex-col items-center space-y-6">
          {links.map((item) => (
            <div
              key={item.label}
              onClick={() => handleNavigate(item.path)} // ✅ ALWAYS CLOSES
              className={`text-sm tracking-[0.25em] cursor-pointer ${
                isActive(item.path)
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navigation;
