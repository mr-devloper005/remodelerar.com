import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset = 'classified-market'

export const visualPresets = {
  'classified-market': {
    label: 'Classified Market',
    mood: 'premium dark directory',
    fontDirection: 'bold condensed sans serif with uppercase labels',
    colors: {
      background: '#0c1023',
      foreground: '#ffffff',
      muted: '#8b92a5',
      primary: '#3d3dba',
      accent: '#d4862a',
      surface: '#141831',
    },
    shape: 'sharp corners, dark panels, bold hero text, indigo buttons',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'classified-market',
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-300',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30',
    softHover: 'transition duration-300 hover:opacity-80',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.25em]',
    heroTitle: 'text-5xl font-black uppercase tracking-[-0.02em] sm:text-8xl',
    sectionTitle: 'text-3xl font-black uppercase tracking-tight',
    body: 'text-base leading-7',
    caption: 'text-[11px] font-bold uppercase tracking-[0.25em]',
  },
  surfaces: {
    glass: 'border border-white/[0.06] bg-[#141831]',
    paper: 'border border-white/[0.06] bg-[#141831]',
    quiet: 'border border-white/[0.06] bg-[#0f1329]',
    dark: 'border border-white/[0.06] bg-[#0c1023]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 lg:px-0',
    sectionY: 'py-14 sm:py-20',
    cardGrid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
