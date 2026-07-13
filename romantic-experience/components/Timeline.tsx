"use client";

import { motion } from "framer-motion";

const TIMELINE_DATA = [
  { era: "Chapter I", title: "The Cosmic Alignment", desc: "Two timelines intersected unexpectedly in a perfect paradox." },
  { era: "Chapter II", title: "The Synchronicity", desc: "Hours of architectural dialogue felt effortlessly natural." },
  { era: "Chapter III", title: "The Constant", desc: "Through every dynamic, the center of gravity held secure." },
];

export default function Timeline() {
  return (
    <section className="min-h-screen w-full py-32 max-w-5xl mx-auto px-4 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-neutral-800 top-0 hidden md:block" />

      <div className="space-y-24 relative">
        {TIMELINE_DATA.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2 flex justify-center px-4">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full glass-panel p-8 rounded-2xl relative"
                >
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">{item.era}</span>
                  <h4 className="font-serif text-xl text-white mt-2 mb-3">{item.title}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent absolute left-1/2 transform -translate-x-1/2 hidden md:block box-glow" />
            </div>
          );
        })}
      </div>
    </section>
  );
}