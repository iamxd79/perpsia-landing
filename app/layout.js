import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const dotemp = localFont({ src: "./fonts/Dotemp-8bit.ttf", variable: "--font-dotemp", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const siteUrl = "https://perpsia.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PerpsIA — Perpetual Futures Market Intelligence", template: "%s — PerpsIA" },
  description: "PerpsIA scans perpetual futures markets, scores trading setups, tracks signal changes, and checks risk using live data from multiple sources.",
  applicationName: "PerpsIA",
  keywords: ["PerpsIA", "perpetual futures", "market intelligence", "live perp signals", "crypto market research", "Telegram trading research"],
  alternates: { canonical: "/" },
  openGraph: { title: "PerpsIA — Perpetual Futures Market Intelligence", description: "PerpsIA scans perpetual futures markets, scores trading setups, tracks signal changes, and checks risk using live data from multiple sources.", url: siteUrl, siteName: "PerpsIA", type: "website", locale: "en_US", images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "PerpsIA perpetual futures market intelligence" }] },
  twitter: { card: "summary_large_image", title: "PerpsIA — Perpetual Futures Market Intelligence", description: "Live perpetual futures market research, signal scoring, and risk context.", images: ["/twitter-image.png"] },
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport = { themeColor: "#07111f", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="en"><body className={`${dotemp.variable} ${inter.variable}`}>{children}</body></html>;
}
