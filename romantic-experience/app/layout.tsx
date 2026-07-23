import type { Metadata, Viewport } from "next";
import "./globals.css";

// 1. Separate export for viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// 2. Clean metadata export without viewport
export const metadata: Metadata = {
  title: "Happy Birthday Aarya ❤️ | A Special Celebration",
  description: "A personalized interactive birthday experience created especially for Aarya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030303] text-white antialiased selection:bg-[#ff2a85] selection:text-white">
        {children}
      </body>
    </html>
  );
}