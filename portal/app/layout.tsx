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
  title: {
    default: "Athena Portal",
    template: "%s | Athena Portal",
  },
  description:
    "Master investment banking and private equity interviews with structured preparation, AI-powered feedback, and realistic practice.",
  openGraph: {
    title: "Athena Portal",
    description:
      "Master investment banking and private equity interviews with structured preparation, AI-powered feedback, and realistic practice.",
    type: "website",
    siteName: "Athena Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athena Portal",
    description:
      "Master investment banking and private equity interviews with structured preparation, AI-powered feedback, and realistic practice.",
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
