import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CanvasParticles from "@/components/CanvasParticles";

export const metadata: Metadata = {
  title: "Happy Birthday Aarya !!",
  description: "A Surprise Birthday Experience for Aarya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-white select-none">
        <div className="noise-bg" />
        <CanvasParticles />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}