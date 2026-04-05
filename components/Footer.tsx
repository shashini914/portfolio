export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-link {
          color: rgba(0,0,0,0.4);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
          position: relative;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: #800020;
          transition: width 0.25s ease;
        }
        .footer-link:hover { color: #800020; }
        .footer-link:hover::after { width: 100%; }
      `}</style>

      <footer className="relative border-t border-black/5 bg-white px-6 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 bg-gradient-to-r from-transparent via-[#800020]/40 to-transparent" />

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
          <a href="#home" className="text-xl font-bold tracking-[0.08em] text-[#111111] opacity-70 hover:opacity-100 transition-opacity">
            SR.
          </a>

          <div className="flex gap-6">
            {["About", "Education", "Projects", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="footer-link">
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            © {year} Shashini. Built with{" "}
            <span className="text-[#800020] font-medium">Next.js </span> &amp; coffee.
          </p>
        </div>
      </footer>
    </>
  );
}