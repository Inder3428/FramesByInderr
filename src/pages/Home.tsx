import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Camera,
  Users,
  Building,
  Palette,
  Video,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import * as THREE from "three";

/* ============================================================================
   StarBorder – animated shooting-star border
============================================================================ */
interface StarBorderProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: any;
}
function StarBorder({
  as = "button",
  className = "",
  color = "hsl(0 0% 100%)",
  speed = "6s",
  children,
  onClick,
  ...props
}: StarBorderProps) {
  const Component = as as any;
  return (
    <>
      <style>{`
        @keyframes star-movement-bottom { 0% { transform: translateX(0); opacity: 1 } 100% { transform: translateX(250%); opacity: 0 } }
        @keyframes star-movement-top { 0% { transform: translateX(0); opacity: 1 } 100% { transform: translateX(-250%); opacity: 0 } }
        .star-border-bottom { animation: star-movement-bottom linear infinite }
        .star-border-top { animation: star-movement-top linear infinite }
      `}</style>
      <Component
        className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] cursor-pointer ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* bottom sweep */}
        <div
          className="star-border-bottom absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        {/* top sweep */}
        <div
          className="star-border-top absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        <div className="relative border border-white/20 text-white text-center text-base py-4 px-6 rounded-[20px] bg-gradient-to-b from-black/90 to-black/80">
          {children}
        </div>
      </Component>
    </>
  );
}

