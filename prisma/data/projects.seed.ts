import {
  Prisma,
  ProjectEvidenceStatus,
  ProjectImpactArea,
} from '../../generated/prisma/client';

export const projectSeeds = [
  {
    slug: 'mini-mart',
    title: 'Mini Mart',
    kicker: 'Backend-focused practice project',
    summary:
      'A small e-commerce application built to strengthen backend fundamentals around REST APIs, JWT authentication, protected routes, product and user APIs, cart behavior, wishlist flows, and a dummy checkout journey.',
    evidenceStatus: ProjectEvidenceStatus.EXPERIMENT,
    role: 'Full-stack / Backend practice project',
    timeframe: 'Personal project',
    projectType: 'Backend-focused full-stack practice',
    featured: false,
    featuredOrder: null,
    displayOrder: 1,
    heroImageSrc: null,
    heroImageAlt: null,
    stack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'REST APIs',
      'JavaScript',
      'Postman',
    ],
    impactAreas: [
      ProjectImpactArea.BACKEND_FOUNDATION,
      ProjectImpactArea.WORKFLOW_DESIGN,
      ProjectImpactArea.PRODUCT_INTERFACE,
    ],
    highlights: [
      'Built REST API foundations for product and user management with Node.js and Express.',
      'Implemented JWT authentication and protected-route behavior for account-aware flows.',
      'Modeled practical e-commerce workflows including cart, wishlist, and checkout-ready state transitions.',
    ],
    links: [],
    surfaces: [
      'Authentication flows',
      'Product catalog APIs',
      'User management APIs',
      'Cart and wishlist flows',
      'Dummy checkout flow',
    ],
    features: [],
    outcomes: [],
    talkingPoints: [],
    problem:
      'Small commerce systems are useful backend practice because they force real product concerns into a manageable scope: authentication, product data, user-owned state, cart behavior, wishlist actions, and checkout boundaries.',
    approach:
      'Mini Mart models a compact store experience around REST APIs, JWT authentication, MongoDB persistence, protected routes, product and user endpoints, cart and wishlist flows, and a dummy checkout journey.',
    outcome: null,
    backendNote: null,
    privacyNote:
      'Use sample data only. Do not expose tokens, credentials, database URLs, private environment values, or personal user data.',
    decisions: [],
    challenges: [],
    nextSteps: [],
  },
] satisfies Prisma.ProjectCreateInput[];