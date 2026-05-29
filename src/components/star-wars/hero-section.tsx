'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Swords, Rocket, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-space-battle.png"
          alt="Star Wars Space Battle"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 sw-gradient-radial" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1
            className="text-5xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] pulse-glow"
            style={{ color: '#FFE81F' }}
          >
            STAR WARS
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 text-lg md:text-xl tracking-[0.3em] uppercase mt-4 mb-8"
        >
          The Complete Saga
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Explore the epic story of the Skywalker saga — from the fall of the Republic 
          to the rise of the Empire, and the heroes who fought to restore freedom to the galaxy.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-16"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Film className="w-4 h-4 text-[#FFE81F]" />
              <span className="text-[#FFE81F] text-2xl md:text-3xl font-bold">11</span>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Films</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Swords className="w-4 h-4 text-[#FF2D2D]" />
              <span className="text-[#FF2D2D] text-2xl md:text-3xl font-bold">3</span>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Trilogies</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Rocket className="w-4 h-4 text-[#4BD5EE]" />
              <span className="text-[#4BD5EE] text-2xl md:text-3xl font-bold">42+</span>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Years of Story</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#00D4AA]" />
              <span className="text-[#00D4AA] text-2xl md:text-3xl font-bold">∞</span>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">The Force</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToTimeline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-[#FFE81F] transition-colors duration-300 mx-auto"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Explore the Saga</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

function Film({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M3 7h4" />
      <path d="M17 7h4" />
      <path d="M3 17h4" />
      <path d="M17 17h4" />
    </svg>
  );
}
