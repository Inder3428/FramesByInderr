// src/pages/PortfolioCategory.tsx
'use client';

import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

// Lazy-load to shrink initial JS
const ZoomParallax = lazy(() =>
  import('@/components/ui/zoom-parallax').then((m) => ({ default: m.ZoomParallax }))
);

// ===========================================================
// 📸 TYPES
// ===========================================================
type Category = 'portraits' | 'street' | 'wedding';

interface ImageItem {
  id: string;
  url: string;
  title: string;
  category: Category;
  subcategory: string;
  year: string;
}

interface HeroImage {
  src: string;
  alt?: string;
}

// ===========================================================
// ⚙️ HELPERS (ImageKit transforms + responsive srcset)
// ===========================================================
const ikTransform = (url: string, tr: string) => {
  const hasQuery = url.includes('?');
  const sep = hasQuery ? '&' : '?';
  return `${url}${sep}${tr}`;
};

const optimizeImageUrl = (url: string, width = 900, quality = 90) =>
  ikTransform(url, `tr=w-${width},q-${quality},f-webp,pr-true`);

const srcSet = (url: string, widths = [400, 600, 900, 1200, 1600]) =>
  widths.map((w) => `${optimizeImageUrl(url, w)} ${w}w`).join(', ');

// ===========================================================
// 📷 IMAGE DATA (your full lists)
// ===========================================================

