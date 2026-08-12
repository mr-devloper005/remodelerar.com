import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0c1023] text-white">
        <section className="mx-auto grid min-h-[80vh] max-w-[1280px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-md text-base leading-8 text-white/50">{pagesContent.auth.login.description}</p>
            <Link href="/signup" className="mt-8 inline-flex items-center gap-2 border border-white/[0.06] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.06]">
              {pagesContent.auth.login.createCta}
            </Link>
          </div>
          <div className="border border-white/[0.06] bg-[#141831] p-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
