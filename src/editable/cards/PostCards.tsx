import Link from 'next/link'
import { ArrowRight, Clock3, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import logoSrc from '@/editable/assets/remodelerar-logo.png'

const fallbackImage = logoSrc.src

function contentOf(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function safeTitle(post?: SitePost | null) {
  return post?.title?.trim() || 'Remodeling listing'
}

export function getEditablePostImage(post?: SitePost | null) {
  const content = contentOf(post)
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const directImage = text(content.image) || text(content.featuredImage) || text(content.thumbnail) || text(content.logo) || text(content.avatar)
  return mediaUrl || contentImage || directImage || fallbackImage
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = contentOf(post)
  const raw = text(content.description) || text(content.summary) || text(content.excerpt) || text(content.body) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const value = clean || 'Open this remodelerar.com listing for full project details, service information, photos, and contact options.'
  return value.length > limit ? `${value.slice(0, limit).trim()}...` : value
}

export function getEditableCategory(post?: SitePost | null) {
  const content = contentOf(post)
  return text(content.category) || post?.tags?.[0] || 'Remodeling'
}

function getEditableLocation(post?: SitePost | null) {
  const content = contentOf(post)
  return text(content.location) || text(content.city) || text(content.address)
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-lg border border-[#dfe3e6] bg-white ${dc.motion.lift}`}>
      <article className="grid min-h-[360px] md:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[260px] bg-[#eef2f4]">
          <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded bg-[#3156d4] px-3 py-1 text-xs font-bold text-white">{label}</span>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#00796b]"><Tag className="h-4 w-4" /> {getEditableCategory(post)}</p>
          <h3 className="mt-3 line-clamp-3 text-3xl font-bold leading-tight text-[#111827]">{safeTitle(post)}</h3>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#667085]">{getEditableExcerpt(post, 210)}</p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-[#dfe3e6] px-4 py-2 text-sm font-bold text-[#00796b]">
            Open listing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block w-[300px] shrink-0 overflow-hidden rounded-md border border-[#dfe3e6] bg-white ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] bg-[#eef2f4]">
        <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <p className="text-xs font-bold text-[#3156d4]">#{String(index + 1).padStart(2, '0')} {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug">{safeTitle(post)}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667085]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const location = getEditableLocation(post)
  return (
    <Link href={href} className="group flex gap-3 rounded-md border border-[#dfe3e6] bg-white p-3 transition hover:bg-[#f8fbfb]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00796b] text-sm font-bold text-white">{index + 1}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#667085]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</span>
        <span className="mt-1 block line-clamp-2 text-sm font-bold leading-snug">{safeTitle(post)}</span>
        {location ? <span className="mt-1 flex items-center gap-1 text-xs text-[#667085]"><MapPin className="h-3.5 w-3.5" /> {location}</span> : null}
      </span>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-md border border-[#dfe3e6] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[150px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#eef2f4]">
        <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-xs font-bold text-[#3156d4]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-1 line-clamp-2 text-xl font-bold leading-snug">{safeTitle(post)}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667085]">{getEditableExcerpt(post, 140)}</p>
      </div>
    </Link>
  )
}
