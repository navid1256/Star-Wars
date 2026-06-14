'use client';

import { motion } from 'framer-motion';
import { supplementaryTitles } from '@/data/starWarsTimeline';
import { typeIcon } from '@/lib/sw-constants';

export default function SupplementaryTitles() {
  return (
    <section id="supplementary" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-white/50 text-xl md:text-2xl font-bold tracking-[0.1em] uppercase mb-2">
          Supplementary &amp; Expanded Titles
        </h2>
        <div className="ls-divider-blue max-w-[100px] mx-auto mb-3" />
        <p className="text-white/25 text-xs md:text-sm tracking-wider max-w-lg mx-auto">
          This guide focuses on the main recommended viewing path. The broader Star Wars timeline also includes these titles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {supplementaryTitles.map((item, i) => {
          const Icon = typeIcon[item.type] ?? typeIcon.Movie;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.04 }}
              className="holo-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 text-white/25" />
                <span className="text-[0.55rem] tracking-[0.1em] uppercase text-white/20">{item.type}</span>
                <span className="text-white/10 text-[0.5rem]">·</span>
                <span className="text-[0.55rem] text-white/20">{item.year}</span>
              </div>
              <h3 className="text-white/55 text-sm font-semibold tracking-wide mb-1.5">{item.title}</h3>
              <p className="text-white/25 text-xs leading-relaxed">{item.note}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
