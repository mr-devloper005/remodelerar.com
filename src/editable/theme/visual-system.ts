import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset = 'classified-market'

export const visualPresets = {
  'classified-market': {
    label: 'Classified Market',
    mood: 'clean public marketplace',
    fontDirection: 'straightforward sans serif with compact labels',
    colors: {
      background: '#ffffff',
      foreground: '#111827',
      muted: '#667085',
      primary: '#00796b',
      accent: '#3156d4',
      surface: '#f7f7f7',
    },
    shape: 'small-radius cards, pale header, dense listing grids, deep green footer',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'classified-market',
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-300',
    cardHover: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-md',
    softHover: 'transition duration-200 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-bold uppercase tracking-wide',
    heroTitle: 'text-5xl font-bold tracking-tight sm:text-6xl',
    sectionTitle: 'text-2xl font-bold tracking-tight',
    body: 'text-base leading-7',
    caption: 'text-xs font-bold uppercase tracking-wide',
  },
  surfaces: {
    glass: 'border border-[#dfe3e6] bg-white/90',
    paper: 'border border-[#dfe3e6] bg-white shadow-sm',
    quiet: 'border border-[#dfe3e6] bg-[#f7f7f7]',
    dark: 'border border-white/10 bg-[#004638]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 lg:px-0',
    sectionY: 'py-10 sm:py-12',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
