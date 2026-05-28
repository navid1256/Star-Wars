'use client';

import { Search } from 'lucide-react';

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, era, or keyword…"
        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white/80 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#4BD5EE]/40 focus:bg-white/[0.05] transition-all"
        aria-label="Search timeline entries"
      />
    </div>
  );
}
