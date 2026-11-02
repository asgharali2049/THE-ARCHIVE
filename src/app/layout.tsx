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
  metadataBase: new URL("https://asgharali2049.vercel.app"),
  title: "THE ARCHIVE — Engineering Portfolio",
  description: "A personal engineering portfolio set in an underground archive.",
  verification: {
    google: "jEDlzvbucNKjn6baxSeCZ8sFJNt0JnJNOiUmgy2ZtK0",
  },
  openGraph: {
    type: "website",
    siteName: "THE ARCHIVE",
    locale: "en_US",
    title: "THE ARCHIVE — Engineering Portfolio",
    description: "A personal engineering portfolio set in an underground archive.",
  },
  twitter: {
    card: "summary",
    title: "THE ARCHIVE — Engineering Portfolio",
    description: "A personal engineering portfolio set in an underground archive.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
