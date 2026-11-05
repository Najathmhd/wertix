import React from "react";
import {
  Palette,
  Code2,
  Cpu,
  Video,
  Headphones,
} from "lucide-react";
import { ServiceItem } from "@/components/ServiceCard";
import { PortfolioItem } from "@/components/PortfolioCard";

export const servicesData: ServiceItem[] = [
  {
    id: "design",
    title: "Design & Branding",
    tagline: "Creative Systems",
    description:
      "Transform your product vision into memorable identities and intuitive digital interfaces engineered for conversion, clarity, and brand distinction.",
    icon: <Palette className="w-7 h-7" />,
    deliverables: [
      "Brand Identity & Styleguides",
      "UI/UX Design Systems",
      "Interactive Prototypes",
      "Mobile & Web App Interfaces",
      "Design Audits & Revamps",
    ],
    href: "/services#design",
  },
  {
    id: "web",
    title: "Web & Technology",
    tagline: "Modern Engineering",
    description:
      "High-performance websites, web applications, and digital platforms built with modern frameworks, rigorous architecture, and blazing load times.",
    icon: <Code2 className="w-7 h-7" />,
    deliverables: [
      "Next.js & React Web Apps",
      "Headless CMS Platforms",
      "Full-Stack Custom Solutions",
      "API Integrations & Cloud Setup",
      "Performance & SEO Optimization",
    ],
    href: "/services#web",
    highlight: true,
  },
  {
    id: "data",
    title: "Data & AI",
    tagline: "Intelligent Workflows",
    description:
      "Practical data pipelines, business intelligence dashboards, and applied AI integrations designed to automate repetitive workflows and uncover real insights.",
    icon: <Cpu className="w-7 h-7" />,
    deliverables: [
      "Applied LLM & AI Assistants",
      "Automated Data Workflows",
      "Custom Analytics Dashboards",
      "ETL & Data Cleaning Pipelines",
      "Predictive Modeling Concepts",
    ],
    href: "/services#data",
  },
  {
    id: "marketing",
    title: "Marketing & Video",
    tagline: "Visual Storytelling",
    description:
      "Compelling digital marketing assets, video editing, explainer animations, and creative collateral that communicate your value proposition clearly.",
    icon: <Video className="w-7 h-7" />,
    deliverables: [
      "Product Demo & Explainer Videos",
      "Social & Campaign Motion Graphics",
      "Landing Page Copy & Visuals",
      "Conversion Asset Bundles",
      "Digital Advertising Creatives",
    ],
    href: "/services#marketing",
  },
  {
    id: "support",
    title: "Business Support",
    tagline: "Managed Operations",
    description:
      "Reliable day-to-day digital operations, continuous platform maintenance, security patching, and on-demand technical support so you can focus on growth.",
    icon: <Headphones className="w-7 h-7" />,
    deliverables: [
      "Guaranteed SLA Maintenance",
      "Security Audits & Patching",
      "Hosting & Cloud Management",
      "Continuous Bug Fixing & Updates",
      "Emergency Technical Response",
    ],
    href: "/services#support",
  },
];

export const portfolioData: PortfolioItem[] = [
  {
    id: "concept-finflow",
    title: "FinFlow Analytics Suite",
    category: "Web & Technology",
    categoryBadge: "Web App & Data",
    conceptLabel: "Sample Concept Work",
    description:
      "An illustrative modern financial data dashboard and web platform designed to streamline multi-currency reporting with real-time charting.",
    deliverables: ["Next.js App Router", "Data Visualization", "Component Design System"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    gradient: "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900",
    aspectSnippet: "Real-Time Telemetry & Insights",
  },
  {
    id: "concept-aura",
    title: "Aura Health Studio",
    category: "Design & Branding",
    categoryBadge: "Brand & Digital UI",
    conceptLabel: "Sample Concept Work",
    description:
      "A complete concept brand identity and responsive booking experience crafted for modern boutique wellness clinics.",
    deliverables: ["Brand Identity Guideline", "Responsive Web App", "Interactive Prototype"],
    techStack: ["Figma", "Tailwind CSS", "React", "Motion"],
    gradient: "bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900",
    aspectSnippet: "Minimalist Brand & UI Experience",
  },
  {
    id: "concept-pulseflow",
    title: "PulseFlow AI Assistant",
    category: "Data & AI",
    categoryBadge: "Applied AI & Automation",
    conceptLabel: "Sample Concept Work",
    description:
      "A demonstration prototype of an intelligent enterprise knowledge assistant with automated document ingestion and natural language querying.",
    deliverables: ["AI Workflow Engine", "Knowledge Base Integration", "Admin Dashboard"],
    techStack: ["Python", "FastAPI", "React", "Vector Embeddings"],
    gradient: "bg-gradient-to-br from-[#090D1A] via-blue-900 to-[#0A1628]",
    aspectSnippet: "Applied Intelligence & Search",
  },
  {
    id: "concept-kinetix",
    title: "Kinetix Product Launch Reel",
    category: "Marketing & Video",
    categoryBadge: "Motion & Campaign",
    conceptLabel: "Sample Concept Work",
    description:
      "Demonstration 3D motion graphics and promotional video assets built for a high-impact consumer hardware launch campaign.",
    deliverables: ["3D Product Renders", "Motion Teaser 30s", "Social Ad Cutdowns"],
    techStack: ["After Effects", "Premiere Pro", "3D Motion", "Blender"],
    gradient: "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950",
    aspectSnippet: "High-Impact Visual Narrative",
  },
];
