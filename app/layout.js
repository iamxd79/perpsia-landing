import { Inter } from "next/font/google";
import "./globals.css";

import SiteControls from "../components/site-controls";
import BackgroundVideo from "../components/background-video";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://perpsia.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "PerpsIA",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/images/perpsia-logo.svg`,
      sameAs: [
        "https://t.me/perpsia_bot",
        "https://github.com/iamxd79/Perpsia",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "PerpsIA",
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PerpsIA — Perpetual Futures Market Intelligence",
    template: "%s — PerpsIA",
  },

  description:
    "PerpsIA scans perpetual futures markets, scores trading setups, tracks signal changes, and checks risk using live data from multiple sources.",

  applicationName: "PerpsIA",

  keywords: [
    "PerpsIA",
    "perpetual futures",
    "market intelligence",
    "live perp signals",
    "crypto market research",
    "Telegram trading research",
  ],

  alternates: {
    canonical: `${siteUrl}/`,
  },

  openGraph: {
    title: "PerpsIA — Perpetual Futures Market Intelligence",

    description:
      "PerpsIA scans perpetual futures markets, scores trading setups, tracks signal changes, and checks risk using live data from multiple sources.",

    url: siteUrl,

    siteName: "PerpsIA",

    type: "website",

    locale: "en_US",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PerpsIA perpetual futures market intelligence",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "PerpsIA — Perpetual Futures Market Intelligence",

    description:
      "Live perpetual futures market research, signal scoring, and risk context.",

    images: ["/twitter-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  themeColor: "#06101d",

  colorScheme: "dark",

  width: "device-width",

  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>

        {/* GLOBAL VIDEO BACKGROUND */}
        <div
          className="site-background"
          aria-hidden="true"
        >
          <BackgroundVideo />

          <div className="site-background-overlay" />
        </div>

        {/* WEBSITE */}
        <div className="site-content">
          {children}
        </div>

        {/* FIXED BOTTOM CONTROLS */}
        <SiteControls />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

      </body>
    </html>
  );
}
