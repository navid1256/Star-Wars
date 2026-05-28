'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import IntroCrawl from '@/components/star-wars/intro-crawl';
import Navbar from '@/components/star-wars/navbar';
import HeroSection from '@/components/star-wars/hero-section';
import Timeline from '@/components/star-wars/timeline';
import SagaExplorer from '@/components/star-wars/saga-explorer';

const StarField = dynamic(() => import('@/components/star-wars/star-field'), { ssr: false });

// Use useSyncExternalStore to safely read sessionStorage without hydration mismatch.
// On the server it returns null; on the client it returns the actual value.
// React handles the transition correctly without hydration errors.
function useHasSeenIntro() {
  return useSyncExternalStore(
    // subscribe — no-op since sessionStorage changes from same tab don't fire events
    () => () => {},
    // getSnapshot (client only)
    () => sessionStorage.getItem('sw-intro-seen'),
    // getServerSnapshot — always null on the server
    () => null
  );
}

export default function Home() {
  const hasSeenIntro = useHasSeenIntro();
  const [skipped, setSkipped] = useState(false);

  const showIntro = !hasSeenIntro && !skipped;
  const introComplete = !!hasSeenIntro || skipped;

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('sw-intro-seen', 'true');
    setSkipped(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Star Field Background */}
      <StarField />

      {/* Intro Crawl */}
      {showIntro && <IntroCrawl onComplete={handleIntroComplete} />}

      {/* Main Content */}
      {introComplete && (
        <>
          <Navbar />

          <main className="relative z-10">
            {/* Hero Section */}
            <HeroSection />

            {/* Timeline Section */}
            <section id="timeline" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#FFE81F] text-3xl md:text-5xl font-black tracking-[0.15em] mb-4 pulse-glow">
                  THE SAGA TIMELINE
                </h2>
                <div className="lightsaber-divider max-w-xs mx-auto mb-6" />
                <p className="text-white/40 text-sm md:text-base tracking-wider max-w-xl mx-auto">
                  From the fall of the Republic to the final battle on Exegol — 
                  the complete chronology of the Skywalker saga
                </p>
              </div>
              <Timeline />
            </section>

            {/* Era sections divider */}
            <div className="py-12 px-4 max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-[#FFE81F] text-3xl md:text-5xl font-black tracking-[0.15em] mb-4 pulse-glow">
                  EXPLORE THE STORY
                </h2>
                <div className="lightsaber-divider-yellow max-w-xs mx-auto mb-6" />
                <p className="text-white/40 text-sm md:text-base tracking-wider max-w-2xl mx-auto">
                  Each film is a chapter in the greatest space opera ever told. 
                  Click any film to explore its key events, characters, and the story that shaped the galaxy.
                </p>
              </div>
            </div>

            {/* Saga Explorer */}
            <div className="px-4 md:px-8 max-w-5xl mx-auto pb-20">
              <SagaExplorer />
            </div>

            {/* Quote Section */}
            <section className="py-20 px-4 md:px-8 relative overflow-hidden">
              <div className="absolute inset-0 sw-gradient-radial" />
              <div className="relative max-w-3xl mx-auto text-center">
                <blockquote className="text-[#4BD5EE] text-2xl md:text-4xl font-light italic tracking-wide leading-relaxed mb-6">
                  &ldquo;For over a thousand generations, the Jedi Knights were the guardians 
                  of peace and justice in the Old Republic. Before the dark times. 
                  Before the Empire.&rdquo;
                </blockquote>
                <cite className="text-white/40 text-sm tracking-[0.2em] uppercase not-italic">
                  — Obi-Wan Kenobi
                </cite>
              </div>
            </section>

            {/* Final Message */}
            <section className="py-20 px-4 md:px-8 relative">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-[#FFE81F] text-xl md:text-2xl font-bold tracking-[0.15em] mb-4">
                  THE FORCE WILL BE WITH YOU
                </h3>
                <p className="text-white/30 text-sm tracking-wider mb-2">ALWAYS</p>
                <div className="lightsaber-divider max-w-[60px] mx-auto mt-8" />
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/5 py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/20 text-xs tracking-widest uppercase">
                Star Wars™ is a trademark of Lucasfilm Ltd.
              </p>
              <p className="text-white/20 text-xs tracking-widest uppercase">
                A fan tribute — May the Force be with you
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
