// src/pages/Home.tsx
'use client';

import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";

/* ============================================================================
   ImageKit optimizer
   - Appends or merges transform query params safely
   - Defaults target width to 800 for grids / thumbs
============================================================================ */
function optimizeImageUrl(url: string, width = 800, quality = 80) {
  const tr = `tr=w-${width},q-${quality},f-webp,pr-true`;
  return url.includes("?") ? `${url}&${tr}` : `${url}?${tr}`;
}

/* ============================================================================
   Your master image pools (PORTRAITS / STREET / WEDDING)
   - Pulled from your provided lists
   - Used everywhere we need images (projects cards, showcase, instagram)
============================================================================ */
const PORTRAITS = [
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(13).JPG?updatedAt=1755041766662",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(13).JPG?updatedAt=1755041766662",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(6).jpg?updatedAt=1755041766602",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(12).JPG?updatedAt=1755041766232",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(14).JPG?updatedAt=1755041765463",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(1).jpg?updatedAt=1755041765063",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(7).jpg?updatedAt=1755041762881",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(2).jpg?updatedAt=1755041762003",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(4).jpg?updatedAt=1755041761815",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(3).jpg?updatedAt=1755041761193",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(18).JPG?updatedAt=1755041757640",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(19).JPG?updatedAt=1755041757046",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(10).jpg?updatedAt=1755041744234",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(9).jpg?updatedAt=1755041744161",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(15).JPG?updatedAt=1755041742386",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(11).jpg?updatedAt=1755041742110",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(17).JPG?updatedAt=1755041738897",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(16).JPG?updatedAt=1755041734475",
  "https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(8).jpg?updatedAt=1755041731548",
];

const STREET = [
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(8).jpg?updatedAt=1755041799679",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(10).jpg?updatedAt=1755041800612",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(12).jpg?updatedAt=1755041801848",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(11).jpg?updatedAt=1755041801629",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(9).jpg?updatedAt=1755041803804",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(13).jpg?updatedAt=1755041802378",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(14).jpg?updatedAt=1755041806834",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(4).JPG?updatedAt=1755041806439",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(5).jpg?updatedAt=1755041811099",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(3).jpg?updatedAt=1755041810912",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(2).jpg?updatedAt=1755041811204",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(6).jpg?updatedAt=1755041811865",
  "https://ik.imagekit.io/2z1l6hi16/Street/Street%20(7).jpg?updatedAt=1755041812680",
];

const WEDDING = [
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0143%20copy.jpg?updatedAt=1762193850320",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0195%20copy.jpg?updatedAt=1762193850238",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0100%20copy.jpg?updatedAt=1762193849143",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0092%20copy.jpg?updatedAt=1762193849015",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0104%20copy.jpg?updatedAt=1762193848728",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0119%20copy.jpg?updatedAt=1762193848620",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0252%20copy.jpg?updatedAt=1762193848070",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0249%20copy.jpg?updatedAt=1762193848387",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0103%20copy.jpg?updatedAt=1762193848403",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0637%20copy.jpg?updatedAt=1762193847491",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0102%20copy.jpg?updatedAt=1762193847194",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0274%20copy.jpg?updatedAt=1762193843606",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0021%20copy.jpg?updatedAt=1762193843322",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0519%20copy.jpg?updatedAt=1762193843266",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0617%20copy.jpg?updatedAt=1762193843318",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0631%20copy.jpg?updatedAt=1762193843255",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0264%20copy.jpg?updatedAt=1762193843187",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0513%20copy.jpg?updatedAt=1762193842808",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0504%20copy.jpg?updatedAt=1762193842773",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0254%20copy.jpg?updatedAt=1762193841228",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0500%20copy.jpg?updatedAt=1762193841065",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0264%20aacopy.jpg?updatedAt=1762193840457",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0661%20copy.jpg?updatedAt=1762193839896",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0020%20copy.jpg?updatedAt=1762193722627",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0090%20copy.jpg?updatedAt=1762193722158",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0017%20copy.jpg?updatedAt=1762193722038",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0065%20copy.jpg?updatedAt=1762193721707",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0037%20copy.jpg?updatedAt=1762193721748",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0023%20copy.jpg?updatedAt=1762193721137",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0061%20copy.jpg?updatedAt=1762193720831",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0055%20copy.jpg?updatedAt=1762193716429",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0006%20copy.jpg?updatedAt=1762193713947",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0102%20copy.jpg?updatedAt=1762193713893",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0061%20bw.jpg?updatedAt=1762193712713",
  "https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0116-Recovered.jpg?updatedAt=1762193712273",
];

// Helper: shuffle and take N
const pickRandom = (arr: string[], n: number) =>
  arr.slice().sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));

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

  // Showcase track ref for GSAP
  const showcaseTrackRef = useRef<HTMLDivElement>(null);

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
     - Projects thumbnails use YOUR images now (replacing Unsplash)
  ========================================================================== */
  const projects = useMemo(
    () => [
      {
        title: "Portraits",
        image: optimizeImageUrl(PORTRAITS[0], 1200),
        year: "2024",
        link: "/work/portraits",
      },
      {
        title: "Street",
        image: optimizeImageUrl(STREET[0], 1200),
        year: "2024",
        link: "/work/street",
      },
    ],
    []
  );

  // ==================== Showcase Images (GSAP track) ====================
  // Build a large pool across all categories, shuffle, then take ~14
  const SHOWCASE_IMAGES = useMemo(() => {
    const pool = [...PORTRAITS, ...STREET, ...WEDDING];
    return pickRandom(pool, 14).map((url) => optimizeImageUrl(url, 900));
  }, []);

  // ==================== Instagram Grid (more images) ====================
  // Pull ~36 mixed images, shuffled per refresh
  const IG_IMAGES = useMemo(() => {
    const pool = [...PORTRAITS, ...STREET, ...WEDDING];
    return pickRandom(pool, 36).map((url) => ({
      src: optimizeImageUrl(url, 800),
      alt: "Frames By Inder",
    }));
  }, []);

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
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
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
     GSAP showcase slider
     - Two duplicated rows for seamless loop
     - Adjust DUR for speed (lower = faster)
  ========================================================================== */
  useEffect(() => {
    if (!showcaseTrackRef.current) return;
    const el = showcaseTrackRef.current;
    const DUR = 25; // seconds; set 18 for faster, 35 for slower
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent: -100,
          duration: DUR,
          ease: "linear",
          repeat: -1,
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  /* ==========================================================================
     Handlers
  ========================================================================== */
  const handleNavigateToContact = () => navigate("/contact");
  const handleProjectClick = (link: string) => navigate(link);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap');
        * { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif }

        .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px) }
      `}</style>

      {/* ============================ Hero (kept as-is) ============================ */}
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

      {/* ============================ Showcase (GSAP marquee) ============================ */}
      <section className="py-32 overflow-hidden relative bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-thin tracking-[0.2em] text-center mb-24"
        >
          SHOWCASE
        </motion.h2>

        <div className="relative overflow-hidden">
          {/* Track duplicated for seamless loop */}
          <div ref={showcaseTrackRef} className="flex gap-6">
            {[...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES].map((image, i) => (
              <motion.div
                key={`showcase-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex-none w-[340px] md:w-[420px] h-[440px] md:h-[520px] relative overflow-hidden rounded-xl cursor-pointer"
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
                transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square overflow-hidden cursor-pointer group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
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
              onClick={() => window.open("https://instagram.com/frames_by_inder", "_blank")}
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
            Let's build something amazing together. Open for commissions & collaborations because great ideas deserve to be brought to life with passion and purpose.
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
