// src/pages/Work.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

type Cat = {
  title: string;
  slug: 'portraits' | 'street' | 'wedding';
  description: string;
  image: string;
};

const categories: Cat[] = [
  {
    title: 'Portraits',
    slug: 'portraits',
    description: 'Capturing personalities through the lens',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80',
  },
  {
    title: 'Street',
    slug: 'street',
    description: 'Urban life in its raw form',
    image:
      'https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?auto=format&fit=crop&q=80',
  },
  {
    title: 'Wedding',
    slug: 'wedding',
    description: 'Pre-engagements, proposals, and timeless moments',
    image:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80',
  },
];

export default function Work() {
  const location = useLocation();

  // If you ever navigate here from a deep page, make sure we start at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-light mb-16 tracking-tight"
        >
          Portfolio
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="transform transition-all duration-500"
            >
              <Link
                to={`/work/${category.slug}`}
                className="block group relative overflow-hidden focus:outline-none"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label={`Open ${category.title} gallery`}
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.h2
                      className="text-4xl font-light mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {category.title}
                    </motion.h2>
                    <motion.p
                      className="text-gray-300"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {category.description}
                    </motion.p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
