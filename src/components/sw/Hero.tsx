'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

export default function Hero() {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Nebula + gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="nebula-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/70 via-[#050510]/50 to-[#050510]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.08em] leading-tight mb-6"
          style={{
            color: '#4BD5EE',
            textShadow: '0 0 20px rgba(75,213,238,0.4), 0 0 60px rgba(75,213,238,0.15)',
          }}
        >
          Star Wars
          <br />
          <span className="text-white/90" style={{ textShadow: 'none' }}>Chronological</span>
          <br />
          <span style={{ color: '#E5C100', textShadow: '0 0 20px rgba(229,193,0,0.4)' }}>Viewing Order</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10"
        >
          A curated journey through the main Star Wars movies and major series — from the fall
          of the Republic to the rise of the Empire, the Rebellion, the New Republic, and the
          final conflict with the First Order.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button
            onClick={scrollToTimeline}
            className="glow-btn px-8 py-3 bg-[#4BD5EE]/10 border border-[#4BD5EE]/40 text-[#4BD5EE] text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#4BD5EE]/20 transition-all"
            style={{ '--btn-glow': 'rgba(75,213,238,0.3)' } as React.CSSProperties}
            aria-label="Start the chronological journey"
          >
            <Play className="w-4 h-4 inline mr-2 -mt-0.5" />
            Start the Journey
          </button>
          <button
            onClick={scrollToTimeline}
            className="px-8 py-3 border border-white/10 text-white/50 text-sm tracking-[0.15em] uppercase rounded-lg hover:border-white/25 hover:text-white/70 transition-all"
            aria-label="View the timeline"
          >
            View Timeline
          </button>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-white/25 text-xs tracking-wider italic"
        >
          This order follows the story chronology, not the release dates.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-14"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-white/20 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
