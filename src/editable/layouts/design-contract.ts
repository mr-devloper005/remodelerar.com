import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#111827',
  '--slot4-panel-bg': '#f4f7f8',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5f6872',
  '--slot4-soft-muted-text': '#7a828b',
  '--slot4-accent': '#00796b',
  '--slot4-accent-fill': '#00796b',
  '--slot4-accent-soft': '#e8f4f2',
  '--slot4-dark-bg': '#004638',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eef2f4',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f7f7',
  '--slot4-lavender': '#f3f6f7',
  '--slot4-gray': '#f6f6f6',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 45%, #f7f7f7 100%)',
  '--editable-container': '1120px',
  '--editable-border': '#dfe3e6',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#111827',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#dfe3e6]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_2px_10px_rgba(15,23,42,0.10)]',
  shadowStrong: 'shadow-[0_12px_34px_rgba(15,23,42,0.16)]',
  overlay: 'bg-[linear-gradient(90deg,rgba(0,0,0,0.58),rgba(0,0,0,0.22))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1110px] px-4 sm:px-6 lg:px-0',
    sectionY: 'py-10 sm:py-12',
  },
  layout: {
    safeGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    featureGrid: 'grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-wide',
    heroTitle: 'text-3xl font-bold leading-tight sm:text-4xl',
    sectionTitle: 'text-2xl font-bold tracking-tight sm:text-[28px]',
    body: 'text-base leading-7',
  },
  surface: {
    card: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-lg ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-md ${editablePalette.accentBg} px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-95`,
    secondary: `inline-flex items-center justify-center rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} px-5 py-2.5 text-sm font-bold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-md bg-[#3156d4] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-95`,
  },
  media: {
    frame: `relative overflow-hidden rounded-md ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(15,23,42,0.14)]',
    fade: 'transition duration-200 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Classifieds style: pale sticky header, centered search hero, compact service tiles, dense listing grids, and deep green footer.',
  'Only use dynamic post props and safe fallbacks; no mock data replaces live feeds.',
  'Use varied remodelerar.com card styles: featured, compact, horizontal, guide-style, and image-first.',
  'Keep route wrappers, exports, and task behavior unchanged.',
] as const
