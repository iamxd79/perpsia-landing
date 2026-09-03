import localFont from "next/font/local";
import { Inter, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dotemp = localFont({
  src: "./fonts/Dotemp-8bit.ttf",
  variable: "--font-dotemp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = "https://perpsia.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Perpsia Terminal | Autonomous Crypto Market Intelligence",
    template: "%s | Perpsia Terminal",
  },

  description:
    "Perpsia Terminal is an autonomous perpetual futures market intelligence agent powered by CoinMarketCap Skills Hub. Scan markets, analyze assets, track setups, and apply risk-aware research inside Telegram.",

  applicationName: "Perpsia Terminal",

  keywords: [
    "Perpsia",
    "Perpsia Terminal",
    "crypto market intelligence",
    "perpetual futures",
    "crypto research agent",
    "CoinMarketCap Skills Hub",
    "Telegram crypto bot",
    "crypto market scanner",
    "perpetual futures analysis",
    "AI crypto research",
    "risk-aware crypto analysis",
  ],

  authors: [
    {
      name: "Perpsia Terminal",
      url: siteUrl,
    },
  ],

  creator: "Perpsia Terminal",
  publisher: "Perpsia Terminal",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Perpsia Terminal | Autonomous Crypto Market Intelligence",
    description:
      "Scan perpetual futures markets, analyze assets, track setups, and receive structured market intelligence powered by CoinMarketCap Skills Hub.",
    url: siteUrl,
    siteName: "Perpsia Terminal",
    type: "website",
    locale: "en_US",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Perpsia Terminal autonomous crypto market intelligence agent",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Perpsia Terminal | Autonomous Crypto Market Intelligence",
    description:
      "Autonomous perpetual futures market intelligence powered by CoinMarketCap Skills Hub.",
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

  category: "technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#087bb5",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        backgroundColor: "#087bb5",
      }}
    >
      <body
        className={`${dotemp.variable} ${inter.variable} ${montserrat.variable}`}
        style={{
          backgroundColor: "#087bb5",
        }}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}