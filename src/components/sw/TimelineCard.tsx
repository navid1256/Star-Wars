'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Film, Tv, Clapperboard, AlertCircle } from 'lucide-react';
import { type TimelineItem, eraConfig } from '@/data/starWarsTimeline';

interface TimelineCardProps {
  item: TimelineItem;
  beginnerMode: boolean;
  position: number;
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

const cardVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -30 : 30,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 24,
      mass: 0.8,
    },
  },
};

/* Poster animation matches card entrance direction */
const posterVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -40 : 40,
    scale: 0.85,
    rotateY: isLeft ? -15 : 15,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 24,
      mass: 0.8,
      delay: 0.12,
    },
  },
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
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mb-4 flex justify-center"
        >
          <div className="flex items-start gap-2.5 px-4 py-2.5 rounded-lg bg-[#FF8C00]/8 border border-[#FF8C00]/20 max-w-lg">
            <AlertCircle className="w-3.5 h-3.5 text-[#FF8C00] mt-0.5 flex-shrink-0" />
            <p className="text-[0.65rem] text-white/50 leading-relaxed">
              <strong className="text-[#FF8C00]">Timeline Note:</strong> The events of Andor and Star Wars Rebels partially overlap. Both contribute to the rise of the Rebellion and lead toward Rogue One.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── DESKTOP LAYOUT: Alternating ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 items-start">
        {/* Left column */}
        <div className="flex justify-end pr-6">
          {isLeft ? (
            <motion.div
              custom={isLeft}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="holo-card w-full max-w-md cursor-pointer"
              style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
              onClick={() => setExpanded(!expanded)}
            >
              <PosterCardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} isLeft={isLeft} />
            </motion.div>
          ) : (
            <div />
          )}
        </div>

        {/* Center dot + line connector */}
        <div className="flex flex-col items-center pt-7 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-3.5 h-3.5 rounded-full relative z-10"
            style={{ backgroundColor: cfg.color, boxShadow: `0 0 12px ${cfg.glow}, 0 0 4px ${cfg.color}` }}
          />
          <div
            className="w-[2px] h-3 opacity-30"
            style={{ backgroundColor: cfg.color }}
          />
        </div>

        {/* Right column */}
        <div className="flex justify-start pl-6">
          {!isLeft ? (
            <motion.div
              custom={isLeft}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="holo-card w-full max-w-md cursor-pointer"
              style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
              onClick={() => setExpanded(!expanded)}
            >
              <PosterCardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} isLeft={isLeft} />
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden flex items-start gap-3">
        <div className="flex-shrink-0 mt-7">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: cfg.color, boxShadow: `0 0 10px ${cfg.glow}` }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }}
          className="holo-card flex-1 cursor-pointer"
          style={{ '--era-color': `${cfg.color}50`, '--era-glow': cfg.glow } as React.CSSProperties}
          onClick={() => setExpanded(!expanded)}
        >
          <PosterCardInner item={item} beginnerMode={beginnerMode} expanded={expanded} cfg={cfg} Icon={Icon} isLeft={true} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── 3D Tilt Hook for Poster ─── */
function useTilt(intensity: number = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.04)`;
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

/* ─── Poster Card Inner ─── */
function PosterCardInner({ item, beginnerMode, expanded, cfg, Icon, isLeft }: {
  item: TimelineItem;
  beginnerMode: boolean;
  expanded: boolean;
  cfg: (typeof eraConfig)[keyof typeof eraConfig];
  Icon: React.ComponentType<{ className?: string }>;
  isLeft: boolean;
}) {
  const tilt = useTilt(10);

  // Card LEFT of timeline → poster on RIGHT edge (facing center)
  // Card RIGHT of timeline → poster on LEFT edge (facing center)
  const posterOnRight = isLeft;

  return (
    <>
      {/* ── Full-height poster on the edge facing the timeline ── */}
      <motion.div
        custom={isLeft}
        variants={posterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="absolute z-20"
        style={{
          top: 0,
          bottom: 0,
          [posterOnRight ? 'right' : 'left']: '-55px',
          width: '110px',
        }}
      >
        <div
          ref={tilt.ref}
          onMouseMove={tilt.handleMouseMove}
          onMouseLeave={tilt.handleMouseLeave}
          className="w-full h-full relative overflow-hidden rounded-lg cursor-pointer"
          style={{
            transition: 'transform 0.15s ease-out',
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 24px ${cfg.glow}, 0 0 8px ${cfg.color}40`,
            border: `1.5px solid ${cfg.color}30`,
          }}
        >
          {/* Inner vignette */}
          <div
            className="absolute inset-0 z-[1] rounded-lg pointer-events-none"
            style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }}
          />
          <Image
            src={item.poster}
            alt={`${item.title} poster`}
            fill
            className="object-cover"
            sizes="110px"
          />
          {/* Number badge overlay */}
          <div
            className="absolute top-2 left-2 z-[2] text-[0.6rem] font-bold tracking-[0.12em] px-2 py-0.5 rounded-md"
            style={{ backgroundColor: `${cfg.color}CC`, color: '#050510' }}
          >
            #{item.chronNumber}
          </div>
          {/* Gradient overlay at bottom of poster */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 z-[1] pointer-events-none rounded-b-lg"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
          />
        </div>
      </motion.div>

      {/* ── Card text content ── */}
      {/* Padding on poster side so text doesn't overlap */}
      <div style={{ [posterOnRight ? 'paddingRight' : 'paddingLeft']: '65px' }}>
        {/* Header row */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                <span
                  className="text-[0.55rem] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-md border"
                  style={{
                    color: typeColor[item.type],
                    borderColor: `${typeColor[item.type]}30`,
                    backgroundColor: `${typeColor[item.type]}10`,
                  }}
                >
                  <Icon className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />
                  {item.type}
                </span>
                <span className="text-white/25 text-[0.6rem]">{item.releaseYear}</span>
              </div>
              <h3 className="text-sm md:text-base font-bold tracking-wide leading-snug mb-1.5" style={{ color: cfg.color }}>
                {item.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="text-white/20 flex-shrink-0 mt-0.5"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Era tag */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.glow}` }} />
            <span className="text-[0.55rem] tracking-[0.1em] uppercase" style={{ color: cfg.color }}>{item.era}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[0.5rem] px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/35">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 pb-3">
          <p className="text-white/55 text-xs md:text-sm leading-relaxed">
            {beginnerMode ? item.beginnerSummary : item.summary}
          </p>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3" style={{ [posterOnRight ? 'paddingRight' : 'paddingLeft']: '65px' }}>
              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}40, transparent)`, boxShadow: `0 0 6px ${cfg.glow}` }} />

              <div>
                <h4 className="text-[0.6rem] font-bold tracking-[0.1em] uppercase mb-1.5" style={{ color: cfg.accent }}>
                  Why Watch It Here
                </h4>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.whyWatchHere}</p>
              </div>

              {!beginnerMode && (
                <div className="p-3 rounded-lg bg-[#E5C100]/5 border border-[#E5C100]/10">
                  <h4 className="text-[0.6rem] font-bold tracking-[0.1em] uppercase mb-1 text-[#E5C100]">
                    Beginner-Friendly Summary
                  </h4>
                  <p className="text-white/45 text-xs md:text-sm leading-relaxed">{item.beginnerSummary}</p>
                </div>
              )}

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-[0.6rem] font-bold tracking-[0.1em] uppercase mb-1 text-white/40">
                  Continuity Note
                </h4>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">{item.continuityNote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
