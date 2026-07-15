"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { X, Heart } from "lucide-react";

// --- DATA ---
const MEMORIES = [
  { 
    id: 1, 
    src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800", 
    title: "Golden Hour", 
    caption: "Chasing the final rays of sun, wishing we could freeze time.",
    date: "Dec 03"
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800", 
    title: "Parisian Walks", 
    caption: "Lost in quiet alleys, finding our own way.",
    date: "Jan 21"
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80&w=800", 
    title: "Winter Solstice", 
    caption: "Cold hands, warm hearts, and endless laughter.",
    date: "Feb 18"
  },
];

type Stage = "intro" | "developing" | "viewing" | "collage";

export default function MemoriesGallery() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [developedMemories, setDevelopedMemories] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof MEMORIES[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFlashing, setIsFlashing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // --- MOUSE PARALLAX FOR CAMERA ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (stage === "collage" || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  // --- SHUTTER INTERACTION ---
  const handleShutter = () => {
    if (stage !== "intro" && stage !== "viewing") return;
    
    // 1. Trigger Flash & Camera pushback
    setIsFlashing(true);
    setStage("developing");
    
    setTimeout(() => {
      setIsFlashing(false);
      // 2. Photo starts sliding out and developing
      setTimeout(() => {
        setDevelopedMemories((prev) => [...prev, MEMORIES[currentIndex].id]);
        
        // 3. Finish developing, ready to view
        setTimeout(() => {
          if (currentIndex === MEMORIES.length - 1) {
            setStage("collage");
          } else {
            setStage("viewing");
          }
        }, 2500); // 2.5s chemical develop time
      }, 800); 
    }, 150);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setStage("intro");
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#030303] overflow-hidden py-32"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff2a85]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* --- FLASHBANG EFFECT --- */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* --- CAMERA & SINGLE PHOTO STAGE --- */}
      <AnimatePresence mode="wait">
        {stage !== "collage" && (
          <motion.div 
            key="camera-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center justify-center w-full z-10 perspective-[1000px]"
          >
            
            {/* TEXT: Intro */}
            <AnimatePresence>
              {stage === "intro" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-32 text-center space-y-3"
                >
                  <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
                    Every memory deserves its own <span className="italic text-[#ff2a85] drop-shadow-[0_0_15px_rgba(255,42,133,0.5)]">moment</span>.
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    Click the red shutter to develop a memory
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE CAMERA */}
            <motion.div
              animate={{ 
                rotateY: mousePos.x, 
                rotateX: -mousePos.y,
                scale: isFlashing ? 0.95 : 1,
                y: stage === "developing" ? -40 : 0
              }}
              transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.5 }}
              className="relative z-20 mt-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Camera Body */}
              <div className="w-[280px] h-[200px] md:w-[340px] md:h-[240px] bg-gradient-to-b from-[#f4efe6] to-[#d5cec4] rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.8)] relative border border-[#fff]/20 overflow-hidden flex flex-col items-center">
                
                {/* Rainbow Stripe Detail */}
                <div className="absolute top-0 bottom-0 left-12 w-3 bg-gradient-to-b from-red-400 via-yellow-400 to-blue-400 opacity-80" />
                
                {/* Flash Bulb */}
                <div className="absolute top-6 right-6 w-12 h-8 rounded-md bg-gradient-to-br from-white/40 to-white/5 border border-white/40 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] overflow-hidden">
                   <motion.div 
                     animate={{ opacity: isFlashing ? [0, 1, 0] : 0 }} 
                     transition={{ duration: 0.2 }} 
                     className="absolute inset-0 bg-white" 
                   />
                </div>

                {/* Shutter Button */}
                <button 
                  onClick={handleShutter}
                  disabled={stage !== "intro"}
                  className="absolute -top-3 right-8 w-10 h-6 bg-gradient-to-b from-[#ff2a85] to-[#ba1c5c] rounded-t-lg shadow-[0_-2px_10px_rgba(255,42,133,0.4)] border-t border-white/40 cursor-pointer active:translate-y-2 transition-transform hover:brightness-110 disabled:cursor-not-allowed"
                />

                {/* Main Lens */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#111] to-[#000] rounded-full border-[6px] border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[#333] flex items-center justify-center bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]">
                    {/* Glass Reflection */}
                    <div className="absolute top-2 left-4 w-12 h-6 bg-white/10 rounded-full blur-[2px] rotate-45" />
                    <div className="w-12 h-12 rounded-full bg-[#050505] shadow-[inset_0_0_15px_rgba(0,0,0,1)]" />
                  </div>
                </div>

                {/* Eject Slot */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-b from-black to-[#222] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" />
              </div>

              {/* --- THE DEVELOPING POLAROID --- */}
              <AnimatePresence>
                {(stage === "developing" || stage === "viewing") && (
                  <motion.div
                    initial={{ y: -180, opacity: 0, zIndex: 10 }}
                    animate={{ y: 80, opacity: 1, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.5 }}
                    className="absolute left-1/2 transform -translate-x-1/2 -bottom-20"
                  >
                    <PolaroidCard 
                      memory={MEMORIES[currentIndex]} 
                      isDeveloping={stage === "developing"}
                      onClick={() => setSelectedPhoto(MEMORIES[currentIndex])}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* TEXT: Next Action */}
            <AnimatePresence>
              {stage === "viewing" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-64 z-30"
                >
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest hover:bg-[#ff2a85]/20 hover:border-[#ff2a85]/50 hover:text-[#ff2a85] transition-all duration-300 backdrop-blur-md"
                  >
                    Develop Next Memory
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COLLAGE SCRAPBOOK STAGE --- */}
      <AnimatePresence>
        {stage === "collage" && (
          <motion.div 
            key="collage-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-full max-w-6xl mx-auto flex flex-col items-center z-20"
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative mb-32">
              {MEMORIES.map((memory, idx) => {
                // Generate organic scattered look
                const rotation = idx % 2 === 0 ? (idx * 3) - 6 : (idx * -4) + 5;
                const yOffset = idx % 2 === 0 ? 20 : -20;

                return (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 100, rotate: 0 }}
                    animate={{ opacity: 1, y: yOffset, rotate: rotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 12, delay: idx * 0.2 }}
                  >
                    <PolaroidCard 
                      memory={memory} 
                      isDeveloping={false}
                      onClick={() => setSelectedPhoto(memory)}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Finale Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: MEMORIES.length * 0.3 + 1 }}
              className="text-center space-y-6"
            >
              <h4 className="font-serif text-3xl md:text-5xl text-neutral-300 tracking-tight leading-relaxed">
                Some memories fade... <br/>
                <span className="italic text-white">The best ones stay forever.</span>
              </h4>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <Heart className="w-6 h-6 text-[#ff2a85] fill-[#ff2a85]" style={{ filter: "drop-shadow(0 0 10px rgba(255,42,133,0.8))" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX (Zoomed Photo) --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// --- POLAROID SUB-COMPONENT ---
function PolaroidCard({ 
  memory, 
  isDeveloping,
  onClick 
}: { 
  memory: typeof MEMORIES[0], 
  isDeveloping: boolean,
  onClick: () => void 
}) {
  return (
    <motion.div
      whileHover={!isDeveloping ? { scale: 1.05, rotate: 0, y: -10, zIndex: 50 } : {}}
      onClick={!isDeveloping ? onClick : undefined}
      className={`relative w-[260px] md:w-[300px] p-4 pb-12 bg-[#faf6ee] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-[#eaddca]/40 group ${!isDeveloping ? "cursor-pointer" : ""}`}
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')", // Subtle paper texture
      }}
    >
      <div className="w-full aspect-square bg-[#111] relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        <motion.img
          src={memory.src}
          alt={memory.title}
          animate={{
            // Chemical development simulation
            filter: isDeveloping 
              ? ["brightness(2) grayscale(1) sepia(1) contrast(0.5)", "brightness(1.5) grayscale(0.5) sepia(0.5) contrast(0.8)", "brightness(1) grayscale(0) sepia(0) contrast(1)"]
              : "brightness(1) grayscale(0) sepia(0) contrast(1)",
            opacity: isDeveloping ? [0.1, 0.5, 1] : 1
          }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
        <h4 className="font-serif text-xl text-stone-800 opacity-90 tracking-tight">
          {memory.title}
        </h4>
        <p className="font-serif italic text-xs text-stone-500 mt-1 line-clamp-1">
          {memory.caption}
        </p>
      </div>

      <div className="absolute top-2 right-2 font-mono text-[10px] text-stone-400 opacity-60 uppercase tracking-widest">
        {memory.date}
      </div>
    </motion.div>
  );
}