'use client'

import { Building2, FileText, MapPin, Phone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Building2, title: 'Contractor and service pages', body: 'Ask about provider profiles, service information, contact details, service areas, or remodeling category placement.' },
  { icon: FileText, title: 'Guides and project resources', body: 'Share an update about remodeling guides, project checklists, renovation documents, project images, or provider information.' },
  { icon: Phone, title: 'Listings and promotion', body: 'Send details about remodeling offers, project requests, material listings, contractor ads, or home service promotion.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0c1023] text-white">
        <section className="relative border-b border-white/[0.06] py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#141831] to-transparent opacity-50" />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/50">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="border border-white/[0.06] bg-[#141831] p-6">
                  <lane.icon className="h-5 w-5 text-[#d4862a]" />
                  <h2 className="mt-4 text-xl font-black uppercase tracking-tight">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/40">{lane.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-white/30">
              <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-[#d4862a]" /> Serving remodeling projects, home service requests, and contractor listings.</p>
            </div>
          </div>

          <div className="border border-white/[0.06] bg-[#141831] p-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
