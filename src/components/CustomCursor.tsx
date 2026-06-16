"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for smooth performance (60fps lerping)
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX(e.clientX - 4);
      dotY(e.clientY - 4);
      ringX(e.clientX - 20);
      ringY(e.clientY - 20);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("button, a, [data-cursor]");
      
      if (clickable) {
        gsap.to(ring, {
          width: 56,
          height: 56,
          xPercent: -14,
          yPercent: -14,
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "rgba(168, 85, 247, 0.8)",
          boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
          borderWidth: "1px",
          duration: 0.25,
        });
        
        const customText = clickable.getAttribute("data-cursor-text");
        if (customText) {
          setCursorText(customText);
          gsap.to(dot, { scale: 0, duration: 0.2 });
        } else {
          gsap.to(dot, { scale: 1.5, backgroundColor: "#06b6d4", duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("button, a, [data-cursor]");
      
      if (clickable) {
        gsap.to(ring, {
          width: 40,
          height: 40,
          xPercent: 0,
          yPercent: 0,
          backgroundColor: "transparent",
          borderColor: "rgba(168, 85, 247, 0.4)",
          boxShadow: "none",
          borderWidth: "2px",
          duration: 0.25,
        });
        setCursorText("");
        gsap.to(dot, { scale: 1, backgroundColor: "#a855f7", duration: 0.2 });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[#a855f7] rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } hidden md:block`}
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-10 h-10 border-2 border-[#a855f7]/40 rounded-full pointer-events-none z-[9998] transition-opacity duration-300 flex items-center justify-center overflow-hidden ${
          isVisible ? "opacity-100" : "opacity-0"
        } hidden md:flex`}
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#06b6d4] drop-shadow-sm">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
