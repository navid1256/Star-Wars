'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HyperspaceIntro from '@/components/sw/HyperspaceIntro';
import Navbar from '@/components/sw/Navbar';
import Hero from '@/components/sw/Hero';
import SearchBox from '@/components/sw/SearchBox';
import FilterBar from '@/components/sw/FilterBar';
import BeginnerModeToggle from '@/components/sw/BeginnerModeToggle';
import EraLegend from '@/components/sw/EraLegend';
import Timeline from '@/components/sw/Timeline';
import SupplementaryTitles from '@/components/sw/SupplementaryTitles';
import ProgressIndicator from '@/components/sw/ProgressIndicator';
import Footer from '@/components/sw/Footer';
import type { Era } from '@/data/starWarsTimeline';

const StarfieldBackground = dynamic(() => import('@/components/sw/StarfieldBackground'), { ssr: false });

function useHasSeenIntro() {
  return useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem('sw-chrono-intro-seen'),
    () => null
  );
}

export default function Home() {
  const hasSeenIntro = useHasSeenIntro();
  const [introComplete, setIntroComplete] = useState(!!hasSeenIntro);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Era | 'All'>('All');
  const [beginnerMode, setBeginnerMode] = useState(false);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('sw-chrono-intro-seen', 'true');
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden flex flex-col">
      <StarfieldBackground />

      {!introComplete && <HyperspaceIntro onComplete={handleIntroComplete} />}

      {introComplete && (
        <>
          <Navbar />

          <main className="relative z-10 flex-1">
            <Hero />

            {/* Why Chronological Order? */}
            <section className="py-20 px-4 max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white/70 text-xl md:text-2xl font-bold tracking-[0.08em] uppercase mb-4"
              >
                Why Chronological Order?
              </motion.h2>
              <div className="ls-divider-blue max-w-[100px] mx-auto mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white/40 text-sm md:text-base leading-relaxed"
              >
                Watching Star Wars in chronological story order lets you experience the saga as one
                continuous narrative — from the final days of the Jedi Order and the Republic&apos;s fall,
                through the dark reign of the Empire and the Rebellion that overthrew it, to the
                fragile New Republic and the terrifying return of tyranny as the First Order. Every
                twist, revelation, and character arc lands with maximum impact when you follow the
                timeline as it unfolds within the story.
              </motion.p>
            </section>

            {/* Featured: For Beginners */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden p-6 md:p-8 border border-[#E5C100]/15 bg-gradient-to-br from-[#E5C100]/5 via-transparent to-[#4BD5EE]/5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#E5C100]/10 border border-[#E5C100]/20 flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#E5C100]" />
                  </div>
                  <div>
                    <h3 className="text-[#E5C100] text-lg font-bold tracking-wide mb-2">
                      New to Star Wars?
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-3">
                      This chronological order is the best way to experience the full saga for the first time. 
                      Toggle <strong className="text-white/70">Beginner Mode</strong> below for simplified summaries and 
                      spoiler-light descriptions. Every entry includes a &ldquo;Why Watch It Here&rdquo; explanation to 
                      guide your journey.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[0.65rem]">
                      <span className="px-2.5 py-1 rounded-md bg-[#E5C100]/10 border border-[#E5C100]/20 text-[#E5C100]/70">19 Entries</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#4BD5EE]/10 border border-[#4BD5EE]/20 text-[#4BD5EE]/70">5 Eras</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA]/70">Movies + Series</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Controls */}
            <section id="timeline" className="px-4 max-w-6xl mx-auto mb-10 space-y-5">
              <EraLegend />
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex-1">
                  <SearchBox value={search} onChange={setSearch} />
                </div>
                <BeginnerModeToggle enabled={beginnerMode} onToggle={() => setBeginnerMode(!beginnerMode)} />
              </div>
              <FilterBar active={filter} onChange={setFilter} />
            </section>

            {/* Timeline */}
            <div className="px-4 max-w-6xl mx-auto pb-20">
              <Timeline filter={filter} search={search} beginnerMode={beginnerMode} />
            </div>

            {/* Supplementary */}
            <div className="px-4 max-w-5xl mx-auto">
              <SupplementaryTitles />
            </div>
          </main>

          <Footer />
          <ProgressIndicator />
        </>
      )}
    </div>
  );
}
