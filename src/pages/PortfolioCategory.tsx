'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

// ===========================================================
// 📸 TYPE
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
// 📷 IMAGE DATA
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

// 💍 Future categories (ready to plug in)
/*
const weddingImages: Image[] = [];
const eventsImages: Image[] = [];
*/

const images: Record<string, Image[]> = {
  portraits: portraitImages,
  street: streetImages,
  // wedding: weddingImages,
  // events: eventsImages,
};

// ===========================================================
// ⚙️ HELPERS
// ===========================================================
const optimizeImageUrl = (url: string, width = 900) =>
  url.includes('ik.imagekit.io') ? `${url}?tr=w-${width},q-90,f-webp,pr-true` : url;

// ===========================================================
// 🌆 COMPONENT
// ===========================================================
export default function PortfolioGallery() {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [category, setCategory] = useState<'portraits' | 'street'>('portraits');
  const [selected, setSelected] = useState<Image | null>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // 🚀 Auto-switch category via route
  useEffect(() => {
    if (routeCategory && Object.keys(images).includes(routeCategory))
      setCategory(routeCategory as any);
  }, [routeCategory]);

  // ✨ Lenis smooth scrolling (throttled)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    let frame: number;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, []);

  // 🎹 Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, filteredImages.length - 1));
      if (e.key.toLowerCase() === 'z' || e.key === ' ') setZoomed((z) => !z);
      if (e.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected]);

  // Auto-hide fullscreen controls after 3 s inactivity
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

  const filteredImages = useMemo(() => images[category], [category]);
  const parallaxImages = useMemo(
    () => filteredImages.slice(0, 7).map((img) => ({ src: optimizeImageUrl(img.url, 1200), alt: img.title })),
    [filteredImages]
  );

  const next = () => setIndex((i) => Math.min(i + 1, filteredImages.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const selectedImage = selected ? filteredImages[index] : null;

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // ===========================================================
  // 🎨 RENDER
  // ===========================================================
  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      {/* 🌌 Zoom Parallax Hero */}
      <ZoomParallax images={parallaxImages} />

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
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-10"
        style={{ scale }}
      >
        {filteredImages.map((img, i) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.03 }}
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
                  {/* Prev */}
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

                  {/* Next */}
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

                  {/* Close */}
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

                  {/* Info */}
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
