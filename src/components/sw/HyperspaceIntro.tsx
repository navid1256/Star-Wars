'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HyperspaceIntroProps {
  onComplete: () => void;
}

// Pre-generate stable streak data so it doesn't change on re-render
function generateStreaks(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * 360 + (Math.sin(i * 7.3) * 8), // spread evenly with slight variation
    length: 30 + ((i * 37) % 100),
    delay: Math.abs(Math.sin(i * 3.7)) * 0.3,
    offsetX: Math.sin(i * 2.3) * 1.5,
    offsetY: Math.cos(i * 4.1) * 1.5,
  }));
}

export default function HyperspaceIntro({ onComplete }: HyperspaceIntroProps) {
  const [phase, setPhase] = useState<'blue-text' | 'streaks' | 'flash' | 'done'>('blue-text');
  const streaks = useMemo(() => generateStreaks(80), []);

  const skip = useCallback(() => {
    setPhase('done');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('streaks'), 2200),
      setTimeout(() => setPhase('flash'), 4200),
      setTimeout(() => { setPhase('done'); onComplete(); }, 4700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[#020209] flex items-center justify-center cursor-pointer"
          onClick={skip}
        >
          {/* Skip button */}
          <button
            onClick={skip}
            className="absolute top-5 right-5 z-[60] text-white/30 hover:text-white/70 text-[0.65rem] tracking-[0.25em] uppercase border border-white/8 hover:border-white/20 px-3 py-1.5 rounded transition-all"
            aria-label="Skip intro animation"
          >
            SKIP
          </button>

          {/* Phase 1: Blue text - classic Star Wars intro */}
          {phase === 'blue-text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, times: [0, 0.15, 0.8, 1] }}
              className="text-center px-8"
            >
              <p
                className="text-[#4BD5EE] text-lg sm:text-2xl md:text-3xl tracking-[0.2em] font-light"
                style={{ textShadow: '0 0 30px rgba(75,213,238,0.6), 0 0 60px rgba(75,213,238,0.3), 0 0 90px rgba(75,213,238,0.15)' }}
              >
                A long time ago in a galaxy far,
              </p>
              <p
                className="text-[#4BD5EE] text-lg sm:text-2xl md:text-3xl tracking-[0.2em] font-light mt-2"
                style={{ textShadow: '0 0 30px rgba(75,213,238,0.6), 0 0 60px rgba(75,213,238,0.3), 0 0 90px rgba(75,213,238,0.15)' }}
              >
                far away….
              </p>
            </motion.div>
          )}

          {/* Phase 2: Hyperspace streaks - radial burst from center */}
          {phase === 'streaks' && (
            <div className="absolute inset-0 overflow-hidden">
              {streaks.map((streak, i) => {
                const rad = (streak.angle * Math.PI) / 180;
                const x = 50 + streak.offsetX;
                const y = 50 + streak.offsetY;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleY: 0, scaleX: 1 }}
                    animate={{ opacity: [0, 0.9, 0.5], scaleY: [0, 1, 1], scaleX: [1, 1, 0.3] }}
                    transition={{ duration: 2, delay: streak.delay, ease: [0.2, 0, 0.3, 1] }}
                    className="absolute bg-white rounded-full origin-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: '1.5px',
                      height: `${streak.length}px`,
                      transform: `rotate(${streak.angle}deg)`,
                    }}
                  />
                );
              })}
              {/* Central glow that expands */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.9, 0.3], scale: [0, 1, 3] }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white"
                style={{ boxShadow: '0 0 40px 20px rgba(75,213,238,0.5), 0 0 80px 40px rgba(75,213,238,0.25), 0 0 120px 60px rgba(75,213,238,0.1)' }}
              />
            </div>
          )}

          {/* Phase 3: Quick bright flash */}
          {phase === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 bg-[#4BD5EE]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
