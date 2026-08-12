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
  const value = clean || 'Open this listing for full project details, service information, photos, and contact options.'
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
    <Link href={href} className={`group block overflow-hidden border border-white/[0.06] bg-[#141831] ${dc.motion.lift}`}>
      <article className="grid min-h-[400px] md:grid-cols-2">
        <div className="relative min-h-[300px] bg-[#0f1329]">
          <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <span className="absolute left-5 top-5 bg-[#3d3dba] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{label}</span>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]"><Tag className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-4 line-clamp-3 text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">{safeTitle(post)}</h3>
          <p className="mt-5 line-clamp-3 text-sm leading-7 text-white/50">{getEditableExcerpt(post, 200)}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 bg-[#3d3dba] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white">
            View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export function RailPostCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block w-[320px] shrink-0 overflow-hidden border border-white/[0.06] bg-[#141831] ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] bg-[#0f1329]">
        <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4862a]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug text-white">{safeTitle(post)}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const location = getEditableLocation(post)
  return (
    <Link href={href} className="group flex gap-4 border border-white/[0.06] bg-[#141831] p-4 transition hover:bg-[#1a2040]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#3d3dba] text-sm font-bold text-white">{index + 1}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</span>
        <span className="mt-1.5 block line-clamp-2 text-sm font-bold leading-snug text-white">{safeTitle(post)}</span>
        {location ? <span className="mt-1.5 flex items-center gap-1 text-xs text-white/30"><MapPin className="h-3.5 w-3.5" /> {location}</span> : null}
      </span>
    </Link>
  )
}

export function ArticleListCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-5 border border-white/[0.06] bg-[#141831] p-4 transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:grid-cols-[160px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1329]">
        <img src={getEditablePostImage(post)} alt={safeTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4862a]">{getEditableCategory(post)}</p>
        <h2 className="mt-2 line-clamp-2 text-xl font-black leading-snug text-white">{safeTitle(post)}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}
