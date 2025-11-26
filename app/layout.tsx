import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://thorbit.ai'),
  title: "Thorbit - Topical Authority Measurement Platform",
  description: "See What Google Sees. The first platform that visualizes your topical authority. Know exactly what you've covered, what's missing, and why competitors rank.",
  keywords: ["SEO", "topical authority", "content strategy", "EICS", "knowledge graph", "semantic SEO"],
  authors: [{ name: "Thorbit" }],
  openGraph: {
    title: "Thorbit - Topical Authority Measurement Platform",
    description: "The first platform that visualizes your topical authority",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thorbit - Topical Authority Measurement Platform',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thorbit - Topical Authority Measurement Platform",
    description: "The first platform that visualizes your topical authority",
    images: ['/og-image.png'],
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
