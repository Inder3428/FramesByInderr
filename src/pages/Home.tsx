import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Building, Camera, Users } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
      link: "/contact"
    },
    {
      icon: Users,
      title: "Event Coverage",
      description: "Comprehensive event documentation and storytelling",
      link: "/contact"
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description: "Professional imagery for businesses and brands",
      link: "/contact"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate style cards on scroll
      gsap.from(".style-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".styles-section",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      // Animate service cards
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);


  const showcaseImages = [
    "/Images/Street/Street (6).jpg",
    "/Images/Street/Street (4).JPG",
    "/Images/Street/Street (7).jpg",
    "/Images/Street/Street (5).jpg",

  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      // Animate showcase images
      gsap.to(".showcase-image", {
        xPercent: -100,
        ease: "none",
        duration: 20,
        repeat: -1,
        scrollTrigger: {
          trigger: ".showcase-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black z-10" />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full"
          >
            <img
              src="/Images/Potraits/BG.jpg"
              alt="Background"
              className="w-full h-full object-cover opacity-78"
            />
          </motion.div>
        </div>

        <div className="text-center space-y-8 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl md:text-9xl font-light tracking-tighter"
          >
            INDERPREET
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-xl tracking-widest uppercase text-gray-400"
          >
            Photography Portfolio
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sm tracking-widest"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section className="py-32 px-4 projects-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-32">
          {projects.map((project) => (
            <Link 
              key={project.title}
              to={`/work/${project.title.toLowerCase()}`}
              className="project-item group relative"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[80vh] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <h2 className="text-6xl font-light tracking-tight mb-4">{project.title}</h2>
                <p className="text-sm tracking-widest uppercase text-gray-300">{project.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Auto-scrolling Showcase */}
      <section className="py-32 overflow-hidden showcase-container">
        <div className="flex space-x-8">
          {[...showcaseImages, ...showcaseImages].map((image, index) => (
            <div
              key={index}
              className="showcase-image flex-none w-[400px] h-[600px] relative rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Showcase ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center mb-16"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="service-card bg-white/5 rounded-lg p-8 hover:bg-white/10 transition-colors duration-300"
                whileHover={{ y: -10 }}
              >
                <service.icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-block text-sm tracking-widest uppercase hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-screen flex items-center justify-center text-center px-4"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Let's Bring Your Imaginations and Pinterest Saves to reality..</h2>
          <p className="text-gray-400 text-lg">Let’s Build Something Amazing! Open for commissions & collaborations
            <br></br>
            because great ideas deserve to be brought to life with passion and purpose.</p>
          <Link 
            to="/contact"
            className="inline-block px-12 py-4 border border-white/20 hover:border-white/40 transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            Ready? Let’s talk!
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;