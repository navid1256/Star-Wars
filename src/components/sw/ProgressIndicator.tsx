'use client';

import { useEffect, useState } from 'react';

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-[2px] bg-transparent" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Page scroll progress">
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #E5C100, #FF8C00, #FF2D2D, #00D4AA, #E0E0F0)',
          boxShadow: '0 0 8px rgba(75,213,238,0.3)',
        }}
      >
        <div className="progress-shimmer h-full w-full" />
      </div>
    </div>
  );
}
