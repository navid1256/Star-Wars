'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

interface HyperspaceIntroProps {
  onComplete: () => void;
}

const CRAWL_TEXT = `It is a time of endless choices. Across the galaxy, countless viewers struggle to find the right path through the Star Wars saga.

This interactive timeline is your guide — nineteen titles across five eras, arranged in the exact order events happen.

May the Force be with you.`;

// All poster paths for preloading during intro
const POSTER_PATHS = [
  '/posters/ep1.jpg', '/posters/ep2.jpg', '/posters/ep3.jpg', '/posters/ep4.jpg',
  '/posters/ep5.jpg', '/posters/ep6.jpg', '/posters/ep7.jpg', '/posters/ep8.jpg',
  '/posters/episode9.jpg', '/posters/solo.jpg', '/posters/rogue-one.jpg', '/posters/cw.jpg',
  '/posters/rebels.jpg', '/posters/andor.jpg', '/posters/ahsoka.jpg', '/posters/bb.jpg',
  '/posters/bobafett.jpg', '/posters/mando.jpg', '/posters/obiwan.jpg',
];

export default function HyperspaceIntro({ onComplete }: HyperspaceIntroProps) {
  const [phase, setPhase] = useState<'blue-text' | 'logo' | 'crawl' | 'fade-out' | 'done'>('blue-text');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crawlRef = useRef<HTMLDivElement>(null);
  // Separate refs so effects don't cancel each other
  const starsFrameRef = useRef<number>(0);
  const crawlFrameRef = useRef<number>(0);
  const crawlStartedRef = useRef(false);

  // Preload all poster images during intro so they're cached when timeline appears
  useEffect(() => {
    POSTER_PATHS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const skip = useCallback(() => {
    cancelAnimationFrame(starsFrameRef.current);
    cancelAnimationFrame(crawlFrameRef.current);
    crawlStartedRef.current = false;
    setPhase('done');
    onComplete();
  }, [onComplete]);

  // Phase timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('logo'), 3200),
      setTimeout(() => setPhase('crawl'), 6800),
      setTimeout(() => setPhase('fade-out'), 30000),
      setTimeout(() => { setPhase('done'); onComplete(); }, 30600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Star streaks canvas — continuous looping starfield
  useEffect(() => {
    if (phase !== 'logo' && phase !== 'crawl' && phase !== 'fade-out') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    const STAR_COUNT = 600;
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

      const bands = 4;
      for (let b = 0; b < bands; b++) {
        const alphaMin = b / bands;
        const alphaMax = (b + 1) / bands;
        const bandAlpha = ((alphaMin + alphaMax) / 2) * 0.8;

        ctx.strokeStyle = `rgba(200,215,255,${bandAlpha.toFixed(3)})`;
        ctx.beginPath();

        for (let i = 0; i < STAR_COUNT; i++) {
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
          const x2 = cx + cos * (dist + streakLen);
          const y2 = cy + sin * (dist + streakLen);

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }

        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(220,230,255,0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < STAR_COUNT; i++) {
        const base = i * 5;
        const dist = stars[base + 1];
        const brightness = stars[base + 3];

        if (dist < 200 || brightness < 0.6) continue;

        const cos = cosTable[i];
        const sin = sinTable[i];
        const streakLen = Math.min(dist * 0.18, 70);
        const x1 = cx + cos * dist;
        const y1 = cy + sin * dist;
        const x2 = cx + cos * (dist + streakLen);
        const y2 = cy + sin * (dist + streakLen);

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      gradient.addColorStop(0, 'rgba(200,215,255,0.25)');
      gradient.addColorStop(1, 'rgba(200,215,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      // Update star positions — loop: stars reset to center when off-screen
      for (let i = 0; i < STAR_COUNT; i++) {
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

  // Crawl animation — starts once, keeps running even through fade-out
  useEffect(() => {
    if (phase !== 'crawl' && phase !== 'fade-out') return;
    if (crawlStartedRef.current) return; // Already running, don't restart
    crawlStartedRef.current = true;

    const el = crawlRef.current;
    if (!el) return;

    let running = true;
    let startY = window.innerHeight * 0.85;
    const speed = 55;
    let lastTime = performance.now();

    el.style.transform = `rotateX(25deg) translateY(${startY}px)`;

    const animate = (now: number) => {
      if (!running || !el) return;

      const dt = (now - lastTime) / 1000;
      lastTime = now;
      startY -= speed * dt;

      el.style.transform = `rotateX(25deg) translateY(${startY}px)`;

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
          style={{
            opacity: phase === 'fade-out' ? 0 : 1,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          {/* Skip button */}
          <button
            onClick={skip}
            className="absolute top-5 right-5 z-[60] text-white/30 hover:text-white/70 text-[0.6rem] tracking-[0.25em] uppercase border border-white/8 hover:border-white/20 px-3 py-1.5 rounded transition-all cursor-pointer"
            aria-label="Skip intro animation"
          >
            SKIP
          </button>

          {/* Star streaks canvas */}
          {(phase === 'logo' || phase === 'crawl' || phase === 'fade-out') && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0"
            />
          )}

          {/* Phase 1: "A long time ago..." blue text */}
          {phase === 'blue-text' && (
            <div
              className="text-center px-8 z-10"
              style={{
                animation: 'blueTextFade 3.2s ease-out forwards',
              }}
            >
              <p
                className="text-[#4BD5EE] text-lg sm:text-2xl md:text-4xl tracking-[0.2em] font-light leading-relaxed"
                style={{ textShadow: '0 0 30px rgba(75,213,238,0.6), 0 0 60px rgba(75,213,238,0.3), 0 0 90px rgba(75,213,238,0.15)' }}
              >
                A long time ago in a galaxy far,
              </p>
              <p
                className="text-[#4BD5EE] text-lg sm:text-2xl md:text-4xl tracking-[0.2em] font-light mt-3"
                style={{ textShadow: '0 0 30px rgba(75,213,238,0.6), 0 0 60px rgba(75,213,238,0.3), 0 0 90px rgba(75,213,238,0.15)' }}
              >
                far away….
              </p>
            </div>
          )}

          {/* Phase 2: STAR WARS logo zoom */}
          {phase === 'logo' && (
            <div
              className="z-10 text-center"
              style={{
                animation: 'starWarsLogo 3.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
              }}
            >
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
          )}

          {/* Phase 3: Crawl text in 3D perspective — includes description at the end */}
          {(phase === 'crawl' || phase === 'fade-out') && (
            <div className="absolute inset-0 z-10 overflow-hidden flex items-start justify-center">
              {/* Fade overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[12%] z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
              />

              {/* 3D perspective container */}
              <div
                className="w-full h-full"
                style={{
                  perspective: '330px',
                  perspectiveOrigin: '50% 100%',
                }}
              >
                <div
                  ref={crawlRef}
                  className="w-full mx-auto px-8 md:px-16 lg:px-24 will-change-transform"
                  style={{
                    transform: 'rotateX(25deg) translateY(85vh)',
                    transformOrigin: '50% 100%',
                  }}
                >
                  <div className="text-center max-w-5xl mx-auto">
                    {(() => {
                      const lines = CRAWL_TEXT.split('\n');
                      return lines.map((paragraph, i) => {
                        const isEmpty = paragraph.trim() === '';
                        if (isEmpty) return <div key={i} className="h-8" />;
                        return (
                          <p
                            key={i}
                            className="text-[#FFE81F] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.4] mb-5 tracking-[0.12em] uppercase"
                            style={{
                              textShadow: '0 0 18px rgba(255,232,31,0.55), 0 0 40px rgba(255,232,31,0.2)',
                              fontFamily: '"Franklin Gothic Medium", "Arial Narrow", "Segoe UI", system-ui, sans-serif',
                            }}
                          >
                            {paragraph}
                          </p>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
