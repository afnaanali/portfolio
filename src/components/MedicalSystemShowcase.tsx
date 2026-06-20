"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Activity, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Stethoscope, 
  Droplet, 
  BrainCircuit,
  ShieldCheck
} from "lucide-react";

interface SymptomOption {
  id: string;
  name: string;
  symptoms: string;
  disease: string;
  risk: "Low" | "Medium" | "High";
  recommendation: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: "cardio",
    name: "Cardiovascular",
    symptoms: "Chest Pain & Dyspnea",
    disease: "Angina / Ischemic Risk Detected",
    risk: "High",
    recommendation: "Take aspirin, avoid exertion, and seek immediate cardiology consult."
  },
  {
    id: "respiratory",
    name: "Respiratory",
    symptoms: "High Fever & Dry Cough",
    disease: "Possible Respiratory Infection / Flu",
    risk: "Medium",
    recommendation: "Keep hydrated, rest, isolate, and check SpO2. Consult GP if fever persists."
  },
  {
    id: "endocrine",
    name: "Endocrine",
    symptoms: "Fatigue & Polyuria",
    disease: "Elevated Glycemic Marker Risk",
    risk: "Medium",
    recommendation: "Reduce carbohydrate intake, monitor fasting sugar, and schedule HbA1c test."
  }
];

