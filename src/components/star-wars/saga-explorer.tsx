'use client';

import { motion } from 'framer-motion';
import { eras, starWarsMovies } from '@/lib/star-wars-data';
import MovieCard from './movie-card';
import Image from 'next/image';

export default function SagaExplorer() {
  const eraImages: Record<string, string> = {
    'Prequel': '/images/jedi-temple.png',
    'Original': '/images/death-star.png',
    'Sequel': '/images/dark-side.png',
  };

  return (
    <div className="space-y-20">
      {eras.map((era, eraIndex) => {
        const movies = era.movies.map(id => starWarsMovies.find(m => m.id === id)!).filter(Boolean);
        const eraImage = eraImages[era.name.includes('Prequel') ? 'Prequel' : era.name.includes('Original') ? 'Original' : era.name.includes('Sequel') ? 'Sequel' : ''];

        return (
          <section key={era.name} id={era.name.toLowerCase().replace(/\s+/g, '-')}>
            {/* Era Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="relative mb-12 overflow-hidden rounded-xl"
            >
              {/* Background image */}
              {eraImage && (
                <div className="absolute inset-0">
                  <Image
                    src={eraImage}
                    alt={era.name}
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="absolute inset-0 sw-gradient-dark" />
                </div>
              )}

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: era.color, boxShadow: `0 0 15px ${era.color}60` }}
                  />
                  <div>
                    <h2
                      className="text-2xl md:text-4xl font-black tracking-[0.15em]"
                      style={{ color: era.color }}
                    >
                      {era.name.toUpperCase()}
                    </h2>
                    <p className="text-white/50 text-sm md:text-base tracking-wider mt-1">
                      {era.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Movie Cards */}
            <div className="space-y-6">
              {movies.map((movie, movieIndex) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={movieIndex}
                  eraColor={era.color}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
