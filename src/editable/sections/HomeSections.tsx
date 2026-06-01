import Link from 'next/link'
import type { ReactNode } from 'react'
import { BookOpen, Briefcase, ChevronRight, Heart, HelpCircle, Megaphone, PlusCircle, Search, ShieldCheck, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { ArticleListCard, EditorialFeatureCard, getEditableCategory, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import logoSrc from '@/editable/assets/remodelerar-logo.png'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const serviceTiles = [
  { icon: PlusCircle, label: 'Post a project', href: '/classified', color: 'text-[#dc1919]' },
  { icon: Search, label: 'Find services', href: '/classified', color: 'text-[#4169e1]' },
  { icon: UserRound, label: 'Browse pros', href: '/profile', color: 'text-[#45bf73]' },
  { icon: Briefcase, label: 'Contractors', href: '/listing', color: 'text-[#9a5d17]' },
  { icon: BookOpen, label: 'Remodeling guide', href: '/article', color: 'text-[#8d56a9]' },
  { icon: HelpCircle, label: 'Planning help', href: '/about', color: 'text-[#c0942d]' },
]

const categoryTiles = [
  { icon: Megaphone, label: 'Materials', href: '/classified' },
  { icon: BookOpen, label: 'Project guides', href: '/article' },
  { icon: ShieldCheck, label: 'Home services', href: '/listing' },
  { icon: Briefcase, label: 'Contract jobs', href: '/classified' },
]

function heroImage(posts: SitePost[]) {
  return posts[0] ? getEditablePostImage(posts[0]) : logoSrc.src
}

function DiscoverMore({ items }: { items: string[] }) {
  return (
    <div className="mx-auto mt-7 max-w-[1110px] overflow-hidden rounded border border-[#dfe3e6] bg-white">
      <h3 className="bg-[#f5f6f7] px-5 py-3 text-lg font-bold">Discover more</h3>
      {items.map((item) => (
        <Link key={item} href="/classified" className="flex items-center justify-between border-t border-[#eef0f2] px-5 py-4 text-lg hover:bg-[#fbfbfb]">
          <span>{item}</span>
          <ChevronRight className="h-5 w-5 text-[#9aa2a9]" />
        </Link>
      ))}
    </div>
  )
}

function SectionHeading({ icon: Icon, title, action }: { icon: typeof Heart; title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <Icon className="h-6 w-6 text-[#3156d4]" />
        <span className="bg-[linear-gradient(90deg,#3156d4,#ef3f57,#ff6b24)] bg-clip-text text-transparent">{title}</span>
      </h2>
      {action}
    </div>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const title = pagesContent.home.hero.title.join(' ')
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-4 pb-8 pt-4 lg:px-0">
       

        <div className="relative mx-auto min-h-[475px] max-w-[1120px] overflow-hidden rounded-lg bg-[#1f2933]">
          <img src={heroImage(posts)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68),rgba(0,0,0,0.25))]" />
          <div className="relative z-10 mx-auto flex min-h-[475px] max-w-[940px] flex-col justify-center px-5 text-white">
            <h1 className="text-3xl font-bold drop-shadow">{title}</h1>
            <div className="mt-6 max-w-[940px]">
              <div className="flex flex-wrap gap-1">
                {['Contractors', 'Materials', 'Renovation', 'Home services', 'Search all remodels'].map((tab, index) => (
                  <Link key={tab} href={index === 4 ? '/search' : primaryRoute} className={`rounded-t px-4 py-2 text-sm font-bold ${index === 0 ? 'bg-white text-[#111827]' : 'bg-black/70 text-white'}`}>
                    {tab}
                  </Link>
                ))}
              </div>
              <form action="/search" className="grid rounded bg-white p-1 text-[#111827] shadow-lg md:grid-cols-[1fr_1.4fr_0.65fr_0.8fr_auto]">
                <select name="category" className="h-11 border-r border-[#e5e7eb] bg-white px-3 outline-none"><option>Remodeling</option><option>Contractors</option><option>Materials</option></select>
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="h-11 border-r border-[#e5e7eb] px-3 outline-none" />
                <input name="area" placeholder="Project area" className="h-11 border-r border-[#e5e7eb] px-3 outline-none" />
                <select name="condition" className="h-11 bg-white px-3 outline-none"><option>Project stage</option><option>Planning</option><option>Ready to hire</option></select>
                <button className="h-11 rounded bg-[#009688] px-5 text-sm font-bold text-white">Search</button>
              </form>
              <p className="mt-5 text-sm font-semibold drop-shadow">Trending: kitchen remodels, bathroom upgrades, flooring, painting, roofing, cabinets, plumbing, electrical work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 6)
  return (
    <section className="bg-white px-4 py-8 lg:px-0">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex items-center justify-center gap-7">
          <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-[#e8f4f2] text-5xl sm:flex">%</div>
          <div>
            <h2 className="text-2xl font-bold">Welcome to remodelerar.com</h2>
            <p className="mt-3">Find remodeling services, home improvement listings, and renovation resources. <Link href="/article" className="rounded-full bg-[#3156d4] px-2 py-1 text-sm font-bold text-white">Remodeling planning guide</Link></p>
            <p className="font-bold">What remodeling service would you like to browse today?</p>
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {serviceTiles.map((tile) => (
            <Link key={tile.label} href={tile.href} className="flex h-[138px] flex-col items-center justify-center rounded-md border border-[#d7dce0] bg-white text-center shadow-md transition hover:-translate-y-0.5">
              <tile.icon className={`h-8 w-8 ${tile.color}`} />
              <span className="mt-4 max-w-[110px] text-base font-bold leading-tight">{tile.label}</span>
            </Link>
          ))}
        </div>

        <DiscoverMore items={['Kitchen remodeling', 'Bathroom renovation', 'Flooring and painting services']} />

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">Browse categories</h2>
          <p className="mt-2 text-sm text-[#667085]">Select a category you are interested in</p>
          <div className="mx-auto mt-9 grid max-w-[520px] grid-cols-2 gap-8 sm:grid-cols-4">
            {categoryTiles.map((item) => (
              <Link key={item.label} href={item.href} className="text-center">
                <item.icon className="mx-auto h-10 w-10 text-[#009688]" />
                <span className="mt-3 block text-sm font-bold">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {railPosts.length ? (
          <div className="mt-16">
            <SectionHeading icon={Briefcase} title="New Remodeling Guides" />
            <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {railPosts.map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
            <DiscoverMore items={['Indian vehicle sales', 'Home goods sales', 'Indian jobs board']} />
            <div className="mt-8 text-center"><Link href={primaryRoute} className="rounded border border-[#b8bec4] px-4 py-2 font-bold">Read more remodeling guides</Link></div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const loved = posts.slice(0, 2)
  const sellers = posts.slice(2, 12)
  if (!posts.length) return null
  return (
    <section className="bg-[#f7f7f7] px-4 py-10 lg:px-0">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading icon={Heart} title="Saved Remodeling Picks" action={<Link href="/profile" className="text-sm font-bold text-[#00796b]">Manage saved providers</Link>} />
        <div className="mt-4 grid max-w-[560px] rounded border border-[#dfe3e6] bg-white sm:grid-cols-2">
          {loved.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="border-[#eef0f2] p-3 odd:border-r">
              <img src={getEditablePostImage(post)} alt={post.title || ''} className="aspect-[16/9] w-full rounded object-cover" />
              <h3 className="mt-3 text-lg font-bold">{index === 0 ? '12.00 Rs' : '3099.85 Rs'}</h3>
              <p className="line-clamp-1 text-sm text-[#4b5563]">{post.title}</p>
              <p className="mt-1 text-xs text-[#7a828b]">10 months - New - Sell - {getEditableCategory(post)}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="bg-[linear-gradient(90deg,#3156d4,#ef3f57)] bg-clip-text text-2xl font-bold text-transparent">Top-Rated Contractors and Remodeling Businesses</h2>
            <Link href="/listing" className="rounded border border-[#dfe3e6] bg-white px-4 py-2 text-sm font-bold text-[#00796b]">Explore companies</Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sellers.slice(0, 10).map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="overflow-hidden rounded-md border border-[#dfe3e6] bg-white text-center shadow-sm transition hover:-translate-y-0.5">
                <div className="h-36 bg-[#004638] p-2"><img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full rounded object-cover" /></div>
                <div className="-mt-8 px-4 pb-5">
                  <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-[#f5f5f5]"><img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" /></div>
                  <h3 className="mt-3 line-clamp-1 font-bold">{post.title}</h3>
                  <p className="mt-2 text-sm text-[#7a828b]">Local remodeling provider</p>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const latest = categoryPosts.slice(0, 12)
  const feature = latest[0]
  return (
    <section className="bg-white px-4 py-10 lg:px-0">
      <div className="mx-auto max-w-[1120px]">
        <div className="rounded border border-[#dfe3e6] bg-white p-5">
          <h2 className="bg-[linear-gradient(90deg,#3156d4,#8429ce,#ef3f57)] bg-clip-text text-2xl font-bold text-transparent">Latest Remodeling</h2>
          <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {latest.slice(0, 10).map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group">
                <img src={getEditablePostImage(post)} alt={post.title || ''} className="aspect-square w-full rounded object-cover transition group-hover:opacity-85" />
                <h3 className="mt-3 line-clamp-1 text-lg font-bold">{index % 4 === 0 ? 'Request quote' : index === 2 ? 'Estimate available' : 'Contact provider'}</h3>
                <p className="line-clamp-1 text-sm text-[#4b5563]">{post.title}</p>
                <p className="mt-1 text-xs text-[#7a828b]">{index + 2} months - Remodel - Service - {getEditableCategory(post)}</p>
              </Link>
            ))}
          </div>
        </div>

        <DiscoverMore items={['Bathroom contractor listings', 'Cabinet and countertop services', 'Flooring installation offers']} />
        <div className="mt-8 text-center"><Link href={primaryRoute} className="rounded border border-[#b8bec4] px-4 py-2 font-bold">More latest items</Link></div>

        <article className="mx-auto mt-16 max-w-[980px]">
          <h2 className="text-2xl font-bold">About remodelerar.com - Remodeling Classifieds and Home Improvement Services</h2>
          <div className="mt-4 rounded-xl bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
            <p className="leading-8">Welcome to <strong>remodelerar.com</strong>, a focused destination for remodeling classifieds, contractor listings, home service offers, project materials, and practical renovation guides. Whether visitors need to compare professionals, request quotes, browse supplies, or plan a room upgrade, the site keeps every listing direct and easy to scan.</p>
            <div className="mt-7 grid gap-3">
              {['Post a remodeling project or service offer', 'Browse contractors by service type and project need', 'Compare useful details before requesting a quote', 'Find materials, tools, and renovation support', 'Read practical guides for planning better home upgrades'].map((item) => (
                <p key={item} className="rounded-md border-l-4 border-[#ff932c] bg-[#f7faff] px-5 py-3">[OK] {item}</p>
              ))}
            </div>
            <div className="mt-8 rounded-xl bg-[#193d46] p-7 text-white">
              <h3 className="text-2xl font-bold text-[#ffd329]">Built for Remodeling Projects of Every Size</h3>
              <p className="mt-4 leading-7">Use remodelerar.com to organize home improvement listings around real project needs: estimates, service scope, materials, location, timing, and contractor contact options.</p>
              <div className="mt-6 overflow-hidden rounded bg-white text-[#111827]">
                <table className="w-full text-sm"><tbody>{[['Project type', 'Examples', 'Best for'], ['Interior remodel', 'Kitchens, baths, flooring', 'Homeowners comparing options'], ['Exterior work', 'Roofing, siding, decks', 'Seasonal upgrades'], ['Trade services', 'Plumbing, electrical, painting', 'Specific repair needs']].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="border border-[#d7dce0] px-3 py-2">{cell}</td>)}</tr>)}</tbody></table>
              </div>
            </div>
          </div>
        </article>

        {feature ? <div className="mt-14"><EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Featured ad" /></div> : null}
        <DiscoverMore items={['Kitchen remodel planning', 'Bathroom upgrade services', 'Local contractor directory']} />
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white px-4 py-12 lg:px-0">
      <div className="mx-auto max-w-[980px] rounded-xl bg-[#004638] p-8 text-white">
        <h2 className="text-center text-2xl font-bold">Related Network Sites</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-6">
          {['Kitchen remodels', 'Bathroom upgrades', 'Home repair services', 'Contractor directory'].map((item, index) => (
            <Link key={item} href="/contact" className={`rounded-lg px-6 py-3 font-bold text-white ${index === 2 ? 'bg-[linear-gradient(90deg,#2ec4b6,#3156d4)]' : 'bg-[linear-gradient(90deg,#ff6347,#ffd32f)]'}`}>{item}</Link>
          ))}
        </div>
      </div>
    </section>
  )
}
