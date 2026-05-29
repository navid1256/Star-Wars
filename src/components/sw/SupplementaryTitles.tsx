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
    <section id="supplementary" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-white/50 text-xl md:text-2xl font-bold tracking-[0.1em] uppercase mb-3">
          Supplementary & Expanded Titles
        </h2>
        <div className="ls-divider-blue max-w-[120px] mx-auto mb-4" />
        <p className="text-white/25 text-xs md:text-sm tracking-wider max-w-lg mx-auto">
          This guide focuses on the main recommended viewing path. The broader Star Wars timeline also includes these titles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {supplementaryTitles.map((item, i) => {
          const Icon = typeIcon[item.type] || Film;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="holo-card p-5"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Icon className="w-4 h-4 text-white/25" />
                <span className="text-[0.6rem] tracking-[0.1em] uppercase text-white/20">{item.type}</span>
                <span className="text-white/10 text-[0.55rem]">·</span>
                <span className="text-[0.6rem] text-white/20">{item.year}</span>
              </div>
              <h3 className="text-white/55 text-sm font-semibold tracking-wide mb-2">{item.title}</h3>
              <p className="text-white/25 text-xs leading-relaxed">{item.note}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
