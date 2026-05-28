'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Film, Tv, Clapperboard, AlertCircle } from 'lucide-react';
import { type TimelineItem, eraConfig } from '@/data/starWarsTimeline';

interface TimelineCardProps {
  item: TimelineItem;
  beginnerMode: boolean;
  index: number;
  isLast: boolean;
  hasOverlapNote?: boolean;
}

const typeIcon = {
  Movie: Film,
  'TV Series': Tv,
  'Animated TV Series': Clapperboard,
};

const typeBadge = {
  Movie: 'bg-[#4BD5EE]/10 border-[#4BD5EE]/25 text-[#4BD5EE]',
  'TV Series': 'bg-[#00D4AA]/10 border-[#00D4AA]/25 text-[#00D4AA]',
  'Animated TV Series': 'bg-[#E5C100]/10 border-[#E5C100]/25 text-[#E5C100]',
};

export default function TimelineCard({ item, beginnerMode, index, isLast, hasOverlapNote }: TimelineCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = eraConfig[item.era];
  const Icon = typeIcon[item.type];
  const isLeft = index % 2 === 0;

  return (
    <div className="relative" id={`card-${item.chronNumber}`}>
      {/* Overlap note for Andor/Rebels */}
      {hasOverlapNote && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 ml-12 md:ml-0 md:max-w-[45%] md:mx-auto"
        >
          <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#FF8C00]/5 border border-[#FF8C00]/15">
            <AlertCircle className="w-3.5 h-3.5 text-[#FF8C00] mt-0.5 flex-shrink-0" />
            <p className="text-[0.65rem] text-white/50 leading-relaxed">
              <strong className="text-[#FF8C00]">Timeline Note:</strong> The events of Andor and Star Wars Rebels partially overlap. Both contribute to the rise of the Rebellion and lead toward Rogue One.
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.04 }}
        className="relative flex items-start gap-4 md:gap-0"
      >
        {/* Mobile: timeline dot */}
        <div className="md:hidden flex-shrink-0 mt-6">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: cfg.color, boxShadow: `0 0 8px ${cfg.glow}` }}
          />
        </div>

        {/* Desktop: alternating layout */}
        <div className={`hidden md:flex md:w-[50%] ${isLeft ? 'justify-end pr-10' : 'order-2 justify-start pl-10'}`}>
          {/* Card content */}
          <div
            className="holo-card holo-scan w-full max-w-md p-5 cursor-pointer"
            style={{ '--era-color': `${cfg.color}60`, '--era-glow': cfg.glow } as React.CSSProperties}
            onClick={() => setExpanded(!expanded)}
            role="button"
            aria-expanded={expanded}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
          >
            <CardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} />
          </div>
        </div>

        {/* Desktop: dot on center line */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1.5 top-6 z-10">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: cfg.color, boxShadow: `0 0 8px ${cfg.glow}` }}
          />
        </div>

        {/* Desktop: empty side */}
        {isLeft && <div className="hidden md:block md:w-[50%]" />}

        {/* Mobile: card */}
        <div
          className="md:hidden holo-card holo-scan flex-1 p-4 cursor-pointer"
          style={{ '--era-color': `${cfg.color}60`, '--era-glow': cfg.glow } as React.CSSProperties}
          onClick={() => setExpanded(!expanded)}
        >
          <CardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} />
        </div>
      </motion.div>
    </div>
  );
}

function CardInner({ item, beginnerMode, expanded, cfg, Icon }: {
  item: TimelineItem;
  beginnerMode: boolean;
  expanded: boolean;
  cfg: (typeof eraConfig)[keyof typeof eraConfig];
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Chron number */}
            <span
              className="text-[0.6rem] font-bold tracking-[0.15em] px-2 py-0.5 rounded"
              style={{ backgroundColor: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}25` }}
            >
              #{item.chronNumber}
            </span>
            {/* Type badge */}
            <span className={`text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded border ${typeBadge[item.type]}`}>
              <Icon className="w-3 h-3 inline mr-1 -mt-0.5" />
              {item.type}
            </span>
            <span className="text-white/25 text-[0.6rem]">{item.releaseYear}</span>
          </div>
          <h3 className="text-base md:text-lg font-bold tracking-wide leading-snug" style={{ color: cfg.color }}>
            {item.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-white/25 mt-1 flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Era tag */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} aria-hidden="true" />
        <span className="text-[0.6rem] tracking-[0.12em] uppercase" style={{ color: cfg.color }}>{item.era}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-[0.55rem] px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/35">
            {tag}
          </span>
        ))}
      </div>

      {/* Summary */}
      <p className="text-white/55 text-xs leading-relaxed line-clamp-3">
        {beginnerMode ? item.beginnerSummary : item.summary}
      </p>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {/* Divider */}
              <div className="ls-divider" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)`, boxShadow: `0 0 6px ${cfg.glow}` }} />

              {/* Why watch here */}
              <div>
                <h4 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase mb-1.5" style={{ color: cfg.accent }}>
                  Why Watch It Here
                </h4>
                <p className="text-white/50 text-xs leading-relaxed">{item.whyWatchHere}</p>
              </div>

              {/* Beginner summary (only in non-beginner mode) */}
              {!beginnerMode && (
                <div className="p-3 rounded-lg bg-[#E5C100]/5 border border-[#E5C100]/10">
                  <h4 className="text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-1 text-[#E5C100]">
                    Beginner-Friendly Summary
                  </h4>
                  <p className="text-white/45 text-xs leading-relaxed">{item.beginnerSummary}</p>
                </div>
              )}

              {/* Continuity note */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-1 text-white/40">
                  Continuity Note
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">{item.continuityNote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
