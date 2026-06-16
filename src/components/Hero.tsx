"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Magnetic from "./Magnetic";

const ROLES = [
  "Creative Frontend Developer",
  "React Developer",
  "UI Engineer",
  "Machine Learning Enthusiast",
  "AI Explorer",
  "Creative Coder"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const portraitGlowRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // GSAP Entry & Parallax Animations
  useEffect(() => {
    // 1. Text reveal animation on mount
    const chars = nameRef.current?.querySelectorAll(".char");
    if (chars && chars.length > 0) {
      gsap.fromTo(
        chars,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
    );

    gsap.fromTo(
      portraitContainerRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.4 }
    );

    // 2. Mouse Parallax on Right Side Portrait
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const portrait = portraitContainerRef.current;
      const glow = portraitGlowRef.current;
      if (!container || !portrait || !glow) return;

      const { width, height, left, top } = container.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) / (width / 2); // Normalized [-1, 1]
      const y = (e.clientY - (top + height / 2)) / (height / 2);

      gsap.to(portrait, {
        x: x * 20,
        y: y * 20,
        rotationY: x * 8,
        rotationX: -y * 8,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(glow, {
        x: x * -10,
        y: y * -10,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const projSection = document.getElementById("projects");
    if (projSection) {
      projSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameChars = "Muhammed Afnan".split("").map((c, i) => (
    <span key={i} className="char inline-block select-none transform-gpu">
      {c === " " ? "\u00A0" : c}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#050510] overflow-hidden px-6 md:px-16 py-8"
      style={{ perspective: 1000 }}
    >
      {/* Dynamic glow circles behind */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="w-full max-w-7xl flex justify-between items-center z-20 border-b border-white/5 pb-4">
        <div className="text-lg font-bold font-display tracking-[0.2em] text-[#a855f7]">
          AFNAN.DEV
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="https://github.com/afnaanali"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
            data-cursor-text="GIT"
          >
            <Github className="w-4 h-4" /> <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammed-afnan-889560291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            data-cursor-text="IN"
          >
            <Linkedin className="w-4 h-4" /> <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-[#a855f7]/50 rounded-full transition-all text-xs font-semibold tracking-wider hover:bg-[#a855f7]/10"
            data-cursor-text="HIRE"
          >
            CONTACT
          </a>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 my-auto py-12">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left select-text">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs font-semibold tracking-widest mb-6 select-none">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            WAYANAD, KERALA, INDIA
          </div>

          <h3 className="text-white/60 text-lg md:text-xl font-medium tracking-wide mb-3 select-none">
            Hello, I&apos;m
          </h3>
          
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5.2rem] 2xl:text-[5.5rem] font-bold font-display text-white leading-none tracking-tight mb-4 overflow-hidden sm:whitespace-nowrap"
          >
            {nameChars}
          </h1>

          {/* Dynamic rotating text layer */}
          <div ref={subtitleRef} className="h-16 flex items-center mb-8 select-none">
            <span className="text-white/60 text-lg sm:text-2xl md:text-3xl font-medium mr-3">
              I am a
            </span>
            <div className="relative overflow-hidden h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#8b5cf6] to-cyan-400 text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wide font-display whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-10 leading-relaxed font-sans select-none">
            I craft immersive, performance-driven web interfaces blending frontend mastery with real-world Machine Learning and intelligent systems engineering.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={scrollToProjects}
                className="px-6 py-3.5 bg-gradient-to-r from-[#8b5cf6] to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold tracking-wider flex items-center gap-2 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all duration-300"
                data-cursor-text="VIEW"
              >
                View Projects
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a855f7]/40 text-slate-200 hover:text-white rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2"
                data-cursor-text="TALK"
              >
                Let&apos;s Build
                <Mail className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right portrait column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative select-none">
          {/* Animated Glow Halo */}
          <div
            ref={portraitGlowRef}
            className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/35 to-indigo-500/5 blur-[70px] z-0 animate-pulse"
          />

          {/* Floating border grid */}
          <div className="absolute inset-0 border border-white/5 rounded-3xl opacity-20 pointer-events-none" />

          {/* Portrait frame wrapper */}
          <div
            ref={portraitContainerRef}
            className="relative w-80 h-96 sm:w-96 sm:h-[480px] rounded-3xl border border-white/10 overflow-hidden bg-slate-950/40 backdrop-blur-xl flex items-center justify-center transform-gpu shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent z-10" />
            <Image
              src="/muhammed_afnan_final_smile.png"
              alt="Muhammed Afnan Portrait"
              fill
              className="object-cover scale-105"
              priority
              sizes="(max-width: 768px) 320px, 384px"
            />
          </div>
        </div>
      </div>

      {/* Footer hint indicator */}
      <div className="z-10 text-[9px] md:text-xs font-bold tracking-[0.3em] text-white/30 uppercase animate-bounce mt-4 select-none">
        SCROLL DOWN TO DISCOVER
      </div>
    </section>
  );
}
