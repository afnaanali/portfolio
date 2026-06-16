"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Cpu, Layout, Maximize2, Monitor, Sparkles } from "lucide-react";

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: "frontend",
    num: "01",
    title: "Frontend Development",
    description: "Crafting fully-typed Next.js & React single-page systems with high responsiveness and modular components.",
    icon: <Layout className="w-8 h-8 text-purple-400" />,
  },
  {
    id: "uiux",
    num: "02",
    title: "UI/UX Implementation",
    description: "Translating pixel-perfect designs from Figma to production code with a strong emphasis on accessibility.",
    icon: <Monitor className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: "motion",
    num: "03",
    title: "Motion Interfaces",
    description: "Designing cinematic user flows and scroll mechanics using GSAP ScrollTrigger, Framer Motion, and Lenis.",
    icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
  },
  {
    id: "aiml",
    num: "04",
    title: "AI & ML Integration",
    description: "Embedding smart predictive pipelines, data analyzers, and classification layers into web interfaces.",
    icon: <Cpu className="w-8 h-8 text-pink-400" />,
  },
  {
    id: "perf",
    num: "05",
    title: "Performance Optimization",
    description: "Achieving perfect Lighthouse scores, optimizing assets, minimizing layout shifts, and implementing lazy assets.",
    icon: <Maximize2 className="w-8 h-8 text-blue-400" />,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[35vw] h-[35vw] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col gap-16 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-cyan-400 uppercase">
            SPECIALIZATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            What I Offer
          </h2>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full select-none">
          {SERVICES.map((srv) => (
            <ServiceCard key={srv.id} srv={srv} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ srv }: { srv: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation angles [-1, 1] based on center offset
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    gsap.to(card, {
      rotateX: -dy * 8, // max rotation 8 degrees
      rotateY: dx * 8,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(glow, {
      x: x - 120, // offset half the glow width (240px / 2 = 120)
      y: y - 120,
      opacity: 1,
      duration: 0.1,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(glow, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card relative flex flex-col justify-between p-8 rounded-3xl h-80 overflow-hidden transform-gpu select-none transition-all duration-300 hover:-translate-y-2 group"
      data-cursor-text="EXPAND"
    >
      {/* 3D tilt mouseglow element */}
      <div
        ref={glowRef}
        className="absolute w-60 h-60 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-400/20 blur-[45px] pointer-events-none opacity-0"
        style={{ left: 0, top: 0, transform: "translate3d(0, 0, 0)" }}
      />

      {/* Card Top Block */}
      <div className="flex justify-between items-start z-10">
        <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl group-hover:border-[#a855f7]/40 transition-colors duration-300">
          {srv.icon}
        </div>
        <span className="text-xl font-bold font-mono text-white/25 group-hover:text-[#a855f7] transition-colors duration-300">
          {srv.num}
        </span>
      </div>

      {/* Card Content Block */}
      <div className="z-10 mt-6">
        <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {srv.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {srv.description}
        </p>
      </div>
    </div>
  );
}
