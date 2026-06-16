"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // percentage
  category: "frontend" | "aiml" | "languages" | "tools" | "ml";
}

const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "GSAP / Motion", level: 85, category: "frontend" },
  { name: "HTML5 & CSS3", level: 95, category: "frontend" },
  
  // AI & ML
  { name: "Machine Learning", level: 88, category: "aiml" },
  { name: "Data Analysis", level: 85, category: "aiml" },
  { name: "Predictive Models", level: 82, category: "aiml" },
  { name: "Deep Learning", level: 75, category: "aiml" },
  
  // Machine Learning Skills (New)
  { name: "Python", level: 90, category: "ml" },
  { name: "Pandas", level: 88, category: "ml" },
  { name: "NumPy", level: 85, category: "ml" },
  { name: "Scikit-Learn", level: 88, category: "ml" },
  { name: "Data Analysis", level: 90, category: "ml" },
  { name: "Machine Learning Fundamentals", level: 92, category: "ml" },
  
  // Languages & DB
  { name: "TypeScript / JS", level: 88, category: "languages" },
  { name: "C Programming", level: 80, category: "languages" },
  { name: "SQL & MongoDB", level: 85, category: "languages" },
  
  // Tools
  { name: "Git & GitHub", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Figma", level: 78, category: "tools" },
  { name: "REST APIs", level: 88, category: "tools" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[30vw] h-[30vw] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col gap-16 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#a855f7] uppercase">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            Skills & Abilities
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
          
          {/* Frontend Category */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-xl">
            <h3 className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase tracking-wider">
              Frontend & UI Design
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === "frontend").map((sk) => (
                <SkillRingCard key={sk.name} skill={sk} />
              ))}
            </div>
          </div>

          {/* AI / ML Category */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-xl">
            <h3 className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 uppercase tracking-wider">
              AI / ML & Data Science
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === "aiml").map((sk) => (
                <SkillRingCard key={sk.name} skill={sk} />
              ))}
            </div>
          </div>

          {/* Languages Category */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-xl">
            <h3 className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 uppercase tracking-wider">
              Languages & Database
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === "languages").map((sk) => (
                <SkillRingCard key={sk.name} skill={sk} />
              ))}
            </div>
          </div>

          {/* Machine Learning Skills (New) */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-xl lg:col-span-2">
            <h3 className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 uppercase tracking-wider">
              Machine Learning Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.filter(s => s.category === "ml").map((sk) => (
                <SkillRingCard key={sk.name} skill={sk} />
              ))}
            </div>
          </div>

          {/* Tools & Core Category */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-xl">
            <h3 className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase tracking-wider">
              Tools & Environment
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === "tools").map((sk) => (
                <SkillRingCard key={sk.name} skill={sk} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function SkillRingCard({ skill }: { skill: Skill }) {
  const ringRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Circumference of a circle with r=36 is 2 * Math.PI * 36 = 226.2
  const strokeCircumference = 226.2;

  useEffect(() => {
    const ring = ringRef.current;
    const textSpan = textRef.current;
    if (!ring || !textSpan) return;

    // Reset circle dashoffset to full circumference (hidden)
    gsap.set(ring, { strokeDashoffset: strokeCircumference });

    // SVG drawing anim
    gsap.to(ring, {
      strokeDashoffset: strokeCircumference * (1 - skill.level / 100),
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ring,
        start: "top 90%",
      },
    });

    // Text count-up anim
    const counter = { val: 0 };
    gsap.to(counter, {
      val: skill.level,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textSpan,
        start: "top 90%",
      },
      onUpdate: () => {
        if (textSpan) {
          textSpan.innerText = Math.floor(counter.val).toString();
        }
      },
    });
  }, [skill.level, strokeCircumference]);

  return (
    <div className="glass-card flex items-center gap-4 p-4 rounded-2xl select-none group border border-white/5 hover:border-white/10 transition-colors">
      
      {/* Circular Progress Gauge */}
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track Circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-white/5 fill-transparent"
            strokeWidth="3.5"
          />
          {/* Animated Glow Circle */}
          <circle
            ref={ringRef}
            cx="32"
            cy="32"
            r="28"
            className="stroke-purple-500 fill-transparent group-hover:stroke-cyan-400 transition-colors duration-300"
            strokeWidth="3.5"
            strokeDasharray={strokeCircumference}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-xs font-mono font-bold text-white flex items-center">
          <span ref={textRef}>0</span>%
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-[9px] tracking-wider text-slate-500 font-bold uppercase mt-0.5">
          PRO LEVEL
        </span>
      </div>

    </div>
  );
}
