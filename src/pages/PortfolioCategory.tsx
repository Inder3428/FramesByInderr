'use client';

import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ZoomParallax = lazy(() =>
  import('@/components/ui/zoom-parallax').then((m) => ({ default: m.ZoomParallax }))
);

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

const ikTransform = (url: string, tr: string) => {
  const hasQuery = url.includes('?');
  const sep = hasQuery ? '&' : '?';
  return `${url}${sep}${tr}`;
};

const optimizeImageUrl = (url: string, width = 900, quality = 90) =>
  ikTransform(url, `tr=w-${width},q-${quality},f-webp,pr-true`);

const srcSet = (url: string, widths = [400, 600, 900, 1200, 1600]) =>
  widths.map((w) => `${optimizeImageUrl(url, w)} ${w}w`).join(', ');

const portraitImages: ImageItem[] = [

  // ===== Studio / Editorial Portraits =====
{ id: 'p-st-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1278%20copy.jpg?updatedAt=1769126833686', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 1', year: '2024' },
{ id: 'p-st-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1281%20copy.jpg?updatedAt=1769126832997', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 2', year: '2024' },
{ id: 'p-st-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1279%20copy.jpg?updatedAt=1769126825770', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 3', year: '2024' },
{ id: 'p-st-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1287%20copy.jpg?updatedAt=1769126812522', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 4', year: '2024' },
{ id: 'p-st-5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1289%20copy.jpg?updatedAt=1769126807948', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 5', year: '2024' },
{ id: 'p-st-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1290%20copy.jpg?updatedAt=1769126806340', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 6', year: '2024' },
{ id: 'p-st-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1397%20copy.jpg?updatedAt=1769126288773', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 7', year: '2024' },
{ id: 'p-st-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1404%20copy.jpg?updatedAt=1769126288045', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 8', year: '2024' },
{ id: 'p-st-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_1.jpg?updatedAt=1769126543133', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 9', year: '2024' },
{ id: 'p-st-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1371%20copy.jpg?updatedAt=1769126649229', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 10', year: '2024' },
{ id: 'p-st-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa.jpg?updatedAt=1769126733974', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 11', year: '2024' },
{ id: 'p-st-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1355%20copy.jpg?updatedAt=1769126765148', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 12', year: '2024' },
{ id: 'p-st-13', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1366%20copy.jpg?updatedAt=1769126806434', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 13', year: '2024' },
{ id: 'p-st-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1356%20copy.jpg?updatedAt=1769126808264', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 14', year: '2024' },
{ id: 'p-st-15', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1371%20copy_Full.jpg?updatedAt=1769126820878', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 15', year: '2024' },
{ id: 'p-st-16', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1362%20copy.jpg?updatedAt=1769126823252', category: 'portraits', subcategory: 'studio-editorial', title: 'Studio Editorial 16', year: '2024' },

// ===== Marij + Outdoor Series (Bottom → Top Order) =====
{ id: 'p-marij-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0944.jpg?updatedAt=1769124699975', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 1', year: '2025' },
{ id: 'p-marij-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0747%20copy.jpg?updatedAt=1769124827594', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 2', year: '2025' },
{ id: 'p-marij-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0905%20copy.jpg?updatedAt=1769124839539', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 3', year: '2025' },
{ id: 'p-marij-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0907%20copy.jpg?updatedAt=1769124845275', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 4', year: '2025' },
{ id: 'p-marij-5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0727%20dunkin.jpg?updatedAt=1769124860652', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 5', year: '2025' },
{ id: 'p-marij-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0856%20copy.jpg?updatedAt=1769124866019', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 6', year: '2025' },
{ id: 'p-marij-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0949%20copy.jpg?updatedAt=1769124874061', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 7', year: '2025' },
{ id: 'p-marij-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_1000%20copy.jpg?updatedAt=1769124874535', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 8', year: '2025' },
{ id: 'p-marij-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0961%20copy.jpg?updatedAt=1769124875470', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 9', year: '2025' },
{ id: 'p-marij-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0865%20copy.jpg?updatedAt=1769124876030', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 10', year: '2025' },
{ id: 'p-marij-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0944%20copy.jpg?updatedAt=1769124879760', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 11', year: '2025' },
{ id: 'p-marij-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_1033%20copy.jpg?updatedAt=1769124887750', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 12', year: '2025' },
{ id: 'p-marij-13', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0642%20copy.jpg?updatedAt=1769124895576', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 13', year: '2025' },
{ id: 'p-marij-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20250603_0614%20copy.jpg?updatedAt=1769124897980', category: 'portraits', subcategory: 'outdoor', title: 'Outdoor 14', year: '2025' },
{ id: 'p-marij-15', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(4).jpg?updatedAt=1769124858904', category: 'portraits', subcategory: 'portrait', title: 'Marij 1', year: '2025' },
{ id: 'p-marij-16', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(12).jpg?updatedAt=1769124856842', category: 'portraits', subcategory: 'portrait', title: 'Marij 2', year: '2025' },
{ id: 'p-marij-17', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(3).jpg?updatedAt=1769124853071', category: 'portraits', subcategory: 'portrait', title: 'Marij 3', year: '2025' },
{ id: 'p-marij-18', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(2).jpg?updatedAt=1769124852000', category: 'portraits', subcategory: 'portrait', title: 'Marij 4', year: '2025' },
{ id: 'p-marij-19', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(1).jpg?updatedAt=1769124854805', category: 'portraits', subcategory: 'portrait', title: 'Marij 5', year: '2025' },
{ id: 'p-marij-20', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(6).jpg?updatedAt=1769124843107', category: 'portraits', subcategory: 'portrait', title: 'Marij 6', year: '2025' },
{ id: 'p-marij-21', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(5).jpg?updatedAt=1769124832820', category: 'portraits', subcategory: 'portrait', title: 'Marij 7', year: '2025' },
{ id: 'p-marij-22', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/marij%20(11).jpg?updatedAt=1769124807704', category: 'portraits', subcategory: 'portrait', title: 'Marij 8', year: '2025' },


  // ===== Laiba Outdoor / Glam Portraits =====

{ id: 'p-laiba-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0046%20copy%20(1).jpg?updatedAt=1769126230320', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 1', year: '2024' },
{ id: 'p-laiba-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0079%20copy%20(1).jpg?updatedAt=1769126232953', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 2', year: '2024' },
{ id: 'p-laiba-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0083%20copy%20(1).jpg?updatedAt=1769126234766', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 3', year: '2024' },
{ id: 'p-laiba-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0133%20copy.jpg?updatedAt=1769126247904', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 4', year: '2024' },
{ id: 'p-laiba-5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0034%20copy.jpg?updatedAt=1769126255683', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 5', year: '2024' },
{ id: 'p-laiba-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0165%20copy%20(1).JPG?updatedAt=1769126274486', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 6', year: '2024' },
{ id: 'p-laiba-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laiba_0046%20copy.jpg?updatedAt=1769126287173', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 7', year: '2024' },
{ id: 'p-laiba-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_2%20(1).JPG?updatedAt=1769126391934', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 8', year: '2024' },
{ id: 'p-laiba-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_5.jpg?updatedAt=1769126478029', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 10', year: '2024' },
{ id: 'p-laiba-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_9.jpg?updatedAt=1769126543150', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 11', year: '2024' },
{ id: 'p-laiba-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa%20(2).jpg?updatedAt=1769126548310', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 12', year: '2024' },
{ id: 'p-laiba-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_8%20(1).JPG?updatedAt=1769126568817', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 13', year: '2024' },
{ id: 'p-laiba-13', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_13%20(1).JPG?updatedAt=1769126571583', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 14', year: '2024' },
{ id: 'p-laiba-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/laibaaaaaa_10.jpg?updatedAt=1769126595054', category: 'portraits', subcategory: 'outfit-glam', title: 'Laiba Glam 15', year: '2024' },


  // ===== Outdoor Outfit / Glam Portraits =====
  { id: 'p-out-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1050%20copy.jpg?updatedAt=1769126896578', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 1', year: '2024' },
  { id: 'p-out-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1055%20copy.jpg?updatedAt=1769126895404', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 2', year: '2024' },
  { id: 'p-out-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1233%20copy.jpg?updatedAt=1769126866257', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 3', year: '2024' },
  { id: 'p-out-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1068%20copy.jpg?updatedAt=1769126840928', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 4', year: '2024' },
  { id: 'p-out-5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1063%20copy.jpg?updatedAt=1769126833117', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 5', year: '2024' },
  { id: 'p-out-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1192%20copy.jpg?updatedAt=1769126819302', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 6', year: '2024' },
  { id: 'p-out-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1196%20copy.jpg?updatedAt=1769126815937', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 7', year: '2024' },
  { id: 'p-out-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1199%20copy.jpg?updatedAt=1769126813775', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 8', year: '2024' },
  { id: 'p-out-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1191%20copy%20(2).jpg?updatedAt=1769126780410', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 9', year: '2024' },
  { id: 'p-out-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1103%20copy.jpg?updatedAt=1769126800106', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 10', year: '2024' },
  { id: 'p-out-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1106%20copy.jpg?updatedAt=1769126779273', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 11', year: '2024' },
  { id: 'p-out-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1109%20copy.jpg?updatedAt=1769126769983', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 12', year: '2024' },
  { id: 'p-out-13', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1095%20copy.jpg?updatedAt=1769126758788', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 13', year: '2024' },
  { id: 'p-out-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/_DSC1132%20copy.jpg?updatedAt=1769126721982', category: 'portraits', subcategory: 'outfit-glam', title: 'Outdoor Glam 14', year: '2024' },
  
// ===== Editorial / Outdoor Portrait Series =====
{ id: 'p-ed-1', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2410%20copy.jpg?updatedAt=1769126843562', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 1', year: '2024' },
{ id: 'p-ed-2', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2401%20copy.jpg?updatedAt=1769126842239', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 2', year: '2024' },
{ id: 'p-ed-3', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2413%20copy.jpg?updatedAt=1769126841597', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 3', year: '2024' },
{ id: 'p-ed-4', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2313%20copy.jpg?updatedAt=1769126780017', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 4', year: '2024' },
{ id: 'p-ed-5', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2316%20copy.jpg?updatedAt=1769126764246', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 5', year: '2024' },
{ id: 'p-ed-6', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2421_copy.jpg?updatedAt=1769126373280', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 6', year: '2024' },
{ id: 'p-ed-7', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2390_copy.jpg?updatedAt=1769126327488', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 7', year: '2024' },
{ id: 'p-ed-8', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2399_copy.jpg?updatedAt=1769126321898', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 8', year: '2024' },
{ id: 'p-ed-9', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2370_copy.jpg?updatedAt=1769126316374', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 9', year: '2024' },
{ id: 'p-ed-10', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2356_copy.jpg?updatedAt=1769126315541', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 10', year: '2024' },
{ id: 'p-ed-11', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2319_copy.jpg?updatedAt=1769126302100', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 11', year: '2024' },
{ id: 'p-ed-12', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2381_copy.jpg?updatedAt=1769126302224', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 12', year: '2024' },
{ id: 'p-ed-13', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2323_copy.jpg?updatedAt=1769126300955', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 13', year: '2024' },
{ id: 'p-ed-14', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2332_copy.jpg?updatedAt=1769126295417', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 14', year: '2024' },
{ id: 'p-ed-15', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2345_copy.jpg?updatedAt=1769126291086', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 15', year: '2024' },
{ id: 'p-ed-16', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2349_copy.jpg?updatedAt=1769126280442', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 16', year: '2024' },
{ id: 'p-ed-17', url: 'https://ik.imagekit.io/2z1l6hi16/Potraits/20240410_2354_copy.jpg?updatedAt=1769126263307', category: 'portraits', subcategory: 'editorial', title: 'Editorial Portrait 17', year: '2024' },

  // ===== Standard Portraits =====
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

const IMAGES: Record<Category, ImageItem[]> = {
  portraits: portraitImages,
  street: streetImages,
  wedding: weddingImages,
};

function LoaderMark({ size = 56 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div 
        className="absolute inset-[4px] rounded-full border-t border-l border-white/50 animate-spin"
        style={{ animationDuration: '1.4s' }}
      />
      <div className="absolute inset-[18px] rounded-full bg-white/5 animate-pulse" />
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
          transition={{ duration: 0.3 }}
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
      {label && <div className="text-[10px] tracking-[0.3em] font-light opacity-70">{label}</div>}
    </div>
  );
}

export default function PortfolioCategory() {
  const { category: routeCategory } = useParams<{ category?: Category }>();
  const [category, setCategory] = useState<Category>('portraits');
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [fsLoading, setFsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const current = filtered[index];

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
  }, [isOpen, index, filtered.length]);

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

  return (
    <main
      ref={rootRef}
      className="relative bg-black text-white min-h-screen pt-20 pb-24"
    >
      <PagePreloader visible={pageLoading} text="Preparing gallery" />

      <Suspense
        fallback={
          <div className="relative w-full" style={{ height: 'min(70vh, 900px)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="h-full w-full grid place-items-center text-sm text-white/60">
              <InlineSpinner label="Loading header" />
            </div>
          </div>
        }
      >
        <ZoomParallax images={heroImages} />
      </Suspense>

      <div className="sticky z-30 flex justify-center py-3 top-20">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm px-1.5 py-1 shadow-lg">
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
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  active ? 'bg-white text-black shadow-md' : 'text-white/80 hover:bg-white/10'
                }`}
                aria-pressed={active}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-6 md:p-10">
        {filtered.map((img, i) => (
          <motion.figure
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[3/4]"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)',
              contain: 'layout style paint',
            }}
            onClick={() => openViewer(i)}
          >
            <img
              src={optimizeImageUrl(img.url, 600)}
              srcSet={srcSet(img.url)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              alt={img.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
              onLoad={() => { if (i < FIRST_BATCH) markThumbLoaded(); }}
              onError={() => { if (i < FIRST_BATCH) markThumbLoaded(); }}
            />
            <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-sm font-medium">{img.title}</p>
              <p className="text-xs text-gray-300">{img.subcategory} • {img.year}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseMove={resetHideTimer}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            style={{ contain: 'layout style paint' }}
          >
            <AnimatePresence>
              {fsLoading && (
                <motion.div
                  className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <InlineSpinner label="Loading photo" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.img
              key={current.id}
              src={optimizeImageUrl(current.url, 1400)}
              srcSet={srcSet(current.url, [800, 1100, 1400, 1800])}
              sizes="90vw"
              alt={current.title}
              onLoad={() => setFsLoading(false)}
              onError={() => setFsLoading(false)}
              onClick={() => setZoomed((z) => !z)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: zoomed ? 1.5 : 1,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain cursor-pointer"
              style={{ 
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              loading="eager"
              decoding="async"
            />

            <AnimatePresence>
              {showUI && !fsLoading && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onClick={goPrev}
                    disabled={index === 0}
                    className="absolute left-4 sm:left-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000] disabled:opacity-30 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={goNext}
                    disabled={index === filtered.length - 1}
                    className="absolute right-4 sm:right-10 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full z-[10000] disabled:opacity-30 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => { setIsOpen(false); setZoomed(false); setFsLoading(false); }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white/10 hover:bg-red-500/30 rounded-full backdrop-blur-md z-[10001] transition-colors cursor-pointer"
                    aria-label="Close viewer"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[10000]"
                  >
                    <h3 className="text-lg font-light">{current.title}</h3>
                    <p className="text-sm text-gray-400">{current.subcategory} • {current.year}</p>
                    <p className="text-xs mt-2 opacity-70 hidden sm:block">← / → Navigate • Z Zoom • F Fullscreen • ESC Close</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
