"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// Critical top-of-page components (Loaded synchronously for zero latency & instant LCP)
import LoadingScreen from "@/components/ui/LoadingScreen";
import CanvasParticles from "@/components/ui/CanvasParticles";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Hero from "@/components/Hero";

// Below-the-fold experience components (Dynamically imported to optimize bundle)
const LoveLetter = dynamic(() => import("@/components/LoveLetter"), { ssr: false });
const NameReveal = dynamic(() => import("@/components/NameReveal"), { ssr: false });
const MemoriesGallery = dynamic(() => import("@/components/MemoriesGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const FinalScene = dynamic(() => import("@/components/FinalScene"), { ssr: false });

function LazySection({ children }: { children: ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: "75vh",
        contentVisibility: "auto",
        containIntrinsicSize: "100vh",
      }}
    >
      {shouldRender ? children : null}
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden relative">
      {/* 1. Loading Screen Stage Overlay (Fades out smoothly without blocking LCP DOM) */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Main Romantic Experience (Rendered immediately for Instant LCP & FCP) */}
      <CanvasParticles />

      <SmoothScroll>
        <Hero />

        <LazySection>
          <LoveLetter />
        </LazySection>

        <LazySection>
          <NameReveal />
        </LazySection>

        <LazySection>
          <MemoriesGallery />
        </LazySection>

        <LazySection>
          <Timeline />
        </LazySection>

        <LazySection>
          <FinalScene />
        </LazySection>
      </SmoothScroll>
    </main>
  );
}
