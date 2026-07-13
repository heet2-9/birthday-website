import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CanvasParticles from "@/components/CanvasParticles";

export const metadata: Metadata = {
  title: "Aura of Us | An Interactive Journey",
  description: "A luxury high-end interactive experience crafted for us.",
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