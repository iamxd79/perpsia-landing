import localFont from "next/font/local";
import { Inter, Montserrat } from "next/font/google";
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

export const metadata = {
  title: "Perpsia Terminal",
  description:
    "Autonomous perpetual futures market intelligence powered by CoinMarketCap Skills Hub.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dotemp.variable} ${inter.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}