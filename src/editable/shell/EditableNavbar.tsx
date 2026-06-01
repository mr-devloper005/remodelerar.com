'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import logoSrc from '@/editable/assets/remodelerar-logo.png'
import faviconSrc from '@/editable/assets/favicon.png'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Classified', href: '/classified' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sign up', href: '/signup' },
  { label: 'Sign in', href: '/login' },
]

function RemodelerarLogo() {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
        <img src={logoSrc.src} alt="remodelerar logo" className="h-full w-full object-cover" />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-black tracking-tight text-[#0b3154]">Remodelerar</span>
        
      </span>
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[#dde5e8] bg-[#eef5f7]/95 text-[#1f2933] backdrop-blur">
      <link rel="icon" type="image/png" href={faviconSrc.src} />
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[1120px] items-center gap-6 px-4 lg:px-0">
        <Link href="/" className="flex shrink-0 items-center" aria-label="remodelerar home">
          <RemodelerarLogo />
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${active ? 'bg-white text-[#00796b] shadow-sm' : 'text-[#303942] hover:bg-white hover:text-[#00796b]'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-md border border-[#cfd8dc] bg-white p-2 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#dde5e8] bg-white px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-[#dfe3e6] px-4 py-3 text-sm font-bold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
