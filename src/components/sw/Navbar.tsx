'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { eraConfig, type Era } from '@/data/starWarsTimeline';

const navItems = [
  { label: 'Timeline', href: '#timeline' },
  { label: 'Fall of the Jedi', href: '#era-fall-of-the-jedi' },
  { label: 'Reign of the Empire', href: '#era-reign-of-the-empire' },
  { label: 'Age of Rebellion', href: '#era-age-of-rebellion' },
  { label: 'The New Republic', href: '#era-the-new-republic' },
  { label: 'Rise of the First Order', href: '#era-rise-of-the-first-order' },
  { label: 'Supplementary', href: '#supplementary' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#050510]/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#4BD5EE] font-black tracking-[0.2em] text-sm md:text-base hover:opacity-80 transition-opacity"
          aria-label="Scroll to top"
        >
          SW CHRONO
        </button>

        <div className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-white/40 hover:text-[#4BD5EE] text-[0.65rem] tracking-[0.15em] uppercase transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white/50 hover:text-[#4BD5EE] transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050510]/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left text-white/40 hover:text-[#4BD5EE] text-xs tracking-[0.15em] uppercase py-2 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
