'use client';

import { eraConfig } from '@/data/starWarsTimeline';
import { ERA_ORDER } from '@/lib/sw-constants';
import type { Era } from '@/data/starWarsTimeline';

interface FilterBarProps {
  active: Era | 'All';
  onChange: (era: Era | 'All') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by era">
      <FilterButton label="All Eras" isActive={active === 'All'} onClick={() => onChange('All')} />

      {ERA_ORDER.map((era) => {
        const cfg = eraConfig[era];
        return (
          <EraFilterButton key={era} era={era} cfg={cfg} isActive={active === era} onClick={() => onChange(era)} />
        );
      })}
    </div>
  );
}

function FilterButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs tracking-[0.08em] uppercase border transition-all duration-300 ${
        isActive
          ? 'bg-white/8 border-white/20 text-white/90'
          : 'bg-transparent border-white/5 text-white/25 hover:text-white/50 hover:border-white/12 hover:bg-white/[0.02]'
      }`}
    >
      {label}
    </button>
  );
}

function EraFilterButton({ era, cfg, isActive, onClick }: {
  era: Era;
  cfg: (typeof eraConfig)[keyof typeof eraConfig];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
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
}
