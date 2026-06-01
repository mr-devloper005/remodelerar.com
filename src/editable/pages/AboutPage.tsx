import Link from 'next/link'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white px-4 py-10 text-[#111827] lg:px-0">
        <section className="mx-auto max-w-[1120px]">
          <div className="rounded border border-[#dfe3e6] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-[#00796b]">{pagesContent.about.badge}</p>
            <h1 className="mt-3 text-3xl font-bold">{pagesContent.about.title}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-[#667085]">{pagesContent.about.description}</p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {pagesContent.about.values.map((value) => (
                <article key={value.title} className="rounded-md border border-[#dfe3e6] bg-[#f8fbfb] p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#45bf73]" />
                  <h2 className="mt-3 text-lg font-bold">{value.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#667085]">{value.description}</p>
                </article>
              ))}
            </div>

            <div className="article-content mt-8 space-y-4">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[900px] overflow-hidden rounded border border-[#dfe3e6]">
            <h2 className="bg-[#f5f6f7] px-5 py-3 text-lg font-bold">Discover more</h2>
            {[['Browse remodeling classifieds', '/classified'], ['Explore contractors', '/listing'], ['Read remodeling guides', '/article'], ['Contact remodelerar.com', '/contact']].map(([label, href]) => (
              <Link key={href} href={href} className="flex items-center justify-between border-t border-[#eef0f2] px-5 py-4 text-lg hover:bg-[#fbfbfb]">
                {label}
                <ChevronRight className="h-5 w-5 text-[#9aa2a9]" />
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-[#667085]">{SITE_CONFIG.name} keeps listings, business pages, and public posts easy to scan.</p>
        </section>
      </main>
    </EditableSiteShell>
  )
}
