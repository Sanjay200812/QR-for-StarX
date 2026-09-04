import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { starxConfig } from "@/config/starx";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${starxConfig.brandName} | Official Links`,
  description: `Official social media and contact links for ${starxConfig.brandName}, a live rock band based in ${starxConfig.location}. Music heals.`,
  keywords: [
    "StarX Live",
    "StarX Live Band",
    "Live Band Hyderabad",
    "Rock Band Hyderabad",
    "Live Music Hyderabad",
    "StarX Live Instagram",
    "StarX Live YouTube",
    "StarX Live WhatsApp",
  ],
  authors: [{ name: starxConfig.brandName }],
  creator: starxConfig.brandName,
  publisher: starxConfig.brandName,
  openGraph: {
    title: starxConfig.brandName,
    description: `${starxConfig.tagline} Connect with ${starxConfig.brandName}.`,
    siteName: starxConfig.brandName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: starxConfig.brandName,
    description: `${starxConfig.tagline} Connect with ${starxConfig.brandName}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${caveat.variable} dark`}
    >
      <body className="bg-background text-text font-sans antialiased min-h-screen selection:bg-accent selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
