'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-4 mt-10">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="ls-divider-blue max-w-[50px] mx-auto" />
        <p className="text-white/30 text-xs tracking-[0.25em] uppercase font-medium">
          May the Force be with you
        </p>
        <p className="text-white/10 text-[0.6rem] tracking-wider leading-relaxed max-w-md mx-auto">
          This is a fan-made chronological viewing guide and is not affiliated with Lucasfilm or Disney.
          Star Wars™ is a trademark of Lucasfilm Ltd. All rights belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
