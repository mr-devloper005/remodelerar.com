import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0c1023] text-white">
        <section className="relative border-b border-white/[0.06] py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#141831] to-transparent opacity-50" />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">{pagesContent.about.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {pagesContent.about.values.map((value) => (
              <article key={value.title} className="border border-white/[0.06] bg-[#141831] p-6">
                <CheckCircle2 className="h-5 w-5 text-[#d4862a]" />
                <h2 className="mt-4 text-xl font-black uppercase tracking-tight">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/40">{value.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 max-w-3xl space-y-5 text-base leading-8 text-white/50">
            {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="mt-16 border border-white/[0.06] bg-[#141831]">
            <h2 className="border-b border-white/[0.06] bg-[#0f1329] px-6 py-4 text-lg font-black uppercase tracking-tight">Discover more</h2>
            {[['Browse remodeling classifieds', '/classified'], ['Explore contractors', '/listing'], ['Read remodeling guides', '/article'], ['Contact us', '/contact']].map(([label, href]) => (
              <Link key={href} href={href} className="flex items-center justify-between border-t border-white/[0.04] px-6 py-5 text-base font-medium text-white/60 transition hover:bg-white/[0.02] hover:text-white">
                {label}
                <ArrowRight className="h-5 w-5 text-white/20" />
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-white/30">{SITE_CONFIG.name} keeps listings, business pages, and public posts easy to scan.</p>
        </section>
      </main>
    </EditableSiteShell>
  )
}
