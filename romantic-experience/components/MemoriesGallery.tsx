"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

const MEMORIES = [
  { 
    id: 1, 
    src: "images/aarya1.jpeg", 
    title: "Golden Sunset", 
    caption: "Chasing the horizon with you, wishing time would stand completely still.",
    date: "Dec 03"
  },
  { 
    id: 2, 
    src: "images/aarya2.jpeg", 
    title: "Quiet Strolls", 
    caption: "Lost in soft conversations, finding our own quiet world together.",
    date: "Jan 21"
  },
  { 
    id: 3, 
    src: "images/aarya3.jpg", 
    title: "Winter Magic", 
    caption: "Cold hands, glowing smiles, and warmth that lasts long after sunset.",
    date: "Feb 18"
  },
];

type Stage = "intro" | "developing" | "viewing" | "collage";

export default function MemoriesGallery() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setDevelopedMemories] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof MEMORIES[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFlashing, setIsFlashing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (stage === "collage" || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  const handleShutter = () => {
    if (stage !== "intro" && stage !== "viewing") return;

    setIsFlashing(true);
    setStage("developing");
    
    setTimeout(() => {
      setIsFlashing(false);
      setTimeout(() => {
        setDevelopedMemories((prev) => [...prev, MEMORIES[currentIndex].id]);
        
        setTimeout(() => {
          if (currentIndex === MEMORIES.length - 1) {
            setStage("collage");
          } else {
            setStage("viewing");
          }
        }, 2500);
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
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#030303] overflow-hidden py-12 sm:py-16 md:py-24 px-3 sm:px-6"
    >
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#ff2a85]/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

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

      <AnimatePresence mode="wait">
        {stage !== "collage" && (
          <motion.div 
            key="camera-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center justify-center w-full max-w-4xl min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] z-10 px-2 sm:px-4 perspective-[1000px]"
          >
            <div className="h-16 sm:h-20 flex flex-col items-center justify-center mb-4 md:mb-8 text-center px-2">
              <AnimatePresence mode="wait">
                {stage === "intro" && (
                  <motion.div
                    key="intro-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-1.5 sm:space-y-3"
                  >
                    <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-white tracking-tight">
                      Capturing moments that become <span className="italic text-[#ff2a85] drop-shadow-[0_0_15px_rgba(255,42,133,0.5)]">eternity</span>.
                    </h2>
                    <p className="font-mono text-[9px] sm:text-xs text-neutral-400 uppercase tracking-widest">
                      Press the red shutter to reveal a precious memory
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex flex-col items-center justify-center w-full my-auto pb-12 sm:pb-24 md:pb-32">
              <motion.div
                animate={{ 
                  rotateY: mousePos.x, 
                  rotateX: -mousePos.y,
                  scale: isFlashing ? 0.95 : 1,
                  y: stage === "developing" ? -30 : 0
                }}
                transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.5 }}
                className="relative z-20"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-[220px] h-[150px] xs:w-[260px] xs:h-[180px] sm:w-[300px] sm:h-[210px] md:w-[340px] md:h-[240px] bg-gradient-to-b from-[#f4efe6] to-[#d5cec4] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative border border-[#fff]/20 overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-2.5 sm:w-3 bg-gradient-to-b from-red-400 via-yellow-400 to-blue-400 opacity-80" />
                  
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 sm:w-12 h-6 sm:h-8 rounded-md bg-gradient-to-br from-white/40 to-white/5 border border-white/40 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] overflow-hidden">
                    <motion.div 
                      animate={{ opacity: isFlashing ? [0, 1, 0] : 0 }} 
                      transition={{ duration: 0.2 }} 
                      className="absolute inset-0 bg-white" 
                    />
                  </div>

                  <button 
                    onClick={handleShutter}
                    disabled={stage !== "intro"}
                    aria-label="Trigger Camera Shutter to Develop Memory"
                    className="absolute -top-3 right-6 sm:right-8 w-8 sm:w-10 h-5 sm:h-6 bg-gradient-to-b from-[#ff2a85] to-[#ba1c5c] rounded-t-lg shadow-[0_-2px_10px_rgba(255,42,133,0.4)] border-t border-white/40 cursor-pointer active:translate-y-2 transition-transform hover:brightness-110 disabled:cursor-not-allowed"
                  />

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-22 h-22 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#111] to-[#000] rounded-full border-[4px] sm:border-[6px] border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-[#333] flex items-center justify-center bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]">
                      <div className="absolute top-1.5 left-3 sm:top-2 sm:left-4 w-8 sm:w-12 h-4 sm:h-6 bg-white/10 rounded-full blur-[2px] rotate-45" />
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#050505] shadow-[inset_0_0_15px_rgba(0,0,0,1)]" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-48 h-1.5 sm:h-2 bg-gradient-to-b from-black to-[#222] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" />
                </div>

                <AnimatePresence>
                  {(stage === "developing" || stage === "viewing") && (
                    <motion.div
                      initial={{ y: -140, opacity: 0, zIndex: 10 }}
                      animate={{ y: 55, opacity: 1, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.5 }}
                      className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 sm:-bottom-20"
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
            </div>

            <div className="h-14 sm:h-16 flex items-center justify-center mt-16 sm:mt-24 md:mt-28 z-30">
              <AnimatePresence>
                {stage === "viewing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      onClick={handleNext}
                      aria-label="Develop Next Memory"
                      className="px-5 py-2 sm:px-8 sm:py-3 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#ff2a85]/20 hover:border-[#ff2a85]/50 hover:text-[#ff2a85] transition-all duration-300 backdrop-blur-md shadow-lg"
                    >
                      Develop Next Memory
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "collage" && (
          <motion.div 
            key="collage-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-full max-w-6xl mx-auto flex flex-col items-center z-20 px-2 sm:px-4"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 relative mb-16 sm:mb-24 md:mb-32">
              {MEMORIES.map((memory, idx) => {
                const rotation = idx % 2 === 0 ? (idx * 3) - 6 : (idx * -4) + 5;
                const yOffset = idx % 2 === 0 ? 10 : -10;

                return (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 80, rotate: 0 }}
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: MEMORIES.length * 0.3 + 1 }}
              className="text-center space-y-4 sm:space-y-6 px-2"
            >
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-neutral-300 tracking-tight leading-relaxed">
                Moments turn into memories... <br/>
                <span className="italic text-white">And memories with you last forever.</span>
              </h3>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2a85] fill-[#ff2a85]" style={{ filter: "drop-shadow(0 0 10px rgba(255,42,133,0.8))" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              aria-label="Close photo preview"
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

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
      className={`relative w-[190px] xs:w-[220px] sm:w-[250px] md:w-[280px] p-2.5 sm:p-4 bg-[#faf6ee] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-[#eaddca]/40 group ${!isDeveloping ? "cursor-pointer" : ""}`}
    >
      <div className="w-full aspect-square bg-[#111] relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] mb-8 sm:mb-14">
        <motion.img
          src={memory.src}
          alt={memory.title}
          animate={{
            filter: isDeveloping 
              ? ["brightness(2) grayscale(1) sepia(1) contrast(0.5)", "brightness(1.5) grayscale(0.5) sepia(0.5) contrast(0.8)", "brightness(1) grayscale(0) sepia(0) contrast(1)"]
              : "brightness(1) grayscale(0) sepia(0) contrast(1)",
            opacity: isDeveloping ? [0.1, 0.5, 1] : 1
          }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 right-2 sm:right-4 flex flex-col items-center text-center">
        <h3 className="font-serif text-sm sm:text-lg font-bold text-stone-800 opacity-90 tracking-tight leading-snug">
          {memory.title}
        </h3>
        <p className="font-serif italic text-[9px] sm:text-xs text-stone-500 mt-0.5 line-clamp-1">
          {memory.caption}
        </p>
      </div>

      <div className="absolute top-1.5 right-2 font-mono text-[8px] sm:text-[10px] text-stone-400 opacity-60 uppercase tracking-widest">
        {memory.date}
      </div>
    </motion.div>
  );
}