export default function MedicalSystemShowcase() {
  // Stats states for count-up
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState({ sys: 0, dia: 0 });
  const [bloodSugar, setBloodSugar] = useState(0);
  
  // Interactive Symptom State
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomOption | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Trigger metrics count-up on mount
  useEffect(() => {
    // Count up heart rate
    let hrVal = 0;
    const hrInterval = setInterval(() => {
      hrVal += 3;
      if (hrVal >= 76) {
        setHeartRate(76);
        clearInterval(hrInterval);
      } else {
        setHeartRate(hrVal);
      }
    }, 30);

    // Count up BP
    let sysVal = 0;
    let diaVal = 0;
    const bpInterval = setInterval(() => {
      sysVal += 5;
      diaVal += 3;
      if (sysVal >= 120) sysVal = 120;
      if (diaVal >= 80) diaVal = 80;
      setBloodPressure({ sys: sysVal, dia: diaVal });
      if (sysVal === 120 && diaVal === 80) {
        clearInterval(bpInterval);
      }
    }, 30);

    // Count up blood sugar
    let bsVal = 0;
    const bsInterval = setInterval(() => {
      bsVal += 4;
      if (bsVal >= 98) {
        setBloodSugar(98);
        clearInterval(bsInterval);
      } else {
        setBloodSugar(bsVal);
      }
    }, 35);

    // Heart rate fluctuation simulator
    const fluctuation = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next > 82 ? 82 : next < 70 ? 70 : next;
      });
    }, 3000);

    return () => {
      clearInterval(hrInterval);
      clearInterval(bpInterval);
      clearInterval(bsInterval);
      clearInterval(fluctuation);
    };
  }, []);

  // Symptom analyzer trigger
  const handleSelectSymptom = (symptom: SymptomOption) => {
    if (isAnalyzing) return;
    setSelectedSymptom(symptom);
    setIsAnalyzing(true);
    setShowResult(false);
    setAnalysisProgress(0);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setShowResult(true);
          return 100;
        }
        return next;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [isAnalyzing]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4 font-sans text-left relative">
      {/* Background Micro-Floating Decorative Icons */}
      <div className="absolute -top-4 -right-4 opacity-5 animate-pulse-slow">
        <Stethoscope className="w-24 h-24 text-cyan-400" />
      </div>
      <div className="absolute -bottom-8 -left-8 opacity-5">
        <BrainCircuit className="w-32 h-32 text-purple-400" />
      </div>

      {/* Telemetry Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase">
            LIVE HEALTH TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-[8px] font-mono text-emerald-400 font-bold">CONNECTED</span>
        </div>
      </div>

      {/* Health metrics grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Heart Rate */}
        <div className="p-3 bg-white/3 border border-white/5 rounded-2xl flex flex-col justify-between h-20 relative overflow-hidden group/metric">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover/metric:opacity-10 group-hover/metric:scale-110 transition-all duration-300">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[9px] font-mono font-bold tracking-wide">PULSE</span>
            <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-bold font-display text-white leading-none">
              {heartRate}
            </span>
            <span className="text-[8px] font-mono text-slate-500 ml-1">bpm</span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="p-3 bg-white/3 border border-white/5 rounded-2xl flex flex-col justify-between h-20 relative overflow-hidden group/metric">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover/metric:opacity-10 group-hover/metric:scale-110 transition-all duration-300">
            <Activity className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[9px] font-mono font-bold tracking-wide">SYS/DIA</span>
            <span className="text-[8px] font-mono px-1 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
              NORMAL
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-bold font-display text-white leading-none">
              {bloodPressure.sys}/{bloodPressure.dia}
            </span>
            <span className="text-[8px] font-mono text-slate-500 ml-1">mmHg</span>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="p-3 bg-white/3 border border-white/5 rounded-2xl flex flex-col justify-between h-20 relative overflow-hidden group/metric">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover/metric:opacity-10 group-hover/metric:scale-110 transition-all duration-300">
            <Droplet className="w-12 h-12 text-amber-500" />
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[9px] font-mono font-bold tracking-wide">GLUCOSE</span>
            <span className="text-[8px] font-mono px-1 py-0.2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
              FASTING
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-bold font-display text-white leading-none">
              {bloodSugar}
            </span>
            <span className="text-[8px] font-mono text-slate-500 ml-1">mg/dL</span>
          </div>
        </div>
      </div>

      {/* SVG Electrocardiogram waveform */}
      <div className="w-full h-10 bg-slate-950/60 border border-white/5 rounded-xl flex items-center relative overflow-hidden p-1">
        <svg className="w-full h-full stroke-cyan-400/80 stroke-2 fill-none overflow-visible" viewBox="0 0 350 40">
          <motion.path
            d="M 0 20 L 40 20 L 50 10 L 55 30 L 60 20 L 80 20 L 85 5 L 90 35 L 95 20 L 130 20 L 140 20 L 150 10 L 155 30 L 160 20 L 180 20 L 185 5 L 190 35 L 195 20 L 230 20 L 240 20 L 250 10 L 255 30 L 260 20 L 280 20 L 285 5 L 290 35 L 295 20 L 330 20 L 350 20"
            initial={{ pathLength: 0.3, pathOffset: 0 }}
            animate={{ pathOffset: [0, -1] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            strokeDasharray="100 50"
          />
        </svg>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* Symptom Selection Panel */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#a855f7] uppercase flex items-center gap-1">
          <BrainCircuit className="w-3.5 h-3.5" /> AI Disease Prediction Simulator
        </span>
        <div className="flex gap-2">
          {SYMPTOMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectSymptom(item)}
              className={`flex-1 text-center py-2 px-1 rounded-xl text-[10px] font-mono border transition-all duration-300 ${
                selectedSymptom?.id === item.id
                  ? "bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold"
                  : "bg-white/3 border-white/5 hover:border-white/15 text-slate-400 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis and Diagnosis Output Container */}
      <div className="h-32 bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden">
        {/* Neon scanline bar */}
        {isAnalyzing && (
          <motion.div
            className="absolute left-0 right-0 h-[1.5px] bg-[#a855f7] shadow-[0_0_8px_#a855f7] z-10"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <AnimatePresence mode="wait">
          {!selectedSymptom && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-500 text-xs flex flex-col items-center gap-1.5 select-none"
            >
              <Sparkles className="w-5 h-5 text-purple-500/50 animate-pulse" />
              <span>Select a diagnostic profile above to run prediction.</span>
            </motion.div>
          )}

          {selectedSymptom && isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 w-full text-xs font-mono"
            >
              <div className="flex justify-between items-center text-purple-400">
                <span className="animate-pulse">AI Classifier Inference Running...</span>
                <span>{analysisProgress}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Symptoms: {selectedSymptom.symptoms}
              </p>
            </motion.div>
          )}

          {selectedSymptom && showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-between h-full text-xs"
            >
              {/* Diagnosis header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  {selectedSymptom.risk === "High" ? (
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="font-bold text-white font-mono leading-none">
                    {selectedSymptom.disease}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                    selectedSymptom.risk === "High"
                      ? "bg-rose-500/10 border border-rose-500/25 text-rose-400 animate-pulse"
                      : "bg-amber-500/10 border border-amber-500/25 text-amber-400"
                  }`}
                >
                  {selectedSymptom.risk.toUpperCase()} RISK
                </span>
              </div>

              {/* Description & recommendation */}
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-[10px] font-mono text-slate-400">
                  <strong className="text-slate-300">Symptoms evaluated:</strong> {selectedSymptom.symptoms}
                </p>
                <p className="text-[10px] text-slate-300 font-sans leading-normal">
                  <strong className="text-cyan-400 font-mono text-[9px] uppercase mr-1">TREATMENT PLAN:</strong>
                  {selectedSymptom.recommendation}
                </p>
              </div>

              {/* Interactive confirmation action */}
              <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-white/5 text-[9px] font-mono">
                <span className="text-slate-500">ACCURACY CONFIDENCE: 94.6%</span>
                <span className="text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED BY AI PIPELINE
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
