"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

import MedicalSystemShowcase from "./MedicalSystemShowcase";

interface Project {
  num: string;
  title: string;
  role: string;
  category?: string;
  tech: string[];
  description: string;
  theme: string; // Tailwind gradient classes
  github: string;
  demo: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Medical Assistance System",
    role: "App Developer",
    category: "Team Mini Project",
    tech: ["Flutter", "Firebase", "Node.js", "MongoDB", "REST APIs", "AI/ML"],
    description: "A web-based healthcare platform that simplifies disease prediction, patient telemetry storage, real-time alerts, and online consultations into a unified, proactive healthcare management system.",
    theme: "from-cyan-600/40 via-[#8b5cf6]/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "02",
    title: "Teachers Connect",
    role: "Full Stack Developer",
    category: "Full Stack",
    tech: ["React.js", "Node.js", "MongoDB", "Express", "REST APIs"],
    description: "A full-stack learning bridge connecting rural students with urban educators. Features role-based auth, real-time channels, and optimized database queries.",
    theme: "from-[#06b6d4]/40 via-[#3b82f6]/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "03",
    title: "Waste Segregator",
    role: "ML Developer",
    category: "Machine Learning",
    tech: ["Python", "Machine Learning", "Data Processing", "Scikit-Learn"],
    description: "An automated classifier segregating dry and wet waste using supervised learning, feature extraction pipelines, and hardware integration maps.",
    theme: "from-amber-500/30 via-orange-600/10 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "04",
    title: "Eco Alert System",
    role: "AI Developer",
    category: "AI / Data Sci",
    tech: ["Python", "API Pipelines", "Data Vis", "Predictive Analytics"],
    description: "An intelligent analyzer integrating atmospheric data to compute dynamic risk scores, issuing predictive alerts with maps.",
    theme: "from-blue-600/30 via-teal-500/10 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "05",
    title: "Fraud Detection",
    role: "Data Scientist",
    category: "Data Science",
    tech: ["Python", "Random Forest", "Resampling", "Feature Engineering"],
    description: "A financial classification system optimizing Random Forest models. Handles imbalanced fraud transactions with advanced resampling filters.",
    theme: "from-rose-600/30 via-pink-600/10 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "06",
    title: "Core AI Dashboard",
    role: "AI Engineer",
    category: "AI Engineering",
    tech: ["Next.js", "Tailwind CSS", "Chart.js", "PyTorch Web"],
    description: "A futuristic real-time telemetry center displaying predictive models, node latency checks, and neural layer distributions.",
    theme: "from-purple-600/40 via-[#8b5cf6]/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "07",
    title: "Cinematic Portfolio",
    role: "UI Engineer",
    category: "UI Design",
    tech: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis"],
    description: "Interactive movie portfolio featuring custom cursors, smooth scroll loops, 3D mouse card tilts, and horizontal pinning.",
    theme: "from-fuchsia-600/40 via-violet-600/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "08",
    title: "Customer Support System",
    role: "ML Intern",
    category: "Machine Learning",
    tech: ["Python", "NLP", "Transformers", "LLMs", "Streamlit"],
    description: "Built an intelligent customer support solution focusing on automating customer interactions and improving response efficiency using deep NLP.",
    theme: "from-cyan-600/40 via-blue-500/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "09",
    title: "Sales Forecasting System",
    role: "ML Intern",
    category: "Machine Learning",
    tech: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Timeseries"],
    description: "Developed predictive models forecasting future sales trends using XGBoost and ensemble architectures to assist data-driven business plans.",
    theme: "from-emerald-600/40 via-teal-500/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
  {
    num: "10",
    title: "Resume Candidate Screening",
    role: "ML Intern",
    category: "Machine Learning",
    tech: ["Python", "NLTK", "SpaCy", "TF-IDF", "Cos-Similarity"],
    description: "Created an AI-assisted resume screening solution automating candidate evaluation and shortlisting processes using vector similarity metrics.",
    theme: "from-purple-600/40 via-pink-500/20 to-[#050510]",
    github: "https://github.com/afnaanali",
    demo: "#contact",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const calculateScrollWidth = () => {
      return track.scrollWidth - window.innerWidth;
    };

    // Pinned Horizontal Scrolling Timeline
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      pin: true,
      scrub: 0.8,
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      invalidateOnRefresh: true,
      animation: gsap.to(track, {
        x: () => -calculateScrollWidth(),
        ease: "none",
      }),
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="projects"
      className="relative h-screen w-full bg-[#050510] overflow-hidden border-t border-white/5"
    >
      {/* Absolute Titles */}
      <div className="absolute top-12 left-6 md:left-16 z-20 flex flex-col gap-2 select-none pointer-events-none">
        <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#a855f7] uppercase">
          PROJECT LOGS & SHOWCASE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase leading-none">
          Selected Works
        </h2>
      </div>

      {/* Horizontal scrolling track wrapper */}
      <div className="h-full flex items-center">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-16 items-center w-fit h-[65vh] select-none"
        >
          {PROJECTS.map((project) => {
            const isMedical = project.num === "01";
            return (
              <div
                key={project.num}
                className={`${
                  isMedical
                    ? "w-[90vw] sm:w-[600px] md:w-[850px]"
                    : "w-[85vw] sm:w-[500px] md:w-[600px]"
                } h-full shrink-0 relative glass-card rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between p-8 sm:p-10 select-none group transform-gpu`}
                data-cursor-text="VIEW"
              >
                {/* Radial backdrop light matching the project theme */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.theme} opacity-30 z-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-45`}
                />
                
                {/* Mesh background grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] z-0 opacity-40 group-hover:scale-105 transition-transform duration-500" />

                {isMedical ? (
                  /* Special Split Layout for Medical Assistance System */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full w-full z-10 items-stretch">
                    {/* Left Column: Details */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full text-left">
                      {/* Top Meta info */}
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-4xl sm:text-5xl font-black font-display text-white/10 group-hover:text-cyan-500/25 transition-colors duration-300 leading-none">
                            {project.num}
                          </span>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wider rounded-full uppercase">
                              {project.role}
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono font-extrabold tracking-wider rounded-full uppercase">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="mt-6 md:mt-8">
                          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Info: Tech Tags & Actions */}
                      <div>
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map((tc) => (
                            <span
                              key={tc}
                              className="px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] font-semibold tracking-wider font-mono text-cyan-400 rounded"
                            >
                              {tc}
                            </span>
                          ))}
                        </div>

                        <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Magnetic>
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 rounded-xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
                                data-cursor-text="CODE"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            </Magnetic>
                            <Magnetic>
                              <a
                                href={project.demo}
                                className="p-2.5 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 rounded-xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
                                data-cursor-text="LIVE"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Magnetic>
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white/45 group-hover:text-white transition-colors duration-300">
                            EXPLORE DETAILS
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Interactive Simulator */}
                    <div className="md:col-span-7 h-full flex flex-col justify-center bg-slate-950/45 border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden">
                      <MedicalSystemShowcase />
                    </div>
                  </div>
                ) : (
                  /* Standard Card Layout for other projects */
                  <>
                    {/* Top Row: Num & Role & Category */}
                    <div className="flex justify-between items-start z-10 w-full">
                      <span className="text-4xl sm:text-5xl font-black font-display text-white/10 group-hover:text-purple-500/25 transition-colors duration-300 leading-none">
                        {project.num}
                      </span>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wider rounded-full uppercase">
                          {project.role}
                        </span>
                        {project.category && (
                          <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[#a855f7] text-[9px] font-mono font-extrabold tracking-wider rounded-full uppercase">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="z-10 mt-12 flex-grow text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 group-hover:text-[#a855f7] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-xl">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {project.tech.map((tc) => (
                          <span
                            key={tc}
                            className="px-2.5 py-1 bg-white/5 border border-white/5 text-[10px] font-semibold tracking-wider font-mono text-cyan-400 rounded"
                          >
                            {tc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: CTAs */}
                    <div className="z-10 flex items-center justify-between mt-12 pt-6 border-t border-white/5 select-none">
                      <div className="flex items-center gap-4">
                        <Magnetic>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 rounded-2xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
                            data-cursor-text="CODE"
                          >
                            <Github className="w-4.5 h-4.5" />
                          </a>
                        </Magnetic>
                        <Magnetic>
                          <a
                            href={project.demo}
                            className="p-3 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 rounded-2xl transition-all text-slate-200 hover:text-white flex items-center justify-center"
                            data-cursor-text="LIVE"
                          >
                            <ExternalLink className="w-4.5 h-4.5" />
                          </a>
                        </Magnetic>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/45 group-hover:text-white transition-colors duration-300">
                        EXPLORE DETAILS
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* End spacer element */}
          <div className="w-[10vw] h-full shrink-0" />
        </div>
      </div>
    </div>
  );
}
