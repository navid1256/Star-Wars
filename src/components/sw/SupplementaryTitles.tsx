'use client';

import { motion } from 'framer-motion';
import { supplementaryTitles } from '@/data/starWarsTimeline';
import { Film, Tv, Clapperboard } from 'lucide-react';

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Movie: Film,
  'TV Series': Tv,
  'Animated TV Series': Clapperboard,
};

export default function SupplementaryTitles() {
  return (
    <section id="supplementary" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-white/60 text-xl md:text-2xl font-bold tracking-[0.12em] uppercase mb-3">
          Supplementary & Expanded Titles
        </h2>
        <div className="ls-divider-blue max-w-[120px] mx-auto mb-4" />
        <p className="text-white/30 text-xs md:text-sm tracking-wider max-w-xl mx-auto">
          This guide focuses on the main recommended viewing path. The broader Star Wars timeline also includes these titles — worth exploring for completists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {supplementaryTitles.map((item, i) => {
          const Icon = typeIcon[item.type] || Film;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="holo-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[0.55rem] tracking-[0.1em] uppercase text-white/25">{item.type}</span>
                <span className="text-[0.55rem] text-white/20">·</span>
                <span className="text-[0.55rem] text-white/20">{item.year}</span>
              </div>
              <h3 className="text-white/60 text-sm font-semibold tracking-wide mb-1">{item.title}</h3>
              <p className="text-white/25 text-[0.65rem] leading-relaxed">{item.note}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
