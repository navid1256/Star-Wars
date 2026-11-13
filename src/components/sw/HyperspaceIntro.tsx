'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { INTRO_TIMING, STARFIELD_CONFIG, CRAWL_CONFIG } from '@/lib/sw-constants';

/* ─── Types ─── */
type IntroPhase = 'blue-text' | 'logo' | 'crawl' | 'fade-out' | 'done';

interface HyperspaceIntroProps {
  onComplete: () => void;
}

/* ─── Crawl Text ─── */
const CRAWL_TEXT = `It is a time of endless choices. Across the galaxy, countless viewers struggle to find the right path through the Star Wars saga.

This interactive timeline is your guide — nineteen titles across five eras, arranged in the exact order events happen.

May the Force be with you.`;

const CRAWL_TEXT_STYLE: React.CSSProperties = {
  textShadow: '0 0 18px rgba(255,232,31,0.55), 0 0 40px rgba(255,232,31,0.2)',
  fontFamily: '"Franklin Gothic Medium", "Arial Narrow", "Segoe UI", system-ui, sans-serif',
};

const BLUE_TEXT_SHADOW = '0 0 30px rgba(75,213,238,0.6), 0 0 60px rgba(75,213,238,0.3), 0 0 90px rgba(75,213,238,0.15)';

