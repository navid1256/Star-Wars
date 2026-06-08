'use client';

import { useState, useEffect, useCallback } from 'react';

interface IntroCrawlProps {
  onComplete: () => void;
}

export default function IntroCrawl({ onComplete }: IntroCrawlProps) {
  const [phase, setPhase] = useState<'intro' | 'logo' | 'crawl'>('intro');
  const [skipHovered, setSkipHovered] = useState(false);

  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // Phase 1: "A long time ago..." (3s)
    timers.push(setTimeout(() => setPhase('logo'), 3500));
    // Phase 2: Logo zoom (6s)
    timers.push(setTimeout(() => setPhase('crawl'), 9500));
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={skip}
    >
      {/* Skip button */}
      <button
        onClick={skip}
        onMouseEnter={() => setSkipHovered(true)}
        onMouseLeave={() => setSkipHovered(false)}
        className="absolute top-6 right-6 z-[60] px-4 py-2 border border-white/30 text-white/60 hover:text-[#FFE81F] hover:border-[#FFE81F]/50 transition-all duration-300 text-sm tracking-widest uppercase"
        style={{
          textShadow: skipHovered ? '0 0 10px rgba(255,232,31,0.5)' : 'none',
        }}
      >
        Skip Intro
      </button>

      {/* Phase 1: "A long time ago..." */}
      {phase === 'intro' && (
        <div className="fade-in text-center">
          <p
            className="text-[#4BD5EE] text-xl md:text-3xl tracking-[0.3em] font-light"
            style={{
              textShadow: '0 0 20px rgba(75,213,238,0.5), 0 0 40px rgba(75,213,238,0.3)',
            }}
          >
            A long time ago in a galaxy far,
          </p>
          <p
            className="text-[#4BD5EE] text-xl md:text-3xl tracking-[0.3em] font-light mt-2"
            style={{
              textShadow: '0 0 20px rgba(75,213,238,0.5), 0 0 40px rgba(75,213,238,0.3)',
            }}
          >
            far away....
          </p>
        </div>
      )}

      {/* Phase 2: Star Wars Logo */}
      {phase === 'logo' && (
        <div className="logo-zoom flex items-center justify-center">
          <h1
            className="text-[#FFE81F] text-6xl md:text-9xl font-black tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '0 0 30px rgba(255,232,31,0.8), 0 0 60px rgba(255,232,31,0.5), 0 0 100px rgba(255,232,31,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            STAR
          </h1>
          <h1
            className="text-[#FFE81F] text-6xl md:text-9xl font-black tracking-wider ml-4 md:ml-6"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '0 0 30px rgba(255,232,31,0.8), 0 0 60px rgba(255,232,31,0.5), 0 0 100px rgba(255,232,31,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            WARS
          </h1>
        </div>
      )}

      {/* Phase 3: Opening Crawl */}
      {phase === 'crawl' && (
        <div className="crawl-perspective w-full h-full flex items-start justify-center pt-20">
          <div className="w-[90%] max-w-5xl crawl-text">
            <h2
              className="text-[#FFE81F] text-2xl md:text-4xl text-center font-bold tracking-wider mb-8"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '0 0 10px rgba(255,232,31,0.5)',
              }}
            >
              EPISODE IV
            </h2>
            <h3
              className="text-[#FFE81F] text-xl md:text-3xl text-center font-bold tracking-wider mb-12"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '0 0 10px rgba(255,232,31,0.5)',
              }}
            >
              A NEW HOPE
            </h3>
            <p className="text-[#FFE81F] text-lg md:text-2xl leading-relaxed text-center tracking-wide" style={{ lineHeight: '2' }}>
              It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
            </p>
            <p className="text-[#FFE81F] text-lg md:text-2xl leading-relaxed text-center tracking-wide mt-8" style={{ lineHeight: '2' }}>
              During the battle, Rebel spies managed to steal secret plans to the Empire&apos;s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.
            </p>
            <p className="text-[#FFE81F] text-lg md:text-2xl leading-relaxed text-center tracking-wide mt-8" style={{ lineHeight: '2' }}>
              Pursued by the Empire&apos;s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
