"use client";

import { useState } from "react";
import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import ParticleBackground from "./ParticleBackground";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Render the background and content scroll wrap */}
      {!loading && (
        <SmoothScroll>
          <ParticleBackground />
          <div className="relative z-10 w-full min-h-screen select-none">
            {children}
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
