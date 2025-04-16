import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {clsx} from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aigentic: Build & Sell AI Agents – Join the Waitlist",
  description: "Join Aigentic Marketplace’s waitlist to build, deploy, and sell AI agents with drag-and-drop tools and any LLM. Be the first to access our innovative platform and shape the future of AI agent development.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "antialiased")}>
      {children}
      </body>
    </html>
  );
}
