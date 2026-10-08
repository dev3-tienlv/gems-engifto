/** Editable company copy. Only publish verified business and contact information. */
export const site = {
  name: 'Engifto',
  language: 'en',
  indexable: false,
  contactEmail: null as string | null,
  seo: {
    title: 'Engifto — Building better everyday workspaces',
    description: 'Engifto is building a workspace commerce business that brings thoughtful everyday products and a simpler discovery experience together. Learn about our purpose, audience, and approach.',
    image: '/og.png',
  },
  labels: { home: 'Engifto home', openMenu: 'Open navigation', navigation: 'Main', skip: 'Skip to content', backToTop: 'Back to top' },
  announcement: 'Thoughtful products. A more considered everyday.',
  business: {
    description: 'Engifto is building a focused online collection of paper goods, desk lighting, and workspace accessories for people who work, study, and create at home.',
    audience: 'Home offices, study spaces, and creative studios.',
    purpose: 'Make it easier to discover useful everyday objects and bring a personal workspace together.',
    building: 'A focused collection experience with searchable categories, clear product information, and a considered visual presentation.',
  },
  hero: {
    eyebrow: 'The company behind the collection',
    lines: ['Better spaces.', 'Thoughtfully', 'built.'],
    description: 'We’re building Engifto to connect useful workspace products with a simpler way to discover them. A focused commerce business for the places where people work, study, and create.',
    primary: 'Meet Engifto', secondary: 'Our approach',
    image: '/images/hero.webp', alt: 'A calm home workspace with a white desk, greenery, and natural light',
    caption: 'A little less clutter. A little more possibility.',
  },
  approach: [
    { number: '01', title: 'Focus the collection.', description: 'Start with a clear use case: the personal workspace. Bring paper goods, lighting, and desk accents together around everyday routines.' },
    { number: '02', title: 'Make discovery simpler.', description: 'Give people useful categories, searchable products, and readable details so they can compare options without unnecessary noise.' },
    { number: '03', title: 'Build with care.', description: 'Keep the experience consistent from discovery to selection, and develop the operational details alongside the product experience.' },
  ],
  faq: { items: [
    { question: 'What is Engifto?', answer: 'Engifto is a workspace commerce business in development. We are bringing paper goods, desk lighting, and workspace accessories into a focused collection, with a digital experience that makes them easier to explore.' },
    { question: 'Who are you building for?', answer: 'People who work, study, and create in their own spaces: home-office workers, students, and independent creatives. Our starting point is the everyday personal workspace.' },
    { question: 'What is your business model?', answer: 'Our intended model is direct-to-consumer online retail of workspace essentials. The website brings together the company story and the collection experience; commercial operations are still being developed.' },
    { question: 'What can I explore today?', answer: 'You can learn about our purpose and approach, browse the collection, search by category, and explore product details and photography. We will publish fulfillment and business contact details as they are confirmed.' },
  ] },
  notFound: { pageTitle: 'Page not found', eyebrow: '404 / A small detour', title: 'This page is\nstill a blank canvas.', description: 'The page you’re looking for doesn’t exist. Let’s find something thoughtful instead.', cta: 'Back to Engifto' },
};
