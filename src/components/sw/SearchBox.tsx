'use client';

import { Search } from 'lucide-react';

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#4BD5EE]/50 transition-colors pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, era, or keyword…"
        className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/8 rounded-lg text-white/80 text-sm placeholder:text-white/18 focus:outline-none focus:border-[#4BD5EE]/30 focus:bg-white/[0.05] focus:shadow-[0_0_12px_rgba(75,213,238,0.08)] transition-all duration-300"
        aria-label="Search timeline entries"
      />
    </div>
  );
}
