import "./globals.css";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const title = "Yusuke's Status";
const description = "Yusuke's status page";
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
    <html lang="en" className="overflow-x-hidden">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