// ---- PORTRAITS ----
const portraitImages: ImageItem[] = [
  { id: 'p-13a', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(13).JPG?updatedAt=1755041766662', category: 'portraits', subcategory: 'portrait', title: 'Portrait 13a', year: '2024' },
  { id: 'p-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(6).jpg?updatedAt=1755041766602', category: 'portraits', subcategory: 'portrait', title: 'Portrait 6', year: '2024' },
  { id: 'p-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(12).JPG?updatedAt=1755041766232', category: 'portraits', subcategory: 'portrait', title: 'Portrait 12', year: '2024' },
  { id: 'p-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(14).JPG?updatedAt=1755041765463', category: 'portraits', subcategory: 'portrait', title: 'Portrait 14', year: '2024' },
  { id: 'p-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(1).jpg?updatedAt=1755041765063', category: 'portraits', subcategory: 'portrait', title: 'Portrait 1', year: '2024' },
  { id: 'p-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(7).jpg?updatedAt=1755041762881', category: 'portraits', subcategory: 'portrait', title: 'Portrait 7', year: '2024' },
  { id: 'p-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(2).jpg?updatedAt=1755041762003', category: 'portraits', subcategory: 'portrait', title: 'Portrait 2', year: '2024' },
  { id: 'p-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(4).jpg?updatedAt=1755041761815', category: 'portraits', subcategory: 'portrait', title: 'Portrait 4', year: '2024' },
  { id: 'p-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(3).jpg?updatedAt=1755041761193', category: 'portraits', subcategory: 'portrait', title: 'Portrait 3', year: '2024' },
  { id: 'p-18', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(18).JPG?updatedAt=1755041757640', category: 'portraits', subcategory: 'portrait', title: 'Portrait 18', year: '2024' },
  { id: 'p-19', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(19).JPG?updatedAt=1755041757046', category: 'portraits', subcategory: 'portrait', title: 'Portrait 19', year: '2024' },
  { id: 'p-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(10).jpg?updatedAt=1755041744234', category: 'portraits', subcategory: 'portrait', title: 'Portrait 10', year: '2024' },
  { id: 'p-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(9).jpg?updatedAt=1755041744161', category: 'portraits', subcategory: 'portrait', title: 'Portrait 9', year: '2024' },
  { id: 'p-15', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(15).JPG?updatedAt=1755041742386', category: 'portraits', subcategory: 'portrait', title: 'Portrait 15', year: '2024' },
  { id: 'p-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(11).jpg?updatedAt=1755041742110', category: 'portraits', subcategory: 'portrait', title: 'Portrait 11', year: '2024' },
  { id: 'p-17', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(17).JPG?updatedAt=1755041738897', category: 'portraits', subcategory: 'portrait', title: 'Portrait 17', year: '2024' },
  { id: 'p-16', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(16).JPG?updatedAt=1755041734475', category: 'portraits', subcategory: 'portrait', title: 'Portrait 16', year: '2024' },
  { id: 'p-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/potrait%20(8).jpg?updatedAt=1755041731548', category: 'portraits', subcategory: 'portrait', title: 'Portrait 8', year: '2024' },
];

// ---- STREET ----
const streetImages: ImageItem[] = [
  { id: 's-8', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(8).jpg?updatedAt=1755041799679', category: 'street', subcategory: 'street', title: 'Street 8', year: '2024' },
  { id: 's-10', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(10).jpg?updatedAt=1755041800612', category: 'street', subcategory: 'street', title: 'Street 10', year: '2024' },
  { id: 's-12', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(12).jpg?updatedAt=1755041801848', category: 'street', subcategory: 'street', title: 'Street 12', year: '2024' },
  { id: 's-11', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(11).jpg?updatedAt=1755041801629', category: 'street', subcategory: 'street', title: 'Street 11', year: '2024' },
  { id: 's-9', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(9).jpg?updatedAt=1755041803804', category: 'street', subcategory: 'street', title: 'Street 9', year: '2024' },
  { id: 's-13', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(13).jpg?updatedAt=1755041802378', category: 'street', subcategory: 'street', title: 'Street 13', year: '2024' },
  { id: 's-14', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(14).jpg?updatedAt=1755041806834', category: 'street', subcategory: 'street', title: 'Street 14', year: '2024' },
  { id: 's-4', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(4).JPG?updatedAt=1755041806439', category: 'street', subcategory: 'street', title: 'Street 4', year: '2024' },
  { id: 's-5', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(5).jpg?updatedAt=1755041811099', category: 'street', subcategory: 'street', title: 'Street 5', year: '2024' },
  { id: 's-3', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(3).jpg?updatedAt=1755041810912', category: 'street', subcategory: 'street', title: 'Street 3', year: '2024' },
  { id: 's-2', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(2).jpg?updatedAt=1755041811204', category: 'street', subcategory: 'street', title: 'Street 2', year: '2024' },
  { id: 's-6', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(6).jpg?updatedAt=1755041811865', category: 'street', subcategory: 'street', title: 'Street 6', year: '2024' },
  { id: 's-7', url: 'https://ik.imagekit.io/2z1l6hi16/Street/Street%20(7).jpg?updatedAt=1755041812680', category: 'street', subcategory: 'street', title: 'Street 7', year: '2024' },
];

// ---- WEDDING / PRE-ENGAGEMENT ----
const weddingImages: ImageItem[] = [
  { id: 'w-0143', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0143%20copy.jpg?updatedAt=1762193850320', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0143', year: '2024' },
  { id: 'w-0195', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0195%20copy.jpg?updatedAt=1762193850238', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0195', year: '2024' },
  { id: 'w-0100', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0100%20copy.jpg?updatedAt=1762193849143', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0100', year: '2024' },
  { id: 'w-0092', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0092%20copy.jpg?updatedAt=1762193849015', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0092', year: '2024' },
  { id: 'w-0104', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0104%20copy.jpg?updatedAt=1762193848728', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0104', year: '2024' },
  { id: 'w-0119', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0119%20copy.jpg?updatedAt=1762193848620', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0119', year: '2024' },
  { id: 'w-0252', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0252%20copy.jpg?updatedAt=1762193848070', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0252', year: '2024' },
  { id: 'w-0249', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0249%20copy.jpg?updatedAt=1762193848387', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0249', year: '2024' },
  { id: 'w-0103', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0103%20copy.jpg?updatedAt=1762193848403', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0103', year: '2024' },
  { id: 'w-0637', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0637%20copy.jpg?updatedAt=1762193847491', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0637', year: '2024' },
  { id: 'w-0102', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0102%20copy.jpg?updatedAt=1762193847194', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0102', year: '2024' },
  { id: 'w-0274', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0274%20copy.jpg?updatedAt=1762193843606', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0274', year: '2024' },
  { id: 'w-0021', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0021%20copy.jpg?updatedAt=1762193843322', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0021', year: '2024' },
  { id: 'w-0519', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0519%20copy.jpg?updatedAt=1762193843266', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0519', year: '2024' },
  { id: 'w-0617', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0617%20copy.jpg?updatedAt=1762193843318', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0617', year: '2024' },
  { id: 'w-0631', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0631%20copy.jpg?updatedAt=1762193843255', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0631', year: '2024' },
  { id: 'w-0264a', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0264%20copy.jpg?updatedAt=1762193843187', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0264a', year: '2024' },
  { id: 'w-0513', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0513%20copy.jpg?updatedAt=1762193842808', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0513', year: '2024' },
  { id: 'w-0504', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0504%20copy.jpg?updatedAt=1762193842773', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0504', year: '2024' },
  { id: 'w-0254', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0254%20copy.jpg?updatedAt=1762193841228', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0254', year: '2024' },
  { id: 'w-0500', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0500%20copy.jpg?updatedAt=1762193841065', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0500', year: '2024' },
  { id: 'w-0264b', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0264%20aacopy.jpg?updatedAt=1762193840457', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0264b', year: '2024' },
  { id: 'w-0661', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Pre_Engage_0661%20copy.jpg?updatedAt=1762193839896', category: 'wedding', subcategory: 'pre-engagement', title: 'Pre_Engage_0661', year: '2024' },
  { id: 'w-pr-0020', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0020%20copy.jpg?updatedAt=1762193722627', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0020', year: '2024' },
  { id: 'w-pr-0090', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0090%20copy.jpg?updatedAt=1762193722158', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0090', year: '2024' },
  { id: 'w-pr-0017', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0017%20copy.jpg?updatedAt=1762193722038', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0017', year: '2024' },
  { id: 'w-pr-0065', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0065%20copy.jpg?updatedAt=1762193721707', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0065', year: '2024' },
  { id: 'w-pr-0037', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0037%20copy.jpg?updatedAt=1762193721748', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0037', year: '2024' },
  { id: 'w-pr-0023', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0023%20copy.jpg?updatedAt=1762193721137', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0023', year: '2024' },
  { id: 'w-pr-0061c', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0061%20copy.jpg?updatedAt=1762193720831', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0061', year: '2024' },
  { id: 'w-pr-0055', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0055%20copy.jpg?updatedAt=1762193716429', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0055', year: '2024' },
  { id: 'w-pr-0006', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0006%20copy.jpg?updatedAt=1762193713947', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0006', year: '2024' },
  { id: 'w-pr-0102', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0102%20copy.jpg?updatedAt=1762193713893', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0102', year: '2024' },
  { id: 'w-pr-0061bw', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0061%20bw.jpg?updatedAt=1762193712713', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0061_bw', year: '2024' },
  { id: 'w-pr-0116rec', url: 'https://ik.imagekit.io/2z1l6hi16/New%20Folder/Proposal_0116-Recovered.jpg?updatedAt=1762193712273', category: 'wedding', subcategory: 'proposal', title: 'Proposal_0116_Recovered', year: '2024' },
];

// ---- MASTER MAP ----
const IMAGES: Record<Category, ImageItem[]> = {
  portraits: portraitImages,
  street: streetImages,
  wedding: weddingImages,
};

// ===========================================================
// 🌀 Minimalist Loaders (page + fullscreen)
// ===========================================================
function LoaderMark({ size = 56 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-fade { 0%,100%{opacity:.35} 50%{opacity:1} }
      `}</style>
      <div className="absolute inset-0 rounded-full border border-white/12" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.06)' }} />
      <div className="absolute inset-[4px] rounded-full border-t border-l border-white/50" style={{ animation: 'spin-slow 1.4s linear infinite' }} />
      <div className="absolute inset-[18px] rounded-full bg-white/8" style={{ animation: 'pulse-fade 1.8s ease-in-out infinite' }} />
    </div>
  );
}

function PagePreloader({ visible, text = 'Loading' }: { visible: boolean; text?: string }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-6">
            <LoaderMark />
            <motion.div
              className="text-[11px] tracking-[0.35em] text-white/70 font-extralight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {text}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InlineSpinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white/80">
      <LoaderMark size={44} />
      {label ? <div className="text-[10px] tracking-[0.3em] font-light opacity-70">{label}</div> : null}
    </div>
  );
}

// ===========================================================
// 🌆 COMPONENT
// ===========================================================
export default function PortfolioCategory() {
  const { category: routeCategory } = useParams<{ category?: Category }>();
  const [category, setCategory] = useState<Category>('portraits');

  // Fullscreen state: use index + isOpen (simpler, bug-free)
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [fsLoading, setFsLoading] = useState(false);

  // Page preloader
  const [pageLoading, setPageLoading] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Smooth scrolling (Lenis) — safe options only
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Respect route change + snap to top
  useEffect(() => {
    if (routeCategory && routeCategory in IMAGES) {
      setCategory(routeCategory);
      setIsOpen(false);
      setIndex(0);
      setZoomed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [routeCategory]);

  const filtered = useMemo(() => IMAGES[category], [category]);
  const current = filtered[index]; // 🔑 single source of truth for fullscreen image

  // ---- Hero selection: random on first view per category, stable until reload ----
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const heroPickCacheRef = useRef<Record<string, HeroImage[]>>({});

  const pickRandom7 = useCallback((items: ImageItem[]): HeroImage[] => {
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(7, pool.length)).map((img) => ({
      src: optimizeImageUrl(img.url, 1400),
      alt: img.title,
    }));
  }, []);

  useEffect(() => {
    const key = String(category);
    if (heroPickCacheRef.current[key]) {
      setHeroImages(heroPickCacheRef.current[key]);
    } else {
      const pick = pickRandom7(filtered);
      heroPickCacheRef.current[key] = pick;
      setHeroImages(pick);
    }
  }, [category, filtered, pickRandom7]);

  // ======= Page preloader (first N thumbs) =======
  const FIRST_BATCH = 8;
  const loadedThumbsRef = useRef(0);

  useEffect(() => {
    loadedThumbsRef.current = 0;
    setPageLoading(true);
    const safety = setTimeout(() => setPageLoading(false), 2200);
    return () => clearTimeout(safety);
  }, [category]);

  const markThumbLoaded = useCallback(() => {
    loadedThumbsRef.current += 1;
    if (loadedThumbsRef.current >= Math.min(FIRST_BATCH, filtered.length)) {
      setPageLoading(false);
    }
  }, [filtered.length]);

  // Subtle grid scale on scroll
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ['start start', 'end end'] });
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  // Keyboard in fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { setIsOpen(false); setZoomed(false); setFsLoading(false); }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key.toLowerCase() === 'z' || e.key === ' ') setZoomed((z) => !z);
      if (e.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, filtered.length]);

  // Auto-hide controls in fullscreen
  const resetHideTimer = useCallback(() => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('mousemove', resetHideTimer);
    window.addEventListener('touchstart', resetHideTimer);
    resetHideTimer();
    return () => {
      window.removeEventListener('mousemove', resetHideTimer);
      window.removeEventListener('touchstart', resetHideTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isOpen, resetHideTimer]);

  // ======= FAST NAV: prefetch adjacent fullscreen images =======
  useEffect(() => {
    if (!isOpen || !current) return;
    const preload = (idx: number) => {
      if (idx < 0 || idx >= filtered.length) return;
      const url = optimizeImageUrl(filtered[idx].url, 1400);
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = url;
    };
    preload(index + 1);
    preload(index - 1);
  }, [isOpen, index, filtered, current]);

  const openViewer = (i: number) => {
    setIndex(i);
    setZoomed(false);
    setFsLoading(true);
    setIsOpen(true);
  };

  const goNext = () => {
    if (index >= filtered.length - 1) return;
    setFsLoading(true);
    setIndex((i) => i + 1);
  };
  const goPrev = () => {
    if (index <= 0) return;
    setFsLoading(true);
    setIndex((i) => i - 1);
  };

  // ===========================================================
  // Layout constants (avoid navbar/footer overlap)
  // ===========================================================
  const headerH = 'var(--header-h, 72px)';
  const footerH = 'var(--footer-h, 80px)';

  return (
    <main
      ref={rootRef}
      className="relative bg-black text-white"
      style={{
        paddingTop: `calc(${headerH} + 12px)`,
        paddingBottom: `calc(${footerH} + 16px)`,
        minHeight: '100vh',
        scrollMarginTop: `calc(${headerH} + 12px)`,
      }}
    >
      {/* Page Preloader (covers entire page) */}
      <PagePreloader visible={pageLoading} text="Preparing gallery" />

      {/* 🌌 Hero (parallax; 7 random picks on reload per category) */}
      <Suspense
        fallback={
          <div className="relative w-full" style={{ height: 'min(70vh, 900px)' }}>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)]" />
            <div className="h-full w-full grid place-items-center text-sm text-white/60">
              <InlineSpinner label="Loading header" />
            </div>
          </div>
        }
      >
        <ZoomParallax images={heroImages} />
      </Suspense>

      {/* 🔘 Category Selector */}
      <div className="sticky z-30 flex justify-center py-3" style={{ top: `calc(${headerH} + 8px)` }}>
        <div className="inline-flex items-center gap-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm px-1.5 py-1 shadow-[0_6px_30px_rgba(0,0,0,0.25)]">
          {(['portraits', 'street', 'wedding'] as Category[]).map((cat) => {
            const active = category === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setIsOpen(false);
                  setIndex(0);
                  setZoomed(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                whileTap={{ scale: 0.98 }}
                className={[
                  'px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors',
                  active ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.25)]' : 'text-white/80 hover:bg-white/10',
                ].join(' ')}
                aria-pressed={active}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-6 md:p-10"
        style={{ scale: gridScale }}
      >
        {filtered.map((img, i) => (
          <motion.figure
            key={img.id}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => openViewer(i)}
          >
            <img
              src={optimizeImageUrl(img.url, 600)}
              srcSet={srcSet(img.url)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              alt={img.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 opacity-90 will-change-transform"
              fetchPriority="low"
              onLoad={() => { if (i < FIRST_BATCH) markThumbLoaded(); }}
              onError={() => { if (i < FIRST_BATCH) markThumbLoaded(); }}
            />
            <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
              <p className="text-sm font-medium">{img.title}</p>
              <p className="text-xs text-gray-300">{img.subcategory} • {img.year}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={resetHideTimer}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          >
            {/* Fullscreen image loader overlay */}
            <AnimatePresence>
              {fsLoading && (
                <motion.div
                  className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <InlineSpinner label="Loading photo" />
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={optimizeImageUrl(current.url, 1400)}
              srcSet={srcSet(current.url, [800, 1100, 1400, 1800])}
              sizes="90vw"
              alt={current.title}
              onLoad={() => setFsLoading(false)}
              onError={() => setFsLoading(false)}
              onClick={() => setZoomed((z) => !z)}
              className={`max-w-[90vw] max-h-[85vh] rounded-2xl object-contain transition-transform duration-500 cursor-pointer ${zoomed ? 'scale-150' : ''}`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* Controls (auto-hide) */}
            <AnimatePresence>
              {showUI && !fsLoading && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={goPrev}
                    disabled={index === 0}
                    className="absolute left-4 sm:left-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={goNext}
                    disabled={index === filtered.length - 1}
                    className="absolute right-4 sm:right-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000]"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => { setIsOpen(false); setZoomed(false); setFsLoading(false); }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white/10 hover:bg-red-500/30 rounded-full backdrop-blur-md z-[10001] transition-all duration-300 cursor-pointer"
                    aria-label="Close viewer"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[10000]"
                  >
                    <h3 className="text-lg font-light">{current.title}</h3>
                    <p className="text-sm text-gray-400">{current.subcategory} • {current.year}</p>
                    <p className="text-xs mt-2 opacity-70">← / → Navigate • Z Zoom • F Fullscreen • ESC Close</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to *guarantee* footer clearance */}
      <div style={{ height: `calc(${footerH})` }} aria-hidden />
    </main>
  );
}
