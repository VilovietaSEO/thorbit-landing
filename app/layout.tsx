import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thorbit - Topical Authority Measurement Platform",
  description: "See What Google Sees. The first platform that visualizes your topical authority. Know exactly what you've covered, what's missing, and why competitors rank.",
  keywords: ["SEO", "topical authority", "content strategy", "EICS", "knowledge graph", "semantic SEO"],
  authors: [{ name: "Thorbit" }],
  metadataBase: new URL('https://thorbit.com'),
  openGraph: {
    title: "Thorbit - AI Agent Swarms for SEO",
    description: "Specialized AI Agent Swarms that automate research, analysis, and SEO execution. See what Google sees.",
    type: "website",
    siteName: "Thorbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thorbit - AI Agent Swarms for SEO",
    description: "Specialized AI Agent Swarms that automate research, analysis, and SEO execution. See what Google sees.",
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
