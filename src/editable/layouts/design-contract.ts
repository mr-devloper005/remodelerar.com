import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#0c1023',
  '--slot4-page-text': '#ffffff',
  '--slot4-panel-bg': '#141831',
  '--slot4-surface-bg': '#141831',
  '--slot4-muted-text': '#8b92a5',
  '--slot4-soft-muted-text': '#6b7189',
  '--slot4-accent': '#3d3dba',
  '--slot4-accent-fill': '#3d3dba',
  '--slot4-accent-soft': '#1e1e5c',
  '--slot4-dark-bg': '#080b18',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#0f1329',
  '--slot4-cream': '#0c1023',
  '--slot4-warm': '#141831',
  '--slot4-lavender': '#0f1329',
  '--slot4-gray': '#141831',
  '--slot4-body-gradient': 'linear-gradient(180deg, #0c1023 0%, #0c1023 100%)',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(255, 255, 255, 0.06)',
  '--editable-page-bg': '#0c1023',
  '--editable-page-text': '#ffffff',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[#0c1023]',
  pageText: 'text-white',
  panelBg: 'bg-[#141831]',
  panelText: 'text-white',
  surfaceBg: 'bg-[#141831]',
  surfaceText: 'text-white',
  mutedText: 'text-[#8b92a5]',
  softMutedText: 'text-[#6b7189]',
  accentText: 'text-[#d4862a]',
  accentBg: 'bg-[#3d3dba]',
  accentSoftBg: 'bg-[#1e1e5c]',
  accentSoftText: 'text-[#7b7bff]',
  darkBg: 'bg-[#080b18]',
  darkText: 'text-white',
  mediaBg: 'bg-[#0f1329]',
  creamBg: 'bg-[#0c1023]',
  warmBg: 'bg-[#141831]',
  lavenderBg: 'bg-[#0f1329]',
  grayBg: 'bg-[#141831]',
  border: 'border-white/[0.06]',
  darkBorder: 'border-white/[0.06]',
  shadow: 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
  shadowStrong: 'shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
  overlay: 'bg-[linear-gradient(90deg,rgba(0,0,0,0.7),rgba(0,0,0,0.3))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    featureGrid: 'grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[300px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.25em]',
    heroTitle: 'text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl',
    sectionTitle: 'text-3xl font-black uppercase tracking-tight',
    body: 'text-base leading-7',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center ${editablePalette.accentBg} px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:brightness-110`,
    secondary: `inline-flex items-center justify-center border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-white/[0.08]`,
    accent: `inline-flex items-center justify-center bg-[#d4862a] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:brightness-110`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Dark premium directory: dark navy background, bold uppercase headings, indigo/orange accents, clean card grid.',
  'Only use dynamic post props and safe fallbacks; no mock data replaces live feeds.',
  'Use varied remodelerar.com card styles: featured, compact, horizontal, guide-style, and image-first.',
  'Keep route wrappers, exports, and task behavior unchanged.',
] as const
