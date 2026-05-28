'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HyperspaceIntroProps {
  onComplete: () => void;
}

export default function HyperspaceIntro({ onComplete }: HyperspaceIntroProps) {
  const [phase, setPhase] = useState<'blue-text' | 'streaks' | 'flash' | 'done'>('blue-text');

  const skip = useCallback(() => {
    setPhase('done');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('streaks'), 3000),
      setTimeout(() => setPhase('flash'), 5500),
      setTimeout(() => { setPhase('done'); onComplete(); }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#050510] flex items-center justify-center cursor-pointer"
          onClick={skip}
        >
          {/* Skip button */}
          <button
            onClick={skip}
            className="absolute top-5 right-5 z-[60] text-white/40 hover:text-white/80 text-xs tracking-[0.25em] uppercase border border-white/10 hover:border-white/30 px-3 py-1.5 transition-all"
            aria-label="Skip intro animation"
          >
            Skip
          </button>

          {/* Phase 1: Blue text */}
          {phase === 'blue-text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-6"
            >
              <p
                className="text-[#4BD5EE] text-lg sm:text-xl md:text-2xl tracking-[0.25em] font-light leading-relaxed"
                style={{ textShadow: '0 0 20px rgba(75,213,238,0.5), 0 0 40px rgba(75,213,238,0.25)' }}
              >
                A long time ago in a galaxy far,
              </p>
              <p
                className="text-[#4BD5EE] text-lg sm:text-xl md:text-2xl tracking-[0.25em] font-light mt-1"
                style={{ textShadow: '0 0 20px rgba(75,213,238,0.5), 0 0 40px rgba(75,213,238,0.25)' }}
              >
                far away….
              </p>
            </motion.div>
          )}

          {/* Phase 2: Hyperspace streaks */}
          {phase === 'streaks' && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * 360;
                const len = 40 + Math.random() * 120;
                const delay = Math.random() * 0.4;
                const x = 50 + (Math.cos((angle * Math.PI) / 180) * 2);
                const y = 50 + (Math.sin((angle * Math.PI) / 180) * 2);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.6], scale: 50 }}
                    transition={{ duration: 2.5, delay, ease: 'easeOut' }}
                    className="absolute rounded-full bg-white"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: '2px',
                      height: `${len}px`,
                      transformOrigin: 'center center',
                      rotate: `${angle}deg`,
                    }}
                  />
                );
              })}
              {/* Central glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0.4], scale: [0, 1, 1.2] }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
                style={{ boxShadow: '0 0 60px 30px rgba(75,213,238,0.4), 0 0 120px 60px rgba(75,213,238,0.15)' }}
              />
            </div>
          )}

          {/* Phase 3: Flash */}
          {phase === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
