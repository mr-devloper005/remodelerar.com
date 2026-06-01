import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline,
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Remodeling classifieds marketplace',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Classified', href: '/classified' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Post a listing', href: '/classified' },
      secondary: { label: 'Sign up', href: '/signup' },
    },
  },
  footer: {
    tagline: 'Remodeling projects, contractors, materials, and home services',
    description: 'Browse remodeling classifieds, contractor profiles, home repair services, renovation materials, and planning resources on remodelerar.com.',
    columns: [
      {
        title: 'Navigation',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Classified', href: '/classified' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign up', href: '/signup' },
          { label: 'Sign in', href: '/login' },
        ],
      },
      {
        title: 'Remodeling categories',
        links: [
          { label: 'Kitchen remodels', href: '/classified' },
          { label: 'Bathroom upgrades', href: '/classified' },
          { label: 'Contractor services', href: '/listing' },
          { label: 'Project documents', href: '/pdf' },
        ],
      },
    ],
    bottomNote: 'Built for remodeling classifieds and home improvement discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
