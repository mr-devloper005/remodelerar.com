import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Remodeling guide',
    headline: 'Planning articles for repairs, upgrades, and full home remodels.',
    description: 'Read practical remodelerar.com guides for kitchens, bathrooms, flooring, painting, roofing, budgets, contractor comparison, and project planning.',
    filterLabel: 'Choose remodeling topic',
    secondaryNote: 'Helpful articles make it easier to define scope, budget, materials, and hiring steps before a project begins.',
    chips: ['Planning help', 'Budget ideas', 'Home improvement'],
  },
  classified: {
    eyebrow: 'Remodeling classifieds',
    headline: 'Browse home improvement offers, project requests, materials, and services.',
    description: 'Find remodeling listings for contractors, home services, repair work, renovation materials, tools, and local project opportunities.',
    filterLabel: 'Filter remodeling category',
    secondaryNote: 'Classifieds should be quick to scan, clear about scope, and easy to open for more details.',
    chips: ['Project requests', 'Service offers', 'Materials'],
  },
  sbm: {
    eyebrow: 'Saved remodel resources',
    headline: 'Useful remodeling links, references, suppliers, and planning resources.',
    description: 'Browse saved resources that support home improvement decisions, contractor research, project planning, and renovation inspiration.',
    filterLabel: 'Filter resource collection',
    secondaryNote: 'Curated remodeling resources help visitors compare ideas before contacting a provider.',
    chips: ['Suppliers', 'References', 'Planning tools'],
  },
  profile: {
    eyebrow: 'Provider profiles',
    headline: 'Profiles for remodelers, contractors, specialists, and home service providers.',
    description: 'Discover professional profiles connected to remodeling services, trade skills, project portfolios, and service areas.',
    filterLabel: 'Filter provider category',
    secondaryNote: 'Profiles should make specialties, trust signals, and contact paths easy to understand.',
    chips: ['Contractors', 'Specialists', 'Service areas'],
  },
  pdf: {
    eyebrow: 'Project documents',
    headline: 'Remodeling documents, checklists, guides, estimates, and reference files.',
    description: 'Use this library for renovation PDFs, planning checklists, product sheets, project scopes, and downloadable home improvement resources.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document pages need clear file context and practical next steps.',
    chips: ['Checklists', 'Guides', 'Project files'],
  },
  listing: {
    eyebrow: 'Contractor directory',
    headline: 'Compare remodeling businesses, trade specialists, and home service companies.',
    description: 'Browse contractor and business listings for kitchens, bathrooms, roofing, painting, flooring, electrical, plumbing, and general renovation work.',
    filterLabel: 'Filter contractor category',
    secondaryNote: 'Directory pages should help visitors compare services, locations, and contact options.',
    chips: ['Contractors', 'Compare services', 'Local providers'],
  },
  image: {
    eyebrow: 'Project gallery',
    headline: 'Visual posts for remodel ideas, completed work, materials, and inspiration.',
    description: 'Browse image-led remodeling posts that showcase finishes, before-and-after ideas, product visuals, and home improvement inspiration.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Images help visitors evaluate style, quality, and project direction before opening full details.',
    chips: ['Before and after', 'Materials', 'Inspiration'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
