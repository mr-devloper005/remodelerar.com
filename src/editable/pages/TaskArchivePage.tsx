import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { ArticleListCard, CompactIndexCard, EditorialFeatureCard, RailPostCard, getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const contentOf = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getField = (post: SitePost, keys: string[]) => {
  const content = contentOf(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3', badge: 'Guides' },
  listing: { icon: Building2, archiveClass: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-5', badge: 'Companies' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5', badge: 'Ads' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3', badge: 'Project images' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3', badge: 'Bookmarks' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-5', badge: 'Providers' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts[0]

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#111827]">
        <section className="mx-auto max-w-[1120px] px-4 py-8 lg:px-0">
          <form action="/search" className="mb-10 flex h-[58px] max-w-[655px] items-center rounded border border-[#cfd8dc] bg-white px-5">
            <Search className="h-6 w-6 text-[#3d454c]" />
            <span className="ml-5 text-[10px] font-bold uppercase text-[#4d555c]">Enhanced by</span>
            <span className="ml-2 text-sm font-bold text-[#68717a]">Google</span>
            <input name="q" className="min-w-0 flex-1 bg-transparent px-3 outline-none" aria-label="Search" />
          </form>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#00796b]"><Icon className="h-4 w-4" /> {deck.badge}</p>
              <h1 className="mt-3 bg-[linear-gradient(90deg,#3156d4,#8429ce,#ef3f57)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-4 max-w-3xl leading-8 text-[#667085]">{voice?.description || SITE_CONFIG.description}</p>
            </div>

            <form action={basePath} className="rounded border border-[#dfe3e6] bg-[#f7f7f7] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#667085]"><Filter className="h-4 w-4" /> Filter listings</div>
              <select name="category" defaultValue={category} className="mt-3 h-11 w-full rounded border border-[#dfe3e6] bg-white px-3 text-sm outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-10 w-full rounded bg-[#00796b] text-sm font-bold text-white">Apply</button>
              <p className="mt-3 text-xs text-[#667085]">Showing: {categoryLabel}</p>
            </form>
          </div>

          {featured ? <div className="mt-8"><EditorialFeatureCard post={featured} href={`${basePath}/${featured.slug}`} label="Featured" /></div> : null}
        </section>

        <section className="mx-auto max-w-[1120px] px-4 pb-14 lg:px-0">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded border border-dashed border-[#b9c3c8] bg-white p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[#9aa2a9]" />
              <h2 className="mt-4 text-2xl font-bold">No posts found</h2>
              <p className="mt-2 text-sm text-[#667085]">Try another category or return after new posts are published.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded border border-[#b8bec4] bg-white px-4 py-2 text-sm font-bold">Previous</Link> : null}
            <span className="rounded bg-[#00796b] px-4 py-2 text-sm font-bold text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded border border-[#b8bec4] bg-white px-4 py-2 text-sm font-bold">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'article') return <ArticleListCard post={post} href={href} index={index} />
  if (task === 'listing') return <SellerCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedGridCard post={post} href={href} index={index} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <CompactIndexCard post={post} href={href} index={index} />
  if (task === 'pdf') return <DocumentCard post={post} href={href} />
  if (task === 'profile') return <SellerCard post={post} href={href} profile />
  return <RailPostCard post={post} href={href} index={index} />
}

function SellerCard({ post, href, profile = false }: { post: SitePost; href: string; profile?: boolean }) {
  const location = getField(post, ['location', 'address', 'city']) || 'Local remodeling service area'
  return (
    <Link href={href} className="overflow-hidden rounded-md border border-[#dfe3e6] bg-white text-center shadow-sm transition hover:-translate-y-0.5">
      <div className="h-36 bg-[#004638] p-2"><img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full rounded object-cover" /></div>
      <div className="-mt-8 px-4 pb-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#f5f5f5]">
          {profile ? <UserRound className="h-8 w-8 text-[#667085]" /> : <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />}
        </div>
        <h2 className="mt-3 line-clamp-1 font-bold">{post.title || 'Remodeling provider listing'}</h2>
        <p className="mt-2 text-sm text-[#7a828b]">{location}</p>
        <span className="mt-3 inline-block rounded bg-[#f0b82f] px-2 py-1 text-xs font-bold text-white">Verified listing</span>
      </div>
    </Link>
  )
}

function ClassifiedGridCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const price = getField(post, ['price', 'amount', 'budget']) || (index % 3 === 0 ? 'Request quote' : 'Contact provider')
  return (
    <Link href={href} className="group block">
      <img src={getEditablePostImage(post)} alt={post.title || ''} className="aspect-square w-full rounded object-cover transition group-hover:opacity-85" />
      <h2 className="mt-3 line-clamp-1 text-lg font-bold">{price}</h2>
      <p className="line-clamp-1 text-sm text-[#4b5563]">{post.title || 'Remodeling service listing'}</p>
      <p className="mt-1 text-xs text-[#7a828b]">{index + 1} months - Remodel - Service - {getEditableCategory(post)}</p>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="mb-5 block break-inside-avoid overflow-hidden rounded-md border border-[#dfe3e6] bg-white shadow-sm transition hover:-translate-y-0.5">
      <img src={getEditablePostImage(post)} alt={post.title || ''} className={`w-full object-cover ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
      <div className="p-4">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#00796b]"><ImageIcon className="h-3 w-3" /> Visual</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold">{post.title || 'Remodeling project image'}</h2>
      </div>
    </Link>
  )
}

function DocumentCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="rounded-md border border-[#dfe3e6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
      <div className="flex h-14 w-14 items-center justify-center rounded bg-[#004638] text-white"><FileText className="h-7 w-7" /></div>
      <h2 className="mt-5 line-clamp-2 text-xl font-bold">{post.title || 'Remodeling project document'}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#667085]">{getEditableExcerpt(post, 150)}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#00796b]">Open remodeling document <ArrowRight className="h-4 w-4" /></span>
    </Link>
  )
}
