/** Temporary positioning adapted from GemsUnited's public POD business profile.
 * Confirm Engifto's actual product and company details before publication/submission.
 * All visitor-facing copy lives here; colors live in src/styles/global.css.
 */
export const site = {
  name: 'Engifto',
  language: 'en',
  indexable: false,
  contactEmail: null as string | null, // Set only after the mailbox exists.
  seo: {
    title: 'Engifto — Thoughtful technology for personalized commerce',
    description: 'An early-stage concept exploring digital tools for print-on-demand teams, connecting customer insights, creative work, and everyday operations.',
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
  sections: { about: true, focus: true, approach: true, ai: true, faq: true },
  navigation: [
    { section: 'about', label: 'About us' },
    { section: 'focus', label: 'Our focus' },
    { section: 'approach', label: 'Our approach' },
  ] as const,
  hero: {
    eyebrow: 'A new perspective on personalized commerce',
    lines: ['Thoughtful tech.', 'Meaningful', 'commerce.'],
    accentLine: 2,
    description: 'Exploring a simpler way for print-on-demand teams to turn customer insights into products that feel personal.',
    primary: 'Explore our direction',
    secondary: 'How we think',
    status: 'Early-stage concept',
    note: 'Built around people. Shaped by possibility.',
    artCaption: 'Different threads. One connected idea.',
    artLabel: 'The shape of things to come',
    artIndex: 'FIG. 01 / CONNECTION',
  },
  strip: ['Personalized products', 'Creative workflows', 'Smarter operations'],
  stripLabel: 'Focus areas',
  about: {
    eyebrow: 'The idea behind Engifto',
    title: 'Made for the people\nbehind the products.',
    paragraphs: [
      'A meaningful gift starts long before it reaches someone’s hands. It starts with an insight, a creative spark, and a team bringing the details together.',
      'Engifto is an early-stage concept exploring tools for that journey. Our starting point is personalized commerce: making creative work and everyday operations feel more connected.',
    ],
    note: 'A considered beginning. A practical direction.',
  },
  focus: {
    eyebrow: 'Our focus',
    title: 'From a spark of insight\nto something personal.',
    description: 'Three connected areas we’re exploring for the teams behind print-on-demand and personalized products.',
    cardLabel: 'Area of exploration',
    items: [
      { title: 'Understand what matters.', category: 'Insights & discovery', description: 'Bring customer questions, product feedback, and market signals into a clearer starting point for the next idea.', art: 'insight' },
      { title: 'Make room for creativity.', category: 'Creative workflows', description: 'Connect research, product concepts, and content drafts so people can spend more time on the details that make a product their own.', art: 'creative' },
      { title: 'Keep the pieces connected.', category: 'Everyday operations', description: 'Explore ways to organize product information, coordinate repetitive tasks, and give teams a shared view of what comes next.', art: 'operations' },
    ] as const,
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'Less noise.\nMore intention.',
    description: 'Technology should make the work feel simpler—and leave room for the people doing it.',
    items: [
      { title: 'Start with a real need.', description: 'Listen to the workflow before designing the tool. Focus on the moments where clarity or a little less busywork would help.' },
      { title: 'Build something useful.', description: 'Keep the first version focused. Connect one insight, one task, or one handoff rather than adding another layer of complexity.' },
      { title: 'Learn, then improve.', description: 'Bring people into the process, invite honest feedback, and let practical experience shape the next step.' },
    ],
  },
  ai: {
    eyebrow: 'Technology with intention',
    title: 'AI as a helping hand.\nPeople at the center.',
    description: 'We’re considering language models, including Claude, for research summaries, creative drafts, and operational assistance. The goal is to support thoughtful work, with people reviewing the output.',
    status: 'Proposed direction',
    note: 'These are planned use cases, not live product features.',
    principles: ['Assist the work', 'Keep people in control', 'Make the next step clearer'],
  },
  faq: {
    eyebrow: 'A little more context',
    title: 'Good questions.\nClear beginnings.',
    items: [
      { question: 'What is Engifto?', answer: 'Engifto is an early-stage concept exploring digital tools for personalized commerce. Our current direction focuses on the insight, creative, and operational workflows behind print-on-demand products.' },
      { question: 'Who is this being shaped for?', answer: 'The initial focus is teams working with personalized products and print-on-demand: people who research ideas, create product content, and coordinate day-to-day commerce workflows.' },
      { question: 'Is there a product available today?', answer: 'Not yet. Engifto is at the concept stage. This website introduces the direction we are exploring; it is not a launched service or an interactive product demo.' },
      { question: 'How might Engifto use AI?', answer: 'Potential uses include summarizing research, assisting with content drafts, and organizing operational information. Model selection and integration are still being evaluated. Human review would remain part of the workflow.' },
    ],
  },
  closing: {
    eyebrow: 'Thoughtful ideas start somewhere',
    title: 'A small beginning.\nA world of possibilities.',
    description: 'We’re taking the first steps toward more connected, more meaningful personalized commerce.',
    fallbackCta: 'Revisit the idea',
    contactCta: 'Start a conversation',
  },
  footer: {
    tagline: 'A thoughtful beginning for personalized commerce.',
    status: 'Concept stage · More to come',
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
