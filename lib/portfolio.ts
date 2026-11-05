export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: "web" | "design" | "data" | "marketing";
  categoryBadge: string;
  conceptType: "Sample Concept Work";
  summary: string;
  challenge: string;
  solution: string;
  architecturalHighlights: string[];
  deliverables: string[];
  techStack: string[];
  gradient: string;
  aspectSnippet: string;
  benchmarks: Array<{ label: string; metric: string }>;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "finflow",
    title: "FinFlow Analytics Suite",
    subtitle: "Real-time reactive cloud financial analytics platform and telemetry interface",
    category: "web",
    categoryBadge: "Web & Technology",
    conceptType: "Sample Concept Work",
    summary:
      "A demonstration cloud financial analytics platform engineered with a reactive interface, multi-currency ledger conversions, and sub-millisecond data rendering.",
    challenge:
      "Financial monitoring teams often struggle with slow data updates, congested tabular views, and sluggish chart recalculations during volatile currency shifts.",
    solution:
      "We conceptualized a high-performance Next.js and TypeScript dashboard leveraging virtualized table rendering and web-worker assisted financial calculation pipelines.",
    architecturalHighlights: [
      "Reactive multi-currency recalculation without full table re-renders",
      "Sub-millisecond data rendering with optimized HTML5 canvas charting",
      "Strict high-contrast WCAG AAA accessible color palettes for financial monitoring",
      "Modular design tokens enabling dark and light telemetry themes",
    ],
    deliverables: [
      "Next.js App Router Web Application",
      "Interactive Real-Time Charts Engine",
      "Figma Component Design System Kit",
      "REST & WebSocket Telemetry Client Specs",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Node.js"],
    gradient: "bg-gradient-to-br from-[#090D1A] via-blue-950 to-slate-900",
    aspectSnippet: "Real-Time Telemetry & Insights",
    benchmarks: [
      { label: "Target Latency", metric: "< 50ms Data Update" },
      { label: "Contrast Ratio", metric: "7:1 AAA Standard" },
      { label: "Bundle Size", metric: "Under 120KB Init" },
    ],
  },
  {
    id: "aura",
    title: "Aura Health Studio",
    subtitle: "Serene brand identity system and responsive web portal for wellness clinics",
    category: "design",
    categoryBadge: "Design & Branding",
    conceptType: "Sample Concept Work",
    summary:
      "A conceptual brand identity system and responsive booking portal crafted for modern wellness clinics, prioritizing calm aesthetics, legible hierarchy, and frictionless scheduling flows.",
    challenge:
      "Most healthcare and wellness booking systems present cold, clinical, and confusing multi-step forms that create appointment drop-offs.",
    solution:
      "We developed an organic, human-centered design language with generous negative space, gentle transitions, and a streamlined 3-step appointment flow.",
    architecturalHighlights: [
      "Harmonious typographic scale built around modern humanist sans-serif typefaces",
      "Accessible pastel and neutral color tokens with verified readability",
      "Mobile-first scheduling interface designed for single-thumb navigation",
      "Comprehensive Figma design system with 80+ documented component variants",
    ],
    deliverables: [
      "Brand Identity Styleguide & Logo Suite",
      "Figma Responsive Component System",
      "Interactive Mobile Appointment Prototype",
      "Design Token Handoff Documentation",
    ],
    techStack: ["Figma", "Design Tokens", "React", "Tailwind CSS"],
    gradient: "bg-gradient-to-br from-blue-900 via-indigo-950 to-[#090D1A]",
    aspectSnippet: "Minimalist Brand & UI Experience",
    benchmarks: [
      { label: "Booking Steps", metric: "3-Step Flow" },
      { label: "Typography", metric: "Humanist Hierarchy" },
      { label: "Mobile Ergonomics", metric: "48px Min Targets" },
    ],
  },
  {
    id: "pulseflow",
    title: "PulseFlow AI Assistant",
    subtitle: "Enterprise RAG document search pipeline and natural language querying dashboard",
    category: "data",
    categoryBadge: "Data & AI",
    conceptType: "Sample Concept Work",
    summary:
      "A demonstration architecture for an internal enterprise knowledge retrieval assistant with automated document ingestion, vector semantic indexing, and grounded natural language querying.",
    challenge:
      "Internal knowledge workers spend up to 20% of their time searching fragmented PDF manuals, technical specs, and intranet documents with basic keyword searches that fail to capture semantic intent.",
    solution:
      "We architected an intelligent RAG (Retrieval-Augmented Generation) pipeline that indexes disparate knowledge bases with verifiable source citations and latency telemetry.",
    architecturalHighlights: [
      "Hybrid vector and BM25 sparse keyword retrieval for high query precision",
      "Transparent inline source citations linking directly to exact document clauses",
      "Granular permission and role-based filtering before embedding retrieval",
      "Real-time token usage, latency telemetry, and query confidence logging",
    ],
    deliverables: [
      "AI Retrieval & Chunking Architecture",
      "Knowledge Ingestion Pipeline Specs",
      "Interactive Query & Audit Dashboard",
      "Telemetry & Cost Estimation Model",
    ],
    techStack: ["Python", "FastAPI", "Vector Embeddings", "React", "PostgreSQL"],
    gradient: "bg-gradient-to-br from-slate-900 via-blue-900 to-[#0A1628]",
    aspectSnippet: "Applied Intelligence & Search",
    benchmarks: [
      { label: "Citation Fidelity", metric: "100% Sourced" },
      { label: "Search Mode", metric: "Hybrid RAG" },
      { label: "Latency Telemetry", metric: "Recorded / Query" },
    ],
  },
  {
    id: "kinetix",
    title: "Kinetix Product Launch Reel",
    subtitle: "High-tempo 3D promotional narrative and multi-channel campaign video collateral",
    category: "marketing",
    categoryBadge: "Marketing & Video",
    conceptType: "Sample Concept Work",
    summary:
      "Demonstration 3D motion graphics and promotional video storytelling illustrating how calculated visual pacing and technical precision elevate consumer hardware product releases.",
    challenge:
      "Hardware product launches require communicating intricate industrial engineering nuances while maintaining consumer excitement and emotional resonance.",
    solution:
      "We produced an illustrative launch video concept with exploded 3D CAD camera fly-throughs, synchronized sound design, and tailored aspect-ratio cuts for social formats.",
    architecturalHighlights: [
      "Physically based 3D lighting matching industrial materials and anodized metals",
      "Kinetic typography sequences communicating key performance specs in seconds",
      "Adaptive storyboard framing formatted for 16:9 landscape and 9:16 vertical feeds",
      "Color-graded timeline delivery adhering to Rec. 709 and HDR specifications",
    ],
    deliverables: [
      "30-Second Hero Teaser Storyboard",
      "Exploded 3D Render Concept Frames",
      "Multi-Ratio Social Advertising Cuts",
      "Motion Asset Library for Campaign Web Pages",
    ],
    techStack: ["After Effects", "Premiere Pro", "Blender", "DaVinci Resolve"],
    gradient: "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950",
    aspectSnippet: "High-Impact Visual Narrative",
    benchmarks: [
      { label: "Hero Cut Length", metric: "30s Focused" },
      { label: "Export Ratios", metric: "16:9, 9:16, 1:1" },
      { label: "CAD Precision", metric: "Sub-millimeter" },
    ],
  },
  {
    id: "vanguard",
    title: "Vanguard Logistics Portal",
    subtitle: "Supply chain freight tracking dashboard and fleet dispatch management layer",
    category: "web",
    categoryBadge: "Web & Technology",
    conceptType: "Sample Concept Work",
    summary:
      "An illustrative supply chain freight tracking dashboard demonstrating fleet location mapping, dispatch status management, and real-time route optimization telemetry.",
    challenge:
      "Logistics dispatchers are inundated with fragmented spreadsheets, delayed driver GPS pings, and disjointed customer status notifications.",
    solution:
      "We developed a unified command center concept combining interactive vector map layers, instant shipment filtering, and reactive status cards.",
    architecturalHighlights: [
      "Interactive map integration with low-overhead vector tile rendering",
      "Instant multi-column status filtering without round-trip database lags",
      "Keyboard-accessible shipment inspection drawers for high-speed dispatch operators",
      "Comprehensive responsive collapse into compact cards on handheld driver devices",
    ],
    deliverables: [
      "Full-Stack Logistics Dashboard Prototype",
      "Interactive Map Layer Integration Spec",
      "Driver Status Mobile Flow Wireframes",
      "Tabular Shipment Query Architecture",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox GL", "PostgreSQL"],
    gradient: "bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950",
    aspectSnippet: "Fleet Telemetry & Dispatch",
    benchmarks: [
      { label: "Map Rendering", metric: "Vector Tiles" },
      { label: "Filter Speed", metric: "Instant In-Memory" },
      { label: "Mobile Support", metric: "Driver Responsive" },
    ],
  },
  {
    id: "zenith",
    title: "Zenith Commerce Redesign",
    subtitle: "Distraction-free e-commerce checkout and product discovery experience",
    category: "design",
    categoryBadge: "Design & Branding",
    conceptType: "Sample Concept Work",
    summary:
      "A sample e-commerce checkout and product catalogue overhaul focused on speed, minimal cognitive distraction, and frictionless mobile-first purchasing.",
    challenge:
      "High checkout friction, unnecessary form fields, and cluttered layout hierarchies routinely drop mobile checkout completion rates below 20%.",
    solution:
      "We redesigned the end-to-end shopping journey with single-page checkout logic, auto-address resolution, and clean micro-interactions.",
    architecturalHighlights: [
      "Streamlined single-page checkout architecture with zero redirect traps",
      "Mobile-first gesture navigation and thumb-zone touch targets",
      "Atomic design token library covering buttons, inputs, modals, and toasts",
      "Accessibility-first cart summaries with explicit contrast and screen-reader announcements",
    ],
    deliverables: [
      "Mobile-First Product Detail Experience",
      "Single-Page Checkout Wireframes & Flows",
      "Design Token Library for Tailwind CSS",
      "Conversion UX Audit & Recommendations",
    ],
    techStack: ["Figma", "Design Systems", "React", "Tailwind CSS"],
    gradient: "bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900",
    aspectSnippet: "Frictionless Commerce UI",
    benchmarks: [
      { label: "Checkout Steps", metric: "Single-Page" },
      { label: "Touch Targets", metric: "48px Strict" },
      { label: "Form Overhead", metric: "-40% Input Fields" },
    ],
  },
];
