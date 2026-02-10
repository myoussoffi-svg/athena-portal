import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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
  metadataBase: new URL('https://learn.athena.pe'),
  title: {
    default: "Athena - Master Your Finance Interview",
    template: "%s | Athena",
  },
  description:
    "Master investment banking interviews with structured preparation, AI-powered mock interviews, and realistic practice. Built by finance professionals.",
  openGraph: {
    title: "Athena - Master Your Finance Interview",
    description:
      "Master investment banking interviews with structured preparation, AI-powered mock interviews, and realistic practice.",
    type: "website",
    siteName: "Athena",
    url: 'https://learn.athena.pe',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Athena - Master Your Finance Interview',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athena - Master Your Finance Interview",
    description:
      "Master investment banking interviews with structured preparation, AI-powered mock interviews, and realistic practice.",
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
