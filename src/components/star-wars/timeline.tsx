'use client';

import { motion } from 'framer-motion';
import { sagaTimeline } from '@/lib/star-wars-data';

export default function Timeline() {
  const eraColorMap: Record<string, string> = {
    'Prequel': '#E5C100',
    'Original': '#FFE81F',
    'Sequel': '#FF6B35',
    'Spin-off': '#00D4AA',
  };

  return (
    <div className="relative">
      {/* Central timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-glow md:transform md:-translate-x-0.5" />

      <div className="space-y-8 md:space-y-12">
        {sagaTimeline.map((item, index) => {
          const color = eraColorMap[item.era] || '#FFE81F';
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative flex items-center gap-4 md:gap-8 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 z-10 md:transform md:-translate-x-2 md:-translate-y-0"
                style={{
                  borderColor: color,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}40`,
                }}
              />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <div
                  className="inline-block px-3 py-1 rounded-sm text-xs font-bold tracking-[0.15em] mb-1"
                  style={{
                    color: color,
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {item.year}
                </div>
                <p className="text-white/80 text-sm md:text-base font-medium tracking-wider">
                  {item.event}
                </p>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
