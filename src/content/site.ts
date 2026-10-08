/** Editable storefront copy. Catalog/prices/photos are sample inventory. */
export const site = {
  name: 'Engifto',
  language: 'en',
  indexable: false,
  contactEmail: null as string | null,
  seo: {
    title: 'Engifto — Thoughtful essentials for your workspace',
    description: 'Engifto brings paper goods, desk lighting, and workspace accessories into one considered collection for home offices, study spaces, and creative studios.',
    image: '/og.png',
  },
  labels: { home: 'Engifto home', openMenu: 'Open navigation', navigation: 'Main', skip: 'Skip to content', backToTop: 'Back to top' },
  announcement: 'Small details for better workdays.',
  business: {
    description: 'Engifto is building a focused online collection of paper goods, desk lighting, and workspace accessories for people who work, study, and create at home.',
    audience: 'Home offices, study spaces, and creative studios.',
    purpose: 'Make it easier to discover useful everyday objects and bring a personal workspace together.',
    building: 'A straightforward shopping experience with a searchable collection, clear product information, and a cart that keeps your choices together.',
  },
  hero: {
    eyebrow: 'Small details. Better workdays.',
    lines: ['Make room', 'for good', 'work.'],
    description: 'Thoughtful desk essentials for the notes you take, the ideas you keep, and the space you make your own.',
    primary: 'Explore the collection', secondary: 'Our story',
    image: '/images/hero.webp', alt: 'A calm home workspace with a white desk, greenery, and natural light',
    caption: 'A little less clutter. A little more possibility.',
  },
  faq: { items: [
    { question: 'What will I find in the collection?', answer: 'Explore paper goods, writing tools, desk lighting, and thoughtful accents for your workspace. Each product page brings together its price, description, and details.' },
    { question: 'How is shipping calculated?', answer: 'For US addresses, standard shipping is estimated at $6.95, with free standard shipping from a $100 merchandise subtotal. Express shipping is estimated at $12.95. Choose an option at checkout to see the total.' },
    { question: 'Can I change my cart?', answer: 'Yes. Open your cart to adjust quantities or remove an item. Your selections stay in this browser so you can continue exploring. You can add up to 10 of each item.' },
    { question: 'How do I find the right essential?', answer: 'Search the collection by name, filter by paper and writing, desk lighting, or desk accents, and sort by price or new arrivals. Product details help you explore each piece.' },
  ] },
  notFound: { pageTitle: 'Page not found', eyebrow: '404 / A small detour', title: 'This page is\nstill a blank canvas.', description: 'The page you’re looking for doesn’t exist. Let’s find something thoughtful instead.', cta: 'Back to Engifto' },
};
