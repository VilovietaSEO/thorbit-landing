import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thorbit - 100+ AI Agents Research, Strategize, AND Execute",
  description: "The first platform where 100+ AI agents research, strategize, and execute. Complete marketing intelligence—competitor research, customer psychology, strategic planning, and execution deliverables—in 3 hours instead of months.",
  keywords: ["AI agents", "marketing intelligence", "competitor analysis", "customer research", "content strategy", "SEO", "topical authority", "categorical coverage"],
  authors: [{ name: "Thorbit" }],
  openGraph: {
    title: "Thorbit - 100+ AI Agents Research, Strategize, AND Execute",
    description: "Complete marketing intelligence in 3 hours instead of months. 100+ AI agents do the research, strategy, and execution.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 144,
        alt: "Thorbit - AI Agent Platform for Marketing Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thorbit - 100+ AI Agents Research, Strategize, AND Execute",
    description: "Complete marketing intelligence in 3 hours instead of months.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
