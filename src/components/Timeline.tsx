"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Briefcase, Award, GraduationCap, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  type: "work" | "education" | "cert" | "project";
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  icon: React.ReactNode;
  certificateUrl?: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "acad-project-1",
    type: "project",
    role: "App Developer",
    company: "Medical Assistance System (Team Mini Project)",
    duration: "2026",
    responsibilities: [
      "Developed the mobile application interface using Flutter, designing highly responsive, user-friendly healthcare panels.",
      "Implemented health parameters tracking and logs storage (Blood Pressure, Heart Rate, Glucose) utilizing Firebase.",
      "Collaborated on backend APIs integration, navigation flows, and AI symptom-based disease prediction services.",
      "Optimized overall mobile application performance, interface transitions, and user interaction layouts."
    ],
    icon: <Heart className="w-5 h-5 text-cyan-400" />
  },
  {
    id: "work-1",
    type: "work",
    role: "AI Developer - Intern",
    company: "PaceLab, India",
    duration: "2025",
    responsibilities: [
      "Developed machine learning models for real-world AI applications using Python, improving model accuracy and performance.",
      "Applied data preprocessing, feature engineering, and data analysis techniques to optimize machine learning workflows.",
      "Collaborated on AI/ML project development, implementing algorithms and validating model outputs.",
      "Utilized Python libraries and tools to build predictive models and automate data-driven decision-making.",
      "Gained hands-on experience in artificial intelligence, deep learning concepts, and software development practices."
    ],
    icon: <Briefcase className="w-5 h-5 text-purple-400" />,
    certificateUrl: "/certificate_pacelab.jpg"
  },
  {
    id: "edu-1",
    type: "education",
    role: "B.Tech in Computer Science Engineering",
    company: "Christ College of Engineering, Irinjalakuda, Kerala, India",
    duration: "2023 - Pursuing",
    responsibilities: [
      "Focused on core competencies: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), and software development lifecycles.",
      "Successfully built and deployed full stack applications with responsive UI and scalable database systems.",
      "Gained hands-on experience in machine learning architectures, statistical model building, and data preprocessing."
    ],
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />
  },
  {
    id: "cert-1",
    type: "cert",
    role: "Data Science & AI Certifications",
    company: "NPTEL, IBM, Microsoft, & LinkedIn",
    duration: "Jan-Mar 25",
    responsibilities: [
      "NPTEL Elite Certification - Data Science for Engineers (IIT Madras, score: 64%, Jan-Mar 25)",
      "IBM Artificial Intelligence Certification (Specialized credentials in ML workflows)",
      "Microsoft & LinkedIn Project Management Certification (Agile development methodologies)",
      "Hackathon Participation & Workshops (Completed multiple real-time development events)"
    ],
    icon: <Award className="w-5 h-5 text-indigo-400" />,
    certificateUrl: "/certificate_nptel.jpg"
  },
  {
    id: "edu-2",
    type: "education",
    role: "Higher Secondary Education",
    company: "Higher Secondary Examination Board",
    duration: "2022",
    responsibilities: [
      "Completed secondary education with high marks in science and mathematics.",
      "Established core analytical foundations and logical problem-solving structures."
    ],
    icon: <BookOpen className="w-5 h-5 text-pink-400" />
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".timeline-card");
    const nodes = containerRef.current?.querySelectorAll(".timeline-node");
    const trackLine = trackLineRef.current;

    if (!cards || !nodes || !trackLine) return;

    // Timeline Line drawing effect on scroll
    gsap.fromTo(
      trackLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        }
      }
    );

    // Cards sliding and fading in
    cards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    // Glowing node activation animation on scroll
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { scale: 0.7, opacity: 0.3, backgroundColor: "rgba(255, 255, 255, 0.1)" },
        {
          scale: 1,
          opacity: 1,
          backgroundColor: "#a855f7",
          boxShadow: "0 0 15px #a855f7",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background radial orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-2/3 w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col gap-20 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-cyan-400 uppercase">
            CHRONOLOGICAL PATHWAY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            Experience & Academic Projects
          </h2>
        </div>

        {/* Timeline body structure */}
        <div className="relative w-full flex flex-col items-stretch text-left select-text pl-4 sm:pl-12">
          
          {/* Vertical track line indicator */}
          <div
            ref={trackLineRef}
            className="absolute left-[20px] sm:left-[48px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-pink-500 rounded-full"
            style={{ transform: "scaleY(0)" }}
          />

          {TIMELINE_DATA.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-8 sm:gap-12 pb-16 last:pb-0">
              
              {/* Timeline Indicator Node */}
              <div
                className="timeline-node absolute left-[-16px] sm:left-[12px] top-1.5 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-slate-900/60 backdrop-blur-md z-15 transition-all"
                style={{ transform: "translate3d(0, 0, 0)" }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              {/* Event Content card */}
              <div className="timeline-card glass-card flex-grow p-6 sm:p-8 rounded-3xl relative ml-6 sm:ml-4 select-text">
                
                {/* Event header metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-purple-400">
                        {item.company}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-mono font-bold tracking-wider rounded-full self-start sm:self-center">
                    {item.duration}
                  </span>
                </div>
                {/* Event responsibility logs */}
                <ul className="flex flex-col gap-2.5 list-disc pl-4 select-text">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {resp}
                    </li>
                  ))}
                </ul>

                {item.certificateUrl && (
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-start">
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-xs text-slate-300 hover:text-white font-mono font-semibold rounded-lg transition-all"
                    >
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      View Certificate
                    </a>
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
