import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://thorbit.com'),
  title: "Thorbit - Topical Authority Measurement Platform",
  description: "See What Google Sees. The first platform that visualizes your topical authority. Know exactly what you've covered, what's missing, and why competitors rank.",
  keywords: ["SEO", "topical authority", "content strategy", "EICS", "knowledge graph", "semantic SEO"],
  authors: [{ name: "Thorbit" }],
  openGraph: {
    title: "Thorbit - Topical Authority Measurement Platform",
    description: "The first platform that visualizes your topical authority",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thorbit - Topical Authority Measurement Platform",
    description: "The first platform that visualizes your topical authority",
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
