'use client';

import { UserCheck, BookOpen } from 'lucide-react';

interface BeginnerModeToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function BeginnerModeToggle({ enabled, onToggle }: BeginnerModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs tracking-[0.1em] uppercase border transition-all ${
        enabled
          ? 'bg-[#E5C100]/10 border-[#E5C100]/30 text-[#E5C100]'
          : 'bg-transparent border-white/8 text-white/30 hover:text-white/60 hover:border-white/15'
      }`}
      aria-label={enabled ? 'Disable beginner mode' : 'Enable beginner mode'}
      aria-pressed={enabled}
    >
      {enabled ? <UserCheck className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
      Beginner Mode
    </button>
  );
}
