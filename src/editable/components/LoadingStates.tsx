export function PageLoadingState({ className = '' }: { label?: string; className?: string }) {
  return (
    <div aria-busy="true" className={`min-h-[60vh] bg-[#0c1023] px-4 py-20 ${className}`}>
      <div className="mx-auto max-w-[1280px]">
        <p className="sr-only">Loading custom page</p>
        <div className="h-4 w-48 animate-pulse bg-white/[0.06]" />
        <div className="mt-4 h-12 w-96 max-w-full animate-pulse bg-white/[0.06]" />
        <div className="mt-8 h-6 w-80 max-w-full animate-pulse bg-white/[0.06]" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-white/[0.06] bg-[#141831]">
              <div className="aspect-[16/10] animate-pulse bg-white/[0.04]" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-24 animate-pulse bg-white/[0.06]" />
                <div className="h-5 w-full animate-pulse bg-white/[0.06]" />
                <div className="h-4 w-3/4 animate-pulse bg-white/[0.04]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className = '' }: { count?: number; className?: string }) {
  return (
    <div aria-busy="true" className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-white/[0.06] bg-[#141831]">
          <div className="aspect-[16/10] animate-pulse bg-white/[0.04]" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-20 animate-pulse bg-white/[0.06]" />
            <div className="h-5 w-full animate-pulse bg-white/[0.06]" />
            <div className="h-4 w-2/3 animate-pulse bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading', className = '' }: { label?: string; className?: string }) {
  return (
    <div aria-busy="true" className={`min-h-[60vh] bg-[#0c1023] px-4 py-20 ${className}`}>
      <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border border-white/[0.06] bg-[#141831] p-8 space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-white/30">{label}</p>
          <div className="h-8 w-40 animate-pulse bg-white/[0.06]" />
          <div className="h-3 w-28 animate-pulse bg-white/[0.04]" />
          <div className="h-14 w-full animate-pulse bg-white/[0.06]" />
          <div className="aspect-[16/9] animate-pulse bg-white/[0.04]" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse bg-white/[0.04]" />
            <div className="h-4 w-5/6 animate-pulse bg-white/[0.04]" />
            <div className="h-4 w-4/6 animate-pulse bg-white/[0.04]" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="border border-white/[0.06] bg-[#141831] p-6 space-y-4">
            <div className="h-3 w-24 animate-pulse bg-white/[0.06]" />
            <div className="h-4 w-full animate-pulse bg-white/[0.04]" />
            <div className="h-4 w-3/4 animate-pulse bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  )
}
