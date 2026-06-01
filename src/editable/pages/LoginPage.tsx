import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in to remodelerar.com', description: 'Sign in to manage remodeling listings and account access on remodelerar.com.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">remodelerar.com access</p>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">Sign in to manage remodeling listings.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 opacity-70">Use your remodelerar.com account to return to saved home improvement listings, contractor posts, and project inquiries.</p>
          </div>
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white/80 p-6 shadow-[0_24px_70px_rgba(16,36,31,0.12)] backdrop-blur sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm opacity-70">New here? <Link href="/signup" className="font-black underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
