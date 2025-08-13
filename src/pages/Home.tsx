import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Users, Building, Palette, Video, Edit, Award, Globe, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const servicesBgY = useTransform(scrollYProgress, [0.3, 1], [0, -200]);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle navbar scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.3, 0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.95, 0.95, 1]);

  const projects = [
    {
      title: "Portraits",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
      year: "2024",
    },
    {
      title: "Street",
      image: "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?auto=format&fit=crop&q=80",
      year: "2023",
    },
  ];
    {/*
    {
      title: "Events",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80",
      year: "2023",
    },
    {
      title: "Graduations",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
      year: "2024",
    } */}

  const services = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality photography services for all your needs",
      features: ["Portrait Sessions", "Product Shoots", "Corporate Photography"],
      link: "/contact"
    },
    {
      icon: Users,
      title: "Event Coverage",
      description: "Comprehensive event documentation and storytelling",
      features: ["Weddings", "Corporate Events", "Private Parties"],
      link: "/contact"
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description: "Professional imagery for businesses and brands",
      features: ["Architecture", "Real Estate", "Interior Design"],
       link: "/contact"
    },
    {
      icon: Palette,
      title: "Creative Direction",
      description: "Artistic vision and concept development for unique projects",
      features: ["Concept Development", "Art Direction", "Styling"],
       link: "/contact"
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Cinematic storytelling through motion pictures",
      features: ["Short Films", "Documentaries", "Music Videos"],
       link: "/contact"
    },
    {
      icon: Award,
      title: "Brand Photography",
      description: "Elevate your brand with stunning visual content",
      features: ["Brand Campaigns", "Social Media", "Marketing Materials"],
       link: "/contact"
    },
    {
      icon: Globe,
      title: "Travel & Lifestyle",
      description: "Capturing authentic moments around the world",
      features: ["Travel Photography", "Lifestyle Shoots", "Adventure Sports"],
       link: "/contact"
    },
    {
      icon: Sparkles,
      title: "Fine Art Prints",
      description: "Museum-quality prints for collectors and enthusiasts",
      features: ["Limited Editions", "Gallery Prints", "Custom Framing"],
       link: "/contact"
    }
  ];

  const showcaseImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80",
  ];

  useEffect(() => {
    // Auto-scroll showcase
    const interval = setInterval(() => {
      const track = document.querySelector('.showcase-track');
      if (track) {
        track.scrollLeft += 1;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .showcase-track {
          animation: scroll 40s linear infinite;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      
      {/* Hero Section with Enhanced Animation */}
      <section className="h-screen relative overflow-hidden pt-20">
        {/* Multi-layer Animated Background */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10" />
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 2, -2, 0],
              opacity: [1, 0.9, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-[120%] absolute -top-[10%]"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Floating particles effect */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 h-full flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2 
              }}
            >
              <h1 className="text-[clamp(3rem,10vw,9rem)] font-thin tracking-[0.02em] leading-[0.85]">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  INDER
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  PREET
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            >
              <p className="text-sm tracking-[0.4em] text-gray-300 font-extralight">
                VISUAL STORYTELLER
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-10 py-4 border border-white/20 text-xs tracking-[0.3em] 
                       transition-all duration-500 font-light backdrop-blur-sm"
            >
              EXPLORE PORTFOLIO
            </motion.button>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.3em] text-gray-400 font-extralight">SCROLL</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-thin text-center mb-24"
          >
            SELECTED WORKS
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {projects.map((project, index) => (
              <Link 
                key={project.title}
                to={`/work/${project.title.toLowerCase()}`}
                className="project-item group relative"
              >
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 transition-all duration-500"
                    >
                      {/* <p className="text-xs tracking-[0.3em] text-white/80 font-light">{project.category}</p> */}
                    </motion.div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-thin tracking-[0.1em] mb-2">{project.title}</h3>
                    <p className="text-xs tracking-[0.3em] text-gray-500 font-light">{project.year}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Background Wrapper */}
      <div className="relative">
        {/* Fixed Background Effect */}
        <div className="fixed inset-0 -z-10">
          <motion.div 
            style={{ y: servicesBgY }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/95" />
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
              alt="Services Background"
              className="w-full h-full object-cover opacity-10"
            />
          </motion.div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl font-thin tracking-[0.2em] text-center mb-24"
            >
              SERVICES
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group"
                >
                  <div className="glass-card border border-white/10 rounded-2xl p-8 
                                hover:border-white/30 transition-all duration-700 h-full
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <service.icon className="w-12 h-12 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <h3 className="text-xl font-light tracking-[0.08em] mb-4">{service.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 font-extralight">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-xs text-gray-500 font-light flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 
                                     group-hover:text-white transition-colors duration-500 font-light">
                                      
                        <Link
                  to={service.link}
                  className="inline-block text-sm tracking-widest uppercase hover:text-white transition-colors"
                >
                  Learn More
                </Link>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Auto-scrolling Showcase */}
        <section className="py-32 overflow-hidden relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-thin tracking-[0.2em] text-center mb-24"
          >
            SHOWCASE
          </motion.h2>
          
          <div className="relative">
            <div className="showcase-track flex gap-8">
              {[...showcaseImages, ...showcaseImages].map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="flex-none w-[400px] h-[500px] relative overflow-hidden rounded-xl"
                >
                  <img
                    src={image}
                    alt={`Showcase ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-thin tracking-[0.2em] mb-4">
                INSTAGRAM
              </h2>
              <p className="text-sm tracking-[0.3em] text-gray-400 font-extralight">
                @INDERPREET.PHOTOGRAPHY
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
                >
                  <img
                    src={image}
                    alt={`Instagram ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <p className="text-white text-sm font-light">❤️ {Math.floor(Math.random() * 900 + 100)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 text-xs tracking-[0.3em] 
                         hover:bg-white hover:text-black transition-all duration-500 font-light"
              >
                FOLLOW ON INSTAGRAM
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          id="contact"
          className="min-h-screen flex items-center justify-center px-6 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl mx-auto text-center space-y-10"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-tight leading-[1.1]"
            >
              Let's Bring Your
              <br />
              <span className="font-extralight italic">Imaginations</span> and
              <br />
              Pinterest Saves to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Reality
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-gray-400 text-lg font-extralight leading-relaxed max-w-3xl mx-auto"
            >
              Let's build something amazing together. Open for commissions & collaborations
              because great ideas deserve to be brought to life with passion and purpose.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="px-14 py-5 mt-8 bg-white text-black text-xs tracking-[0.3em] 
                               font-light hover:bg-gray-100 transition-all duration-700
                               hover:shadow-[0_0_80px_rgba(255,255,255,0.3)]">
                START A PROJECT
              </button>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;