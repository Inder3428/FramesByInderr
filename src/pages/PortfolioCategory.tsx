'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

// ===========================================================
// 📸 IMAGE TYPE
// ===========================================================
interface Image {
  id: string;
  url: string;
  title: string;
  category: string;
  subcategory: string;
  year: string;
}

// ===========================================================
// 🖼️ IMAGE COLLECTIONS
// ===========================================================
const portraitImages: Image[] = [
  { id: '1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(1).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Pakistani Tradition', year: '2024' },
  { id: '2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(2).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Natural Glow', year: '2024' },
  { id: '3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(3).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Soft Tones', year: '2024' },
  { id: '4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(4).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Golden Hour', year: '2024' },
  { id: '5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(5).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Aesthetic Glance', year: '2024' },
  { id: '6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(6).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Peaceful Soul', year: '2024' },
  { id: '7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(7).jpg', category: 'portraits', subcategory: 'outdoor', title: 'Dreamy Focus', year: '2024' },
];

const streetImages: Image[] = [
  { id: '10', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(2).jpg', category: 'street', subcategory: 'street photography', title: 'Neon Nights', year: '2024' },
  { id: '11', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(3).jpg', category: 'street', subcategory: 'street photography', title: 'Rainy City', year: '2024' },
  { id: '12', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(4).JPG', category: 'street', subcategory: 'street photography', title: 'City Geometry', year: '2024' },
  { id: '13', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(5).jpg', category: 'street', subcategory: 'street photography', title: 'Crosswalk Life', year: '2024' },
  { id: '14', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(6).jpg', category: 'street', subcategory: 'street photography', title: 'Urban Motion', year: '2024' },
  { id: '15', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(7).jpg', category: 'street', subcategory: 'street photography', title: 'Street Reflections', year: '2024' },
  { id: '16', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(8).jpg', category: 'street', subcategory: 'street photography', title: 'Evening Shadows', year: '2024' },
];

const images: Record<string, Image[]> = {
  portraits: portraitImages,
  street: streetImages,
};

// ===========================================================
// ⚙️ OPTIMIZATION HELPER
// ===========================================================
const optimizeImageUrl = (url: string, width = 900) =>
  url.includes('ik.imagekit.io') ? `${url}?tr=w-${width},q-90,f-webp,pr-true` : url;

// ===========================================================
// 🌌 COMPONENT
// ===========================================================
export default function PortfolioGallery() {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [category, setCategory] = useState<'portraits' | 'street'>('portraits');
  const [selected, setSelected] = useState<Image | null>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // ===========================================================
  // 🌀 PAGE PRELOADER
  // ===========================================================
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ===========================================================
  // 🧠 LENIS SMOOTH SCROLLING
  // ===========================================================
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    let frame: number;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ===========================================================
  // 🔄 CATEGORY HANDLER
  // ===========================================================
  useEffect(() => {
    if (routeCategory && Object.keys(images).includes(routeCategory))
      setCategory(routeCategory as any);
  }, [routeCategory]);

  // ===========================================================
  // 🧭 HIDE CONTROLS TIMER
  // ===========================================================
  const resetHideTimer = useCallback(() => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
  }, []);

  useEffect(() => {
    if (selected) {
      window.addEventListener('mousemove', resetHideTimer);
      window.addEventListener('touchstart', resetHideTimer);
      resetHideTimer();
    }
    return () => {
      window.removeEventListener('mousemove', resetHideTimer);
      window.removeEventListener('touchstart', resetHideTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [selected]);

  // ===========================================================
  // 🎞️ FILTER + SCROLL
  // ===========================================================
  const filteredImages = useMemo(() => images[category], [category]);
  const parallaxImages = useMemo(
    () => filteredImages.slice(0, 7).map((img) => ({ src: optimizeImageUrl(img.url, 1200), alt: img.title })),
    [filteredImages]
  );

  const next = () => setIndex((i) => Math.min(i + 1, filteredImages.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const selectedImage = selected ? filteredImages[index] : null;

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // ===========================================================
  // 🧩 PRELOADER
  // ===========================================================
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="text-white text-lg sm:text-2xl font-light tracking-wider text-center"
        >
          Loading your experience...
        </motion.div>
      </div>
    );
  }

  // ===========================================================
  // 🌆 MAIN RENDER
  // ===========================================================
  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 🌌 Zoom Parallax in Container */}
      <div className="relative z-10">
        <div className="max-w-screen-xl mx-auto pt-[120px] pb-20 sm:pt-[160px] sm:pb-24 lg:pt-[180px] lg:pb-32 px-4 sm:px-6 lg:px-8">
          <ZoomParallax images={parallaxImages} />
        </div>
      </div>

      {/* 🔘 Category Selector */}
      <div className="flex justify-center gap-4 py-6 sticky top-0 bg-black/70 backdrop-blur-md z-20">
        {Object.keys(images).map((cat) => (
          <motion.button
            key={cat}
            onClick={() => {
              setCategory(cat as any);
              setSelected(null);
              setZoomed(false);
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`px-6 py-2 rounded-full font-medium uppercase text-sm transition-all ${
              category === cat
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* 🖼️ Gallery Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pt-10 pb-[100px] sm:px-10 sm:pb-[140px]"
        style={{ scale }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {filteredImages.map((img, i) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => {
              setSelected(img);
              setIndex(i);
            }}
          >
            <motion.img
              src={optimizeImageUrl(img.url, 600)}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
              <p className="text-sm font-medium">{img.title}</p>
              <p className="text-xs text-gray-300">{img.subcategory} • {img.year}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🧭 FULLSCREEN VIEW */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={resetHideTimer}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          >
            <img
              src={optimizeImageUrl(selectedImage?.url || '', 1200)}
              alt={selectedImage?.title}
              onClick={() => setZoomed((z) => !z)}
              className={`max-w-[90vw] max-h-[85vh] rounded-2xl object-contain transition-transform duration-500 cursor-pointer ${
                zoomed ? 'scale-150' : ''
              }`}
            />

            {/* Controls visible only if showUI */}
            <AnimatePresence>
              {showUI && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={prev}
                    disabled={index === 0}
                    className="absolute left-4 sm:left-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000]"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={next}
                    disabled={index === filteredImages.length - 1}
                    className="absolute right-4 sm:right-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000]"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setSelected(null);
                      setZoomed(false);
                    }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white/10 hover:bg-red-500/30 rounded-full backdrop-blur-md z-[10001] transition-all duration-300 cursor-pointer"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[10000]"
                  >
                    <h3 className="text-lg font-light">{selectedImage?.title}</h3>
                    <p className="text-sm text-gray-400">{selectedImage?.subcategory} • {selectedImage?.year}</p>
                    <p className="text-xs mt-2 opacity-70">← / → Navigate • Z Zoom • F Fullscreen • ESC Close</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
