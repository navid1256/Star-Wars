import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Chronological Viewing Order",
  description: "A curated journey through the main Star Wars movies and major series — from the fall of the Republic to the rise of the Empire, the Rebellion, the New Republic, and the final conflict with the First Order.",
  keywords: ["Star Wars", "Chronological", "Viewing Order", "Timeline", "Jedi", "Sith", "Galactic Empire", "Rebellion"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050510] text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
