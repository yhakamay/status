import "./globals.css";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const title = "yhakamay status";
const description = "yhakamay's status page";
export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    type: "website",
    locale: "en_US",
    siteName: title,
    url: "https://status.yhakamay.me",
  },
  twitter: {
    card: "summary",
    creator: "@yhakamay",
    title: title,
    description: description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
