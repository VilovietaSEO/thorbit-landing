import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thorbit.ai"),
  title: "100 AI Agents Automating Your Organic Content",
  description: "Not just keyword rankings, not just content generation, complete marketing intelligence.",
  keywords: ["AI agents", "marketing intelligence", "competitor analysis", "customer research", "content strategy", "SEO", "topical authority", "categorical coverage"],
  authors: [{ name: "Thorbit" }],
  openGraph: {
    title: "100 AI Agents Automating Your Organic Content",
    description: "Not just keyword rankings, not just content generation, complete marketing intelligence.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thorbit - AI Agent Platform for Marketing Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "100 AI Agents Automating Your Organic Content",
    description: "Not just keyword rankings, not just content generation, complete marketing intelligence.",
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
