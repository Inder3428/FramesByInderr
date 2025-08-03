import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Work = () => {
  const categories = [
    {
      title: "Portraits",
      description: "Capturing personalities through the lens",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
    },
    {
      title: "Street",
      description: "Urban life in its raw form",
      image: "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?auto=format&fit=crop&q=80",
    },
  ];

{/*{
    title: "Events",
    description: "Moments that matter",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80",
  },
  {
    title: "Graduations",
    description: "Celebrating academic milestones",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
  } */}
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
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
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="transform transition-all duration-500"
            >
              <Link 
                to={`/work/${category.title.toLowerCase()}`}
                className="block group relative overflow-hidden"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transform transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500">
                    <motion.h2 
                      className="text-4xl font-light mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {category.title}
                    </motion.h2>
                    <motion.p 
                      className="text-gray-300 mb-4"
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
};

export default Work;