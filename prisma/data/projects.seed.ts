import {
  Prisma,
  ProjectEvidenceStatus,
  ProjectImpactArea,
} from '../../generated/prisma/client';

type SourceProjectEvidenceStatus =
  | 'shipped'
  | 'active-build'
  | 'experiment';

type SourceProjectImpactArea =
  | 'frontend-architecture'
  | 'product-interface'
  | 'backend-foundation'
  | 'workflow-design'
  | 'performance-accessibility';

const featuredProjectSlugs = [
  'greysoft-school-management-platform',
  'wesonline-marketplace',
  'noonprep',
  'jooav-erp',
] as const;


const sourceProjects = [
  {
    slug: "greysoft-school-management-platform",
    title: "Greysoft School Management",
    kicker: "Multi-tenant school SaaS",
    summary:
      "A multi-tenant school management platform with role-based dashboards for school operations, academics, exams, payments, messaging, applicant onboarding, and Greysoft platform administration.",
    evidenceStatus: "shipped",
    role: "Lead Frontend Engineer / Full-stack Integration Engineer",
    timeframe: "private  / production-adjacent",
    projectType: "Frontend-heavy full-stack",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Axios",
      "React Hook Form",
      "Zod",
      "Socket.IO",
      "Cloudinary",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "backend-foundation",
      "performance-accessibility",
    ],
    surfaces: [
      "Public site",
      "Tenant school portals",
      "School admin dashboard",
      "Teacher dashboard",
      "Student dashboard",
      "Sponsor/parent dashboard",
      "Applicant portal",
      "Exam portal",
      "Greysoft super-admin",
    ],
    highlights: [
      "Implemented tenant-aware routing for school-specific portals and branded dashboard experiences.",
      "Built reusable dashboard primitives for tables, filters, dialogs, uploads, pagination, exports, and loading states.",
      "Integrated REST APIs and Socket.IO workflows for messaging, exam progress, permissions, and data-heavy operations.",
    ],
    features: [
      {
        name: "Multi-tenant school portals",
        roles: ["Schools", "Admins", "Teachers", "Students", "Sponsors", "Applicants"],
        description:
          "Tenant-aware school experiences support branded portals and dashboards from a shared frontend codebase.",
        engineering:
          "Subdomain-aware middleware, tenant route namespaces, shared layout foundations, and school-specific branding boundaries.",
      },
      {
        name: "Role-based dashboards",
        roles: ["School admins", "Teachers", "Students", "Sponsors", "Applicants", "Platform admins"],
        description:
          "Each user type gets focused navigation and workflows for the school operations they actually need.",
        engineering:
          "Protected layouts, role-scoped session handling, permission-aware navigation, and reusable dashboard components.",
      },
      {
        name: "Messaging across users",
        roles: ["Teachers", "Students", "Sponsors", "Admins"],
        description:
          "Realtime communication patterns connect school stakeholders across dashboard surfaces.",
        engineering:
          "Socket.IO integration, connection feedback, shared messaging state, and API-backed conversation workflows.",
      },
      {
        name: "Exam and entrance exam flows",
        roles: ["Students", "Applicants", "Teachers", "Admins"],
        description:
          "Dedicated exam surfaces support assessment workflows, applicant entrance exams, and progress feedback.",
        engineering:
          "Protected exam routes, socket-powered progress acknowledgements, validation, loading states, and dashboard review flows.",
      },
      {
        name: "Academic operations",
        roles: ["Admins", "Teachers", "Students", "Sponsors"],
        description:
          "Classes, subjects, sections, timetables, assignments, learning materials, attendance, grading, and results are organized into reusable dashboard flows.",
        engineering:
          "Paginated queries, shared filters, reusable tables, form validation, upload states, and API-driven modules.",
      },
      {
        name: "Platform administration",
        roles: ["Greysoft super admins", "Greysoft admins"],
        description:
          "Greysoft operators can manage schools, permissions, support, user logs, customization, and cross-platform operational data.",
        engineering:
          "Super-admin dashboard surfaces, permission-aware screens, operational data tables, and reusable management UI patterns.",
      },
    ],
    outcomes: [
      "Scalable frontend foundation for a multi-school SaaS product.",
      "Consistent dashboard UX across many user roles and operational workflows.",
      "Reusable integration patterns for REST APIs, realtime sockets, media uploads, and exports.",
    ],
    talkingPoints: [
      "Built multi-tenant school portals through subdomain-aware routing and shared application architecture.",
      "Created role-based dashboard experiences for admins, teachers, students, sponsors, applicants, and platform operators.",
      "Used TanStack Query for API server state while Redux handled auth, exam, and messaging session state.",
      "Integrated Socket.IO for realtime messaging and exam progress feedback.",
      "Developed reusable dashboard primitives for data-heavy school operations.",
    ],
    links: [
      {
        label: "Visit Greysoft",
        href: "https://greysoft.net",
        kind: "live",
      },
    ],
    caseStudy: {
      problem:
        "Schools often coordinate admissions, academics, payments, communication, reporting, and exams across disconnected tools. That creates duplicated work, unclear ownership, and extra operational load for administrators, teachers, students, sponsors, and platform operators.",
      approach:
        "Greysoft organizes those workflows into tenant-aware portals and role-based dashboards. The frontend separates user surfaces by role while sharing reusable components, protected layouts, API utilities, query patterns, form systems, and realtime interaction foundations.",
      decisions: [
        {
          title: "Use subdomain-aware routing for tenant portals",
          description:
            "The platform can serve many schools from one frontend while preserving school-specific URLs, route namespaces, and branded experiences.",
        },
        {
          title: "Separate dashboards by role and permission needs",
          description:
            "Admins, teachers, students, sponsors, applicants, and Greysoft operators have different jobs, so the UI keeps workflows focused while reusing shared dashboard primitives.",
        },
        {
          title: "Split server state from session state",
          description:
            "TanStack Query handles API data, caching, retries, and loading states, while Redux Toolkit keeps auth, exam, and messaging state globally available where needed.",
        },
        {
          title: "Centralize API integration and feedback",
          description:
            "Axios utilities and interceptors create consistent authenticated requests, error handling, and user feedback across a large dashboard surface area.",
        },
        {
          title: "Use realtime sockets for interactive workflows",
          description:
            "Messaging and exam progress need faster feedback than ordinary request-response flows, so Socket.IO supports live communication and progress acknowledgement patterns.",
        },
        {
          title: "Invest in reusable dashboard primitives",
          description:
            "Tables, filters, dialogs, upload states, empty states, pagination, and exports repeat across the product, so shared primitives reduce implementation drift as the app grows.",
        },
      ],
      challenges: [
        {
          title: "Multi-role complexity",
          description:
            "Supporting many user roles increases routing, navigation, token, and permission complexity, so role-specific layouts needed clear boundaries.",
        },
        {
          title: "Tenant routing complexity",
          description:
            "Subdomain routing supports a stronger SaaS model, but it requires careful middleware, environment, and local development handling.",
        },
        {
          title: "Frontend-heavy integration scope",
          description:
            "The frontend depends on many backend domains, so the interface needed clear API boundaries, consistent error handling, and careful separation between user flows and service integration.",
        },
        {
          title: "Sensitive operational data",
          description:
            "Schools, students, payments, logs, tickets, and messages require demo data or blurred screenshots for public portfolio use.",
        },
      ],
      outcome:
        "The result is a scalable frontend foundation for a multi-role school SaaS product, with reusable patterns that support tenant customization, protected dashboards, realtime workflows, and data-heavy school operations.",
      backendNote:
        "The frontend integrates with a dedicated backend API for authentication, school data, exams, messaging, payments, permissions, and media workflows.",
      privacyNote:
        "Public notes and screenshots should use demo data only. Real student records, school data, payment details, user logs, support tickets, messages, credentials, and private business logic should not be shown.",
      screenshots: [
        {
          label: "Public landing page",
          src: "/projects/greysoft/greysoft-landing-banner-figma.png",
          alt: "Greysoft landing page preview",
        },
        {
          label: "School admin dashboard home",
        },
        {
          label: "Admin user management table",
        },
        {
          label: "Teacher assignment or exam workflow",
        },
        {
          label: "Student dashboard home",
        },
        {
          label: "Sponsor performance or fees page",
        },
        {
          label: "Exam portal with demo questions",
        },
        {
          label: "Greysoft super-admin school management page",
        },
        {
          label: "Mobile dashboard with sidebar states",
        },
      ],
      nextSteps: [
        "Add polished demo screenshots for the main dashboard surfaces.",
        "Document the API integration boundaries behind the most important user flows.",
        "Turn the strongest feature flows into short interview talking points for applications.",
      ],
    },
    featured: true,
  },
  {
    slug: "wesonline-marketplace",
    title: "WESOnline Marketplace",
    kicker: "Multi-role learning platform",
    summary:
      "A multi-role learning platform frontend for courses, mentorship, assessments, projects, chat, rewards, and tenant-aware learning experiences.",
    evidenceStatus: "active-build",
    role: "Frontend Engineer / Product-Focused Frontend Developer",
    timeframe: "Private / production-adjacent",
    projectType: "Frontend-heavy full-stack / backend-integrated frontend",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "Mantine",
      "TanStack Query",
      "Zustand",
      "Axios",
      "Zod",
      "Socket.IO",
      "Framer Motion",
      "GSAP",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "backend-foundation",
      "performance-accessibility",
    ],
    surfaces: [
      "Public website",
      "Student dashboard",
      "Mentor dashboard",
      "Admin dashboard",
      "Assessment surface",
      "Tenant and institution pages",
    ],
    highlights: [
      "Built role-aware route architecture for student, mentor, admin, assessment, and public product surfaces.",
      "Integrated multiple backend services with React Query, Axios, service-specific clients, and cache-aware dashboard workflows.",
      "Supported multi-tenant branding and product bootstrap so tenant-specific experiences can share one frontend foundation.",
    ],
    features: [
      {
        name: "Authentication and onboarding",
        roles: ["Students", "Mentors", "Admins", "SSO users"],
        description:
          "Handles account creation, OTP verification, social login, SSO, profile setup, account type selection, and role-aware onboarding flows.",
        engineering:
          "Protected auth routes, onboarding state, validation-heavy forms, token handling, and post-login navigation branching.",
      },
      {
        name: "Student learning dashboard",
        roles: ["Students", "Fellows"],
        description:
          "Gives learners access to courses, learning paths, assessments, mentorship, projects, events, rewards, chat, and settings.",
        engineering:
          "Protected route groups, reusable dashboard modules, API-backed lists, and session-aware navigation.",
      },
      {
        name: "Mentor operations dashboard",
        roles: ["Mentors", "Career Counselors"],
        description:
          "Lets mentors manage meeting sessions, appointments, learners, projects, tasks, grading, courses, rewards, and communication.",
        engineering:
          "Shared route structure, meeting flows, grading actions, project/task tools, and mentor-specific dashboard surfaces.",
      },
      {
        name: "Admin operations dashboard",
        roles: ["Admin users"],
        description:
          "Supports management of users, cohorts, groups, matching, courses, assessments, rewards, tenants, institutions, integrations, and analytics.",
        engineering:
          "Reusable admin data tables, status actions, filtered queries, pagination, bulk operations, and operational dashboards.",
      },
      {
        name: "Assessments and job simulations",
        roles: ["Students", "Admins"],
        description:
          "Supports assessment setup, question banks, assessment-taking flows, CSV operations, certificates, and job simulation workflows.",
        engineering:
          "Service-specific assessment APIs, validation-backed forms, result exports, and dedicated assessment routes.",
      },
      {
        name: "Chat and notifications",
        roles: ["Students", "Mentors"],
        description:
          "Adds direct messaging, notification panels, push permission flows, and live communication behavior.",
        engineering:
          "Socket.IO, shared chat components, infinite message pagination, notification hooks, and service worker support.",
      },
      {
        name: "Tenant and institution management",
        roles: ["Admins", "Tenants", "Public visitors"],
        description:
          "Supports tenant bootstrap, tenant branding, institution pages, cohorts, organizations, and integration-related screens.",
        engineering:
          "Tenant bootstrap, runtime branding, tenant-aware state, and route structures that support multiple organizations from one app.",
      },
    ],
    outcomes: [
      "Delivered a complex multi-role frontend that supports learners, mentors, admins, and tenant-specific experiences.",
      "Improved maintainability through route-level separation, reusable operational components, and service-specific API clients.",
      "Enabled platform workflows across courses, mentorship, projects, assessments, rewards, and real-time communication.",
    ],
    talkingPoints: [
      "Built role-aware routing for student, mentor, admin, assessment, and public product surfaces.",
      "Used React Query to manage paginated dashboards, mutations, cache invalidation, loading states, and filtered API views.",
      "Created reusable operational UI patterns including tables, skeletons, modals, drawers, and status-driven actions.",
      "Integrated Socket.IO, service worker support, and shared chat components for real-time communication.",
      "Supported multi-tenant behavior through tenant bootstrap and runtime branding.",
    ],
    links: [{
      label: "View WesOnline",
      kind: "live",
      href: "https://app.wesonline.ng"
    }],
    caseStudy: {
      problem:
        "Learners need a guided digital learning environment, while mentors and administrators need structured operational tools to manage people, content, projects, sessions, assessments, and progress across one platform.",
      approach:
        "WESOnline organizes those workflows into public pages, authenticated dashboards, assessment routes, and tenant-aware experiences. The frontend separates product surfaces by role while sharing validation systems, API utilities, route modules, data-fetching patterns, and reusable operational UI.",
      decisions: [
        {
          title: "Split the app into role-based route modules",
          description:
            "Public, auth, student, mentor, admin, assessment, and personalization flows each have different layouts and responsibilities, so route-level separation keeps the product easier to extend.",
        },
        {
          title: "Use React Query for API-backed platform state",
          description:
            "The product depends on many dashboards and data-heavy flows, so React Query handles caching, invalidation, pagination, loading states, and filtered server data consistently.",
        },
        {
          title: "Use Zustand for session and local workflow state",
          description:
            "Auth tokens, onboarding progress, drafts, tenant config, socket state, notifications, and task/project state are shared globally without introducing heavier global-state complexity.",
        },
        {
          title: "Build reusable operational primitives",
          description:
            "Admin and dashboard surfaces repeat actions like view, edit, approve, reject, match, paginate, and filter, so shared primitives keep UX and implementation patterns aligned.",
        },
        {
          title: "Bootstrap tenant configuration at runtime",
          description:
            "Tenant-aware branding and organization-specific experiences can be applied without duplicating the entire app for each institution or program.",
        },
        {
          title: "Isolate integrations through service-specific API clients",
          description:
            "Main product APIs, microservices, chat services, and assessment services each have different request behavior, so dedicated clients keep integrations easier to manage.",
        },
      ],
      challenges: [
        {
          title: "Multi-surface complexity",
          description:
            "Keeping public pages, student flows, mentor tools, admin workflows, tenant pages, and assessment routes in one repo improves reuse but increases architectural complexity.",
        },
        {
          title: "API-heavy dependency graph",
          description:
            "Most features depend on external services, so the frontend needs stable API contracts, resilient loading/error handling, and clear service boundaries.",
        },
        {
          title: "Auth edge cases",
          description:
            "OTP, email-only login, social login, SSO, 2FA, mentor approval states, and role-based redirects create many authentication and navigation branches.",
        },
        {
          title: "Sensitive operational data",
          description:
            "User records, analytics, chat content, tenant data, and internal admin flows need careful redaction or demo data for any public case-study screenshots.",
        },
      ],
      outcome:
        "The result is a production-style frontend foundation for a multi-role learning platform, with reusable dashboard systems, tenant-aware configuration, backend-integrated workflows, and real-time communication support.",
      backendNote:
        "The frontend integrates with multiple backend services for authentication, users, courses, mentorship, projects, chat, assessments, rewards, tenants, institutions, and admin operations.",
      privacyNote:
        "Public screenshots and notes should use anonymized or demo data only. Names, emails, tenant data, analytics, chat content, admin records, tokens, API URLs, and sensitive operational details should not be shown.",
      screenshots: [
        {
          label: "Public landing page",
          src: "/projects/wesonline/wesonline-landing-banner.png",
          alt: "WesOnline landing page preview",
        },
        {
          label: "Student dashboard home",
        },
        {
          label: "Learning path or course detail",
        },
        {
          label: "Assessment or job simulation flow",
        },
        {
          label: "Mentor project or task management",
        },
        {
          label: "Mentor session or appointment page",
        },
        {
          label: "Admin analytics dashboard",
        },
        {
          label: "Admin user or course management",
        },
        {
          label: "Chat interface",
        },
        {
          label: "Rewards or badges page",
        },
        {
          label: "Mobile public page or dashboard view",
        },
      ],
      nextSteps: [
        "Add polished screenshots for the strongest public, student, mentor, and admin surfaces.",
        "Choose one course or assessment flow as the anchor visual story for the case study.",
        "Analyze the backend/API repo later if we want to deepen the full-stack story beyond frontend integration.",
      ],
    },
    featured: true,
  },
  {
    slug: "jooav-erp",
    title: "JOOAV ERP",
    kicker: "Retail operations and marketplace system",
    summary:
      "A two-surface ERP frontend that combines an internal operations dashboard with a wholesaler-facing marketplace for catalog management, draft ordering, checkout, procurement workflows, and inventory continuity.",
    evidenceStatus: "shipped",
    role: "Sole Frontend Engineer",
    timeframe: "Private / 4 Months",
    projectType: "Frontend-heavy full-stack / multi-surface ERP frontend",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Redux Toolkit",
      "Axios",
      "React Hook Form",
      "Zod",
      "Radix UI",
      "shadcn/ui",
      "Jest",
      "Testing Library",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "backend-foundation",
      "performance-accessibility",
    ],
    surfaces: [
      "Admin operations dashboard",
      "Super admin dashboard",
      "Procurement officer dashboard",
      "Wholesaler marketplace",
      "Buyer checkout and payment flow",
      "Inventory and reorder dashboard",
    ],
    highlights: [
      "Built two connected product surfaces: an internal operations dashboard and a wholesaler-facing marketplace/order workflow.",
      "Implemented catalog, order, procurement, payment, and inventory flows with role-aware UI and cache-aware API integration.",
      "Used shared frontend patterns such as drawers, grouped tables, upload flows, validated forms, and status-driven dashboards across dense operational workflows.",
    ],
    features: [
      {
        name: "Role-aware admin operations",
        roles: ["Super admins", "Admins", "Procurement officers"],
        description:
          "Internal users get focused dashboard tools for monitoring operations, managing users, verifying payments, and coordinating procurement activity.",
        engineering:
          "Protected admin layouts, permission-aware navigation, shared table patterns, operational modals, and API-backed dashboard modules.",
      },
      {
        name: "Catalog and inventory management",
        roles: ["Admins", "Procurement officers", "Wholesalers"],
        description:
          "Products, categories, pricing, stock state, media, and availability are managed through structured ERP interfaces.",
        engineering:
          "Typed forms, upload workflows, bulk import support, reusable CRUD patterns, and server-driven inventory state.",
      },
      {
        name: "Order and procurement workflow",
        roles: ["Admins", "Procurement officers"],
        description:
          "Orders can move from review into assignment and fulfillment-aware workflows without losing operational visibility.",
        engineering:
          "Status-driven tables, mutation flows, cache invalidation, assignment actions, and shared dashboard primitives for dense workflows.",
      },
      {
        name: "Wholesaler marketplace experience",
        roles: ["Customers", "Wholesalers"],
        description:
          "Buyers can browse inventory, build cart or draft orders, and continue through a restocking flow designed for repeat purchasing.",
        engineering:
          "Marketplace route modules, product and cart state coordination, draft-order persistence, and responsive catalog UI patterns.",
      },
      {
        name: "Checkout, payment, and verification",
        roles: ["Customers", "Wholesalers", "Admins"],
        description:
          "The buying flow supports checkout progression, payment-aware interfaces, and corresponding admin verification actions.",
        engineering:
          "Validated forms, API-backed checkout steps, status-aware order views, and integration boundaries for payment verification workflows.",
      },
      {
        name: "Inventory continuity and reorder support",
        roles: ["Wholesalers", "Procurement officers", "Admins"],
        description:
          "The product keeps restocking activity connected to available inventory and downstream operational decisions.",
        engineering:
          "Server-sourced inventory data, reorder-friendly workflow design, dashboard summaries, and coordinated admin/user state patterns.",
      },
    ],
    outcomes: [
      "Created one connected ERP story across internal operations and external buyer workflows.",
      "Established reusable frontend structure for catalog, order, procurement, payment, and inventory modules.",
      "Demonstrated product thinking across both ops control surfaces and buyer-facing commerce flows.",
    ],
    talkingPoints: [
      "Built two complementary frontend surfaces that serve different roles inside one ERP ecosystem.",
      "Used TanStack Query for server-backed data flows while Redux Toolkit handled session and workflow state that needed broader app access.",
      "Designed the buyer experience around draft orders and repeat restocking rather than a generic e-commerce checkout alone.",
      "Applied reusable admin UI patterns across product management, procurement, payments, and operational dashboards.",
      "Connected both product surfaces through consistent API integration, validation, and dashboard architecture.",
    ],
    links: [
      {
        label: "Visit Jooav",
        href: "https://jooav.com",
        kind: "live",
      },
    ],
    caseStudy: {
      problem:
        "Retail and wholesale operations often split internal stock control, procurement coordination, order review, and buyer restocking into disconnected tools. That slows down operations and creates friction between the teams managing inventory and the people trying to place or fulfill orders.",
      approach:
        "JOOAV ERP is structured as two connected frontend surfaces: an internal dashboard for operational control and a marketplace experience for buyers and wholesalers. Both surfaces share integration patterns, validation systems, UI primitives, and product conventions while staying focused on the jobs each user type needs to complete.",
      decisions: [
        {
          title: "Split the product into operational and buyer-facing surfaces",
          description:
            "The internal dashboard and the marketplace solve different problems, so separating them keeps each experience clearer while still supporting one broader ERP story.",
        },
        {
          title: "Use feature-based frontend modules",
          description:
            "Catalog, orders, procurement, payments, users, and inventory all evolve independently, so modular feature boundaries make the codebase easier to scale.",
        },
        {
          title: "Use TanStack Query for API-backed workflows",
          description:
            "Catalog data, order states, payment records, and inventory views all depend on server state, so query caching and mutation invalidation help keep dense workflows reliable.",
        },
        {
          title: "Reserve Redux Toolkit for shared workflow state",
          description:
            "Session state, auth context, and cross-screen workflow state benefit from predictable global access without overloading every server-backed interaction into one store.",
        },
        {
          title: "Centralize integration behavior through Axios utilities",
          description:
            "Authenticated requests, error handling, interceptors, and shared request patterns stay more maintainable when integration behavior is standardized.",
        },
        {
          title: "Build reusable operational UI primitives",
          description:
            "Tables, grouped actions, drawers, upload flows, and validated forms repeat often in ERP products, so shared patterns improve consistency across both surfaces.",
        },
      ],
      challenges: [
        {
          title: "Two-surface product complexity",
          description:
            "A marketplace flow and an admin dashboard can drift apart quickly, so the product needs consistent data contracts and reusable frontend standards to stay aligned.",
        },
        {
          title: "API contract dependence",
          description:
            "Catalog, draft orders, procurement assignments, verification states, and inventory data all depend on backend shape and timing, so resilient loading and mutation handling matter a lot.",
        },
        {
          title: "Order and payment lifecycle depth",
          description:
            "Operational systems need clearer state transitions than simpler brochure or content apps, so the UI has to expose status changes without overwhelming users.",
        },
        {
          title: "Sensitive operational records",
          description:
            "Buyer details, inventory counts, payment verification data, procurement activity, and internal admin records need careful redaction in any public case study.",
        },
      ],
      outcome:
        "The result is a product-ready ERP frontend foundation that shows how one system can support both internal retail operations and buyer-facing restocking workflows without collapsing into a generic dashboard.",
      backendNote:
        "Both frontend surfaces integrate with dedicated backend services for authentication, users, catalog data, uploads, draft orders, checkout, payment verification, procurement assignments, fulfillment workflows, and inventory operations.",
      privacyNote:
        "Public screenshots and notes should avoid real customer details, addresses, order numbers, payment references, admin records, procurement activity, credentials, private API URLs, and sensitive internal operating rules.",
      screenshots: [
        {
          label: "Marketplace landing page",
          src: "/projects/jooav/jooav-marketplace-banner.png",
          alt: "Jooav landing page preview",
        },
        {
          label: "Marketplace product grid or category page",
          src: "/projects/jooav/jooav-marketplace-banner.png",
          alt: "Jooav product grid preview",
        },
        {
          label: "Cart or draft order workflow",
        },
        {
          label: "Checkout or payment verification view",
        },
        {
          label: "Orders dashboard or order detail view",
        },
        {
          label: "Inventory and reorder screen",
        },
        {
          label: "Admin dashboard overview",
        },
        {
          label: "Product or catalog management table",
        },
        {
          label: "Order management or procurement assignment view",
        },
        {
          label: "Bulk import or media upload workflow",
        },
        {
          label: "Mobile dashboard or sidebar state",
        },
      ],
      nextSteps: [
        "Add the marketplace landing screenshot once it is ready.",
        "Choose one buyer flow and one internal operations flow as the anchor visuals for the case study.",
        "Pull deeper backend or API detail later if we want to extend the full-stack narrative beyond frontend integration.",
      ],
    },
    featured: true,
  },
  {
    slug: "getcassava-marketplace-platform",
    title: "GetCassava Marketplace",
    kicker: "Multi-role agricultural marketplace",
    summary:
      "A multi-role cassava marketplace frontend that connects buyers, farmers or vendors in Uganda, to administrators through product discovery, ordering, payment flows, vendor operations, and marketplace management dashboards.",
    evidenceStatus: "shipped",
    role: "Frontend Engineer / Product-Focused Frontend Developer",
    timeframe: "Private / 4 Months",
    projectType: "Frontend Development",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "redux-persist",
      "React Context",
      "React Hook Form",
      "Zod",
      "Radix UI",
      "Firebase Auth",
      "ApexCharts",
      "XLSX",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "backend-foundation",
      "performance-accessibility",
    ],
    surfaces: [
      "Public storefront",
      "Buyer dashboard",
      "Farmer or vendor dashboard",
      "Admin dashboard",
    ],
    highlights: [
      "Built a multi-role marketplace frontend with distinct buyer, farmer or vendor, and admin experiences inside one product surface.",
      "Implemented commerce flows covering product discovery, cart, wishlist, addresses, checkout, reviews, and payment-provider redirects.",
      "Created operational dashboards for vendor workflows and admin management, including product controls, promotions, analytics, exports, and management tables.",
    ],
    features: [
      {
        name: "Public marketplace and product discovery",
        roles: ["Visitors", "Buyers"],
        description:
          "The public-facing experience helps users discover cassava products through marketplace browsing, landing sections, search, and product entry points.",
        engineering:
          "App Router route structure, reusable marketing sections, responsive navigation, shared product presentation patterns, and image-driven commerce UI.",
      },
      {
        name: "Authentication and role-aware access",
        roles: ["Buyers", "Farmers or vendors", "Admins"],
        description:
          "The app supports sign up, sign in, password reset, verification, social login, and role-aware redirects into different dashboard experiences.",
        engineering:
          "Redux Toolkit auth flows, persisted state, cookie-backed session handling, Firebase social authentication, React Hook Form, and Zod validation.",
      },
      {
        name: "Buyer commerce workflow",
        roles: ["Buyers"],
        description:
          "Buyers can browse products, manage carts and wishlists, save addresses, review past orders, complete checkout, and continue into payment-provider flows.",
        engineering:
          "Shared dashboard modules, centralized request utilities, role-based route handling, and server-backed cart, order, review, and address interactions.",
      },
      {
        name: "Farmer or vendor operations",
        roles: ["Farmers", "Vendors"],
        description:
          "Vendors get a dedicated dashboard for product management, incoming order requests, transaction visibility, and profile maintenance.",
        engineering:
          "Role-scoped dashboard components, shared operational UI primitives, upload-friendly form flows, and centralized data actions through shared context.",
      },
      {
        name: "Admin marketplace management",
        roles: ["Admins"],
        description:
          "Administrators can manage users, products, promotions, staff, orders, analytics, announcements, and status-driven marketplace operations.",
        engineering:
          "Searchable and paginated tables, export utilities, publish and unpublish actions, management forms, image uploads, and dashboard analytics modules.",
      },
      {
        name: "Payment and operational integrations",
        roles: ["Buyers", "Admins"],
        description:
          "Checkout flows connect the marketplace to external payment providers and backend-managed order lifecycles.",
        engineering:
          "Redirect-based payment initiation, centralized API request handling, cookie and token coordination, and UI feedback states around transactional flows.",
      },
    ],
    outcomes: [
      "Delivered a realistic marketplace frontend with both commerce and operations depth.",
      "Established reusable dashboard patterns across buyer, vendor, and admin product surfaces.",
      "Created a clear frontend foundation for future backend hardening, stronger guards, and typed API-client improvements.",
    ],
    talkingPoints: [
      "Built a multi-role marketplace frontend with separate buyer, farmer or vendor, and admin dashboard experiences.",
      "Implemented authentication with verification flows, social login, JWT-cookie session handling, and role-aware redirects.",
      "Covered buyer commerce flows from discovery through cart, wishlist, address management, checkout, and payment-provider redirects.",
      "Built admin product management with filters, pagination, publish controls, image uploads, exports, and marketplace operations screens.",
      "Used centralized API request helpers, Redux auth workflows, shared dashboard context, and reusable UI primitives to manage app complexity.",
    ],
    links: [],
    caseStudy: {
      problem:
        "Cassava supply and demand can be fragmented across offline channels, which makes discovery, trust, ordering, and day-to-day marketplace operations harder to coordinate. The product needed to support not just buyers, but also the vendors supplying goods and the administrators managing the marketplace itself.",
      approach:
        "GetCassava is structured as one marketplace frontend with multiple role-based surfaces: a public storefront, buyer dashboard, farmer or vendor dashboard, and admin dashboard. The frontend combines centralized API calls, shared operational UI patterns, auth workflows, and role-aware route organization to keep each experience focused while still feeling like one product.",
      decisions: [
        {
          title: "Separate workflows by role-specific routes and dashboards",
          description:
            "Buyers, vendors, and admins all need different navigation, data, and actions, so route-level and component-level separation keeps the product easier to reason about.",
        },
        {
          title: "Centralize backend requests in one API layer",
          description:
            "A shared request utility makes products, carts, wishlists, orders, discounts, transactions, and user operations easier to reuse and audit across the app.",
        },
        {
          title: "Use Redux Toolkit for auth-heavy workflows",
          description:
            "Verification, login, password reset, persisted session behavior, and redirect-sensitive auth states benefit from predictable async state handling.",
        },
        {
          title: "Use shared dashboard context for cross-surface data",
          description:
            "Products, carts, wishlists, transactions, promotions, and operational loading states are shared across dense dashboard flows, so a common context reduces repetition.",
        },
        {
          title: "Invest in reusable operational UI patterns",
          description:
            "Tables, forms, dialogs, tabs, empty states, pagination, and toasts repeat throughout the app, so reusable primitives help keep the experience consistent.",
        },
        {
          title: "Support real marketplace operations, not just storefront pages",
          description:
            "Admin screens include publishing, filtering, export, analytics, and management flows because operational tooling is part of the actual product value.",
        },
      ],
      challenges: [
        {
          title: "Multi-role product breadth",
          description:
            "Combining a storefront, buyer commerce flows, vendor tools, and admin operations in one frontend increases navigation, state, and maintenance complexity.",
        },
        {
          title: "Mixed state management pressure",
          description:
            "Redux, context, cookies, and request helpers all carry part of the app state today, so future refactoring will benefit from clearer domain boundaries.",
        },
        {
          title: "Transactional flow sensitivity",
          description:
            "Checkout, payment redirects, address selection, and order handling need careful UI feedback because failure states can directly affect purchase trust.",
        },
        {
          title: "Public case-study privacy",
          description:
            "User records, addresses, transactions, payment references, and operational dashboard data need redaction or seeded demo values for public screenshots.",
        },
      ],
      outcome:
        "The result is a product-rich marketplace frontend that shows both commerce thinking and operations design, with realistic role-based dashboards, backend integration, and strong room for future architectural hardening.",
      backendNote:
        "The frontend integrates with a separate backend service for authentication, products, carts, wishlists, users, addresses, reviews, orders, discounts, transactions, and payment initialization. A backend review later would deepen the full-stack case study.",
      privacyNote:
        "Public screenshots and notes should use demo or seeded data only. Real names, emails, phone numbers, addresses, order IDs, transaction references, payment references, and production marketplace records should not be exposed.",
      screenshots: [
        {
          label: "Public homepage and product discovery",
          src: "/projects/get-cassava/getcassava-landing-banner.png",
          alt: "GetCassava landing page preview",
        },
        {
          label: "Product listing or product details page",
        },
        {
          label: "Buyer dashboard overview",
        },
        {
          label: "Buyer cart and checkout flow",
        },
        {
          label: "Farmer or vendor dashboard",
        },
        {
          label: "Farmer orders or transactions view",
        },
        {
          label: "Admin dashboard overview",
        },
        {
          label: "Admin product management table",
        },
        {
          label: "Add or edit product form with demo images",
        },
        {
          label: "Promotions and discounts screen",
        },
        {
          label: "Mobile homepage or mobile dashboard state",
        },
      ],
      nextSteps: [
        "Add the storefront banner screenshot once it is ready.",
        "Choose one buyer flow and one admin operations flow as the anchor visuals for the case study.",
        "Review the backend repo later to strengthen the full-stack narrative around auth, orders, and payment initialization.",
      ],
    },
    featured: true,
  },
  {
    slug: "noonprep",
    title: "NoonPrep Exam Preparation Platform",
    kicker: "Student exam-preparation platform",
    summary:
      "A student-focused exam preparation and simulation platform with personalized dashboards, guided practice, timed exam simulations, analytics, resources, and realtime quiz challenges.",
    evidenceStatus: "active-build",
    role: "Frontend Engineer",
    timeframe: "Private / in progress",
    projectType: "Frontend-heavy full-stack",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Redux Toolkit",
      "Axios",
      "React Hook Form",
      "Zod",
      "Laravel Echo",
      "Recharts",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "backend-foundation",
      "performance-accessibility",
    ],
    surfaces: [
      "Public landing site",
      "Auth and onboarding",
      "Student dashboard",
      "Study Arena",
      "Practice sessions",
      "Exam sessions",
      "Quiz Arena",
      "Analytics",
      "Resources",
      "Profile and settings",
    ],
    highlights: [
      "Built a personalized student dashboard that turns backend learning data into readiness signals, streaks, recommendations, and clearer next actions.",
      "Implemented guided practice, timed exam simulation, and multiple quiz flows with validated setup forms and session continuity behavior.",
      "Integrated realtime live challenge gameplay with server-driven phase changes, reconnect recovery, and live ranking updates.",
    ],
    features: [
      {
        name: "Authentication and student onboarding",
        roles: ["Students"],
        description:
          "Students can sign up, sign in, reset passwords, join through school-linked flows, and continue into a guided setup process before using the dashboard.",
        engineering:
          "React Hook Form, Zod validation, shared Axios auth behavior, Redux-backed user hydration, Google auth integration, and redirect preservation for invitation-based flows.",
      },
      {
        name: "Personalized learner dashboard",
        roles: ["Students"],
        description:
          "The dashboard turns learning data into actionable study direction through readiness cues, streaks, smart planning, subject performance, and activity summaries.",
        engineering:
          "React Query-powered dashboard hooks, reusable cards and state views, responsive layout patterns, and profile-aware UI copy.",
      },
      {
        name: "Study Arena and exam setup flows",
        roles: ["Students"],
        description:
          "Students can choose guided practice or timed exam simulation, then configure sessions by exam type, subject, topics, question count, difficulty, and other preparation parameters.",
        engineering:
          "Schema-validated setup forms, feature-first modules, and API-backed session creation flows that keep the setup experience structured and repeatable.",
      },
      {
        name: "Practice and exam session runtime",
        roles: ["Students"],
        description:
          "Practice sessions emphasize learning feedback, while exam sessions simulate pressure with timers, navigation, flagging, submission control, and session restoration.",
        engineering:
          "Answer persistence, local restoration handling, locked progression rules, backend session sync, and controlled timer-based exam states.",
      },
      {
        name: "Realtime quiz challenges",
        roles: ["Students"],
        description:
          "Quiz Arena supports solo play and live peer challenges with lobbies, invites, countdowns, live score updates, rankings, and rematch-capable game flow.",
        engineering:
          "Laravel Echo or Reverb-compatible private channels, REST-backed durable state, heartbeat recovery, reconnect handling, and server-owned phase transitions.",
      },
      {
        name: "Analytics, resources, and profile management",
        roles: ["Students"],
        description:
          "Students can review progress trends, study history, resources, and editable academic preferences inside one continuous learning workspace.",
        engineering:
          "Chart-based analytics UI, paginated history views, debounced resource search, reusable settings forms, and partially scaffolded resource integration.",
      },
    ],
    outcomes: [
      "Created a cohesive student learning experience that combines preparation, feedback, analytics, and competitive engagement.",
      "Established reusable frontend patterns for API-heavy learning products with onboarding, session runtime, dashboards, and realtime interaction.",
      "Delivered a strong active-build case study even before the broader admin and backend ecosystem is folded into the portfolio story.",
    ],
    talkingPoints: [
      "Built a student dashboard that turns backend learning data into readiness, streaks, quests, and study-plan guidance.",
      "Implemented guided practice sessions with feedback, hints, progression control, and session-summary behavior.",
      "Built timed exam simulations with answer persistence, navigation, flags, timer expiry, and controlled submission.",
      "Integrated realtime live quiz challenges using Echo or Reverb events, REST state, heartbeat recovery, and ranking screens.",
      "Used React Query and Redux together to separate server cache from global authenticated user state.",
    ],
    links: [
      {
        label: "Visit Noonprep",
        href: "https://noonprep.com",
        kind: "live",
      },
    ],
    caseStudy: {
      problem:
        "Students preparing for high-stakes exams often need more than access to questions. They need structure, motivation, progress visibility, and clearer guidance on what to practice next if they want preparation to feel sustainable and effective.",
      approach:
        "NoonPrep organizes the student experience into a public product surface and an authenticated learning workspace with onboarding, personalized dashboards, guided study flows, timed exam simulations, analytics, resources, and realtime quiz challenges. The frontend uses feature-first modules, typed API hooks, validated forms, and reusable state patterns to keep these learning flows connected.",
      decisions: [
        {
          title: "Use React Query for server state and Redux for auth state",
          description:
            "Dashboard data, session history, analytics, and quiz flows depend on cacheable API state, while authenticated user hydration needs predictable global access across the app.",
        },
        {
          title: "Centralize API behavior in a shared Axios client",
          description:
            "Request headers, cookie-backed auth handling, mutation feedback, and typed feature APIs stay easier to manage when transport behavior is standardized.",
        },
        {
          title: "Model the app around feature-first product modules",
          description:
            "Auth, dashboard, study arena, quiz arena, analytics, and resources each represent real user journeys, so grouping code by domain helps the product scale more cleanly.",
        },
        {
          title: "Keep live challenge timing server-driven",
          description:
            "Competitive quiz fairness depends on shared backend phase control, so the frontend listens and reacts instead of independently advancing game state.",
        },
        {
          title: "Use schema-validated forms for setup-heavy flows",
          description:
            "Study sessions, exam sessions, quizzes, auth, and profile updates all depend on structured payloads, so React Hook Form and Zod reduce invalid submissions and improve UX.",
        },
        {
          title: "Invest in reusable loading, empty, and error states",
          description:
            "Because most product surfaces are API-backed, consistent fallback states are necessary for perceived quality and easier maintenance.",
        },
      ],
      challenges: [
        {
          title: "Realtime reliability",
          description:
            "Live challenges require subscription handling, backend-owned phase changes, heartbeat recovery, disconnect tolerance, and reconnect-safe UI updates.",
        },
        {
          title: "Session continuity",
          description:
            "Practice and exam flows benefit from local restoration after reloads, but that convenience has to stay aligned with backend session truth.",
        },
        {
          title: "Partial feature maturity",
          description:
            "The resources surface is scaffolded well, but some visible resource data is still sample-backed, so the public case study needs to describe that honestly.",
        },
        {
          title: "Ecosystem breadth beyond this repo",
          description:
            "The student app is already strong, but the complete NoonPrep product story will become fuller when the backend and admin or school-facing surfaces are added later.",
        },
      ],
      outcome:
        "The result is a portfolio-worthy student learning platform with multiple meaningful user flows, polished responsive UI, deep API integration, and unusually strong realtime interaction complexity for an active-build project.",
      backendNote:
        "This case study currently represents the student-facing frontend. It integrates with a separate backend for auth, study sessions, quiz state, analytics, resources, and realtime challenge behavior. A later pass can merge the admin and backend story into one broader platform case study.",
      privacyNote:
        "Public screenshots and notes should avoid real student names, emails, school codes, invite links, scores tied to real users, internal API URLs, tokens, and any private operational data.",
      screenshots: [
        {
          label: "Landing page hero",
          src: "/projects/noonprep/noonprep-landing-banner.png",
          alt: "NoonPrep landing page preview",
        },
        {
          label: "Student dashboard overview",
        },
        {
          label: "Study Arena mode selection",
        },
        {
          label: "Practice question screen with feedback",
        },
        {
          label: "Exam session with timer and question navigator",
        },
        {
          label: "Quiz Arena home",
        },
        {
          label: "Live challenge lobby or active round",
        },
        {
          label: "Analytics dashboard",
        },
        {
          label: "Profile or settings surface",
        },
        {
          label: "Mobile dashboard or sidebar state",
        },
      ],
      nextSteps: [
        "Add strong screenshots for the landing page, dashboard, Study Arena, live challenge flow, and analytics surfaces.",
        "Later merge this frontend story with the admin and backend surfaces when they are stable enough for a fuller ecosystem case study.",
        "Deepen the engineering narrative around practice setup and session-state architecture after the current implementation phase settles.",
      ],
    },
    featured: true,
  },
  {
    slug: "deviyke-labs-portfolio",
    title: "DevIyke Labs Portfolio",
    kicker: "Portfolio system and case-study engine",
    summary:
      "A dark-first portfolio product built to present frontend craft, structured case studies, polished interaction design, and a backend-ready content architecture in one cohesive experience.",
    evidenceStatus: "active-build",
    role: "Product engineer and owner",
    timeframe: "2026",
    projectType: "Frontend-heavy full-stack / personal product system",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
      "TanStack Query",
      "Axios",
      "React Hook Form",
      "Zod",
      "Sonner",
      "next-themes",
    ],
    impactAreas: [
      "frontend-architecture",
      "product-interface",
      "workflow-design",
      "performance-accessibility",
      "backend-foundation",
    ],
    surfaces: [
      "Narrative homepage",
      "Work index",
      "Project case-study pages",
      "Recruiter brief page",
      "About page",
      "Contact workflow",
      "Lab page",
    ],
    highlights: [
      "Built the portfolio as a product system instead of a static gallery, with reusable sections, case-study templates, and a clearer narrative structure.",
      "Created typed project repositories and detail-page contracts so content can move from local seed data to a backend CMS without rewriting the UI layer.",
      "Established a dark-first visual system with theme switching, self-hosted typography, motion primitives, responsive layout foundations, and form infrastructure.",
    ],
    features: [
      {
        name: "Narrative-driven landing experience",
        roles: ["Recruiters", "Hiring managers", "Collaborators"],
        description:
          "The homepage is structured to communicate identity, selected work, engineering philosophy, toolbox depth, and a clear contact path without feeling like a static resume.",
        engineering:
          "Section-based composition, reusable layout primitives, mobile-first spacing decisions, and motion that respects reduced-motion preferences.",
      },
      {
        name: "Typed work and case-study system",
        roles: ["Portfolio owner", "Visitors"],
        description:
          "Projects can be listed once and reused across the homepage, work index, and detail routes through a shared content model.",
        engineering:
          "Type-safe project contracts, repository boundaries, slug-based routing, and structured case-study fields for decisions, challenges, screenshots, and outcomes.",
      },
      {
        name: "Theme and typography system",
        roles: ["All visitors"],
        description:
          "The interface keeps a distinct dark-first identity while still supporting light mode cleanly across the app.",
        engineering:
          "next-themes integration, CSS token mapping, self-hosted local fonts, and shared visual primitives that keep components consistent.",
      },
      {
        name: "Validated contact workflow",
        roles: ["Recruiters", "Clients", "Collaborators"],
        description:
          "Visitors can send a structured inquiry through a form designed for real backend wiring rather than a decorative contact block.",
        engineering:
          "React Hook Form, Zod validation, TanStack Query mutations, typed Axios helpers, toast feedback, and mock-or-live API behavior through shared service boundaries.",
      },
      {
        name: "Backend-ready frontend boundaries",
        roles: ["Portfolio owner"],
        description:
          "The app is already organized so content can later move into an admin-backed API workflow without forcing presentation-level rewrites.",
        engineering:
          "Dedicated repositories, provider composition, service-layer utilities, and separation between UI sections, feature data, and transport details.",
      },
    ],
    outcomes: [
      "Established a polished portfolio foundation that already functions as a product demo and not just a project list.",
      "Created reusable content and layout systems that make it easier to grow work pages, recruiter views, and backend integration later.",
      "Improved the clarity of the portfolio story by aligning design, interaction, content structure, and technical boundaries.",
    ],
    talkingPoints: [
      "Designed the portfolio as its own case-study platform rather than a one-off marketing page.",
      "Used typed repositories so UI sections stay presentation-focused while content remains portable to a future API.",
      "Built provider composition around theming, motion, React Query, tooltips, and toast feedback in a way that keeps global concerns centralized.",
      "Implemented a real contact-service pattern with validation, mutation handling, and API interceptors instead of treating the form as dead UI.",
      "Kept the frontend polished while preserving a clear migration path toward private CMS and backend-managed content.",
    ],
    links: [
      {
        label: "View GitHub profile",
        href: "https://github.com/Dev-Iyke",
        kind: "github",
      },
    ],
    caseStudy: {
      problem:
        "Many developer portfolios look polished at first glance but fail to show how the person structures products, thinks about systems, or communicates engineering decisions. The challenge here was to create a portfolio that feels like a real product and also acts as evidence of frontend depth and backend-ready thinking.",
      approach:
        "This portfolio is being built as a modular product system. Public-facing pages are composed from feature sections and typed repositories, while theming, motion, contact flows, and case-study pages are treated as reusable foundations instead of isolated one-off implementations.",
      decisions: [
        {
          title: "Model project content through typed repositories",
          description:
            "Project cards, work pages, and case-study routes all read from one structured content layer, which keeps rendering logic simpler now and makes future API migration much easier.",
        },
        {
          title: "Keep global app concerns centralized",
          description:
            "Theme handling, motion configuration, React Query, toasts, and shared providers are composed in one place so cross-cutting behavior stays predictable.",
        },
        {
          title: "Make dark mode a first-class product decision",
          description:
            "The visual language starts from a dark editorial feel, but token-based theming and next-themes support keep light mode fully viable instead of treating it as an afterthought.",
        },
        {
          title: "Use local fonts and shared visual primitives",
          description:
            "Self-hosted typography, reusable layout containers, and shared UI patterns help the portfolio feel more intentional and reduce drift as sections expand.",
        },
        {
          title: "Build the contact flow like a real integration surface",
          description:
            "The contact page uses validated form state, service-layer requests, mutation hooks, and centralized Axios behavior so backend wiring later will be straightforward.",
        },
        {
          title: "Treat case studies as product pages, not long text dumps",
          description:
            "Each project page is structured around context, features, engineering decisions, and tradeoffs so visitors can scan quickly or read deeper depending on their interest.",
        },
      ],
      challenges: [
        {
          title: "Balancing atmosphere with clarity",
          description:
            "A visually rich portfolio can become distracting quickly, so the design needed enough personality to feel memorable without weakening readability or credibility.",
        },
        {
          title: "Avoiding repeated section patterns",
          description:
            "Because the homepage contains several narrative blocks, each section needed enough variation in layout and tone to stay engaging without feeling visually noisy.",
        },
        {
          title: "Designing for future backend integration early",
          description:
            "The content model, contact workflow, and project data structure had to support a future CMS and API without overengineering the first frontend release.",
        },
        {
          title: "Writing honest public-facing case-study content",
          description:
            "The portfolio needs to sound confident and specific while still staying accurate about shipped work, active builds, and areas that are intentionally still evolving.",
        },
      ],
      outcome:
        "The result is a portfolio foundation that already demonstrates product thinking, frontend architecture, interaction quality, and integration discipline while remaining ready for deeper content, screenshots, and backend-backed administration.",
      backendNote:
        "Today the portfolio uses typed local repositories and a frontend service layer. Those boundaries are intentionally shaped so projects, profile content, analytics, contact handling, and a private admin workflow can later move into a dedicated API without changing the presentation architecture.",
      privacyNote:
        "Because this project documents the portfolio itself, it can be discussed publicly in more detail than client work. Even so, any future analytics, contact records, or admin functionality should stay privacy-conscious and avoid exposing sensitive personal or visitor data.",
      screenshots: [
        {
          label: "Homepage hero and selected work flow",
          src: "/projects/dev-iyke-labs/dev-iyke-labs-banner.png",
          alt: "DevIyke labs landing page preview",
        },
        {
          label: "Project detail page layout",
        },
        {
          label: "Contact page and validated form states",
        },
        {
          label: "Light and dark theme comparison",
        },
        {
          label: "Mobile navigation and responsive homepage",
        },
      ],
      nextSteps: [
        "Add polished screenshots for the homepage, case-study detail page, and contact workflow.",
        "Refine the about, brief, and lab pages as supporting narratives mature.",
        "Connect the content model to a backend-managed workflow when the admin and CMS requirements are stable.",
      ],
    },
    featured: true,
  },
  {
    slug: "mini-mart",
    title: "Mini Mart",
    kicker: "Backend-focused practice project",
    summary:
      "A small e-commerce application built to strengthen backend fundamentals around REST APIs, JWT authentication, protected routes, product and user APIs, cart behavior, wishlist flows, and a dummy checkout journey.",
    evidenceStatus: "experiment",
    role: "Full-stack / Backend practice project",
    timeframe: "Personal project",
    projectType: "Backend-focused full-stack practice",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "REST APIs",
      "JavaScript",
      "Postman",
    ],
    impactAreas: [
      "backend-foundation",
      "workflow-design",
      "product-interface",
    ],
    surfaces: [
      "Authentication flows",
      "Product catalog APIs",
      "User management APIs",
      "Cart and wishlist flows",
      "Dummy checkout flow",
    ],
    highlights: [
      "Built REST API foundations for product and user management with Node.js and Express.",
      "Implemented JWT authentication and protected-route behavior for account-aware flows.",
      "Modeled practical e-commerce workflows including cart, wishlist, and checkout-ready state transitions.",
    ],
    features: [
      {
        name: "JWT authentication and protected access",
        roles: ["Users"],
        description:
          "Users can move through account-aware flows where protected actions depend on authenticated access.",
        engineering:
          "JWT-based authentication, protected route handling, request validation thinking, and separation between public and account-owned actions.",
      },
      {
        name: "Product and user API foundations",
        roles: ["Users", "System"],
        description:
          "The app exposes basic commerce data through API-driven product and user flows rather than static local-only UI state.",
        engineering:
          "Node.js and Express route structure, MongoDB-backed persistence, RESTful endpoint design, and Postman-driven API testing.",
      },
      {
        name: "Cart and wishlist behavior",
        roles: ["Users"],
        description:
          "Users can work with store-like actions such as saving products, building a cart, and moving through purchase preparation.",
        engineering:
          "User-owned state modeling, relationship boundaries between products and accounts, and state transitions that mirror practical e-commerce behavior.",
      },
      {
        name: "Dummy checkout flow",
        roles: ["Users"],
        description:
          "Checkout is represented as a safe practice flow so the project can exercise order-like movement without pretending to be a production payment system.",
        engineering:
          "Scoped checkout modeling, payload-shape discipline, and intentionally limited transaction behavior for a portfolio-safe backend practice project.",
      },
    ],
    outcomes: [
      "Created a practical backend-focused project for exercising authentication, API design, and e-commerce workflow modeling.",
      "Strengthened Node.js, Express.js, MongoDB, JWT, REST API, and Postman fundamentals.",
      "Added clearer backend evidence for junior backend and intern-role applications.",
    ],
    talkingPoints: [
      "Built a small e-commerce backend around Node.js, Express.js, MongoDB, and JWT.",
      "Practiced protected routes, account-aware flows, product and user API design, and cart or wishlist behavior.",
      "Used the project as backend-focused evidence alongside production frontend and API integration experience.",
    ],
    links: [],
    caseStudy: {
      problem:
        "Small commerce systems are useful backend practice because they force real product concerns into a manageable scope: authentication, product data, user-owned state, cart behavior, wishlist actions, and checkout boundaries.",
      approach:
        "Mini Mart models a compact store experience around REST APIs, JWT authentication, MongoDB persistence, protected routes, product and user endpoints, cart and wishlist flows, and a dummy checkout journey. The goal is not to overstate the project as a production marketplace, but to show practical backend foundations through a familiar product domain.",
      decisions: [
        {
          title: "Use JWT authentication for account-aware flows",
          description:
            "Authentication gives the project a real backend boundary: some actions can stay public, while user-specific actions require protected access.",
        },
        {
          title: "Keep the API RESTful and explicit",
          description:
            "Products, users, cart actions, wishlist actions, and checkout behavior are easier to reason about when the endpoint structure mirrors the product workflow.",
        },
        {
          title: "Model commerce around user-owned state",
          description:
            "Cart and wishlist flows make the backend more meaningful because data belongs to a user and has to stay consistent across requests.",
        },
        {
          title: "Scope checkout as a dummy flow",
          description:
            "The checkout flow supports learning around payloads and state transitions without claiming payment processing or production-grade transaction handling.",
        },
      ],
      challenges: [
        {
          title: "Scope control",
          description:
            "The project is intentionally small, so the value comes from clear backend foundations instead of trying to simulate a full enterprise commerce platform.",
        },
        {
          title: "Auth and state boundaries",
          description:
            "User-specific behavior needs careful separation from public product browsing so protected state does not leak into unauthenticated flows.",
        },
        {
          title: "Practice project limits",
          description:
            "Because this is a personal backend practice project, the public case study should stay honest about what is implemented and avoid presenting it as production infrastructure.",
        },
      ],
      outcome:
        "Mini Mart gives the portfolio a direct backend-focused case study that complements stronger frontend-led projects with practical evidence of API design, authentication, persistence, and workflow modeling.",
      backendNote:
        "Mini Mart is represented as a backend-focused personal project rather than a production system. The public case study stays intentionally scoped to the confirmed CV details.",
      privacyNote:
        "Use sample data only. Do not expose tokens, credentials, database URLs, private environment values, or personal user data.",
      screenshots: [
        {
          label: "Authentication and account flow",
        },
        {
          label: "Product catalog or API-backed product list",
        },
        {
          label: "Cart and wishlist flow",
        },
        {
          label: "Dummy checkout state",
        },
      ],
      nextSteps: [
        "Add demo screenshots or API documentation snapshots when available.",
        "Document the data model and endpoint boundaries more deeply if the backend repo is reviewed later.",
        "Add repository or live demo links once a public-safe version is ready.",
      ],
    },
    featured: false,
  },
] as const;

