"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setCounter(Math.floor(obj.val));
      },
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => {
            // Unlock scroll
            document.body.style.overflow = "";
            onComplete();
          }
        });

        tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" })
          .to(logoRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.25")
          .to(barRef.current, { scaleX: 0, transformOrigin: "right", duration: 0.25, ease: "power2.in" }, "-=0.25")
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.75,
            ease: "power4.inOut"
          });
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#050510] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top Header */}
      <div ref={logoRef} className="flex justify-between items-center w-full">
        <div className="text-lg font-bold tracking-[0.2em] text-[#a855f7] flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          MUHAMMED AFNAN
        </div>
        <div className="text-xs font-semibold tracking-widest text-white/40 uppercase">
          PORTFOLIO BOOTSTRAP v1.0
        </div>
      </div>

      {/* Counter */}
      <div className="flex flex-col items-start justify-center flex-grow py-16">
        <span className="text-[10px] tracking-[0.4em] font-extrabold text-cyan-400/80 mb-2 uppercase block">
          CREATING VISUAL IDENTITY LAYER
        </span>
        <div
          ref={textRef}
          className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black text-white select-none leading-none tracking-tighter"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {counter < 10 ? `0${counter}` : counter}%
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full flex flex-col gap-4">
        <div className="h-[2px] w-full bg-white/5 overflow-hidden relative rounded-full">
          <div
            ref={barRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400"
            style={{ width: `${counter}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] sm:text-xs font-bold text-white/30 uppercase tracking-widest">
          <span>AI INTEL LAYER INITIALIZED</span>
          <span>© 2026 AFNAN.DEV</span>
        </div>
      </div>
    </div>
  );
}
