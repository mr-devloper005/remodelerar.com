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
  article: { icon: FileText, archiveClass: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3', badge: 'Guides' },
  listing: { icon: Building2, archiveClass: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4', badge: 'Companies' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', badge: 'Ads' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3', badge: 'Project images' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3', badge: 'Bookmarks' },
  pdf: { icon: Download, archiveClass: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4', badge: 'Providers' },
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
      <main className="bg-[#0c1023] text-white">
        <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0c1023] py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#141831] to-transparent opacity-50" />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]"><Icon className="h-4 w-4" /> {deck.badge}</p>
                <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl">{voice?.headline || `Browse ${label}`}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">{voice?.description || SITE_CONFIG.description}</p>
              </div>

              <form action={basePath} className="border border-white/[0.06] bg-[#141831] p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40"><Filter className="h-4 w-4" /> Filter listings</div>
                <select name="category" defaultValue={category} className="mt-4 h-11 w-full border border-white/[0.06] bg-[#0f1329] px-4 text-sm text-white outline-none">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="mt-4 h-11 w-full bg-[#3d3dba] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-110">Apply</button>
                <p className="mt-3 text-xs text-white/30">Showing: {categoryLabel}</p>
              </form>
            </div>

            <form action="/search" className="mt-10 flex h-[52px] max-w-[600px] items-center border border-white/[0.06] bg-[#141831] px-5">
              <Search className="h-5 w-5 text-white/30" />
              <input name="q" placeholder="Search listings..." className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/25" aria-label="Search" />
              <button className="bg-[#3d3dba] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">Search</button>
            </form>
          </div>
        </section>

        {featured ? (
          <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
            <EditorialFeatureCard post={featured} href={`${basePath}/${featured.slug}`} label="Featured" />
          </section>
        ) : null}

        <section className="mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 bg-[#141831] p-14 text-center">
              <Search className="mx-auto h-8 w-8 text-white/20" />
              <h2 className="mt-5 text-2xl font-black uppercase text-white">No posts found</h2>
              <p className="mt-3 text-sm text-white/40">Try another category or return after new posts are published.</p>
            </div>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-white/[0.06] bg-[#141831] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.06]">Previous</Link> : null}
            <span className="bg-[#3d3dba] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-white/[0.06] bg-[#141831] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.06]">Next</Link> : null}
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
    <Link href={href} className="group block overflow-hidden border border-white/[0.06] bg-[#141831] text-center transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="h-36 bg-[#1a2040] p-2"><img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
      <div className="-mt-8 px-4 pb-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden border-4 border-[#141831] bg-[#0f1329]">
          {profile ? <UserRound className="h-8 w-8 text-white/30" /> : <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />}
        </div>
        <h2 className="mt-3 line-clamp-1 font-black text-white">{post.title || 'Remodeling provider listing'}</h2>
        <p className="mt-2 text-sm text-white/40">{location}</p>
        <span className="mt-3 inline-block bg-[#d4862a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Verified</span>
      </div>
    </Link>
  )
}

function ClassifiedGridCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const price = getField(post, ['price', 'amount', 'budget']) || (index % 3 === 0 ? 'Request quote' : 'Contact provider')
  return (
    <Link href={href} className="group block transition hover:-translate-y-1">
      <div className="relative overflow-hidden bg-[#141831]">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="mt-3">
        <h2 className="line-clamp-1 text-lg font-black text-white">{price}</h2>
        <p className="line-clamp-1 text-sm text-white/50">{post.title || 'Remodeling service listing'}</p>
        <p className="mt-1 text-xs text-white/25">{getEditableCategory(post)}</p>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="mb-6 block break-inside-avoid overflow-hidden border border-white/[0.06] bg-[#141831] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <img src={getEditablePostImage(post)} alt={post.title || ''} className={`w-full object-cover ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
      <div className="p-5">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4862a]"><ImageIcon className="h-3 w-3" /> Visual</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-black text-white">{post.title || 'Remodeling project image'}</h2>
      </div>
    </Link>
  )
}

function DocumentCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="border border-white/[0.06] bg-[#141831] p-6 transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="flex h-14 w-14 items-center justify-center bg-[#3d3dba] text-white"><FileText className="h-7 w-7" /></div>
      <h2 className="mt-5 line-clamp-2 text-xl font-black text-white">{post.title || 'Remodeling project document'}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/40">{getEditableExcerpt(post, 150)}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d4862a]">Open document <ArrowRight className="h-4 w-4" /></span>
    </Link>
  )
}