type SourceProject = (typeof sourceProjects)[number];
type SeedHeroImage = { src: string; alt?: string | null };
type SourceScreenshot = { label: string; src?: string; alt?: string };

function mapEvidenceStatus(
  status: SourceProjectEvidenceStatus,
): ProjectEvidenceStatus {
  const statuses: Record<SourceProjectEvidenceStatus, ProjectEvidenceStatus> = {
    shipped: ProjectEvidenceStatus.SHIPPED,
    'active-build': ProjectEvidenceStatus.ACTIVE_BUILD,
    experiment: ProjectEvidenceStatus.EXPERIMENT,
  };

  return statuses[status];
}

function mapImpactArea(area: SourceProjectImpactArea): ProjectImpactArea {
  const impactAreas: Record<SourceProjectImpactArea, ProjectImpactArea> = {
    'frontend-architecture': ProjectImpactArea.FRONTEND_ARCHITECTURE,
    'product-interface': ProjectImpactArea.PRODUCT_INTERFACE,
    'backend-foundation': ProjectImpactArea.BACKEND_FOUNDATION,
    'workflow-design': ProjectImpactArea.WORKFLOW_DESIGN,
    'performance-accessibility': ProjectImpactArea.PERFORMANCE_ACCESSIBILITY,
  };

  return impactAreas[area];
}

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function hasImageSrc(screenshot: SourceScreenshot): screenshot is SourceScreenshot & {
  src: string;
} {
  return typeof screenshot.src === 'string' && screenshot.src.length > 0;
}