/* ============================================================================
   Home
============================================================================ */
const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax transforms (guarded by containerRef)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  /* ==========================================================================
     Data (memoized so arrays aren't re-created)
  ========================================================================== */
  const projects = useMemo(
    () => [
      {
        title: "Portraits",
        image:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
        year: "2024",
        link: "/work/portraits",
      },
      {
        title: "Street",
        image:
          "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?auto=format&fit=crop&q=80",
        year: "2023",
        link: "/work/street",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Camera,
        title: "Professional Photography",
        description: "High-quality photography services for all your needs",
        features: ["Portrait Sessions", "Product Shoots", "Corporate Photography"],
      },
      {
        icon: Users,
        title: "Event Coverage",
        description: "Comprehensive event documentation and storytelling",
        features: ["Weddings", "Corporate Events", "Private Parties"],
      },
      {
        icon: Building,
        title: "Commercial Projects",
        description: "Professional imagery for businesses and brands",
        features: ["Architecture", "Real Estate", "Interior Design"],
      },
      {
        icon: Palette,
        title: "Creative Direction",
        description:
          "Artistic vision and concept development for unique projects",
        features: ["Concept Development", "Art Direction", "Styling"],
      },
      {
        icon: Video,
        title: "Video Production",
        description: "Cinematic storytelling through motion pictures",
        features: ["Short Films", "Documentaries", "Music Videos"],
      },
      {
        icon: Award,
        title: "Brand Photography",
        description: "Elevate your brand with stunning visual content",
        features: ["Brand Campaigns", "Social Media", "Marketing Materials"],
      },
      {
        icon: Globe,
        title: "Travel & Lifestyle",
        description: "Capturing authentic moments around the world",
        features: ["Travel Photography", "Lifestyle Shoots", "Adventure Sports"],
      },
      {
        icon: Sparkles,
        title: "Fine Art Prints",
        description: "Museum-quality prints for collectors and enthusiasts",
        features: ["Limited Editions", "Gallery Prints", "Custom Framing"],
      },
    ],
    []
  );

  const showcaseImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80",
    ],
    []
  );

  /* ==========================================================================
     Three.js dotted wave (responsive, leak-free, reduced work on mobile)
  ========================================================================== */
  useEffect(() => {
    if (!canvasRef.current || !contactSectionRef.current) return;

    // reduce points on small screens
    const width = contactSectionRef.current.clientWidth;
    const isMobile = width < 768;

    const SEPARATION = isMobile ? 140 : 150;
    const AMOUNTX = isMobile ? 24 : 40;
    const AMOUNTY = isMobile ? 36 : 60;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      1, // temp; updated below
      1,
      10000
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvasRef.current,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // cap DPR

    // size to section
    const resize = () => {
      const el = contactSectionRef.current!;
      const w = el.clientWidth;
      const h = Math.max(el.clientHeight, 400);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    // geometry
    const positions: number[] = [];
    const colors: number[] = [];
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        );
        // light gray
        colors.push(0.78, 0.78, 0.78);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 6 : 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let raf = 0;
    let count = 0;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!prefersReduced) {
        const pos = geometry.attributes.position.array as Float32Array;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const idx = i * 3;
            pos[idx + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }
        (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        count += 0.1;
      }
      renderer.render(scene, camera);
    };

    // resize observer keeps canvas synced with section
    const ro = new ResizeObserver(() => resize());
    ro.observe(contactSectionRef.current);

    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  /* ==========================================================================
     Handlers
  ========================================================================== */
  const handleNavigateToContact = () => navigate("/contact");
  const handleProjectClick = (link: string) => navigate(link);

  /* ==========================================================================
     Global styles (lightweight)
  ========================================================================== */
  const IG_IMAGES = useMemo(
    () => [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80",
    ],
    []
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap');
        * { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif }

        .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px) }

        /* CSS-only marquee track (no JS timers). Duplicate rows to loop seamlessly */
        .showcase-strip { display:flex; gap:2rem; will-change: transform }
        .marquee {
          --speed: 40s;
          animation: marquee var(--speed) linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none }
        }
      `}</style>

      {/* ============================ Hero ============================ */}
      <section className="h-screen relative overflow-hidden pt-20">
        {/* Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          <motion.div
            animate={{ scale: [1, 1.06, 1], rotate: [0, 1.8, -1.8, 0], opacity: [1, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-[120%] absolute -top-[10%]"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 h-full flex items-center justify-center pointer-events-none"
        >
          <div className="text-center space-y-8 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              <h1 className="text-[clamp(3rem,10vw,9rem)] font-thin tracking-[0.02em] leading-[0.85]">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  INDER
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  PREET
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-sm tracking-[0.4em] text-gray-300 font-extralight"
            >
              VISUAL STORYTELLER
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/work")}
              className="mt-12 px-10 py-4 border border-white/20 text-xs tracking-[0.3em] font-light backdrop-blur-sm cursor-pointer"
            >
              EXPLORE PORTFOLIO
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.3em] text-gray-400 font-extralight">
              SCROLL
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================ Projects ============================ */}
      <section id="work" className="py-32 px-6 relative bg-black">
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
              <div key={project.title} className="group relative">
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="cursor-pointer"
                  onClick={() => handleProjectClick(project.link)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-thin tracking-[0.1em] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs tracking-[0.3em] text-gray-500 font-light">
                      {project.year}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Services ============================ */}
      <section id="services" className="py-32 px-6 relative bg-black">
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
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group"
              >
                <div className="glass-card border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-700 h-full hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                    <service.icon className="w-12 h-12 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h3 className="text-xl font-light tracking-[0.08em] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6 font-extralight">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-xs text-gray-500 font-light flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-500 font-light cursor-pointer"
                    onClick={handleNavigateToContact}
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Showcase (CSS marquee) ============================ */}
      <section className="py-32 overflow-hidden relative bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-thin tracking-[0.2em] text-center mb-24"
        >
          SHOWCASE
        </motion.h2>

        {/* two identical rows, each is 200% width and slides left */}
        <div className="relative">
          <div className="showcase-strip marquee">
            {[...showcaseImages, ...showcaseImages].map((image, i) => (
              <motion.div
                key={`row1-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="flex-none w-[360px] h-[460px] relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                <img
                  src={image}
                  alt={`Showcase ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Instagram ============================ */}
      <section className="py-32 px-6 relative bg-black">
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
              @Frames_by_Inder
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {IG_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square overflow-hidden cursor-pointer group"
              >
                <img
                  src={image}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 pointer-events-none">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-light">
                      ❤️ {Math.floor(Math.random() * 900 + 100)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="px-8 py-3 border border-white/20 text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 font-light cursor-pointer"
            >
              FOLLOW ON INSTAGRAM
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ============================ Contact + Three.js BG ============================ */}
      <section
        id="contact"
        ref={contactSectionRef}
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 bg-black/40 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-5xl mx-auto text-center space-y-10 relative"
          style={{ zIndex: 10 }}
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
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
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-400 text-lg font-extralight leading-relaxed max-w-3xl mx-auto"
          >
            Let's build something amazing together. Open for commissions &
            collaborations because great ideas deserve to be brought to life
            with passion and purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <StarBorder
              as="button"
              onClick={handleNavigateToContact}
              color="hsl(0 0% 100%)"
              speed="6s"
              className="text-xs tracking-[0.3em] font-light"
            >
              START A PROJECT
            </StarBorder>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
