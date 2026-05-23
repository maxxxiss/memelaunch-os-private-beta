import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "MemeLaunch OS — Launch Operating System for Memecoin Teams",
    template: "%s — MemeLaunch OS",
  },
  description:
    "Plan memecoin launches, coordinate teams, track readiness, manage tasks, and schedule content from one clean launch dashboard.",
  keywords: ["memecoin", "crypto launch", "launch planning", "token launch", "web3 team", "launch dashboard"],
  openGraph: {
    title: "MemeLaunch OS — Launch Operating System for Memecoin Teams",
    description:
      "Plan memecoin launches, coordinate teams, track readiness, manage tasks, and schedule content from one clean launch dashboard.",
    type: "website",
    siteName: "MemeLaunch OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "MemeLaunch OS",
    description: "The launch operating system for memecoin teams.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
