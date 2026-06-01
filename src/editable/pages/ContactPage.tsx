'use client'

import { Building2, FileText, Mail, MapPin, Phone } from 'lucide-react'
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
      <main className="bg-white px-4 py-10 text-[#111827] lg:px-0">
        <section className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#00796b]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl leading-8 text-[#667085]">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-md border border-[#dfe3e6] bg-[#f8fbfb] p-5">
                  <lane.icon className="h-5 w-5 text-[#00796b]" />
                  <h2 className="mt-3 text-xl font-bold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#667085]">{lane.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 text-sm text-[#4b5563]">
              <p className="flex gap-2"><MapPin className="h-4 w-4 text-[#00796b]" /> Serving remodeling projects, home service requests, and contractor listings through remodelerar.com.</p>
              
            </div>
          </div>

          <div className="rounded-md border border-[#dfe3e6] bg-[#f7f7f7] p-5">
            <h2 className="text-2xl font-bold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
