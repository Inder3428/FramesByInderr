import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid, Camera, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  category: string;
  subcategory: string;
  title: string;
  year: string;
}

// 📸 PORTRAIT IMAGES - Using all your ImageKit URLs
const portraitImages: Image[] = [
  {
    id: '1',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(1).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '2',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(2).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '3',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(3).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '4',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(4).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '5',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(5).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '6',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(6).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '7',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(7).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '8',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(8).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '9',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(10).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '10',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(11).jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '11',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(12).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '12',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(13).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '13',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(14).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '14',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(15).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '15',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(16).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '16',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(17).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '17',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(18).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '18',
    url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(19).JPG',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
];

// 🏙️ STREET PHOTOGRAPHY - Using all your ImageKit URLs
const streetImages: Image[] = [
  {
    id: 'street_2',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(2).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_3',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(3).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_4',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(4).JPG',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_5',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(5).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_6',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(6).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_7',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(7).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_8',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(8).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_9',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(9).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_10',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(10).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_11',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(11).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_12',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(12).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_13',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(13).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
  {
    id: 'street_14',
    url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(14).jpg',
    category: 'street',
    subcategory: 'street photography',
    title: 'Street Stories / Urban Life',
    year: '2024'
  },
];

const images: Record<string, Image[]> = {
  portraits: portraitImages,
  street: streetImages,
};

// 🚀 ADVANCED IMAGEKIT OPTIMIZATION - Final optimized version
const optimizeImageUrl = (url: string, options: {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside' | 'at_max';
  crop?: boolean;
  blur?: number;
  sharpen?: number;
  progressive?: boolean;
} = {}) => {
  const { 
    maxWidth, 
    maxHeight, 
    quality = 95, 
    format = 'auto',
    fit = 'at_max',
    crop = false,
    blur,
    sharpen,
    progressive = true
  } = options;
  
  if (!url.includes('ik.imagekit.io')) return url;
  
  const transformations = [];
  
  // Dimensions
  if (!crop && maxWidth) transformations.push(`w-${maxWidth}`);
  if (!crop && maxHeight) transformations.push(`h-${maxHeight}`);
  
  // Fit mode
  transformations.push(`c-${fit}`);
  
  // Quality and format
  transformations.push(`q-${quality}`);
  transformations.push(`f-${format}`);
  
  // Progressive JPEG for faster loading
  if (progressive) transformations.push(`pr-true`);
  
  // Optional enhancements
  if (blur) transformations.push(`bl-${blur}`);
  if (sharpen) transformations.push(`e-sharpen-${sharpen}`);
  
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?tr=${transformations.join(',')}`;
};

// 🎯 OPTIMIZED COMPONENT WITH MEMOIZATION
const PortfolioCategory = () => {
  const [category, setCategory] = useState<string>('portraits');
  const [viewMode, setViewMode] = useState<'carousel' | 'gallery'>('gallery');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  // Smooth scroll hook
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  // Memoized filtered images for performance
  const filteredImages = useMemo(() => {
    return category ? images[category] || [] : Object.values(images).flat();
  }, [category]);

  // Optimized navigation with preloading
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage?.id);
    setImageLoading(true);
    setIsZoomed(false);
    setImageDimensions(null);
    
    let newIndex;
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < filteredImages.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      setImageLoading(false);
      return;
    }

    setSelectedImage(filteredImages[newIndex]);
    setSelectedIndex(newIndex);

    // Preload next/previous images for smoother experience
    const preloadNext = filteredImages[newIndex + 1];
    const preloadPrev = filteredImages[newIndex - 1];
    
    [preloadNext, preloadPrev].forEach(img => {
      if (img) {
        const preloadImg = new Image();
        preloadImg.src = optimizeImageUrl(img.url, { quality: 85, format: 'webp' });
      }
    });
  }, [filteredImages, selectedImage]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        navigateImage('next');
      } else {
        navigateImage('prev');
      }
    }
    
    setTouchStart(null);
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          navigateImage('prev');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          navigateImage('next');
          break;
        case 'Escape':
          setSelectedImage(null);
          setViewMode('gallery');
          setIsZoomed(false);
          setImageDimensions(null);
          break;
        case ' ':
        case 'z':
        case 'Z':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          document.documentElement.requestFullscreen?.();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, navigateImage, isZoomed]);

  // Optimized Image Card Component
  const ImageCard = ({ image, index }: { image: Image; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm"
        whileHover={{ y: -10 }}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        <motion.img
          src={optimizeImageUrl(image.url, { 
            maxWidth: 600, 
            maxHeight: 800, 
            quality: 85,
            format: 'webp',
            fit: 'cover',
            progressive: true,
            sharpen: 1
          })}
          alt={image.title}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Enhanced overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer backdrop-blur-[2px]"
          onClick={() => {
            setSelectedImage(image);
            setSelectedIndex(index);
            setViewMode('carousel');
            setImageLoading(true);
            setImageDimensions(null);
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <motion.h3 
              className="text-xl font-medium text-white mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {image.title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {image.subcategory} • {image.year}
            </motion.p>
          </div>
          
          {/* View icon */}
          <motion.div
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Enhanced CSS with hardware acceleration and smooth scrolling */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateZ(0); }
          50% { transform: translateY(-10px) translateZ(0); }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            filter: brightness(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1);
            filter: brightness(1.1);
          }
        }

        @keyframes pulse-border {
          0%, 100% { border-color: rgba(255, 255, 255, 0.2); }
          50% { border-color: rgba(255, 255, 255, 0.8); }
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .floating {
          animation: float 6s ease-in-out infinite;
          will-change: transform;
        }

        .glow {
          animation: glow 3s ease-in-out infinite;
          will-change: filter, box-shadow;
        }

        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .backdrop-blur-custom {
          backdrop-filter: blur(20px) saturate(180%) brightness(1.1);
          -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(1.1);
        }

        .image-container {
          perspective: 1000px;
          will-change: transform;
        }

        .image-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .image-3d.zoomed {
          transform: scale(2.2) rotateY(3deg) rotateX(2deg) translateZ(50px);
          z-index: 60;
          cursor: grab;
        }

        .image-3d.zoomed:active {
          cursor: grabbing;
        }

        .image-3d.zoomed .fullscreen-image {
          max-height: none !important;
          max-width: none !important;
        }

        .fullscreen-image {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }

        .portrait-image {
          max-height: 85vh;
          width: auto;
        }

        .landscape-image {
          max-width: 90vw;
          height: auto;
        }

        .glass-morphism {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px) saturate(200%);
          -webkit-backdrop-filter: blur(10px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <main className="pt-24 px-4 md:px-8">
          {/* Enhanced Category Selection */}
          <motion.div 
            className="max-w-7xl mx-auto mb-12 flex justify-center gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {Object.keys(images).map((cat, index) => (
              <motion.button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-3 rounded-full transition-all duration-500 font-medium text-sm uppercase tracking-wider ${
                  category === cat 
                    ? 'bg-white text-black shadow-2xl shadow-white/20' 
                    : 'glass-morphism text-white hover:bg-white/20 pulse-border'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {cat} ({images[cat].length})
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Title + Toggle */}
          <div className="max-w-7xl mx-auto mb-16 flex items-center justify-center relative">
            <motion.h1 
              className="text-6xl md:text-8xl font-extralight tracking-tight capitalize text-center w-full floating bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ y }}
            >
              {category}
            </motion.h1>
            
            <motion.button
              onClick={() => {
                if (viewMode === 'gallery') {
                  if (filteredImages.length > 0) {
                    setSelectedImage(filteredImages[0]);
                    setSelectedIndex(0);
                    setViewMode('carousel');
                    setImageLoading(true);
                    setImageDimensions(null);
                  }
                } else {
                  setViewMode('gallery');
                  setSelectedImage(null);
                  setIsZoomed(false);
                  setImageDimensions(null);
                }
              }}
              className="absolute right-0 p-4 rounded-2xl glass-morphism hover:bg-white/20 transition-all duration-500 glow group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: viewMode === 'carousel' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'carousel' ? (
                  <Grid className="w-7 h-7 text-white group-hover:text-gray-200" />
                ) : (
                  <Camera className="w-7 h-7 text-white group-hover:text-gray-200" />
                )}
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'gallery' || !selectedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-20"
              >
                {filteredImages.map((image, index) => (
                  <ImageCard key={image.id} image={image} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-custom"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Enhanced Loading Animation */}
                <AnimatePresence>
                  {imageLoading && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-50"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-center p-6 image-container">
                  <motion.div
                    key={selectedImage.url}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                    transition={{ 
                      duration: 0.7, 
                      type: "spring", 
                      stiffness: 80,
                      damping: 20
                    }}
                    className={`relative image-3d ${isZoomed ? 'zoomed' : ''}`}
                  >
                    <img
                      src={optimizeImageUrl(selectedImage.url, { 
                        quality: 98,
                        format: 'auto',
                        progressive: true
                      })}
                      alt={selectedImage.title}
                      className={`rounded-3xl shadow-2xl glow cursor-pointer fullscreen-image transition-all duration-500 ${
                        imageDimensions ? 
                          (imageDimensions.height > imageDimensions.width ? 'portrait-image' : 'landscape-image')
                          : 'portrait-image'
                      }`}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        setImageDimensions({
                          width: img.naturalWidth,
                          height: img.naturalHeight
                        });
                        setImageLoading(false);
                      }}
                      onError={() => setImageLoading(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(!isZoomed);
                      }}
                      style={{
                        filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                    
                    {/* Enhanced zoom indicator */}
                    <motion.div
                      className={`absolute top-6 left-6 glass-morphism rounded-full p-3 transition-all duration-300 ${
                        isZoomed ? 'bg-emerald-500/30 border-emerald-400/50' : 'bg-white/10 border-white/20'
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {isZoomed ? (
                        <ZoomOut className="w-5 h-5 text-white" />
                      ) : (
                        <ZoomIn className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                  </motion.div>
                  
                  {/* Enhanced Navigation Buttons */}
                  <motion.button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-8 p-5 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 disabled:opacity-30 glow group"
                    disabled={selectedIndex === 0}
                    whileHover={{ scale: 1.2, x: -8 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <ChevronLeft className="w-8 h-8 text-white group-hover:text-gray-200" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => navigateImage('next')}
                    className="absolute right-8 p-5 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 disabled:opacity-30 glow group"
                    disabled={selectedIndex === filteredImages.length - 1}
                    whileHover={{ scale: 1.2, x: 8 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <ChevronRight className="w-8 h-8 text-white group-hover:text-gray-200" />
                  </motion.button>
                  
                  {/* Enhanced Close Button */}
                  <motion.button
                    onClick={() => {
                      setSelectedImage(null);
                      setViewMode('gallery');
                      setIsZoomed(false);
                      setImageDimensions(null);
                    }}
                    className="absolute top-8 right-8 p-5 rounded-full glass-morphism hover:bg-red-500/20 transition-all duration-300 glow group"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <X className="w-8 h-8 text-white group-hover:text-red-300" />
                  </motion.button>
                  
                  {/* Enhanced Image Info Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm"
                  >
                    <div className="max-w-7xl mx-auto">
                      <motion.h2 
                        className="text-4xl font-light mb-4 floating bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {selectedImage.title}
                      </motion.h2>
                      
                      <motion.div 
                        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="capitalize glass-morphism px-4 py-2 rounded-full text-white">
                            {selectedImage.subcategory}
                          </span>
                          <span className="glass-morphism px-4 py-2 rounded-full">
                            {selectedImage.year}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-xs">
                          <span className="glass-morphism px-3 py-1 rounded-full">
                            {selectedIndex + 1} / {filteredImages.length}
                          </span>
                          <span className="glass-morphism px-3 py-1 rounded-full opacity-75">
                            SPACE/Z: Zoom • A/D: Navigate • F: Fullscreen • ESC: Close
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default PortfolioCategory;