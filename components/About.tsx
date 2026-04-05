"use client";

import { useEffect, useRef, useState } from "react";

const PHOTOS = [
    { src: "/images/photo1.jpeg", alt: "A shot I took", caption: "somewhere cool" },
    { src: "/images/photo2.jpeg", alt: "Another one", caption: "fall feels" },
    { src: "/images/photo3.jpeg", alt: "The Weeknd", caption: "good music" },
    { src: "/images/photo4.jpeg", alt: "My shot", caption: "soft light" },
    { src: "/images/photo5.jpeg", alt: "Coldplay", caption: "caught a moment" },
];

const CARDS = [
    { icon: "☕", title: "Coffee first", sub: "Always. No exceptions." },
    { icon: "🎵", title: "Good music", sub: "Background score to everything" },
    { icon: "📷", title: "Photography", sub: "I see the world in frames" },
    { icon: "🏆", title: "Hackathon finalist", sub: "Seneca 2025" },
];

const PHOTO_LAYOUT = [
    { rotate: "-3deg", z: 3, cls: "left-0 top-3 w-44 h-56" },
    { rotate: "2deg", z: 2, cls: "left-36 top-0 w-40 h-52" },
    { rotate: "-1deg", z: 4, cls: "left-16 top-40 w-48 h-40" },
    { rotate: "3deg", z: 1, cls: "left-64 top-28 w-36 h-44" },
    { rotate: "-2deg", z: 5, cls: "left-4 top-[230px] w-32 h-36" },
];

export default function About() {
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
        @keyframes aFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .a-fade{opacity:0}
        .a-fade.on{animation:aFadeUp 0.6s ease forwards}
        .info-card{transition:all 0.22s ease;border:1px solid rgba(0,0,0,0.07)}
        .info-card:hover{border-color:rgba(128,0,32,0.2);transform:translateY(-3px);box-shadow:0 10px 28px rgba(128,0,32,0.07)}
        .photo-frame{transition:all 0.28s ease}
        .photo-frame:hover{transform:scale(1.08) rotate(0deg) !important;box-shadow:0 20px 48px rgba(0,0,0,0.2) !important;z-index:20 !important}
      `}</style>

            <section id="about" ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-16">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,_rgba(128,0,32,0.04),_transparent_70%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

                <div className="relative mx-auto max-w-6xl space-y-14">

                    <div className="grid gap-12 md:grid-cols-2 items-start">
                        <div>
                            <div className={`a-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.05s" }}>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#800020]">About Me</p>
                                <h2 className="text-3xl font-bold leading-tight text-[#111111] md:text-4xl">
                                    Developer with an eye
                                    <br />
                                    <span className="text-gray-400">for design and detail.</span>
                                </h2>
                            </div>
                            <div className={`a-fade mt-6 space-y-4 text-base leading-7 text-gray-500 ${visible ? "on" : ""}`} style={{ animationDelay: "0.15s" }}>
                                <p>
                                    I&apos;m <span className="text-[#111111] font-semibold">Shashini Ranasinghe</span>, a Software Development student based in Toronto, building full-stack web apps with React, Next.js, Flask, and a stack of tech I genuinely enjoy using.
                                </p>
                                <p>
                                    Outside of code, I&apos;m usually hunting for a good coffee spot, making playlists nobody asked for. I also enjoy photography, that eye for light and composition carries into how I approach design.
                                </p>
                                <p>
                                    I&apos;ve built multiple full-stack projects, placed on the President&apos;s Honours List three times, and reached the finals at the Seneca Hackathon.
                                </p>
                            </div>
                        </div>
                        <div className={`a-fade relative h-[340px] ${visible ? "on" : ""}`} style={{ animationDelay: "0.2s" }}>
                            {PHOTOS.map((photo, i) => (
                                <div
                                    key={i}
                                    className={`photo-frame absolute ${PHOTO_LAYOUT[i].cls} rounded-xl overflow-hidden border-4 border-white shadow-[0_6px_24px_rgba(0,0,0,0.1)]`}
                                    style={{ transform: `rotate(${PHOTO_LAYOUT[i].rotate})`, zIndex: PHOTO_LAYOUT[i].z }}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = "none";
                                            el.parentElement!.style.background = "#f0ede8";
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/40 to-transparent">
                                        <span className="text-white text-[10px] font-medium">{photo.caption}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`a-fade ${visible ? "on" : ""}`} style={{ animationDelay: "0.2s" }}>
                        <div className="flex flex-wrap justify-center gap-3">
                            {CARDS.map((c) => (
                                <div key={c.title} className="info-card w-56 rounded-2xl bg-[#fafaf9] p-5">
                                    <span className="text-xl">{c.icon}</span>
                                    <h3 className="mt-2.5 text-sm font-bold text-[#111111]">{c.title}</h3>
                                    <p className="mt-0.5 text-xs text-gray-400">{c.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}