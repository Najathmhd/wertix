import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wertix.lk"),
  title: "WERTIX — Managed Digital Services | wertix.lk",
  description:
    "Big ideas deserve the right team. From creative design and websites to data, AI, and digital support, WERTIX brings the right expertise together to make your next project happen.",
  keywords: [
    "WERTIX", "Digital Services", "Managed Services", "Web Development",
    "Design Branding", "Data AI", "Sri Lanka", "wertix.lk",
  ],
  openGraph: {
    title: "WERTIX — Managed Digital Services",
    description:
      "From creative design and websites to data, AI, and digital support, WERTIX brings the right expertise together.",
    url: "https://wertix.lk",
    siteName: "WERTIX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WERTIX — Managed Digital Services",
    description:
      "From creative design and websites to data, AI, and digital support, WERTIX brings the right expertise together.",
  },
  alternates: {
    canonical: "https://wertix.lk",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#090D1A]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0055e5] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:text-xs focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
