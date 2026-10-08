/** Positioning: e-commerce website operations, confirmed by the founder via the user.
 * Goldfish Commerce is a reference storefront, not a source of Engifto legal details.
 * All visitor-facing copy lives here; colors live in src/styles/global.css.
 */
export const site = {
  name: 'Engifto',
  language: 'en',
  indexable: false,
  contactEmail: null as string | null, // Set only after the mailbox exists.
  seo: {
    title: 'Engifto — Thoughtful e-commerce website operations',
    description: 'Engifto builds and operates e-commerce websites, connecting storefront management, product content, and everyday operations for a better shopping experience.',
    image: '/og.png',
  },
  labels: {
    home: 'Engifto home',
    navigation: 'Main',
    openMenu: 'Open navigation',
    skip: 'Skip to content',
    discover: 'Discover Engifto',
    contact: 'Get in touch',
    backToTop: 'Back to top',
  },
  sections: { about: true, focus: true, approach: true, ai: false, faq: true },
  navigation: [
    { section: 'about', label: 'About us' },
    { section: 'focus', label: 'What we do' },
    { section: 'approach', label: 'Our approach' },
  ] as const,
  hero: {
    eyebrow: 'The work behind a better shopping experience',
    lines: ['E-commerce.', 'Thoughtfully', 'operated.'],
    accentLine: 2,
    description: 'We build and operate e-commerce websites, bringing storefronts, product content, and everyday workflows together for a better shopping experience.',
    primary: 'Discover what we do',
    secondary: 'How we think',
    status: 'E-commerce website operations',
    note: 'Clear storefronts. Connected workflows.',
    artCaption: 'Different moving parts. One connected experience.',
    artLabel: 'Commerce, connected',
    artIndex: 'FIG. 01 / CONNECTION',
  },
  strip: ['Storefront management', 'Product & content', 'Daily operations'],
  stripLabel: 'Focus areas',
  about: {
    eyebrow: 'About Engifto',
    title: 'Behind every storefront,\na connected operation.',
    paragraphs: [
      'Engifto focuses on building and operating e-commerce websites. We bring website management, product content, and day-to-day commerce workflows together, with attention to the customer experience.',
      'A good storefront is more than a collection of products. Clear information, organized processes, and thoughtful upkeep help connect what shoppers see with the work happening behind the scenes.',
    ],
    note: 'Thoughtful storefronts. Practical operations.',
  },
  focus: {
    eyebrow: 'What we do',
    title: 'From the storefront\nto the work behind it.',
    description: 'Three connected parts of running an e-commerce website, with a focus on clarity, consistency, and everyday usefulness.',
    cardLabel: 'Our focus',
    items: [
      { title: 'Storefronts that work.', category: 'Website management', description: 'Build, maintain, and refine e-commerce websites, keeping navigation clear and the shopping experience easy to follow.', art: 'insight' },
      { title: 'Products, clearly presented.', category: 'Catalog & content', description: 'Organize product details, imagery, and storefront content so shoppers can understand what they’re browsing and make informed choices.', art: 'creative' },
      { title: 'Keep the work connected.', category: 'Everyday operations', description: 'Coordinate order-related workflows, customer communication, and routine updates to keep daily commerce operations organized.', art: 'operations' },
    ] as const,
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'Clear foundations.\nThoughtful follow-through.',
    description: 'Running a storefront means caring for the details, from the first product page to the day-to-day work that follows.',
    items: [
      { title: 'Set up the essentials.', description: 'Start with a clear website structure, organized product information, and the practical workflows needed to run the storefront.' },
      { title: 'Keep operations moving.', description: 'Maintain content, coordinate routine tasks, and keep customer-facing information aligned with the work behind the website.' },
      { title: 'Review and improve.', description: 'Use storefront feedback and day-to-day experience to refine product presentation, simplify workflows, and improve the shopping journey.' },
    ],
  },
  ai: {
    eyebrow: 'Technology with intention',
    title: 'AI as a helping hand.\nPeople at the center.',
    description: 'Potential uses of language models in e-commerce include product-content drafts, summaries of customer feedback, and assistance with routine workflows. Any future use would include human review.',
    status: 'Proposed direction',
    note: 'These are planned use cases, not live product features.',
    principles: ['Assist the work', 'Keep people in control', 'Make the next step clearer'],
  },
  faq: {
    eyebrow: 'A little more context',
    title: 'Good questions.\nClear answers.',
    items: [
      { question: 'What does Engifto do?', answer: 'Engifto builds and operates e-commerce websites. Our focus covers storefront management, product catalogs and content, and the everyday workflows that support the shopping experience.' },
      { question: 'What does website operation involve?', answer: 'It brings together website upkeep, product information, content updates, order-related coordination, and customer communication. These details help keep the storefront and its day-to-day operations connected.' },
      { question: 'Can I shop directly on this website?', answer: 'This website introduces Engifto and our work in e-commerce operations. Product catalogs, checkout, shipping, and return information belong on the relevant retail storefront.' },
      { question: 'What guides your approach?', answer: 'We focus on clear product information, consistent website experiences, and organized workflows. We review the details regularly and make practical improvements to how the storefront works.' },
    ],
  },
  closing: {
    eyebrow: 'Commerce, thoughtfully connected',
    title: 'Better storefronts.\nStronger foundations.',
    description: 'Thoughtful website management, clear product content, and connected operations—bringing the pieces of e-commerce together.',
    fallbackCta: 'Explore Engifto',
    contactCta: 'Start a conversation',
  },
  footer: {
    tagline: 'Thoughtful operations for e-commerce websites.',
    status: 'Storefronts · Content · Operations',
    copyright: 'Engifto',
  },
  notFound: {
    pageTitle: 'Page not found',
    eyebrow: '404 / A small detour',
    title: 'This page is\nstill a blank canvas.',
    description: 'The page you’re looking for doesn’t exist. Let’s get you back to the beginning.',
    cta: 'Back to Engifto',
  },
};

export const navigation = site.navigation.filter(item => site.sections[item.section]);
export const firstSection = navigation[0]?.section ?? (site.sections.ai ? 'ai' : site.sections.faq ? 'faq' : 'contact');
