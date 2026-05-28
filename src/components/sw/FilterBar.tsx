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
        className={`px-3 py-1.5 rounded-md text-xs tracking-[0.1em] uppercase border transition-all ${
          active === 'All'
            ? 'bg-white/10 border-white/25 text-white'
            : 'bg-transparent border-white/8 text-white/35 hover:text-white/60 hover:border-white/15'
        }`}
      >
        All
      </button>
      {eras.map((era) => {
        const cfg = eraConfig[era];
        const isActive = active === era;
        return (
          <button
            key={era}
            onClick={() => onChange(era)}
            className={`px-3 py-1.5 rounded-md text-xs tracking-[0.1em] uppercase border transition-all ${
              isActive
                ? 'border-current text-white'
                : 'bg-transparent text-white/30 hover:text-white/60'
            }`}
            style={{
              borderColor: isActive ? `${cfg.color}50` : undefined,
              backgroundColor: isActive ? `${cfg.color}15` : undefined,
              color: isActive ? cfg.color : undefined,
            }}
          >
            {era}
          </button>
        );
      })}
    </div>
  );
}
