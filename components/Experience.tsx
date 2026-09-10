"use client";

import { useEffect, useRef, useState } from "react";

export default function Experience() {
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
        @keyframes xFadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .x-fade { opacity:0 }
        .x-fade.on { animation:xFadeUp 0.65s ease forwards }

        @keyframes lineGrow {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        .line-grow {
          transform-origin: top;
          animation: lineGrow 1s cubic-bezier(0.4,0,0.2,1) 0.7s both;
        }

        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(128,0,32,0.5); }
          50%      { box-shadow: 0 0 0 10px rgba(128,0,32,0); }
        }
        .live-dot { animation: pulseDot 2.2s ease-in-out infinite; }

        @keyframes dotPop {
          from { opacity:0; transform:scale(0.3); }
          to   { opacity:1; transform:scale(1); }
        }
        .dot-1 { animation: dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.6s both; }
        .dot-2 { animation: dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.5s both; }

        @keyframes shimmerCo {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .company-shimmer {
          background: linear-gradient(90deg, #800020 0%, #c0392b 40%, #800020 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerCo 4s linear infinite;
        }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        className="relative overflow-hidden bg-[#fafaf9] px-6 py-16 border-t border-black/5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,_rgba(128,0,32,0.04),_transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl">

          <div className={`x-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.05s" }}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#800020]">
              Work Experience
            </p>
            <h2 className="text-3xl font-bold text-[#111111] md:text-4xl">Where I&apos;ve worked</h2>
          </div>
          <div className="mt-14 flex flex-col items-center">

            <div
              className={`x-fade text-center mb-10 ${visible ? "on" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="company-shimmer text-3xl font-bold md:text-4xl">
                Canada Revenue Agency
              </h3>
              <p className="text-sm text-gray-400 mt-2 tracking-wide">
                Toronto, ON &nbsp;·&nbsp; Government of Canada
              </p>
            </div>

            <div className="flex items-start gap-10">

              <div className="flex flex-col items-center" style={{ paddingTop: 6 }}>
                <div className="live-dot dot-1 h-4 w-4 rounded-full bg-[#800020] border-[3px] border-white shadow-[0_0_0_2px_rgba(128,0,32,0.2)] z-10" />

                <div className="relative w-px my-1.5 overflow-hidden rounded-full" style={{ height: 52 }}>
                  <div className="line-grow absolute inset-0 bg-gradient-to-b from-[#800020] via-[#800020]/60 to-[#800020]/20" />
                </div>

                <div className="dot-2 h-3.5 w-3.5 rounded-full border-[2.5px] border-[#800020]/50 bg-[#fafaf9] shadow-sm" />
              </div>

              <div className="flex flex-col gap-0" style={{ minWidth: 220 }}>
                <div
                  className={`x-fade ${visible ? "on" : ""}`}
                  style={{ animationDelay: "0.35s" }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="text-[15px] font-bold text-[#111111]">IT Analyst</p>
                    <span className="rounded-full bg-[#800020] px-2.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-widest">
                      Now
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-400">Sep 2026 — Present</p>
                </div>

                <div style={{ height: 52 }} />

                <div
                  className={`x-fade ${visible ? "on" : ""}`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <p className="text-[15px] font-semibold text-[#111111] mb-0.5">IT Analyst Co-op</p>
                  <p className="text-xs font-mono text-gray-400">May 2026 — Sep 2026</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}