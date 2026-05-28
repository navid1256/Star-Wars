'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
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
      {/* Starfield */}
      <StarfieldBackground />

      {/* Hyperspace intro */}
      {!introComplete && <HyperspaceIntro onComplete={handleIntroComplete} />}

      {/* Main content */}
      {introComplete && (
        <>
          <Navbar />

          <main className="relative z-10 flex-1">
            {/* Hero */}
            <Hero />

            {/* Story-order explanation */}
            <section className="py-16 px-4 max-w-3xl mx-auto text-center">
              <h2 className="text-white/70 text-lg md:text-xl font-semibold tracking-[0.1em] uppercase mb-4">
                Why Chronological Order?
              </h2>
              <div className="ls-divider-blue max-w-[80px] mx-auto mb-6" />
              <p className="text-white/35 text-xs md:text-sm leading-relaxed">
                Watching Star Wars in chronological story order lets you experience the saga as one
                continuous narrative — from the final days of the Jedi Order and the Republic&apos;s fall,
                through the dark reign of the Empire and the Rebellion that overthrew it, to the
                fragile New Republic and the terrifying return of tyranny as the First Order. Every
                twist, revelation, and character arc lands with maximum impact when you follow the
                timeline as it unfolds within the story.
              </p>
            </section>

            {/* Controls section */}
            <section id="timeline" className="px-4 max-w-5xl mx-auto mb-8 space-y-4">
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
            <div className="px-4 max-w-5xl mx-auto pb-16">
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