/* ─── Component ─── */
export default function HyperspaceIntro({ onComplete }: HyperspaceIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>('blue-text');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crawlRef = useRef<HTMLDivElement>(null);
  const starsFrameRef = useRef<number>(0);
  const crawlFrameRef = useRef<number>(0);
  const crawlStartedRef = useRef(false);

  const skip = useCallback(() => {
    cancelAnimationFrame(starsFrameRef.current);
    cancelAnimationFrame(crawlFrameRef.current);
    crawlStartedRef.current = false;
    setPhase('done');
    onComplete();
  }, [onComplete]);

  // Phase timing
  useEffect(() => {
    const { BLUE_TEXT_DURATION, CRAWL_START, FADE_OUT_START, DONE_START } = INTRO_TIMING;
    const timers = [
      setTimeout(() => setPhase('logo'), BLUE_TEXT_DURATION),
      setTimeout(() => setPhase('crawl'), CRAWL_START),
      setTimeout(() => setPhase('fade-out'), FADE_OUT_START),
      setTimeout(() => { setPhase('done'); onComplete(); }, DONE_START),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Star streaks canvas
  useEffect(() => {
    if (phase !== 'logo' && phase !== 'crawl' && phase !== 'fade-out') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { STAR_COUNT, BRIGHT_STAR_THRESHOLD, MAX_STREAK_LENGTH } = STARFIELD_CONFIG;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const stars = new Float64Array(STAR_COUNT * 5);
    const maxR = Math.sqrt(W() * W() + H() * H()) * 0.7;

    for (let i = 0; i < STAR_COUNT; i++) {
      const base = i * 5;
      stars[base] = Math.random() * Math.PI * 2;
      stars[base + 1] = Math.random() * maxR;
      stars[base + 2] = Math.random() * 1.8 + 0.8;
      stars[base + 3] = Math.random() * 0.5 + 0.3;
      stars[base + 4] = maxR;
    }

    const cosTable = new Float64Array(STAR_COUNT);
    const sinTable = new Float64Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      cosTable[i] = Math.cos(stars[i * 5]);
      sinTable[i] = Math.sin(stars[i * 5]);
    }

    const draw = () => {
      if (!running) return;

      const w = W();
      const h = H();
      const cx = w * 0.5;
      const cy = h * 0.5;

      ctx.clearRect(0, 0, w, h);

      // Draw star bands
      drawStarBands(ctx, stars, STAR_COUNT, cosTable, sinTable, cx, cy);

      // Draw bright star streaks
      drawBrightStars(ctx, stars, STAR_COUNT, cosTable, sinTable, cx, cy, BRIGHT_STAR_THRESHOLD, MAX_STREAK_LENGTH);

      // Draw center glow
      drawCenterGlow(ctx, cx, cy);

      // Update star positions
      updateStars(stars, STAR_COUNT, cosTable, sinTable);

      starsFrameRef.current = requestAnimationFrame(draw);
    };

    starsFrameRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      running = false;
      cancelAnimationFrame(starsFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  // Crawl animation
  useEffect(() => {
    if (phase !== 'crawl' && phase !== 'fade-out') return;
    if (crawlStartedRef.current) return;
    crawlStartedRef.current = true;

    const el = crawlRef.current;
    if (!el) return;

    let running = true;
    let startY = window.innerHeight * CRAWL_CONFIG.START_Y_RATIO;
    const speed = CRAWL_CONFIG.SPEED;
    let lastTime = performance.now();

    el.style.transform = `rotateX(${CRAWL_CONFIG.ROTATE_X}deg) translateY(${startY}px)`;

    const animate = (now: number) => {
      if (!running || !el) return;

      const dt = (now - lastTime) / 1000;
      lastTime = now;
      startY -= speed * dt;

      el.style.transform = `rotateX(${CRAWL_CONFIG.ROTATE_X}deg) translateY(${startY}px)`;

      crawlFrameRef.current = requestAnimationFrame(animate);
    };

    crawlFrameRef.current = requestAnimationFrame(animate);
    return () => { running = false; cancelAnimationFrame(crawlFrameRef.current); };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-50 bg-[#000000] flex items-center justify-center cursor-pointer"
          onClick={skip}
          style={{ opacity: phase === 'fade-out' ? 0 : 1, transition: 'opacity 0.6s ease-out' }}
        >
          <SkipButton onClick={skip} />

          {(phase === 'logo' || phase === 'crawl' || phase === 'fade-out') && (
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
          )}

          {phase === 'blue-text' && <BlueTextPhase />}
          {phase === 'logo' && <LogoPhase />}
          {(phase === 'crawl' || phase === 'fade-out') && <CrawlPhase crawlRef={crawlRef} />}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Sub-Components ─── */

function SkipButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-5 right-5 z-[60] text-white/30 hover:text-white/70 text-[0.6rem] tracking-[0.25em] uppercase border border-white/8 hover:border-white/20 px-3 py-1.5 rounded transition-all cursor-pointer"
      aria-label="Skip intro animation"
    >
      SKIP
    </button>
  );
}

function BlueTextPhase() {
  return (
    <div className="text-center px-8 z-10" style={{ animation: 'blueTextFade 3.2s ease-out forwards' }}>
      <p
        className="text-[#4BD5EE] text-lg sm:text-2xl md:text-4xl tracking-[0.2em] font-light leading-relaxed"
        style={{ textShadow: BLUE_TEXT_SHADOW }}
      >
        A long time ago in a galaxy far,
      </p>
      <p
        className="text-[#4BD5EE] text-lg sm:text-2xl md:text-4xl tracking-[0.2em] font-light mt-3"
        style={{ textShadow: BLUE_TEXT_SHADOW }}
      >
        far away….
      </p>
    </div>
  );
}

function LogoPhase() {
  return (
    <div className="z-10 text-center" style={{ animation: 'starWarsLogo 3.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards' }}>
      <h1
        className="text-[#FFE81F] text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.08em]"
        style={{
          textShadow: '0 0 40px rgba(255,232,31,0.5), 0 0 80px rgba(255,232,31,0.25), 0 0 120px rgba(255,232,31,0.1)',
          fontFamily: '"Segoe UI", system-ui, sans-serif',
        }}
      >
        STAR WARS
      </h1>
    </div>
  );
}

function CrawlPhase({ crawlRef }: { crawlRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden flex items-start justify-center">
      <div
        className="absolute bottom-0 left-0 right-0 h-[12%] z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
      />

      <div
        className="w-full h-full"
        style={{ perspective: CRAWL_CONFIG.PERSPECTIVE, perspectiveOrigin: CRAWL_CONFIG.PERSPECTIVE_ORIGIN }}
      >
        <div
          ref={crawlRef}
          className="w-full mx-auto px-8 md:px-16 lg:px-24 will-change-transform"
          style={{
            transform: `rotateX(${CRAWL_CONFIG.ROTATE_X}deg) translateY(${CRAWL_CONFIG.START_Y_RATIO * 100}vh)`,
            transformOrigin: '50% 100%',
          }}
        >
          <div className="text-center max-w-5xl mx-auto">
            {CRAWL_TEXT.split('\n').map((paragraph, i) => {
              if (paragraph.trim() === '') return <div key={i} className="h-8" />;
              return (
                <p
                  key={i}
                  className="text-[#FFE81F] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.4] mb-5 tracking-[0.12em] uppercase"
                  style={CRAWL_TEXT_STYLE}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Canvas Drawing Helpers ─── */

function drawStarBands(
  ctx: CanvasRenderingContext2D,
  stars: Float64Array,
  starCount: number,
  cosTable: Float64Array,
  sinTable: Float64Array,
  cx: number,
  cy: number,
) {
  const bands = 4;
  for (let b = 0; b < bands; b++) {
    const alphaMin = b / bands;
    const alphaMax = (b + 1) / bands;
    const bandAlpha = ((alphaMin + alphaMax) / 2) * 0.8;

    ctx.strokeStyle = `rgba(200,215,255,${bandAlpha.toFixed(3)})`;
    ctx.beginPath();

    for (let i = 0; i < starCount; i++) {
      const base = i * 5;
      const dist = stars[base + 1];
      const brightness = stars[base + 3];
      const normalizedAlpha = brightness * Math.min(dist / 60, 1);

      if (normalizedAlpha < alphaMin || normalizedAlpha >= alphaMax) continue;

      const cos = cosTable[i];
      const sin = sinTable[i];
      const x1 = cx + cos * dist;
      const y1 = cy + sin * dist;
      const streakLen = Math.min(dist * 0.12, 50);

      ctx.moveTo(x1, y1);
      ctx.lineTo(cx + cos * (dist + streakLen), cy + sin * (dist + streakLen));
    }

    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

function drawBrightStars(
  ctx: CanvasRenderingContext2D,
  stars: Float64Array,
  starCount: number,
  cosTable: Float64Array,
  sinTable: Float64Array,
  cx: number,
  cy: number,
  threshold: number,
  maxStreak: number,
) {
  ctx.strokeStyle = 'rgba(220,230,255,0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i < starCount; i++) {
    const base = i * 5;
    const dist = stars[base + 1];
    const brightness = stars[base + 3];

    if (dist < threshold || brightness < 0.6) continue;

    const cos = cosTable[i];
    const sin = sinTable[i];
    const streakLen = Math.min(dist * 0.18, maxStreak);

    ctx.moveTo(cx + cos * dist, cy + sin * dist);
    ctx.lineTo(cx + cos * (dist + streakLen), cy + sin * (dist + streakLen));
  }

  ctx.stroke();
}

function drawCenterGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
  gradient.addColorStop(0, 'rgba(200,215,255,0.25)');
  gradient.addColorStop(1, 'rgba(200,215,255,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 30, 0, Math.PI * 2);
  ctx.fill();
}

function updateStars(stars: Float64Array, starCount: number, cosTable: Float64Array, sinTable: Float64Array) {
  for (let i = 0; i < starCount; i++) {
    const base = i * 5;
    stars[base + 1] += stars[base + 2] * 1.6;

    if (stars[base + 1] > stars[base + 4]) {
      stars[base + 1] = Math.random() * 3 + 0.5;
      stars[base] = Math.random() * Math.PI * 2;
      stars[base + 2] = Math.random() * 1.8 + 0.8;
      stars[base + 3] = Math.random() * 0.5 + 0.3;
      cosTable[i] = Math.cos(stars[base]);
      sinTable[i] = Math.sin(stars[base]);
    }
  }
}
