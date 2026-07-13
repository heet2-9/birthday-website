"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import NameReveal from "@/components/NameReveal";
import LoveLetter from "@/components/LoveLetter";
import MemoriesGallery from "@/components/MemoriesGallery";
import Timeline from "@/components/Timeline";
import BirthdayCake from "../components/BirthdayCake";
import SurpriseBox from "@/components/SurpriseBox";
import FinalScene from "@/components/FinalScene";
import MusicToggle from "@/components/MusicToggle"; 

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative bg-[#030303] min-h-screen selection:bg-accent selection:text-white">
      {/* The background music button stays fixed in the top-right corner after loading */}
      {!isLoading && <MusicToggle />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content" className="relative z-20">
            <Hero />
            <NameReveal />
            <LoveLetter />
            <MemoriesGallery />
            <Timeline />
            
            {/* The decorative birthday cake section plays right here */}
            <BirthdayCake />
            
            <SurpriseBox />
            <FinalScene />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}