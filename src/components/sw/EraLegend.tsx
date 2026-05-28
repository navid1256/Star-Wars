'use client';

import { eraConfig, type Era } from '@/data/starWarsTimeline';

const eras: Era[] = [
  "Fall of the Jedi",
  "Reign of the Empire",
  "Age of Rebellion",
  "The New Republic",
  "Rise of the First Order",
];

export default function EraLegend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
      {eras.map((era) => {
        const cfg = eraConfig[era];
        return (
          <div key={era} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }}
              aria-hidden="true"
            />
            <span className="text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: cfg.color }}>
              {era}
            </span>
          </div>
        );
      })}
    </div>
  );
}