function getHeroImage(project: SourceProject): SeedHeroImage | null {
  if ('heroImage' in project && project.heroImage) {
    return project.heroImage as SeedHeroImage;
  }

  const screenshots = project.caseStudy.screenshots as readonly SourceScreenshot[] | undefined;
  const primaryScreenshot = screenshots?.find(hasImageSrc);

  return primaryScreenshot
    ? {
        src: primaryScreenshot.src,
        alt: primaryScreenshot.alt ?? primaryScreenshot.label,
      }
    : null;
}

export const projectSeeds = sourceProjects.map((project, index) => {
  const featuredIndex = featuredProjectSlugs.indexOf(
    project.slug as (typeof featuredProjectSlugs)[number],
  );
  const heroImage = getHeroImage(project);

  return {
    slug: project.slug,
    title: project.title,
    kicker: project.kicker,
    summary: project.summary,
    heroImageSrc: heroImage?.src ?? null,
    heroImageAlt: heroImage?.alt ?? null,
    evidenceStatus: mapEvidenceStatus(project.evidenceStatus),
    role: project.role,
    timeframe: project.timeframe,
    projectType: project.projectType ?? null,
    featured: featuredIndex !== -1,
    featuredOrder: featuredIndex === -1 ? null : featuredIndex + 1,
    displayOrder: index + 1,
    stack: toJsonValue(project.stack),
    impactAreas: project.impactAreas.map(mapImpactArea),
    highlights: toJsonValue(project.highlights),
    links: toJsonValue(project.links),
    surfaces: toJsonValue(project.surfaces ?? []),
    features: toJsonValue(project.features ?? []),
    outcomes: toJsonValue(project.outcomes ?? []),
    talkingPoints: toJsonValue(project.talkingPoints ?? []),
    problem: project.caseStudy.problem,
    approach: project.caseStudy.approach,
    outcome: project.caseStudy.outcome ?? null,
    backendNote: project.caseStudy.backendNote ?? null,
    privacyNote: project.caseStudy.privacyNote,
    decisions: toJsonValue(project.caseStudy.decisions),
    challenges: toJsonValue(project.caseStudy.challenges ?? []),
    nextSteps: toJsonValue(project.caseStudy.nextSteps),
  };
}) satisfies Prisma.ProjectCreateInput[];

