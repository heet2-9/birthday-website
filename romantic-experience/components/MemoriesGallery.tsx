"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const MEMORIES = [
  { id: 1, src: "/images/aarya1.jpeg", title: "The First Smile" },
  { id: 2, src: "/images/aarya2.jpeg", title: "Best Memories" },
  { id: 3, src: "/images/aarya3.jpeg", title: "Fun Times" },
  { id: 4, src: "/images/aarya4.jpeg", title: "Birthday Moments" },
];

export default function MemoriesGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="min-h-screen w-full px-4 max-w-7xl mx-auto py-32 flex flex-col justify-center">
      <h3 className="font-serif text-4xl md:text-6xl text-center mb-16 tracking-tight">
        Visual <span className="italic text-accent">Frames</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MEMORIES.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedImg(item.src)}
            className="relative h-[400px] rounded-2xl overflow-hidden glass-panel cursor-pointer group"
          >
            {/* Optimized Img implementation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-white">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}