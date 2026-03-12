export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="relative border-t border-white/5 py-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-bebas text-2xl neon-text-orange tracking-widest">
          SAMAR
        </div>
        <p className="text-silver/40 text-sm font-body text-center">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4500] hover:text-[#FF6620] transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <div className="flex gap-6">
          {["Races", "Drivers", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/40 hover:text-[#FF4500] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
