import Provider from "./Provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/libs/silenceLogs"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devter",
  description: "Devter is your digital shelter for organizing code, ideas, bugs, notes and more.",
  keywords: ["Devter", "DevTracker", "developer tools", "project organization", "coding notes", "dexter"],
  authors: [{ name: "Mateo Delgado", url: "https://devter.dev" }],
  creator: "Mateo Delgado",
  openGraph: {
    title: "Devter – Your developer shelter",
    description: "Organize your dev life with tools like Backlog, Console, Paint, and more.",
    url: "https://devter.dev",
    siteName: "Devter",
    images: [
      {
        url: "https://devter.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devter - Developer Shelter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devter",
    description: "Organize your dev life with Devter.",
    images: ["https://devter.dev/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO extra */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://devter.dev" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Favicons y manifest */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Optimización de fuentes */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Schema mejorado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Devter",
              url: "https://devter.dev",
              description: "Devter is your digital shelter for organizing code, ideas, bugs, notes and more.",
              alternateName: "DevTracker",
              creator: {
                "@type": "Person",
                name: "Mateo Delgado",
                url: "https://devter.dev"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://devter.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
