"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, Github, Linkedin, MapPin, Mail, Sparkles, Phone } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  
  const emailAddress = "muhammedafnanafnu1234@gmail.com";
  const phoneNumber = "+91 8590720025";
  const githubUrl = "https://github.com/afnaanali";
  const linkedinUrl = "https://www.linkedin.com/in/muhammed-afnan-889560291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      
      // Accents colored confetti blast
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.75 },
        colors: ["#a855f7", "#8b5cf6", "#3b82f6", "#06b6d4"],
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050510] py-24 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background neon flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-purple-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center gap-12 z-10 text-center select-none">
        
        {/* Title Block */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.4em] font-extrabold text-cyan-400 uppercase flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tight uppercase leading-none">
            Let&apos;s Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-cyan-400">
              Something Amazing Together
            </span>
          </h2>
        </div>

        {/* Narrative */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans">
          Whether you have an interesting job opportunity, a machine learning task, or an interactive web application to build—let&apos;s connect and bring it to life.
        </p>

        {/* Direct Contact Details Block */}
        <div className="flex flex-col gap-3.5 font-mono text-[11px] sm:text-xs text-slate-300 bg-white/5 p-6 rounded-2xl border border-white/5 max-w-md w-full text-left">
          <div className="flex justify-between items-center gap-4 border-b border-white/5 pb-2">
            <span className="text-slate-500 font-bold">PHONE:</span>
            <span className="text-slate-200 select-text">{phoneNumber}</span>
          </div>
          <div className="flex justify-between items-center gap-4 border-b border-white/5 pb-2">
            <span className="text-slate-500 font-bold">EMAIL:</span>
            <span className="text-slate-200 select-text">{emailAddress}</span>
          </div>
          <div className="flex justify-between items-center gap-4 border-b border-white/5 pb-2">
            <span className="text-slate-500 font-bold">LINKEDIN:</span>
            <span className="text-slate-200 hover:text-cyan-400 transition-colors">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-slate-500 font-bold">GITHUB:</span>
            <span className="text-slate-200 hover:text-purple-400 transition-colors">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </span>
          </div>
        </div>

        {/* Action Callouts (Interactive Buttons Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl justify-center items-center">
          
          {/* Action 1: Copy Email */}
          <Magnetic>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 glass-card rounded-2xl border border-white/10 hover:border-[#a855f7]/50 flex items-center justify-between text-left transition-all group select-none cursor-none w-full shadow-[0_0_15px_rgba(168,85,247,0.01)] hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
              data-cursor-text="COPY"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl group-hover:bg-[#a855f7] group-hover:text-white transition-all">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase mb-0.5">
                    {copied ? "COPIED TO CLIPBOARD" : "EMAIL ADDRESS"}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    Copy Email
                  </span>
                </div>
              </div>
            </button>
          </Magnetic>

          {/* Action 2: Call Me */}
          <Magnetic>
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
              className="px-6 py-4 glass-card rounded-2xl border border-white/10 hover:border-emerald-500/50 flex items-center justify-between text-left transition-all group select-none cursor-none w-full shadow-[0_0_15px_rgba(16,185,129,0.01)] hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]"
              data-cursor-text="CALL"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase mb-0.5">
                    GET IN TOUCH VIA TEL
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    Call Me
                  </span>
                </div>
              </div>
            </a>
          </Magnetic>

          {/* Action 3: Visit LinkedIn */}
          <Magnetic>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 glass-card rounded-2xl border border-white/10 hover:border-cyan-500/50 flex items-center justify-between text-left transition-all group select-none cursor-none w-full shadow-[0_0_15px_rgba(6,182,212,0.01)] hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
              data-cursor-text="LINKEDIN"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase mb-0.5">
                    PROFESSIONAL NETWORK
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    Visit LinkedIn
                  </span>
                </div>
              </div>
            </a>
          </Magnetic>

          {/* Action 4: Visit GitHub */}
          <Magnetic>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 glass-card rounded-2xl border border-white/10 hover:border-purple-500/50 flex items-center justify-between text-left transition-all group select-none cursor-none w-full shadow-[0_0_15px_rgba(139,92,246,0.01)] hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]"
              data-cursor-text="GITHUB"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl group-hover:bg-[#8b5cf6] group-hover:text-white transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase mb-0.5">
                    SOURCE CODE & REPOS
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    Visit GitHub
                  </span>
                </div>
              </div>
            </a>
          </Magnetic>

        </div>

        {/* Footer Details */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5 text-slate-400 text-xs sm:text-sm font-semibold select-text">
          
          <div className="flex items-center gap-2.5 justify-center">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Wayanad, Kerala, India</span>
          </div>

          <div className="flex items-center gap-2.5 justify-center">
            <Mail className="w-4 h-4 text-cyan-400" />
            <a href={`mailto:${emailAddress}`} className="hover:text-cyan-400 transition-colors font-mono select-text">
              {emailAddress}
            </a>
          </div>

          <div className="flex items-center gap-4 justify-center select-none">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#a855f7] transition-all animate-pulse"
              data-cursor-text="GIT"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-all animate-pulse"
              data-cursor-text="IN"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Credits */}
        <div className="text-[10px] text-slate-600 tracking-widest uppercase select-none mt-8">
          DESIGNED & ENGINEERED BY MUHAMMED AFNAN &bull; © 2026
        </div>

      </div>
    </section>
  );
}
