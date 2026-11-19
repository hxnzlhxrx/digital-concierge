import React from 'react';

export const ModuleSkeleton: React.FC<{ variant?: 'hero' | 'grid' | 'dashboard' }> = ({
  variant = 'hero',
}) => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading luxury concierge content"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-10"
    >
      {/* Header / Overline Skeleton */}
      <div className="space-y-3">
        <div className="h-3.5 w-52 rounded-full skeleton-shimmer" />
        <div className="h-10 sm:h-12 w-3/4 max-w-xl rounded-2xl skeleton-shimmer" />
        <div className="h-4 w-full max-w-2xl rounded-full skeleton-shimmer" />
      </div>

      {/* Hero or Primary Banner Geometry */}
      {variant === 'hero' && (
        <div className="w-full h-[360px] sm:h-[440px] rounded-3xl skeleton-shimmer border border-[#9E7E47]/15" />
      )}

      {/* Multi-Breakpoint Bento / Card Grid Geometry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="p-6 rounded-2xl bg-white border border-[#EAE5DC] space-y-4 shadow-xs"
          >
            <div className="w-10 h-10 rounded-full skeleton-shimmer" />
            <div className="h-5 w-2/3 rounded-lg skeleton-shimmer" />
            <div className="h-3.5 w-full rounded-full skeleton-shimmer" />
            <div className="h-3.5 w-4/5 rounded-full skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Secondary Dual-Pane Editorial Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((card) => (
          <div
            key={card}
            className="p-6 rounded-3xl bg-white border border-[#EAE5DC] space-y-5 shadow-xs"
          >
            <div className="w-full h-56 rounded-2xl skeleton-shimmer" />
            <div className="h-3 w-36 rounded-full skeleton-shimmer" />
            <div className="h-7 w-3/4 rounded-xl skeleton-shimmer" />
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded-full skeleton-shimmer" />
              <div className="h-3.5 w-5/6 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-11 w-48 rounded-full skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
};
