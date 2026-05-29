'use client';

import { motion } from 'framer-motion';
import { StarWarsMovie, getEpisodeRoman } from '@/lib/star-wars-data';
import { ChevronDown, ChevronUp, Film, Globe, Users } from 'lucide-react';
import { useState } from 'react';

interface MovieCardProps {
  movie: StarWarsMovie;
  index: number;
  eraColor: string;
}

export default function MovieCard({ movie, index, eraColor }: MovieCardProps) {
  const [expanded, setExpanded] = useState(false);

  const episodeLabel = movie.episode === 0 
    ? 'STAR WARS STORY' 
    : `EPISODE ${getEpisodeRoman(movie.episode)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="sw-card-hover rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Card Header */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm"
                style={{
                  color: eraColor,
                  backgroundColor: `${eraColor}15`,
                  border: `1px solid ${eraColor}30`,
                }}
              >
                {episodeLabel}
              </span>
              <span className="text-white/40 text-xs tracking-wider">{movie.timelineYear}</span>
            </div>
            <h3
              className="text-xl md:text-2xl font-bold tracking-wider mb-1"
              style={{ color: eraColor }}
            >
              {movie.title}
            </h3>
            <p className="text-white/50 text-sm tracking-wider italic">{movie.subtitle}</p>
            <div className="flex items-center gap-4 mt-3 text-white/40 text-xs">
              <span className="flex items-center gap-1">
                <Film className="w-3 h-3" />
                {movie.year}
              </span>
              <span>Dir. {movie.director}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-white/40"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Summary always visible */}
        <p className="text-white/70 text-sm leading-relaxed mt-4 line-clamp-3">
          {movie.summary}
        </p>
      </div>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          {/* Lightsaber divider */}
          <div className={`lightsaber-divider mb-6 ${movie.era === 'Original' ? 'lightsaber-divider-yellow' : movie.era === 'Prequel' ? '' : movie.era === 'Sequel' ? 'lightsaber-divider-red' : 'lightsaber-divider-green'}`} />

          {/* Key Events */}
          <div className="mb-6">
            <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-3" style={{ color: eraColor }}>
              <Film className="w-4 h-4" />
              Key Events
            </h4>
            <ul className="space-y-2">
              {movie.keyEvents.map((event, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-white/70"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: eraColor }} />
                  {event}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Characters and Planets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-3" style={{ color: eraColor }}>
                <Users className="w-4 h-4" />
                Characters
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.characters.map((char, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-sm border border-white/10 text-white/60 hover:text-white/90 hover:border-white/30 transition-colors cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-3" style={{ color: eraColor }}>
                <Globe className="w-4 h-4" />
                Planets
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.planets.map((planet, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-sm text-white/60 transition-colors cursor-default"
                    style={{
                      border: `1px solid ${eraColor}30`,
                      backgroundColor: `${eraColor}10`,
                    }}
                  >
                    {planet}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Opening Crawl */}
          {movie.crawl && (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-3" style={{ color: eraColor }}>
                <ChevronUp className="w-4 h-4" />
                Opening Crawl
              </h4>
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                {movie.crawl.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-white/50 text-sm leading-relaxed text-center italic last:mb-0 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
