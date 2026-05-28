'use client';

import { eraConfig, timelineData, type Era } from '@/data/starWarsTimeline';
import TimelineCard from './TimelineCard';

interface TimelineProps {
  filter: Era | 'All';
  search: string;
  beginnerMode: boolean;
}

export default function Timeline({ filter, search, beginnerMode }: TimelineProps) {
  const filtered = timelineData.filter((item) => {
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

  // Group by era
  const eraGroups: { era: Era; items: typeof filtered }[] = [];
  let currentEra: Era | null = null;
  for (const item of filtered) {
    if (item.era !== currentEra) {
      currentEra = item.era;
      eraGroups.push({ era: currentEra, items: [] });
    }
    eraGroups[eraGroups.length - 1].items.push(item);
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-sm tracking-wider">No entries match your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {eraGroups.map((group) => {
        const cfg = eraConfig[group.era];
        const eraSlug = group.era.toLowerCase().replace(/\s+/g, '-');
        return (
          <section key={group.era} id={`era-${eraSlug}`}>
            {/* Era header */}
            <div className="relative mb-10 overflow-hidden rounded-xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 rounded-full" style={{ backgroundColor: cfg.color, boxShadow: `0 0 10px ${cfg.glow}` }} />
                  <h2 className="text-xl md:text-2xl font-black tracking-[0.12em] uppercase" style={{ color: cfg.color }}>
                    {group.era}
                  </h2>
                </div>
                <p className="text-white/35 text-xs md:text-sm tracking-wider ml-5 pl-0.5">
                  {cfg.description}
                </p>
                <div className="mt-3 ml-5" style={{ background: `linear-gradient(90deg, ${cfg.color}50, transparent)`, height: '1px' }} />
              </div>
            </div>

            {/* Timeline cards */}
            <div className="relative">
              {/* Timeline path line */}
              <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]" style={{
                background: `linear-gradient(180deg, ${cfg.color}50, ${cfg.color}20)`,
                boxShadow: `0 0 6px ${cfg.glow}`,
              }} />

              <div className="space-y-8 ml-0 md:ml-0">
                {group.items.map((item, i) => {
                  const globalIndex = timelineData.indexOf(item);
                  const hasOverlapNote = item.id === 9; // Andor gets the overlap note
                  return (
                    <TimelineCard
                      key={item.id}
                      item={item}
                      beginnerMode={beginnerMode}
                      index={globalIndex}
                      isLast={i === group.items.length - 1}
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
