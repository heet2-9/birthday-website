"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    // Camera Zoom Simulation on Background Layer
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

  // The new cinematic transition text! (You can change this to anything you like)
  const displayString = "ONLY FOR YOU";

  return (
    <div ref={sectionRef} className="relative h-screen w-full flex items-center justify-center bg-[#030303] overflow-hidden">
      {/* Subtle background matrix/particle effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff2a85_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
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