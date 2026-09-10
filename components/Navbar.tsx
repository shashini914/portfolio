"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActive(visibleEntry.target.id);
        }
      },
      { 
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0 
      }
    );

    navItems.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: navFadeIn 0.5s ease 0.1s both; }
        .logo-underline::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #800020;
          transition: width 0.25s ease;
        }
        .logo-underline:hover::after { width: 100%; }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 nav-enter">
        <div
          className="mx-auto flex max-w-[1400px] items-center justify-between px-8 md:px-16 pt-5 pb-3 transition-all duration-300"
          style={{
            background: scrolled
              ? "rgba(250,250,249,0.92)"
              : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
          }}
        >
          <a href="#home" className="logo-underline relative text-xl font-bold tracking-[0.08em] text-[#111111]">
            SR.
          </a>

          <nav className="rounded-full border border-black/10 bg-white/80 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.href.replace("#", "");
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#800020] text-white shadow-md"
                          : "text-gray-600 hover:bg-[#800020]/10 hover:text-[#800020]"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}