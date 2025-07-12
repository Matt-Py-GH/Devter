import Provider from "./Provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  keywords: ["Devter", "DevTracker", "developer tools", "project organization", "coding notes"],
  authors: [{ name: "Mateo Delgado", url: "https://devter.dev" }],
  creator: "Mateo Delgado",
  openGraph: {
    title: "Devter – Your developer shelter",
    description: "Organize your dev life with tools like Backlog, CMD, Paint, and more.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
