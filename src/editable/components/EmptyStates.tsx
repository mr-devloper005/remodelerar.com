import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing posted here yet',
  description = 'New classifieds, companies, articles, or resources will appear here as soon as they are published.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-md border border-dashed border-[#b9c3c8] bg-white p-8 text-center shadow-sm', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f4f2] text-[#00796b]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#667085]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#dfe3e6] px-5 py-3 text-sm font-bold transition hover:bg-[#00796b] hover:text-white">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically. The page stays ready for browsing even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
