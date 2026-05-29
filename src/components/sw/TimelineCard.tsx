'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Film, Tv, Clapperboard, AlertCircle } from 'lucide-react';
import { type TimelineItem, eraConfig } from '@/data/starWarsTimeline';

interface TimelineCardProps {
  item: TimelineItem;
  beginnerMode: boolean;
  position: number; // global position for alternating
  hasOverlapNote?: boolean;
}

const typeIcon = {
  Movie: Film,
  'TV Series': Tv,
  'Animated TV Series': Clapperboard,
};

const typeColor = {
  Movie: '#4BD5EE',
  'TV Series': '#00D4AA',
  'Animated TV Series': '#E5C100',
};

export default function TimelineCard({ item, beginnerMode, position, hasOverlapNote }: TimelineCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = eraConfig[item.era];
  const Icon = typeIcon[item.type];
  const isLeft = position % 2 === 0;

  return (
    <div className="relative" id={`card-${item.chronNumber}`}>
      {/* Overlap note for Andor/Rebels */}
      {hasOverlapNote && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-[#FF8C00]/8 border border-[#FF8C00]/20 max-w-lg">
            <AlertCircle className="w-4 h-4 text-[#FF8C00] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-white/55 leading-relaxed">
              <strong className="text-[#FF8C00]">Timeline Note:</strong> The events of Andor and Star Wars Rebels partially overlap. Both contribute to the rise of the Rebellion and lead toward Rogue One.
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex items-start gap-4 md:gap-0">
        {/* ── MOBILE: dot ── */}
        <div className="md:hidden flex-shrink-0 mt-8">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color, boxShadow: `0 0 10px ${cfg.glow}` }} />
        </div>

        {/* ── MOBILE: card ── */}
        <div
          className="md:hidden holo-card flex-1 p-5 cursor-pointer"
          style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
          onClick={() => setExpanded(!expanded)}
        >
          <CardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} />
        </div>

        {/* ── DESKTOP: left column ── */}
        <div className="hidden md:flex md:w-1/2 justify-end pr-8">
          {isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="holo-card w-full max-w-md p-5 cursor-pointer"
              style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
              onClick={() => setExpanded(!expanded)}
            >
              <CardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} />
            </motion.div>
          ) : (
            <div className="w-full max-w-md" />
          )}
        </div>

        {/* ── DESKTOP: center dot ── */}
        <div className="hidden md:flex flex-shrink-0 w-6 justify-center pt-8 relative z-10">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: cfg.color, boxShadow: `0 0 12px ${cfg.glow}` }} />
        </div>

        {/* ── DESKTOP: right column ── */}
        <div className="hidden md:flex md:w-1/2 justify-start pl-8">
          {!isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="holo-card w-full max-w-md p-5 cursor-pointer"
              style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
              onClick={() => setExpanded(!expanded)}
            >
              <CardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} />
            </motion.div>
          ) : (
            <div className="w-full max-w-md" />
          )}
        </div>
      </div>
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
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-[0.65rem] font-bold tracking-[0.15em] px-2.5 py-1 rounded-md"
              style={{ backgroundColor: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}30` }}
            >
              #{item.chronNumber}
            </span>
            <span
              className="text-[0.65rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-md border"
              style={{
                color: typeColor[item.type],
                borderColor: `${typeColor[item.type]}30`,
                backgroundColor: `${typeColor[item.type]}10`,
              }}
            >
              <Icon className="w-3 h-3 inline mr-1 -mt-0.5" />
              {item.type}
            </span>
            <span className="text-white/30 text-xs">{item.releaseYear}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold tracking-wide leading-snug" style={{ color: cfg.color }}>
            {item.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-white/20 mt-1 flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Era tag */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.glow}` }} />
        <span className="text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: cfg.color }}>{item.era}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="text-[0.6rem] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-white/40">
            {tag}
          </span>
        ))}
      </div>

      {/* Summary */}
      <p className="text-white/60 text-sm leading-relaxed">
        {beginnerMode ? item.beginnerSummary : item.summary}
      </p>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-4">
              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}40, transparent)`, boxShadow: `0 0 6px ${cfg.glow}` }} />

              <div>
                <h4 className="text-xs font-bold tracking-[0.12em] uppercase mb-2" style={{ color: cfg.accent }}>
                  Why Watch It Here
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">{item.whyWatchHere}</p>
              </div>

              {!beginnerMode && (
                <div className="p-4 rounded-lg bg-[#E5C100]/5 border border-[#E5C100]/10">
                  <h4 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase mb-1.5 text-[#E5C100]">
                    Beginner-Friendly Summary
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.beginnerSummary}</p>
                </div>
              )}

              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase mb-1.5 text-white/45">
                  Continuity Note
                </h4>
                <p className="text-white/45 text-sm leading-relaxed">{item.continuityNote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
