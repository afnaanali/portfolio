"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Brain, Code, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = textRef.current?.querySelectorAll(".about-word");
    if (!words || words.length === 0) return;

    // Word-by-word reveal (spotlight effect)
    gsap.fromTo(
      words,
      { opacity: 0.15, color: "rgba(255, 255, 255, 0.15)" },
      {
        opacity: 1,
        color: "#ffffff",
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );

    // Parallax on stats grid
    const stats = containerRef.current?.querySelectorAll(".stat-card");
    if (stats && stats.length > 0) {
      gsap.fromTo(
        stats,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const paragraph = 
    "I am a passionate software developer and AI/ML engineer dedicated to constructing intelligent algorithms and premium, responsive web interfaces. My focus is on merging frontend motion design with backend data systems. By combining frameworks like Next.js with advanced animation engines like GSAP and machine learning pipelines, I build interactive applications that don't just work, but tell a story.";

  const aboutWords = paragraph.split(" ").map((word, i) => (
    <span key={i} className="about-word inline-block mr-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transform-gpu">
      {word}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background soft glow orbs */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col gap-16 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#a855f7] uppercase">
            WHO I AM & WHAT DRIVES ME
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            Creativity Is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-cyan-400">
              My Passion
            </span>
          </h2>
        </div>

        {/* Narrative & Stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Scroll-reveal Paragraph */}
          <div ref={textRef} className="lg:col-span-7 flex flex-wrap leading-relaxed select-text text-left">
            {aboutWords}
          </div>

          {/* Frosted glass statistics cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full select-none">
            
            {/* Stat 1: AI & ML */}
            <div className="stat-card glass-card p-6 rounded-2xl flex flex-col justify-between h-44 transition-all duration-300">
              <div className="flex justify-between items-start">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-[10px] tracking-widest font-mono text-white/40">CORE</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-1">AI Intern</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Developed machine learning workflows at PaceLab.
                </p>
              </div>
            </div>

            {/* Stat 2: Projects completed */}
            <div className="stat-card glass-card p-6 rounded-2xl flex flex-col justify-between h-44 transition-all duration-300">
              <div className="flex justify-between items-start">
                <Code className="w-6 h-6 text-cyan-400" />
                <span className="text-[10px] tracking-widest font-mono text-white/40">EXPERTISE</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-1">Full-Stack</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Expertise in React, Node, and Database schemas.
                </p>
              </div>
            </div>

            {/* Stat 3: Engineering studies */}
            <div className="stat-card glass-card p-6 rounded-2xl flex flex-col justify-between h-44 transition-all duration-300">
              <div className="flex justify-between items-start">
                <Cpu className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] tracking-widest font-mono text-white/40">STUDIES</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-1">B.Tech CSE</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Pursuing Computer Science at Christ College.
                </p>
              </div>
            </div>

            {/* Stat 4: Achievements */}
            <div className="stat-card glass-card p-6 rounded-2xl flex flex-col justify-between h-44 transition-all duration-300">
              <div className="flex justify-between items-start">
                <Award className="w-6 h-6 text-[#a855f7]" />
                <span className="text-[10px] tracking-widest font-mono text-white/40">RESULTS</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-1">High Accuracy</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Created and optimized high-performance predictive models.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
