"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Magnetic from "./Magnetic";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatarChar: string;
  avatarGlow: string; // Gradient class
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. R. K. Nair",
    role: "Head of CSE Department",
    company: "Christ College of Engineering",
    rating: 5,
    text: "Afnan shows an extraordinary capacity to bridge complex computer science theory with high-end, practical web interfaces. His project Teachers Connect is a brilliant demonstration of full-stack engineering, secure authentication, and real-time database queries.",
    avatarChar: "RN",
    avatarGlow: "from-purple-500 to-indigo-500",
  },
  {
    id: "test-2",
    name: "Dr. PaceLab Mentor",
    role: "Senior AI Architect",
    company: "PaceLab, India",
    rating: 5,
    text: "During his AI Developer internship, Muhammed Afnan proved to be an exceptional software builder. He designed data preprocessing pipelines and machine learning classifiers with high efficiency, showing a strong grasp of Python algorithms.",
    avatarChar: "PL",
    avatarGlow: "from-cyan-400 to-blue-500",
  },
  {
    id: "test-3",
    name: "Hackathon Organizer",
    role: "Lead Tech Evaluator",
    company: "Computron India",
    rating: 5,
    text: "Muhammed Afnan's rapid problem solving, clean architecture approach, and eye for premium visual interfaces stood out in our hackathons. He possesses a rare capability of linking backend AI nodes with fully interactive, smooth frontend layouts.",
    avatarChar: "HC",
    avatarGlow: "from-pink-500 to-rose-500",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
    }),
  };

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative min-h-[80vh] w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#8b5cf6]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-cyan-600/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center gap-16 z-10 text-center">
        
        {/* Title */}
        <div className="flex flex-col items-center gap-4 select-none">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#a855f7] uppercase">
            ENDORSEMENTS & FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            Testimonials
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full min-h-[360px] md:min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="glass-card w-full p-8 sm:p-12 rounded-3xl relative flex flex-col gap-6 items-center select-text"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 pointer-events-none" />

              {/* Star Ratings */}
              <div className="flex gap-1.5 justify-center items-center select-none">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-[#a855f7] stroke-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                ))}
              </div>

              {/* Message text */}
              <p className="text-sm sm:text-base md:text-lg text-slate-300 italic leading-relaxed max-w-2xl select-text">
                &ldquo;{current.text}&rdquo;
              </p>

              {/* Profile details */}
              <div className="flex items-center gap-4 mt-4 select-none">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.avatarGlow} flex items-center justify-center font-display text-sm font-bold text-white shadow-lg shadow-purple-500/10`}>
                  {current.avatarChar}
                </div>
                <div className="text-left">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {current.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-semibold text-cyan-400">
                    {current.role} &bull; <span className="text-slate-500">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 z-10 select-none">
          <Magnetic>
            <button
              onClick={handlePrev}
              className="p-3.5 bg-white/5 border border-white/10 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/10 rounded-2xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
              data-cursor-text="PREV"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Magnetic>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(idx > index ? 1 : -1);
                  setIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === index ? "w-6 bg-[#a855f7]" : "w-2.5 bg-white/10"
                }`}
              />
            ))}
          </div>

          <Magnetic>
            <button
              onClick={handleNext}
              className="p-3.5 bg-white/5 border border-white/10 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/10 rounded-2xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
              data-cursor-text="NEXT"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}
