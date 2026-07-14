"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero"; 
import NameReveal from "../components/NameReveal";
import LoveLetter from "../components/LoveLetter";
import MemoriesGallery from "../components/MemoriesGallery";
import Timeline from "../components/Timeline";
import BirthdayCake from "../components/BirthdayCake";
import FinalScene from "../components/FinalScene";
import MusicToggle from "../components/MusicToggle";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative bg-[#030303] min-h-screen selection:bg-accent selection:text-white">
      {!isLoading && <MusicToggle />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content" className="relative z-20">
            {/* The Rocket Launch happens right here inside Hero */}
            <Hero />
            
            <NameReveal />
            <LoveLetter />
            <MemoriesGallery />
            <Timeline />
            <BirthdayCake />
            <FinalScene />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}