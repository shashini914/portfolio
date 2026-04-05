"use client";

import { useEffect, useRef, useState } from "react";

const AWARDS = [
  { label: "PMI Project Management Ready",  year: "Dec 2025" },
  { label: "Seneca Hackathon — Finalist",   year: "Feb 2025" },
  { label: "President's Honours List",      year: "Fall 2024 · Winter 2025 · Fall 2025" },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes eFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .e-fade{opacity:0}
        .e-fade.on{animation:eFadeUp 0.6s ease forwards}
        .edu-card{transition:all 0.22s ease}
        .edu-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(128,0,32,0.08);border-color:rgba(128,0,32,0.15) !important}
      `}</style>

      <section id="education" ref={sectionRef} className="bg-[#fafaf9] px-6 py-16 border-t border-black/5">
        <div className="mx-auto max-w-6xl space-y-12">

          <div>
            <div className={`e-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.05s" }}>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#800020]">Academic Journey</p>
              <h2 className="text-3xl font-bold text-[#111111] md:text-4xl">Education</h2>
            </div>

            <div className={`e-fade mt-6 grid gap-4 md:grid-cols-2 ${visible ? "on" : ""}`} style={{ animationDelay: "0.15s" }}>
              <div className="edu-card rounded-2xl bg-white p-7 border border-black/6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#800020] font-semibold mb-2">Current</p>
                    <h3 className="text-lg font-bold text-[#111111]">Seneca Polytechnic</h3>
                    <p className="mt-1 text-sm text-gray-500">Honours B.Tech · Software Development</p>
                  </div>
                  <span className="text-2xl opacity-20">🎓</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 font-mono border-t border-black/5 pt-3">2023 → 2027 · Toronto, ON</p>
              </div>

              <div className="edu-card rounded-2xl bg-white p-7 border border-black/6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Previously</p>
                    <h3 className="text-lg font-bold text-[#111111]">Staffordshire University</h3>
                    <p className="mt-1 text-sm text-gray-500">Cert. Higher Education · Software Engineering</p>
                  </div>
                  <span className="text-2xl opacity-20">🏛️</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 font-mono border-t border-black/5 pt-3">2022 – 2023 · Stoke-on-Trent, England</p>
              </div>
            </div>
          </div>

          <div className={`e-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.25s" }}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">Awards & Recognition</p>
            <div className="rounded-2xl bg-white border border-black/6 shadow-sm overflow-hidden">
              {AWARDS.map((a, i) => (
                <div
                  key={i}
                  className={`group flex items-center gap-5 px-7 py-4 transition hover:bg-[#fafaf9] ${i < AWARDS.length - 1 ? "border-b border-black/5" : ""}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#800020] flex-shrink-0 group-hover:shadow-[0_0_6px_rgba(128,0,32,0.5)] transition" />
                  <span className="flex-1 text-sm font-medium text-[#111111]">{a.label}</span>
                  <span className="text-xs text-gray-400 font-mono">{a.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}