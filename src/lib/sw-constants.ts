import { Film, Tv, Clapperboard } from 'lucide-react';
import type { Era, ItemType } from '@/data/starWarsTimeline';

/* ─── Poster Paths ─── */
export const POSTER_PATHS = [
  '/posters/ep1.jpg', '/posters/ep2.jpg', '/posters/ep3.jpg', '/posters/ep4.jpg',
  '/posters/ep5.jpg', '/posters/ep6.jpg', '/posters/ep7.jpg', '/posters/ep8.jpg',
  '/posters/episode9.jpg', '/posters/solo.jpg', '/posters/rogue-one.jpg', '/posters/cw.jpg',
  '/posters/rebels.jpg', '/posters/andor.jpg', '/posters/ahsoka.jpg', '/posters/bb.jpg',
  '/posters/bobafett.jpg', '/posters/mando.jpg', '/posters/obiwan.jpg',
] as const;

/* ─── Type Icons ─── */
export const typeIcon: Record<ItemType, React.ComponentType<{ className?: string }>> = {
  Movie: Film,
  'TV Series': Tv,
  'Animated TV Series': Clapperboard,
};

/* ─── Type Colors ─── */
export const typeColor: Record<ItemType, string> = {
  Movie: '#4BD5EE',
  'TV Series': '#00D4AA',
  'Animated TV Series': '#E5C100',
};

/* ─── Era Order ─── */
export const ERA_ORDER: Era[] = [
  'Fall of the Jedi',
  'Reign of the Empire',
  'Age of Rebellion',
  'The New Republic',
  'Rise of the First Order',
];

/* ─── Poster Aspect Ratio ─── */
export const POSTER_ASPECT_RATIO = 768 / 1344; // ≈ 0.571

/* ─── Intro Phase Timings (ms) ─── */
export const INTRO_TIMING = {
  BLUE_TEXT_DURATION: 3200,
  LOGO_START: 3200,
  CRAWL_START: 6800,
  FADE_OUT_START: 30000,
  DONE_START: 30600,
} as const;

/* ─── Starfield Config ─── */
export const STARFIELD_CONFIG = {
  STAR_COUNT: 600,
  MAX_STREAK_LENGTH: 70,
  BRIGHT_STAR_THRESHOLD: 200,
} as const;

/* ─── Crawl Config ─── */
export const CRAWL_CONFIG = {
  PERSPECTIVE: '330px',
  PERSPECTIVE_ORIGIN: '50% 100%',
  ROTATE_X: 25,
  SPEED: 55,
  START_Y_RATIO: 0.85,
} as const;
