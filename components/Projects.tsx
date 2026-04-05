"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  category: string[];
  featured: boolean;
  highlight: string;
};

const projects: Project[] = [
  {
    title: "ReText",
    period: "Jan 2025 – Apr 2025",
    description:
      "A peer-to-peer secondhand textbook marketplace for Seneca students. Features JWT auth with college email validation, course-code search, seller profiles with star ratings, and secure login.",
    technologies: ["React.js", "Flask", "PostgreSQL", "JWT", "CSS Modules"],
    github: "https://github.com/shashini914/ReText",
    demo: "",
    category: ["Full Stack", "Web"],
    featured: true,
    highlight: "Led core feature build",
  },
  {
    title: "AVAIL",
    period: "Sept – Dec 2024",
    description:
      "Full-stack platform connecting consumers with local service providers through secure listings and real-time messaging. Built with Node.js + MongoDB for scalable auth and data management.",
    technologies: ["Node.js", "MongoDB", "Express", "Git"],
    github: "https://github.com/shashini914/AVAIL-G08",
    demo: "",
    category: ["Full Stack", "Web"],
    featured: false,
    highlight: "Responsive & secure",
  },
  {
    title: "Fractal Garden",
    period: "2026",
    description:
      "An interactive Mandelbrot fractal explorer built as a Swift App Playground, allowing users to zoom, pan, and experiment with fractal behavior through real-time controls and color palettes.",
    technologies: ["Swift", "SwiftUI", "Swift App Playgrounds"],
    github: "https://github.com/shashini914/FractalGarden",
    demo: "",
    category: ["Mobile"],
    featured: false,
    highlight: "Interactive build",
  },
  {
    title: "BalanceED",
    period: "Coming soon",
    description:
      "An AI-assisted academic planner and burnout monitoring system designed to help students manage workload, visualize schedules, and reduce burnout risk through smart planning and analytics.",
    technologies: ["React", "Next.js", "Flask", "PostgreSQL"],
    github: "https://github.com/shashini914",
    demo: "",
    category: ["Full Stack", "Web", "AI"],
    featured: false,
    highlight: "In progress",
  },
];

const CATEGORIES = ["All", "Full Stack", "Web", "AI", "Mobile"];

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const isInProgress = project.highlight === "In progress";
  return (
    <div
      className={`project-card group relative flex flex-col rounded-2xl border border-black/7 p-6 overflow-hidden ${isInProgress ? "bg-[#fafaf9]" : "bg-white"}`}
      style={{ opacity: 0, animation: visible ? `pFadeUp 0.55s ease ${0.08 + index * 0.1}s forwards` : "none" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,_rgba(128,0,32,0.06),_transparent_70%)]" />

      <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {project.featured && (
            <span className="rounded-full border border-[#800020]/20 bg-[#800020]/8 px-2.5 py-0.5 text-[10px] text-[#800020] font-semibold uppercase tracking-wider">Featured</span>
          )}
          <span className="rounded-full border border-black/8 bg-[#fafaf9] px-2.5 py-0.5 text-[10px] text-gray-400 font-mono">{project.period}</span>
        </div>
        <span className={`text-[10px] font-medium border rounded-full px-2.5 py-0.5 ${isInProgress ? "text-amber-600 border-amber-200 bg-amber-50" : "text-[#800020] border-[#800020]/15 bg-[#800020]/5"}`}>
          {project.highlight}
        </span>
      </div>

      <span className="absolute top-5 right-6 font-mono text-4xl font-bold text-black/[0.04] select-none leading-none group-hover:text-black/[0.07] transition-all duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-3 text-xl font-bold text-[#111111]">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span key={t} className="rounded-full border border-black/8 bg-[#fafaf9] px-2.5 py-0.5 text-[11px] text-gray-500">{t}</span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-black/5 pt-4">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-[#800020]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.82 2.78 1.3 3.46 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.22a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.54 3.28-1.22 3.28-1.22.66 1.66.24 2.88.12 3.18.78.84 1.24 1.92 1.24 3.22 0 4.6-2.8 5.62-5.48 5.9.44.38.82 1.12.82 2.26v3.35c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
          GitHub
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 rounded-full bg-[#800020] px-3.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#a8324a]">
            Live →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <>
      <style>{`
        @keyframes pFadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .project-card{transition:transform 0.25s ease,box-shadow 0.25s ease,border-color 0.25s ease}
        .project-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(128,0,32,0.1);border-color:rgba(128,0,32,0.12) !important}
        .filter-btn{transition:all 0.18s ease}
        .filter-btn.active{background:#800020;color:white;border-color:transparent}
      `}</style>

      <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-16 border-t border-black/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,_rgba(128,0,32,0.04),_transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-6xl">
          <div style={{ opacity: 0, animation: visible ? "pFadeUp 0.55s ease 0.05s forwards" : "none" }} className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#800020]">Projects</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold text-[#111111] md:text-4xl">Things I&apos;ve built</h2>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn rounded-full border border-black/10 px-3.5 py-1.5 text-xs text-gray-500 bg-white ${filter === cat ? "active" : "hover:border-[#800020]/30 hover:text-[#800020]"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 h-px bg-gradient-to-r from-[#800020]/30 via-black/6 to-transparent" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} visible={visible} />)}
          </div>

          <div className="mt-10 text-center" style={{ opacity: 0, animation: visible ? "pFadeUp 0.55s ease 0.5s forwards" : "none" }}>
            <a href="https://github.com/shashini914" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fafaf9] px-5 py-2.5 text-sm text-gray-500 transition hover:border-[#800020]/30 hover:text-[#800020]">
              More on GitHub →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}