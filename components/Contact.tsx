"use client";

import { useEffect, useRef, useState } from "react";

const SOCIALS = [
  {
    label: "GitHub", sub: "github.com/shashini914", href: "https://github.com/shashini914",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.82 2.78 1.3 3.46 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.22a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.54 3.28-1.22 3.28-1.22.66 1.66.24 2.88.12 3.18.78.84 1.24 1.92 1.24 3.22 0 4.6-2.8 5.62-5.48 5.9.44.38.82 1.12.82 2.26v3.35c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>)
  },
  {
    label: "LinkedIn", sub: "linkedin.com/in/saranasinghe", href: "https://linkedin.com/in/saranasinghe",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" /></svg>)
  },
  {
    label: "Email", sub: "amasharanasinghe5@gmail.com", href: "mailto:amasharanasinghe5@gmail.com",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>)
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes cFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .c-fade{opacity:0}
        .c-fade.on{animation:cFadeUp 0.6s ease forwards}
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0)}}
        .pulse-dot{animation:pulse-dot 2s ease-in-out infinite}
        .contact-input{width:100%;background:white;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:10px 14px;color:#111111;font-size:13px;outline:none;transition:all 0.2s;font-family:inherit}
        .contact-input::placeholder{color:rgba(0,0,0,0.25)}
        .contact-input:focus{border-color:rgba(128,0,32,0.4);box-shadow:0 0 0 3px rgba(128,0,32,0.06)}
        .social-btn{display:flex;align-items:center;gap:10px;border:1px solid rgba(0,0,0,0.06);border-radius:10px;padding:11px 14px;color:rgba(0,0,0,0.7);background:white;text-decoration:none;transition:all 0.2s ease;font-size:13px}
        .social-btn:hover{border-color:rgba(128,0,32,0.25);color:#800020;transform:translateY(-2px);box-shadow:0 6px 20px rgba(128,0,32,0.07)}
      `}</style>

      <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-[#fafaf9] px-6 py-16 border-t border-black/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,_rgba(128,0,32,0.05),_transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className={`c-fade mb-10 text-center ${visible ? "on" : ""}`} style={{ animationDelay: "0.05s" }}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#800020]">Contact</p>
            <h2 className="text-3xl font-bold text-[#111111] md:text-4xl">
              Let&apos;s build something
              <span className="text-gray-400"> together.</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
              Open to internships, co-ops, and collab ideas. I respond fast, usually between coffee cups.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs text-green-700">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-500" />
              Actively looking for opportunities
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className={`c-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.15s" }}>
              <div className="rounded-2xl border border-black/7 bg-white p-6 shadow-sm">
                {sent ? (
                  <div className="flex h-56 flex-col items-center justify-center gap-3 text-center">
                    <span className="text-3xl text-[#800020]">✦</span>
                    <p className="text-lg font-semibold text-[#111111]">Message sent!</p>
                    <p className="text-sm text-gray-400">I&apos;ll get back to you soon, promise.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[10px] text-gray-400 uppercase tracking-wider">Name</label>
                        <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="contact-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] text-gray-400 uppercase tracking-wider">Email</label>
                        <input type="email" required placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="contact-input" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] text-gray-400 uppercase tracking-wider">Message</label>
                      <textarea required rows={4} placeholder="Tell me what you're working on..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="contact-input resize-none" />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-[#800020] py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(128,0,32,0.25)] transition-all hover:bg-[#a8324a] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Message →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className={`c-fade flex flex-col gap-4 ${visible ? "on" : ""}`} style={{ animationDelay: "0.25s" }}>
              <div className="rounded-2xl border border-black/7 bg-white p-6 shadow-sm">
                <p className="mb-4 text-[10px] uppercase tracking-widest text-gray-400">Find me on</p>
                <div className="space-y-2">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">
                      <span className="text-[#800020] flex-shrink-0">{s.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-[#111111] leading-tight">{s.label}</p>
                        <p className="text-[11px] text-gray-400">{s.sub}</p>
                      </div>
                      <span className="ml-auto text-xs text-gray-300">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/7 bg-white p-6 shadow-sm">
                <p className="mb-4 text-[10px] uppercase tracking-widest text-gray-400">Quick facts</p>
                <div className="space-y-3">
                  {[
                    ["Location", "Toronto, ON 🇨🇦"],
                    ["Response time", "Usually same day"],
                    ["Open to", "Internship · Co-op · Remote"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-gray-400">{k}</span>
                      <span className="text-[#111111] font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}