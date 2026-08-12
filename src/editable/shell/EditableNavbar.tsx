'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#0c1023', '--editable-nav-text': '#ffffff', '--editable-nav-active': '#3d3dba', '--editable-nav-active-text': '#ffffff', '--editable-cta-bg': '#3d3dba', '--editable-cta-text': '#ffffff', '--editable-search-bg': '#141831', '--editable-border': 'rgba(255,255,255,0.06)', '--editable-container': '1440px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0c1023]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          <span className="hidden text-lg font-black uppercase tracking-[0.15em] sm:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {[{ label: 'Home', href: '/' }, ...navItems.slice(0, 3)].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`relative px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] transition ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                {item.label}
                {active ? <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#d4862a]" /> : null}
              </Link>
            )
          })}
          {[{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`relative px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] transition ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                {item.label}
                {active ? <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#d4862a]" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <form action="/search" className="hidden items-center md:flex">
            <label className="flex items-center gap-2 border border-white/[0.06] bg-[#141831] px-4 py-2">
              <Search className="h-4 w-4 text-white/40" />
              <input name="q" type="search" placeholder="Search" className="w-32 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30" />
            </label>
          </form>

          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 bg-[#3d3dba] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white sm:inline-flex"><PlusCircle className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 border border-white/[0.06] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white/70 hover:text-white sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 border border-white/[0.06] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white/70 hover:text-white sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 bg-[#3d3dba] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}

          <button type="button" onClick={() => setOpen((value) => !value)} className="border border-white/[0.06] bg-[#141831] p-2.5 text-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#0c1023] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex border border-white/[0.06] bg-[#141831] px-4 py-3">
            <Search className="mt-0.5 h-4 w-4 text-white/40" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/30" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/[0.04] px-3 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white/70 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
