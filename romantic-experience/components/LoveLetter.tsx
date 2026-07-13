"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetter() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 relative py-20">
      <div className="absolute w-[600px] h-[300px] top-1/4 rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-6 right-6 text-accent/30 animate-pulse-slow">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-6 text-neutral-300 font-sans leading-relaxed text-base md:text-lg">
          <p className="font-serif text-white text-xl md:text-2xl mb-8">Dearest,</p>
          <p>
            Hey Aarya,

Happy Birthday! 🎉

I just wanted to make something a little different this year—something you could keep and look back on whenever you wanted.

Thank you for being such an amazing friend. Whether It&apos;s the random conversations, the endless laughs, or the little moments that somehow become unforgettable memories, I&apos;m lucky to have a friend like you.

I hope this year brings you everything you&apos;re wishing for—lots of happiness, good health, exciting opportunities, and countless reasons to smile.

Never stop being the kind, funny, and wonderful person you are.

Have the happiest birthday ever, and enjoy every single moment of your day.

Once again...

Happy Birthday, Aarya! 🎂✨
          </p>
          
          <p className="pt-8 text-right font-serif text-white italic">— Yours completely</p>
        </div>
      </motion.div>
    </section>
  );
}