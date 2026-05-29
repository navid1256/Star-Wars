'use client';

import { eraConfig, type Era } from '@/data/starWarsTimeline';

const eras: Era[] = [
  "Fall of the Jedi",
  "Reign of the Empire",
  "Age of Rebellion",
  "The New Republic",
  "Rise of the First Order",
];

interface FilterBarProps {
  active: Era | 'All';
  onChange: (era: Era | 'All') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by era">
      <button
        onClick={() => onChange('All')}
        className={`px-4 py-2 rounded-lg text-xs tracking-[0.08em] uppercase border transition-all duration-300 ${
          active === 'All'
            ? 'bg-white/8 border-white/20 text-white/90'
            : 'bg-transparent border-white/5 text-white/25 hover:text-white/50 hover:border-white/12 hover:bg-white/[0.02]'
        }`}
      >
        All Eras
      </button>
      {eras.map((era) => {
        const cfg = eraConfig[era];
        const isActive = active === era;
        return (
          <button
            key={era}
            onClick={() => onChange(era)}
            className={`px-4 py-2 rounded-lg text-xs tracking-[0.08em] uppercase border transition-all duration-300 ${
              isActive
                ? 'text-white/90'
                : 'bg-transparent text-white/25 hover:text-white/50 hover:bg-white/[0.02]'
            }`}
            style={{
              borderColor: isActive ? `${cfg.color}40` : undefined,
              backgroundColor: isActive ? `${cfg.color}12` : undefined,
              color: isActive ? cfg.color : undefined,
              boxShadow: isActive ? `0 0 12px ${cfg.glow}` : undefined,
            }}
          >
            {era}
          </button>
        );
      })}
    </div>
  );
}
