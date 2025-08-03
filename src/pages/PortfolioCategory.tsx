import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid, Image as ImageIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Image {
  id: string;
  url: string;
  category: string;
  subcategory: string;
  title: string;
  year: string;
}

// 📸 PORTRAIT IMAGES - Add your portrait Cloudinary URLs here
const portraitImages: Image[] = [
  {
    id: '6',
    url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/potrait_6_xud5ow.jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/potrait_7_lkbe4r.jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '14',
    url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251990/potrait_14_hlsmkq.jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  {
    id: '19',
    url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251987/potrait_19_kixfz1.jpg',
    category: 'portraits',
    subcategory: 'outdoor',
    title: 'Outdoor Portraits / Pakistani Tradition',
    year: '2024'
  },
  // 🖼️ ADD MORE PORTRAIT IMAGES HERE following the same pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/your_image_public_id.jpg',
  //   category: 'portraits',
  //   subcategory: 'outdoor', // or 'studio', 'candid', etc.
  //   title: 'Your Image Title',
  //   year: '2024'
  // },
];

// 🏙️ STREET PHOTOGRAPHY - Add your street photography Cloudinary URLs here
const streetImages: Image[] = [
  // 📷 ADD STREET IMAGES HERE following this pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/street_image_public_id.jpg',
  //   category: 'street',
  //   subcategory: 'street photography', // or 'urban life', 'documentary', etc.
  //   title: 'Street Stories / Urban Life',
  //   year: '2024'
  // },
];

// 🌆 URBAN PHOTOGRAPHY - Add your urban/architecture Cloudinary URLs here
const urbanImages: Image[] = [
  // 🏢 ADD URBAN IMAGES HERE following this pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/urban_image_public_id.jpg',
  //   category: 'urban',
  //   subcategory: 'architecture', // or 'cityscape', 'buildings', etc.
  //   title: 'Urban Landscapes / City Architecture',
  //   year: '2024'
  // },
];

// 🌿 NATURE & LANDSCAPE - Add your nature photography Cloudinary URLs here
const natureImages: Image[] = [
  // 🌳 ADD NATURE IMAGES HERE following this pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/nature_image_public_id.jpg',
  //   category: 'nature',
  //   subcategory: 'landscape', // or 'wildlife', 'mountains', 'seascape', etc.
  //   title: 'Natural Beauty / Landscapes',
  //   year: '2024'
  // },
];

// 🎨 CREATIVE/ARTISTIC - Add your creative/artistic photography here
const creativeImages: Image[] = [
  // 🎭 ADD CREATIVE IMAGES HERE following this pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/creative_image_public_id.jpg',
  //   category: 'creative',
  //   subcategory: 'artistic', // or 'abstract', 'conceptual', etc.
  //   title: 'Creative Expression / Artistic Vision',
  //   year: '2024'
  // },
];

// 💑 WEDDING/EVENTS - Add your wedding/event photography here
const weddingImages: Image[] = [
  // 💒 ADD WEDDING IMAGES HERE following this pattern:
  // {
  //   id: 'unique_id',
  //   url: 'https://res.cloudinary.com/djei2mu1o/image/upload/v1754251991/wedding_image_public_id.jpg',
  //   category: 'wedding',
  //   subcategory: 'ceremony', // or 'reception', 'couples', etc.
  //   title: 'Wedding Moments / Celebrations',
  //   year: '2024'
  // },
];

const images: Record<string, Image[]> = {
  portraits: portraitImages,
  street: streetImages,
  urban: urbanImages,
  nature: natureImages,
  creative: creativeImages,
  wedding: weddingImages,
  // 🎯 ADD NEW CATEGORIES HERE:
  // Just add the category name and reference the array you created above
  // example: sports: sportsImages,
};

const PortfolioCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'carousel' | 'gallery'>('gallery');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const categoryImages = category ? images[category] || [] : Object.values(images).flat();
  const filteredImages = categoryImages;

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage?.id);
    if (direction === 'prev' && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedImage(filteredImages[newIndex]);
      setSelectedIndex(newIndex);
    } else if (direction === 'next' && currentIndex < filteredImages.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedImage(filteredImages[newIndex]);
      setSelectedIndex(newIndex);
    }
  }, [filteredImages, selectedImage]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          setSelectedImage(null);
          setViewMode('gallery');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, navigateImage]);

  const ImageCard = ({ image, index }: { image: Image; index: number }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-900"
      >
        <motion.img
          src={image.url}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={() => {
            setSelectedImage(image);
            setSelectedIndex(index);
            setViewMode('carousel');
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-medium text-white">{image.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{image.subcategory}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 px-4 md:px-8">
        {/* Centered Category Title + Toggle */}
        <div className="max-w-7xl mx-auto mb-10 flex items-center justify-center relative">
          <h2 className="text-4xl font-light tracking-tight capitalize text-center w-full">
            {category || 'Gallery'}
          </h2>
          <motion.button
            onClick={() => {
              if (viewMode === 'gallery') {
                setSelectedImage(filteredImages[0]);
                setSelectedIndex(0);
                setViewMode('carousel');
              } else {
                setViewMode('gallery');
                setSelectedImage(null);
              }
            }}
            className="absolute right-0 p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {viewMode === 'carousel' ? (
              <Grid className="w-6 h-6 text-white" />
            ) : (
              <ImageIcon className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'gallery' || !selectedImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-16"
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
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  key={selectedImage.url}
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                />
                <motion.button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  disabled={selectedIndex === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  disabled={selectedIndex === filteredImages.length - 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedImage(null);
                    setViewMode('gallery');
                  }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent"
                >
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-light mb-2">{selectedImage.title}</h2>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="capitalize">{selectedImage.subcategory}</span>
                      <span>{selectedIndex + 1} / {filteredImages.length}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PortfolioCategory;