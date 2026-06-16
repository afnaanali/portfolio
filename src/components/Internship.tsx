"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, TrendingUp, FileSpreadsheet, Bot, BrainCircuit, Calendar, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface TaskItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  bullets: string[];
  color: string;
  icon: React.ReactNode;
}

export default function Internship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // States for Task 1: Chatbot Mockup
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "user", text: "How can I track my shipment?" },
  ]);

  // States for Task 2: Counter
  const [salesGrowth, setSalesGrowth] = useState(0);

  // States for Task 3: Scanning
  const [scanStatus, setScanStatus] = useState("Idle");

  useEffect(() => {
    // GSAP ScrollTrigger for heading reveal
    const titleElements = containerRef.current?.querySelectorAll(".reveal-text");
    if (titleElements && titleElements.length > 0) {
      gsap.fromTo(
        titleElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // GSAP ScrollTrigger for vertical connector line
    const line = lineRef.current;
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );
    }

    // GSAP ScrollTrigger for task cards stagger entry
    const cards = cardsRef.current?.querySelectorAll(".internship-card");
    if (cards && cards.length > 0) {
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { x: idx % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }

    // Animate sales counter (Task 2) when scrolled in
    let counterObj = { val: 0 };
    ScrollTrigger.create({
      trigger: "#task-card-02",
      start: "top 80%",
      onEnter: () => {
        gsap.to(counterObj, {
          val: 94.2,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            setSalesGrowth(Number(counterObj.val.toFixed(1)));
          },
        });
      },
    });

    // Simulating Chat Messages for Task 1
    const chatInterval = setInterval(() => {
      setChatMessages((prev) => {
        if (prev.length === 1) {
          return [
            ...prev,
            { sender: "bot", text: "Analyzing query... Package is currently at Transit Hub A." },
          ];
        } else if (prev.length === 2) {
          return [
            ...prev,
            { sender: "user", text: "Awesome! What is the ETA?" },
          ];
        } else if (prev.length === 3) {
          return [
            ...prev,
            { sender: "bot", text: "ETA is tomorrow by 4:00 PM. Have a great day!" },
          ];
        } else {
          return [{ sender: "user", text: "How can I track my shipment?" }];
        }
      });
    }, 4500);

    // Simulating resume scanning for Task 3
    const scanStages = ["Idle", "Scanning...", "Analyzing keywords...", "Match found! (92%)"];
    let stageIndex = 0;
    const scanInterval = setInterval(() => {
      stageIndex = (stageIndex + 1) % scanStages.length;
      setScanStatus(scanStages[stageIndex]);
    }, 3000);

    return () => {
      clearInterval(chatInterval);
      clearInterval(scanInterval);
    };
  }, []);

  const TASKS: TaskItem[] = [
    {
      id: "task-card-01",
      num: "01",
      title: "Customer Support System",
      desc: "Built an intelligent customer support solution focused on automating customer interactions and improving response efficiency.",
      bullets: [
        "Constructed deep Natural Language Processing models to parse user intent.",
        "Integrated dynamic context-retrieval hooks for rapid and logical issue resolution.",
        "Automated repetitive support loops to reduce human operator overhead."
      ],
      color: "from-purple-500/20 via-indigo-500/5 to-transparent",
      icon: <MessageSquare className="w-5 h-5 text-purple-400" />,
    },
    {
      id: "task-card-02",
      num: "02",
      title: "Sales Forecasting System",
      desc: "Developed predictive models to forecast future sales trends using machine learning techniques to assist data-driven decision-making.",
      bullets: [
        "Processed historical timeseries sales datasets with statistical feature pipelines.",
        "Created optimized ensemble models (XGBoost, Random Forests) to map seasonal spikes.",
        "Achieved high forecast accuracy, helping stakeholders streamline supply logistics."
      ],
      color: "from-cyan-500/20 via-blue-500/5 to-transparent",
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: "task-card-03",
      num: "03",
      title: "Resume Candidate Screening System",
      desc: "Created an AI-assisted resume screening solution automating candidate evaluation and shortlisting processes.",
      bullets: [
        "Implemented TF-IDF and NLP keyword extractors to screen and parse resumes.",
        "Calculated vector similarity scores between resume details and target job descriptions.",
        "Created sorting mechanisms to shortlist ideal resumes, accelerating recruitment."
      ],
      color: "from-pink-500/20 via-purple-500/5 to-transparent",
      icon: <FileSpreadsheet className="w-5 h-5 text-pink-400" />,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="internship"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-[40vw] h-[40vw] rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[35vw] h-[35vw] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col gap-16 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div className="flex flex-col items-start gap-4">
            <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#a855f7] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#a855f7] animate-pulse" />
              Professional Experience
            </span>
            <h2 className="reveal-text text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none text-left">
              Machine Learning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-cyan-400">
                Internship Experience
              </span>
            </h2>
          </div>
          
          {/* Organization Badge */}
          <div className="reveal-text flex flex-col items-start md:items-end text-left md:text-right gap-1.5 shrink-0">
            <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-mono font-bold tracking-widest rounded-full uppercase">
              FUTURE INTERN
            </span>
            <span className="text-slate-400 font-mono text-xs flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-purple-500" />
              Machine Learning Intern
            </span>
            <a
              href="/certificate_future_intern.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 text-[10px] text-purple-400 hover:text-purple-300 font-mono font-extrabold tracking-wider rounded-xl transition-all"
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              VIEW CERTIFICATE
            </a>
          </div>
        </div>

        {/* Narrative Intro */}
        <div className="reveal-text max-w-3xl text-left">
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
            Completed a structured Machine Learning Internship at **Future Intern**, where I developed practical, intelligent models and gained hands-on experience solving real-world challenges through data pipeline optimization, natural language models, and predictive analytics.
          </p>
        </div>

        {/* Vertical/Stacked Timeline Cards Container */}
        <div ref={cardsRef} className="relative w-full flex flex-col gap-16 pl-6 sm:pl-16">
          
          {/* Vertical track line connector */}
          <div
            ref={lineRef}
            className="absolute left-[12px] sm:left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#8b5cf6] via-purple-500 to-cyan-400 rounded-full"
            style={{ transform: "scaleY(0)" }}
          />

          {TASKS.map((task, index) => (
            <div
              key={task.id}
              id={task.id}
              className="internship-card relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Glowing Node Marker */}
              <div className="absolute left-[-26px] sm:left-[-42px] top-8 w-6 h-6 rounded-full border border-purple-500/40 flex items-center justify-center bg-slate-900 z-10">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-ping" />
              </div>

              {/* Task Details Info (Col-Span 7) */}
              <div className={`lg:col-span-7 glass-card rounded-3xl p-8 border border-white/5 bg-slate-950/20 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#a855f7]/30 transition-all duration-300 text-left`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${task.color} opacity-40 pointer-events-none`} />
                
                <div className="z-10">
                  {/* Task Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                        {task.icon}
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                        TASK {task.num}
                      </span>
                    </div>
                    <span className="text-3xl font-black font-display text-white/5 group-hover:text-purple-500/15 transition-colors duration-300">
                      {task.num}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 group-hover:text-[#a855f7] transition-colors duration-300">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6">
                    {task.desc}
                  </p>

                  <ul className="flex flex-col gap-3 list-disc pl-4">
                    {task.bullets.map((b, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive Futuristic Sandbox Widget (Col-Span 5) */}
              <div className="lg:col-span-5 glass-card rounded-3xl border border-white/5 bg-slate-950/45 p-6 flex flex-col justify-center items-center min-h-[260px] relative overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center gap-1.5 opacity-40 font-mono text-[9px] uppercase tracking-wider text-white">
                  <Bot className="w-3.5 h-3.5" /> Live Sandbox Simulation
                </div>

                {/* Task 1 Widget: Interactive Bot logs */}
                {task.num === "01" && (
                  <div className="w-full flex flex-col gap-3 select-none">
                    <div className="text-left font-mono text-[10px] text-purple-400 flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5 animate-pulse" /> NLP Intent Engine: Active
                    </div>
                    <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 h-44 overflow-y-auto flex flex-col gap-3 justify-end text-xs font-sans">
                      <AnimatePresence>
                        {chatMessages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-2.5 rounded-xl max-w-[85%] leading-normal ${
                              msg.sender === "user"
                                ? "bg-white/5 text-slate-300 self-end border border-white/5"
                                : "bg-purple-500/10 text-purple-300 self-start border border-purple-500/20"
                            }`}
                          >
                            <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-0.5">
                              {msg.sender === "user" ? "USER" : "SUPPORT_BOT"}
                            </p>
                            {msg.text}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Task 2 Widget: SVG sales forecasting graph */}
                {task.num === "02" && (
                  <div className="w-full flex flex-col gap-4 select-none">
                    <div className="flex justify-between items-center">
                      <div className="text-left font-mono text-[10px] text-cyan-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> XGBoost Predictor
                      </div>
                      <div className="font-mono text-sm font-black text-cyan-400">
                        Accuracy: {salesGrowth}%
                      </div>
                    </div>

                    {/* SVG Line Graph */}
                    <div className="relative h-28 w-full bg-slate-950/50 border border-white/5 rounded-2xl p-3 flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        
                        {/* Actual Sales (dotted) */}
                        <path
                          d="M 10 70 L 40 65 L 70 50 L 100 55 L 130 35 L 160 40 L 190 20"
                          fill="none"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />

                        {/* Forecast (solid with neon glow) */}
                        <motion.path
                          d="M 10 70 L 40 65 L 70 50 L 100 55 L 130 35 L 160 32 L 190 15"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                        
                        {/* Forecast node pin */}
                        <circle cx="190" cy="15" r="4" fill="#22d3ee" className="animate-ping" />
                        <circle cx="190" cy="15" r="2.5" fill="#ffffff" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                      <span>MONTH 01</span>
                      <span>MONTH 03</span>
                      <span>FORECAST MONTH 06</span>
                    </div>
                  </div>
                )}

                {/* Task 3 Widget: Resume scanner */}
                {task.num === "03" && (
                  <div className="w-full flex flex-col gap-3 select-none text-left">
                    <div className="text-left font-mono text-[10px] text-pink-400 flex items-center gap-1">
                      <FileSpreadsheet className="w-3.5 h-3.5" /> NLP Parser Mode
                    </div>

                    <div className="relative bg-slate-950/80 border border-white/5 rounded-2xl p-4 h-36 flex flex-col justify-between overflow-hidden">
                      {/* Scanning Line overlay */}
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-pink-500 shadow-[0_0_10px_#ec4899] z-10"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Mock Resume Content */}
                      <div className="flex flex-col gap-2 font-mono text-[9px] text-slate-400">
                        <div><span className="text-pink-400">NAME:</span> Candidate_Profile_ML.pdf</div>
                        <div><span className="text-pink-400">SKILLS:</span> Python, TensorFlow, Scikit-Learn, NLP</div>
                        <div><span className="text-pink-400">MATCH_INDEX:</span> Calculating...</div>
                      </div>

                      {/* Scan Status Badge */}
                      <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-white/5">
                        <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">SCANNER STATUS</span>
                        <motion.span
                          key={scanStatus}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                            scanStatus.includes("Match")
                              ? "bg-green-500/10 border border-green-500/20 text-green-400"
                              : "bg-pink-500/10 border border-pink-500/20 text-pink-400"
                          }`}
                        >
                          {scanStatus}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
