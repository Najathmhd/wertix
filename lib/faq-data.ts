export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqCategory {
  id: string
  title: string
  description: string
  items: FaqItem[]
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Core questions about WERTIX, our positioning, and how to initiate work with our team.",
    items: [
      {
        id: "gs-1",
        question: "What is WERTIX?",
        answer:
          "WERTIX is a managed digital services company. Rather than leaving you to manage disconnected freelancers or paying excessive agency overhead, WERTIX assembles curated specialist squads (designers, engineers, data specialists) managed under senior leadership with single-point accountability.",
      },
      {
        id: "gs-2",
        question: "What services does WERTIX offer?",
        answer:
          "Our services span five key pillars: Design & Branding (identity, UI/UX, design systems), Web & Technology (custom web applications, high-performance websites, APIs), Data & AI (analytics pipelines, intelligence integrations, dashboards), Marketing & Video (campaign assets, motion, technical copywriting), and Business Support (maintenance, technical operations, platform reliability).",
      },
      {
        id: "gs-3",
        question: "How do I start a project?",
        answer:
          "You can begin by using our interactive Request a Quote tool or by contacting us directly at wertix.global@gmail.com. Tell us about your goals, timeline, and current stage. Our team reviews your requirements and prepares a tailored proposal and quotation.",
      },
      {
        id: "gs-4",
        question: "Can I request a service that is not listed on the website?",
        answer:
          "Yes. Our specialist network covers bespoke integrations, system migrations, specialized architectures, and custom workflows. Share your specific requirements in the quote form, and our leads will assess feasibility and scope.",
      },
    ],
  },
  {
    id: "quotes-and-pricing",
    title: "Quotes and Pricing",
    description: "How estimates are prepared, cost factors, and milestone commitments.",
    items: [
      {
        id: "qp-1",
        question: "How do I request a quotation?",
        answer:
          "Navigate to our Request a Quote page and select your required service pillars, project stage, timeline, and budget range. You will receive a unique reference number (e.g. WERTIX-YYYYMMDD-XXXXX), and an administrator will review your scope.",
      },
      {
        id: "qp-2",
        question: "Is requesting a quote free?",
        answer:
          "Yes. Initial project scoping, technical consultations, and quotation preparation are completely free with zero obligation.",
      },
      {
        id: "qp-3",
        question: "How is the project price determined?",
        answer:
          "Pricing is determined based on technical complexity, scope of deliverables, required domain specialists, and targeted timeline. Each quotation includes itemized deliverables so you understand the exact allocation of resources.",
      },
      {
        id: "qp-4",
        question: "When do I need to make a payment?",
        answer:
          "Engagements follow milestone-based payment schedules. Typically, projects require an initial deposit upon scope approval, with remaining balances tied to verifiable sprint deliverables and final acceptance. Exact payment schedules are outlined in your quotation.",
      },
      {
        id: "qp-5",
        question: "Can the project scope or price change after approval?",
        answer:
          "Once a quotation is accepted, the agreed scope and price are fixed. If your requirements evolve during development, we draft a transparent change request with revised milestones and cost adjustments before any out-of-scope work begins.",
      },
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Our delivery cadence, specialist assignments, and communication practices.",
    items: [
      {
        id: "pm-1",
        question: "How does WERTIX manage projects?",
        answer:
          "Every engagement is supervised by a dedicated WERTIX Technical Lead who acts as your direct point of contact. We run structured agile sprints with clear weekly milestones, staging previews, and automated quality checklists.",
      },
      {
        id: "pm-2",
        question: "Who will work on my project?",
        answer:
          "WERTIX matches your requirements with vetted senior specialists suited to your exact technology stack and creative style. All workers operate under direct WERTIX oversight and non-disclosure agreements.",
      },
      {
        id: "pm-3",
        question: "How will I receive updates?",
        answer:
          "You receive scheduled sprint summaries, access to interactive staging environments, and direct email or shared workspace communication with your Technical Lead.",
      },
      {
        id: "pm-4",
        question: "Can I request revisions?",
        answer:
          "Yes. Each milestone includes dedicated review and revision cycles to ensure deliverables conform to your brand guidelines and functional specifications. The exact revision scope is formally defined in your project quotation.",
      },
      {
        id: "pm-5",
        question: "What happens if a deadline needs to change?",
        answer:
          "If unforeseen dependencies or scope changes affect delivery timelines, your Technical Lead will notify you promptly with an adjusted sprint schedule and mitigation options.",
      },
    ],
  },
  {
    id: "delivery-and-support",
    title: "Delivery and Support",
    description: "Asset handovers, warranty periods, and ongoing maintenance.",
    items: [
      {
        id: "ds-1",
        question: "How will I receive the completed work?",
        answer:
          "Upon milestone completion and final acceptance, all assets — source code repositories, design systems, documentation, and deployment configurations — are transferred directly to your organization with full ownership.",
      },
      {
        id: "ds-2",
        question: "What happens if I encounter a problem with the delivered work?",
        answer:
          "Deliverables include a post-launch warranty period during which any defects or discrepancies against the agreed specifications are resolved promptly at no extra charge.",
      },
      {
        id: "ds-3",
        question: "Can I request additional work after delivery?",
        answer:
          "Yes. We offer ongoing maintenance retainers and on-demand sprint extensions for feature additions, performance tuning, and technical updates.",
      },
      {
        id: "ds-4",
        question: "How does WERTIX handle project files and confidential information?",
        answer:
          "We operate under strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are available before sharing sensitive documentation, and project data is hosted in access-restricted, secure cloud repositories.",
      },
    ],
  },
  {
    id: "payments-and-policies",
    title: "Payments and Policies",
    description: "Accepted payment methods, cancellations, refunds, and governance.",
    items: [
      {
        id: "pp-1",
        question: "Which payment methods does WERTIX accept?",
        answer:
          "We accept international bank wire transfers (SWIFT/SEPA), local bank transfers in Sri Lanka, and verified corporate electronic payments. Approved payment details and currency options (USD, EUR, LKR) are specified on each official invoice.",
      },
      {
        id: "pp-2",
        question: "What happens if I cancel a project?",
        answer:
          "If you need to cancel an engagement, work ceases upon written notice. You are only responsible for milestones already completed and in-progress sprint deliverables up to the cancellation date, with all produced assets handed over.",
      },
      {
        id: "pp-3",
        question: "Are refunds available?",
        answer:
          "Because digital services involve dedicated specialist allocation, completed milestones are non-refundable. However, unallocated funds for unstarted phases are returned in accordance with your project agreement terms.",
      },
      {
        id: "pp-4",
        question: "How are disputes or concerns handled?",
        answer:
          "Quality concerns are addressed directly through your WERTIX Lead and executive review. If an output fails to meet the documented acceptance criteria, we rectify the deliverable at our cost or escalate through mediation.",
      },
    ],
  },
]

