'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Play, Compass } from 'lucide-react';

export default function Hero() {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Nebula + gradient */}
      <div className="absolute inset-0 z-0">
        <div className="nebula-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-transparent to-[#050510]" />
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #050510 80%)' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#4BD5EE]/20"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 13) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 3.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.3em] uppercase text-[#4BD5EE]/60 border border-[#4BD5EE]/15 px-4 py-1.5 rounded-full">
            <Compass className="w-3 h-3" />
            Galactic Archive
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.04em] leading-[1.1] mb-7"
        >
          <span
            className="block"
            style={{
              color: '#4BD5EE',
              textShadow: '0 0 30px rgba(75,213,238,0.5), 0 0 80px rgba(75,213,238,0.2)',
            }}
          >
            Star Wars
          </span>
          <span className="block text-white/90 mt-1">Chronological</span>
          <span
            className="block mt-1"
            style={{
              color: '#E5C100',
              textShadow: '0 0 30px rgba(229,193,0,0.5), 0 0 80px rgba(229,193,0,0.2)',
            }}
          >
            Viewing Order
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.55 }}
          className="text-white/45 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          A curated journey through the main Star Wars movies and major series — from the fall
          of the Republic to the rise of the Empire, the Rebellion, the New Republic, and the
          final conflict with the First Order.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={scrollToTimeline}
            className="glow-btn group px-7 py-3 bg-[#4BD5EE]/15 border border-[#4BD5EE]/40 text-[#4BD5EE] text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#4BD5EE]/25 hover:border-[#4BD5EE]/60 transition-all duration-200"
            style={{ '--btn-glow': 'rgba(75,213,238,0.3)' } as React.CSSProperties}
            aria-label="Start the chronological journey"
          >
            <Play className="w-4 h-4 inline mr-2 -mt-0.5 group-hover:scale-110 transition-transform" />
            Start the Journey
          </button>
          <button
            onClick={scrollToTimeline}
            className="px-7 py-3 border border-white/10 text-white/45 text-sm tracking-[0.15em] uppercase rounded-lg hover:border-white/20 hover:text-white/65 hover:bg-white/[0.03] transition-all duration-200"
            aria-label="View the timeline"
          >
            View Timeline
          </button>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-white/20 text-xs tracking-wider italic mb-14"
        >
          This order follows the story chronology, not the release dates.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-white/15 text-[0.5rem] tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/15" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
