import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Remodeling classifieds, contractors, and home improvement listings',
      description: 'Browse remodeling projects, contractor listings, renovation materials, home services, and project planning resources on remodelerar.com.',
      openGraphTitle: 'remodelerar.com remodeling classifieds',
      openGraphDescription: 'Discover remodeling contractors, materials, services, and renovation resources through a focused home improvement marketplace.',
      keywords: ['remodeling classifieds', 'contractor listings', 'home improvement services', 'renovation materials', 'kitchen remodel', 'bathroom renovation'],
    },
    hero: {
      badge: 'Search remodeling classifieds',
      title: ['What would you like to remodel?'],
      description: 'Find contractors, materials, project requests, home services, renovation guides, and local remodeling listings from one focused search.',
      primaryCta: { label: 'Browse remodeling listings', href: '/classified' },
      secondaryCta: { label: 'Explore contractors', href: '/listing' },
      searchPlaceholder: 'Kitchen, bathroom, roofing, flooring, or service area',
      focusLabel: 'Trending remodels',
      featureCardBadge: 'Remodeling guide',
      featureCardTitle: 'Start with a project need, then compare services, materials, and providers.',
      featureCardDescription: 'remodelerar.com keeps remodeling classifieds and contractor information easy to scan on desktop and mobile.',
    },
    intro: {
      badge: 'Welcome',
      title: `Welcome to ${slot4BrandConfig.siteName}`,
      paragraphs: [
        'Use remodelerar.com to browse renovation services, contractor listings, home repair offers, remodeling materials, and project planning resources.',
        'Every section is organized around practical remodeling decisions: search, compare, open details, and contact the right provider.',
        'Listings are displayed safely with useful fallbacks so project information remains readable even when a listing has limited media or summary text.',
      ],
      sideBadge: 'Discover more',
      sidePoints: [
        'Kitchen, bathroom, roofing, flooring, and painting services',
        'Contractor pages and remodeling business profiles',
        'Helpful guides for homeowners planning upgrades',
        'Project images, documents, saved resources, and provider profiles',
      ],
      primaryLink: { label: 'Browse remodeling listings', href: '/classified' },
      secondaryLink: { label: 'Read remodeling guides', href: '/article' },
    },
    cta: {
      badge: 'Start remodeling',
      title: 'Post, promote, browse, and compare remodeling services from one place.',
      description: 'Explore current project listings, contractor pages, materials, and renovation resources, then open details for contact and next steps.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact remodelerar.com', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse fresh remodeling posts from this section.',
    },
  },
  about: {
    badge: 'About remodelerar.com',
    title: 'A practical marketplace for remodeling projects and home improvement services.',
    description: `${slot4BrandConfig.siteName} helps homeowners, contractors, suppliers, and service providers connect around remodeling classifieds, project listings, and renovation resources.`,
    paragraphs: [
      'The site is designed for people who want to remodel, repair, upgrade, buy materials, compare services, promote a contractor business, or advertise home improvement work online.',
      'A clean category structure and predictable detail pages make it easier to review project scope, services, locations, photos, documents, and contact cues without losing the original listing information.',
    ],
    values: [
      { title: 'Search-first remodeling', description: 'Visitors can start with a project type, service category, provider, or latest listing and move directly into useful details.' },
      { title: 'Relevant project information', description: 'Cards show titles, images, summaries, categories, locations, and contact cues when available.' },
      { title: 'Mobile-friendly project browsing', description: 'The layout stays compact, readable, and useful while comparing contractors, services, and material offers.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a remodeling listing, contractor page, material offer, or project resource?',
    description: 'Send a short message with what you want to publish, update, promote, or ask about on remodelerar.com.',
    formTitle: 'Send a remodeling inquiry',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: { relatedTitle: 'Related remodeling guides', fallbackTitle: 'Remodeling guide details' },
    listing: { relatedTitle: 'Related contractors', fallbackTitle: 'Contractor listing details' },
    image: { relatedTitle: 'Related project images', fallbackTitle: 'Project image details' },
    profile: { relatedTitle: 'Suggested providers', fallbackDescription: 'Provider details will appear here once available.', visitButton: 'Visit provider site' },
  },
} as const
