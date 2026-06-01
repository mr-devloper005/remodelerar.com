import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import logoSrc from '@/editable/assets/remodelerar-logo.png'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Classified', href: '/classified' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sign up', href: '/signup' },
  { label: 'Sign in', href: '/login' },
]

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 bg-[#004638] text-white">
      <section className="bg-[#1f2330] px-4 py-4 text-center">
        <span className="mr-4 text-sm">Ready to list, promote, or advertise?</span>
        <Link href="/signup" className="inline-flex rounded-md border border-white px-4 py-2 text-sm font-bold">Sign up</Link>
      </section>

      <div className="mx-auto grid max-w-[1120px] gap-9 px-4 py-10 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-0">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="remodelerar home">
            <span className="flex h-16 w-16 overflow-hidden rounded-md bg-white">
              <img src={logoSrc.src} alt="remodelerar logo" className="h-full w-full object-cover" />
            </span>
            <span>
              <span className="block text-2xl font-black">remodelerar</span>
              {/* <span className="block text-sm font-bold text-white/75">remodelerar.com</span> */}
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/85">
            remodelerar.com is a classified marketplace for people who want to buy, sell, rent, promote, or advertise products and services online.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">Quick links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {footerLinks.map((item) => <Link key={`${item.label}-${item.href}`} href={item.href} className="hover:underline">{item.label}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/85">
            <p className="flex gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ff8a3d]" /> Remodeling projects, home service listings, contractor pages, and material offers.</p>
            <p className="flex gap-2"><Phone className="mt-1 h-4 w-4 shrink-0 text-[#ff8a3d]" /> Contact through remodelerar.com for listing and project inquiries.</p>
          
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-5 text-xs text-white/85 lg:px-0">
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((item) => <Link key={`bottom-${item.label}-${item.href}`} href={item.href} className="hover:underline">{item.label}</Link>)}
        </div>
        <p>Copyright (c) {year} remodelerar.com. All rights reserved.</p>
      </div>
    </footer>
  )
}
