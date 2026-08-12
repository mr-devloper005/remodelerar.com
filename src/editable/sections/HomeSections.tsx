import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { EditorialFeatureCard, getEditableCategory, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import logoSrc from '@/editable/assets/remodelerar-logo.png'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function heroImage(posts: SitePost[]) {
  return posts[0] ? getEditablePostImage(posts[0]) : logoSrc.src
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0c1023]">
      <div className="absolute inset-0">
        <img src={heroImage(posts)} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1023]/60 via-transparent to-[#0c1023]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1023]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[1280px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-[900px]">
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-white">
            On&amp;Off<br />
            <span className="text-white/90">Court</span>
          </h1>

          <p className="mt-8 max-w-lg text-sm font-medium uppercase tracking-[0.15em] text-white/50">
            From a quick reservation to a whole season of progress: remodeling, services, contractors, and lifestyle come together under one roof.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryRoute} className="bg-[#3d3dba] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110">
              Browse listings
            </Link>
            <Link href="/contact" className="border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.06]">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden max-w-[380px] text-right lg:block">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            {posts.length}+ listings, full directory, the complete remodeling marketplace
          </p>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 6)
  return (
    <section className="bg-[#0c1023] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
          From a quick reservation to a whole season of progress: remodeling, services, hospitality, contractors and lifestyle come together under one roof.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {railPosts.slice(0, 3).map((post, index) => {
            const labels = ['Remodeling', 'Services & Contractors', 'Corporate & Business']
            const subtitles = ['Browse Listings', 'Find Professionals', 'Business Solutions']
            const descriptions = [
              `${posts.length}+ listings plus outdoor services, across multiple categories. Reserve in seconds, day and night.`,
              'Private or in a group, from first project to completion level. Professional contractors, our own network and verified teams.',
              'Team projects, client consultations and services for groups. Contractors, consulting, materials and planning built around your goal.',
            ]
            return (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#141831]">
                  <img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">{labels[index] || getEditableCategory(post)}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">{subtitles[index] || post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/40">{descriptions[index]}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ posts }: HomeSectionProps) {
  if (!posts.length) return null
  const feature = posts[0]
  return (
    <section className="bg-[#c8ddd4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-0 lg:grid-cols-2">
        <div className="relative min-h-[500px] overflow-hidden bg-[#1a3a32]">
          <img src={getEditablePostImage(feature)} alt={feature?.title || ''} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-[#c8ddd4] p-10 lg:p-16">
          <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#1a1a2e] sm:text-5xl">
            Quality is not a moment. It&apos;s a mindset
          </h2>
          <p className="mt-8 max-w-md text-base leading-8 text-[#1a1a2e]/60">
            What started on the project grew into a way of building, physical, practical and social. Remodelerar brings remodeling, services, contractors and community together in one place. Growth is not linear; it&apos;s the sum of many improvements.
          </p>
          <Link href="/about" className="mt-8 inline-flex w-fit items-center gap-2 bg-[#1a1a2e] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#2a2a3e]">
            Get to know us
          </Link>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const latest = categoryPosts.slice(0, 9)
  const feature = latest[0]

  return (
    <section className="bg-[#0c1023] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]">Latest</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">Recent Listings</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 border border-white/[0.06] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.06]">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block border border-white/[0.06] bg-[#141831] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1329]">
                <img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4862a]">{getEditableCategory(post)}</p>
                <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug text-white">{post.title || 'Remodeling listing'}</h3>
                <p className="mt-3 text-sm text-white/30">View details</p>
              </div>
            </Link>
          ))}
        </div>

        {feature ? <div className="mt-16"><EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Featured" /></div> : null}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="overflow-hidden bg-[#0c1023] py-20">
      <div className="relative flex items-center overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex shrink-0 items-center gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tight text-white/[0.08]">
              {i % 2 === 0 ? 'Ready to build' : '·'}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-8" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tight text-white/[0.08]">
              {i % 2 === 0 ? 'Ready to build' : '·'}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-white/40">Remodeling, services, contractors and community, all in one place</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/classified" className="bg-[#3d3dba] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110">
            Browse listings
          </Link>
          <Link href="/contact" className="border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.06]">
            Plan a project
          </Link>
        </div>
      </div>
    </section>
  )
}
