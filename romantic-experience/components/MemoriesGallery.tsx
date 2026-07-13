"use client";

import { motion } from "framer-motion";

const MEMORIES = [
  { 
    id: 1, 
    src: "/images/aarya1.jpeg", 
    title: "Midnight Echoes", 
    caption: "The world went completely silent, leaving just the sound of your laughter echoing through the dark.",
    date: "November 14"
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800", 
    title: "Golden Hour Escape", 
    caption: "Chasing the final rays of sun across the horizon, wishing we could freeze time right there.",
    date: "December 03"
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800", 
    title: "Parisian Walks", 
    caption: "Lost in quiet alleys, discovering that every path somehow leads back to you.",
    date: "January 21"
  },
  { 
    id: 4, 
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80&w=800", 
    title: "Winter Solstice", 
    caption: "Cold hands, warm hearts, and a promise that outlasts the longest night of the year.",
    date: "February 18"
  },
];

export default function MemoriesGallery() {
  return (
    <section className="min-h-screen w-full py-40 relative overflow-hidden bg-[#030303]">
      {/* Cinematic ambient background lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-muted/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Title Section */}
      <div className="text-center max-w-xl mx-auto mb-32 px-4 space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent-light"
        >
          Our Private Journal
        </motion.span>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-white tracking-tight"
        >
          The <span className="italic text-accent-light text-glow">Scrapbook</span> of Us
        </motion.h3>
      </div>

      {/* Main Vertical Album Core */}
      <div className="max-w-5xl mx-auto px-4 space-y-48 relative z-20">
        {MEMORIES.map((memory, index) => {
          const isEven = index % 2 === 0;
          // Alternate rotation styles for the organic vintage scrapbook look
          const initialRotation = isEven ? -4 : 4;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-center justify-between gap-12 w-full ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Container with Custom Polaroid / Tape Effects */}
              <div className="w-full md:w-1/2 flex justify-center relative">
                <motion.div
                  initial={{ rotate: initialRotation }}
                  whileInView={{ rotate: initialRotation * 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className="relative p-4 pb-12 bg-[#faf6ee] shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-sm border border-[#eaddca]/30 max-w-[360px] group transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(255,42,133,0.15)]"
                >
                  {/* Translucent Washi Tape Effect */}
                  <div 
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-white/10 backdrop-blur-[2px] border border-white/5 shadow-sm rotate-[-2deg] z-30"
                    style={{
                      clipPath: "polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 98% 85%, 100% 100%, 0% 100%, 2% 85%)"
                    }}
                  />

                  {/* Pressed Gold Star Accent */}
                  <div className="absolute top-2 right-2 text-amber-400/40 font-serif text-sm pointer-events-none select-none">
                    ✦
                  </div>

                  {/* Main Polaroid Photo Area */}
                  <div className="overflow-hidden bg-[#111] rounded-xs aspect-[4/5] relative">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={memory.src}
                      alt={memory.title}
                      className="w-full h-full object-cover opacity-90 contrast-[1.05] brightness-[0.95] filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Handwritten Date Element */}
                  {memory.date && (
                    <div className="absolute bottom-3 right-4 font-serif italic text-xs text-stone-500/80 tracking-wider">
                      {memory.date}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Album Typography Content Block */}
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left px-6">
                {/* Floating Decorative Ornament */}
                <div className="text-accent/20 font-serif text-xl select-none pointer-events-none mb-1">
                  ❀
                </div>
                
                <h4 className="font-serif text-3xl md:text-4xl text-[#faf6ee] tracking-tight text-glow font-semibold">
                  {memory.title}
                </h4>
                
                <p className="font-serif italic text-neutral-400 text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed font-light">
                  &ldquo;{memory.caption}&rdquo;
                </p>

                {/* Subtle Gold Line Divider */}
                <div className="pt-2 flex justify-center md:justify-start">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-amber-500/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- FINAL CINEMATIC PAGE CLOSURE --- */}
      <div className="mt-60 max-w-xl mx-auto text-center px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="p-12 glass-panel rounded-3xl space-y-6 relative border border-white/5 overflow-hidden"
        >
          {/* Subtle warm paper underlay look inside the glass layer */}
          <div className="absolute inset-0 bg-[#faf6ee]/[0.02] pointer-events-none" />

          <p className="font-serif text-2xl md:text-3xl text-white leading-snug tracking-wide">
            And this is only the beginning of our story.
          </p>

          {/* Heart Pulse Animation Effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
              filter: ["drop-shadow(0 0 8px rgba(255,42,133,0.5))", "drop-shadow(0 0 20px rgba(255,42,133,0.8))", "drop-shadow(0 0 8px rgba(255,42,133,0.5))"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
            className="text-accent text-3xl select-none pt-2"
          >
            ❤️
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}