// 4-5 high-priority questions curated for the homepage section
export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: "hp-1",
    question: "What services does WERTIX provide?",
    answer:
      "WERTIX delivers managed services across five core areas: Design & Branding, Web & Technology development, Data & AI solutions, Marketing & Video production, and ongoing Business & Platform Support.",
  },
  {
    id: "hp-2",
    question: "How do I get a quotation?",
    answer:
      "Submit your project scope through our interactive quote tool. You will receive a unique reference number, and an administrator will review your requirements to provide an itemized proposal within 1–2 business days.",
  },
  {
    id: "hp-3",
    question: "How does the project process work?",
    answer:
      "We follow a five-stage managed delivery lifecycle: Discovery & Scoping, Specialist Squad Allocation, Agile Sprint Execution, Quality Assurance & Deployment, and Ongoing Support.",
  },
  {
    id: "hp-4",
    question: "Who completes my project?",
    answer:
      "Your project is executed by curated, vetted senior specialists (engineers, designers, data analysts) under the direct supervision of a dedicated WERTIX Technical Lead who guarantees code quality, milestones, and security.",
  },
  {
    id: "hp-5",
    question: "How do I contact WERTIX?",
    answer:
      "You can reach our team directly at wertix.global@gmail.com, submit a quote request online, or visit our contact page. We respond to all inquiries within 24 business hours.",
  },
]
