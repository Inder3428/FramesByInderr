"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GeometricBackdrop from "../components/ui/shape-landing-hero";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scopeRef = useRef<HTMLDivElement>(null);

  const cameraLogos = [
    "Canon",
    "Nikon",
    "Sony",
    "Fujifilm",
    "Leica",
    "Hasselblad",
    "Phase One",
    "Pentax",
    "Olympus",
    "Panasonic",
    "Sigma",
    "DJI",
  ];

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      // counters
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.getAttribute("data-target") || "0");
        gsap.fromTo(
          el,
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top center+=100",
              once: true,
            },
          }
        );
      });

      // marquee
      gsap.to(".logo-banner", {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative isolate min-h-screen text-white" ref={scopeRef}>
      {/* Full-page animated background behind everything */}
      <GeometricBackdrop className="fixed inset-0 -z-10 pointer-events-none select-none" />

      {/* Content layer */}
      <div className="relative z-10">
        {/* Hero */}
        <motion.div
          style={{ y }}
          className="h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <img
              src="https://ik.imagekit.io/2z1l6hi16/Potraits/BG.jpg"
              alt="Photographer"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-8xl font-light text-center px-4"
          >
            About Me
          </motion.h1>

          {/* Soft gradient only on hero so backdrop stays visible on the page */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/60" />
        </motion.div>

        {/* Body */}
        <div className="px-4 py-32">
          <div className="max-w-3xl mx-auto space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-light">The Journey</h2>
              <p className="text-gray-200/80 leading-relaxed">
                Hi, I’m Inderpreet Singh, an NYC-based photographer with a passion
                for capturing compelling visual stories. As a Computer Science major
                with a Photography minor, I blend technical precision with creative
                intuition to craft impactful images. My experience spans portrait,
                digital, and darkroom photography, where I’ve worked with a variety
                of Canon, Sony, Nikon, and other digital and film equipment. I have
                hands-on expertise in black and white printing and traditional
                darkroom techniques, allowing me to bring a timeless quality to my
                work. For me, photography is more than just taking pictures—it’s
                about preserving moments, evoking emotions, and telling unique
                stories through the lens.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-lg text-center space-y-4"
              >
                <h3 className="text-5xl font-light">
                  <span className="counter" data-target="5">0</span>+
                </h3>
                <p className="text-gray-300 uppercase tracking-widest text-sm">Years Experience</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-lg text-center space-y-4"
              >
                <h3 className="text-5xl font-light">
                  <span className="counter" data-target="20">0</span>+
                </h3>
                <p className="text-gray-300 uppercase tracking-widest text-sm">Projects Completed</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-lg text-center space-y-4"
              >
                <h3 className="text-5xl font-light">
                  <span className="counter" data-target="120">0</span>+
                </h3>
                <p className="text-gray-300 uppercase tracking-widest text-sm">Insta Feed</p>
              </motion.div>
            </motion.div>

            {/* Logo marquee */}
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-16">
              <div className="logo-banner flex space-x-16 whitespace-nowrap">
                {[...cameraLogos, ...cameraLogos].map((logo, index) => (
                  <span key={index} className="text-2xl font-light text-gray-300/70">
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-light">Philosophy</h2>
              <p className="text-gray-200/80 leading-relaxed">
                Photography is more than just capturing a moment. It is about
                telling a story that lingers, evokes emotion, and reveals the
                unseen. Every image should breathe life into its subject, preserving
                not just what is visible but the energy, atmosphere, and depth that
                make each moment unique. Through a blend of technical precision and
                artistic intuition, I strive to create images that feel immersive,
                authentic, and timeless. Whether it is a fleeting glance, a dramatic
                play of light, or the quiet beauty in everyday life, my work is
                driven by the idea that photography is not just about seeing but
                feeling.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
