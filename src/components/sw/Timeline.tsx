'use client';

import { useMemo } from 'react';
import { eraConfig, timelineData, type Era } from '@/data/starWarsTimeline';
import TimelineCard from './TimelineCard';
import type { SortMode } from '@/app/page';

interface TimelineProps {
  filter: Era | 'All';
  search: string;
  beginnerMode: boolean;
  sortMode: SortMode;
}

/** Extract the starting year from a releaseYear string like "1999", "2008–2020", "2019–present" */
function parseStartYear(yearStr: string): number {
  const match = yearStr.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function Timeline({ filter, search, beginnerMode, sortMode }: TimelineProps) {
  const sorted = useMemo(() => {
    const base = [...timelineData];
    if (sortMode === 'release') {
      base.sort((a, b) => parseStartYear(a.releaseYear) - parseStartYear(b.releaseYear));
    }
    // chronological is already the default order (by chronNumber)
    return base;
  }, [sortMode]);

  const filtered = sorted.filter((item) => {
    if (filter !== 'All' && item.era !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.era.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.beginnerSummary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by era (preserving the sorted order)
  // Use a unique groupIndex to avoid duplicate keys when the same era appears multiple times
  const eraGroups: { era: Era; groupIndex: number; items: typeof filtered }[] = [];
  let currentEra: Era | null = null;
  for (const item of filtered) {
    if (item.era !== currentEra) {
      currentEra = item.era;
      eraGroups.push({ era: currentEra, groupIndex: eraGroups.length, items: [] });
    }
    eraGroups[eraGroups.length - 1].items.push(item);
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-white/30 text-sm tracking-wider">No entries match your search.</p>
      </div>
    );
  }

  // Track global position for alternating
  let globalPos = 0;

  return (
    <div className="space-y-16">
      {eraGroups.map((group) => {
        const cfg = eraConfig[group.era];
        const eraSlug = group.era.toLowerCase().replace(/\s+/g, '-');
        const uniqueKey = `era-${group.groupIndex}-${eraSlug}`;

        return (
          <section key={uniqueKey} id={`era-${eraSlug}-${group.groupIndex}`}>
            {/* Era header */}
            <div className="relative mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-1.5 h-8 rounded-full"
                  style={{ backgroundColor: cfg.color, boxShadow: `0 0 10px ${cfg.glow}` }}
                />
                <h2
                  className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase"
                  style={{ color: cfg.color, textShadow: `0 0 16px ${cfg.glow}` }}
                >
                  {group.era}
                  {sortMode === 'release' && (
                    <span className="text-white/20 text-xs font-normal tracking-normal ml-2 lowercase">
                      ({group.items.map(i => i.releaseYear).join(', ')})
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-white/35 text-xs tracking-wider ml-5 mb-3">
                {cfg.description}
              </p>
              <div
                className="h-px ml-5"
                style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent 60%)`, boxShadow: `0 0 6px ${cfg.glow}` }}
              />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center line - desktop */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px]"
                style={{
                  background: `linear-gradient(180deg, ${cfg.color}40, ${cfg.color}10)`,
                  boxShadow: `0 0 6px ${cfg.glow}`,
                }}
              />
              {/* Left line - mobile */}
              <div
                className="md:hidden absolute left-[6px] top-0 bottom-0 w-[2px]"
                style={{
                  background: `linear-gradient(180deg, ${cfg.color}40, ${cfg.color}10)`,
                  boxShadow: `0 0 4px ${cfg.glow}`,
                }}
              />

              <div className="space-y-8">
                {group.items.map((item) => {
                  const pos = globalPos++;
                  const hasOverlapNote = item.id === 9;
                  return (
                    <TimelineCard
                      key={item.id}
                      item={item}
                      beginnerMode={beginnerMode}
                      position={pos}
                      hasOverlapNote={hasOverlapNote}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
