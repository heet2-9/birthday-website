"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function NameReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    // Split text mapping animation dynamically
    const chars = textRef.current.querySelectorAll(".char");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1,
      }
    });

    tl.fromTo(chars, 
      { opacity: 0.1, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.05, ease: "power3.out" }
    );

    // Camera Zoom Simulation on the entire section
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
      scale: 1.05,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Your custom cinematic transition text! 
  const displayString = "WISHES FOR YOU";

  // Generate randomized data for the twinkling stardust background
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1, // Random size between 1px and 3px
    delay: Math.random() * 3,    // Random start delay
    duration: Math.random() * 3 + 2, // Random twinkle speed
  }));

  return (
    <div ref={sectionRef} className="relative h-screen w-full flex items-center justify-center bg-[#030303] overflow-hidden">
      
      {/* 1. Cinematic Nebula Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#ff2a85]/30 to-transparent blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: [0, -45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-amber-500/10 via-[#ff2a85]/20 to-transparent blur-[140px] pointer-events-none"
      />

      {/* 2. Twinkling Stardust Field */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>
      
      {/* 3. The Text Reveal (Sits above the background) */}
      <h2 ref={textRef} className="font-serif text-[8vw] md:text-[6vw] tracking-[0.2em] text-glow font-bold text-white z-20 flex select-none flex-wrap justify-center px-4 text-center">
        {displayString.split("").map((char, index) => (
          <span key={index} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </div>
  );
}