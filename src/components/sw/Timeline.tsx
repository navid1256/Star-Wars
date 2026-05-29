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
      <div className="text-center py-24">
        <p className="text-white/30 text-sm tracking-wider">No entries match your search.</p>
      </div>
    );
  }

  // Track global position for alternating
  let globalPos = 0;

  return (
    <div className="space-y-20">
      {eraGroups.map((group) => {
        const cfg = eraConfig[group.era];
        const eraSlug = group.era.toLowerCase().replace(/\s+/g, '-');
        const startPos = globalPos;

        return (
          <section key={group.era} id={`era-${eraSlug}`}>
            {/* Era header */}
            <div className="relative mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ backgroundColor: cfg.color, boxShadow: `0 0 12px ${cfg.glow}` }}
                />
                <h2
                  className="text-2xl md:text-3xl font-black tracking-[0.1em] uppercase"
                  style={{ color: cfg.color, textShadow: `0 0 20px ${cfg.glow}` }}
                >
                  {group.era}
                </h2>
              </div>
              <p className="text-white/40 text-sm tracking-wider ml-7 mb-4">
                {cfg.description}
              </p>
              <div
                className="h-px ml-7"
                style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent 70%)`, boxShadow: `0 0 8px ${cfg.glow}` }}
              />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center line - desktop */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px]"
                style={{
                  background: `linear-gradient(180deg, ${cfg.color}40, ${cfg.color}15)`,
                  boxShadow: `0 0 8px ${cfg.glow}`,
                }}
              />
              {/* Left line - mobile */}
              <div
                className="md:hidden absolute left-[7px] top-0 bottom-0 w-[2px]"
                style={{
                  background: `linear-gradient(180deg, ${cfg.color}40, ${cfg.color}15)`,
                  boxShadow: `0 0 6px ${cfg.glow}`,
                }}
              />

              <div className="space-y-10">
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
