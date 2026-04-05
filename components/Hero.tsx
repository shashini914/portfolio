"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "UX/UI Designer",
  "Coffee-fuelled Coder",
  "Hackathon Finalist",
  "BSD Student",
];

const CODE_SNIPPETS = [
  { label: "const", value: "fuel = 'coffee'" },
  { label: "import", value: "{ passion }" },
  { label: "return", value: "<CleanUI />" },
  { label: "await", value: "nextOpportunity()" },
];

const STATS = [
  { value: "Full-Stack", label: "Focus" },
  { value: "3×", label: "President's Honours" },
  { value: "2027", label: "Graduating" },
];

function useTypingEffect(words: string[], speed = 75, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef({ word: 0, char: 0, deleting: false });

  useEffect(() => {
    const tick = () => {
      const { word, char, deleting } = indexRef.current;
      const current = words[word];

      if (!deleting && char < current.length) {
        indexRef.current.char += 1;
        setDisplayed(current.slice(0, indexRef.current.char));
        return speed;
      }
      if (!deleting && char === current.length) {
        indexRef.current.deleting = true;
        return pause;
      }
      if (deleting && char > 0) {
        indexRef.current.char -= 1;
        setDisplayed(current.slice(0, indexRef.current.char));
        return speed / 2;
      }
      indexRef.current.deleting = false;
      indexRef.current.word = (word + 1) % words.length;
      return speed;
    };

    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = tick();
      timeout = setTimeout(schedule, delay);
    };
    timeout = setTimeout(schedule, speed);
    return () => clearTimeout(timeout);
  }, [words, speed, pause]);

  return displayed;
}

function FloatingTag({ snippet, style, delay }: { snippet: typeof CODE_SNIPPETS[0]; style: React.CSSProperties; delay: number }) {
  return (
    <div className="absolute hidden md:flex items-center gap-1.5 rounded-xl border border-black/8 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-3 py-2 font-mono text-xs select-none" style={{ ...style, animation: `float ${3 + delay * 0.5}s ease-in-out ${delay}s infinite alternate` }}>
      <span className="text-[#800020] font-semibold">{snippet.label}</span>
      <span className="text-gray-400">{snippet.value}</span>
    </div>
  );
}

export default function Hero() {
  const role = useTypingEffect(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(128,0,32,0.2)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(128,0,32,${0.07 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes float { from{transform:translateY(0) rotate(-1deg)} to{transform:translateY(-10px) rotate(1deg)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes shimmerLight { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .fade-up{opacity:0;animation:fadeSlideUp 0.6s ease forwards}
        .cursor-bar{display:inline-block;width:2px;height:1em;background:#800020;animation:blink 1s step-end infinite;vertical-align:text-bottom;margin-left:2px}
        .shimmer-text{background:linear-gradient(90deg,#800020 0%,#c0392b 40%,#800020 60%,#5c0015 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmerLight 4s linear infinite}
        .stat-card{transition:all 0.2s ease;border:1px solid rgba(0,0,0,0.07)}
        .stat-card:hover{background:rgba(128,0,32,0.05);border-color:rgba(128,0,32,0.2);transform:translateY(-2px);box-shadow:0 6px 20px rgba(128,0,32,0.08)}
        .glow-btn{position:relative;overflow:hidden}
        .glow-btn::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(255,255,255,0.2),transparent 70%);opacity:0;transition:opacity 0.3s}
        .glow-btn:hover::after{opacity:1}
      `}</style>

      <section id="home" className="relative min-h-screen overflow-hidden bg-[#fafaf9] text-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,_rgba(128,0,32,0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,_rgba(168,50,74,0.04),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <>
          <FloatingTag snippet={CODE_SNIPPETS[0]} delay={0}   style={{ top: "22%", right: "8%" }} />
          <FloatingTag snippet={CODE_SNIPPETS[1]} delay={1.2} style={{ top: "45%", right: "14%" }} />
          <FloatingTag snippet={CODE_SNIPPETS[2]} delay={0.6} style={{ top: "65%", right: "6%" }} />
          <FloatingTag snippet={CODE_SNIPPETS[3]} delay={1.8} style={{ top: "32%", right: "28%" }} />
        </>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24 pb-16">

          <div className="fade-up mb-5" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#800020]/20 bg-[#800020]/8 px-4 py-1.5 text-sm text-[#800020] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#800020] shadow-[0_0_6px_rgba(128,0,32,0.5)]" />
              Seneca Polytechnic · Software Development · Toronto
            </span>
          </div>

          <div className="fade-up max-w-4xl" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-[5rem]">
              Hi, I&apos;m Shashini.
              <br />
              <span className="shimmer-text">I build things</span>
              <br />
              for the web.
            </h1>
          </div>

          <div className="fade-up mt-5 flex items-center gap-3" style={{ animationDelay: "0.3s" }}>
            <span className="text-base text-gray-400">Currently:</span>
            <span className="text-base font-semibold text-[#111111]">{role}<span className="cursor-bar" /></span>
          </div>

          <p className="fade-up mt-4 max-w-xl text-base leading-7 text-gray-500" style={{ animationDelay: "0.4s" }}>
            Full-stack dev based in Toronto, turning ideas into real, polished web apps using React, Next.js & Flask. Powered by coffee, good music, and a genuine love for clean code.
          </p>

          <div className="fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: "0.5s" }}>
            {STATS.map((s) => (
              <div key={s.label} className="stat-card rounded-xl bg-white px-5 py-3 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <p className="text-xl font-bold text-[#800020]">{s.value}</p>
                <p className="mt-0.5 text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.6s" }}>
            <a href="#projects" className="glow-btn rounded-full bg-[#800020] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(128,0,32,0.3)] transition-all hover:bg-[#a8324a] hover:shadow-[0_6px_28px_rgba(128,0,32,0.4)] active:scale-95">
              See My Work →
            </a>
            <a href="/shashinir_resume.pdf" target="_blank" className="rounded-full border border-black/12 bg-white px-7 py-3 text-sm font-semibold text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all hover:border-[#800020]/30 hover:text-[#800020] active:scale-95">
              Download CV
            </a>
          </div>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-2" style={{ animationDelay: "0.7s" }}>
            <span className="text-xs text-gray-400 mr-1">Stack →</span>
            {["React", "Next.js", "TypeScript", "Flask", "PostgreSQL", "MongoDB", "Node.js", "Swift"].map((t) => (
              <span key={t} className="rounded-full border border-black/8 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm transition hover:border-[#800020]/30 hover:text-[#800020]">{t}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-25">
          <span className="text-[10px] text-gray-400 tracking-widest uppercase">scroll</span>
          <div className="h-7 w-px bg-gradient-to-b from-gray-400 to-transparent" style={{ animation: "scrollBounce 1.5s ease-in-out infinite" }} />
        </div>
      </section>
    </>
  );
}