import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded bg-[#e8edf0]', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1120px] px-4 py-10 lg:px-0', className)} aria-live="polite" aria-busy="true">
      <p className="text-xs font-bold uppercase tracking-wide text-[#667085]">{label}</p>
      <PulseBlock className="mt-5 h-10 w-3/4 max-w-3xl" />
      <PulseBlock className="mt-4 h-5 w-2/3 max-w-2xl" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-md border border-[#dfe3e6] bg-white p-4">
            <PulseBlock className="h-44 w-full" />
            <PulseBlock className="mt-5 h-5 w-4/5" />
            <PulseBlock className="mt-3 h-4 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-md border border-[#dfe3e6] bg-white p-4">
          <PulseBlock className="h-40 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
          <PulseBlock className="mt-6 h-9 w-32" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto grid w-full max-w-[1120px] gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-0', className)} aria-live="polite" aria-busy="true">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#667085]">{label}</p>
        <PulseBlock className="mt-5 h-12 w-4/5" />
        <PulseBlock className="mt-5 h-[420px] w-full" />
      </div>
      <div className="space-y-4">
        <PulseBlock className="h-44 w-full" />
        <PulseBlock className="h-28 w-full" />
        <PulseBlock className="h-28 w-full" />
      </div>
    </div>
  )
}
