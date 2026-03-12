import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="/assets/generated/hero-race-car.dim_1920x1080.jpg"
          alt="Samar Racing Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,69,0,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Three.js Canvas */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="font-barlow-condensed text-sm tracking-[0.4em] uppercase text-[#FF4500] font-semibold">
            — Motorsports Excellence —
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-bebas text-[clamp(4rem,15vw,12rem)] leading-none tracking-wider neon-text-orange mb-4"
        >
          BUILT TO
          <br />
          <span
            style={{
              color: "white",
              textShadow: "0 0 40px rgba(255,69,0,0.5)",
            }}
          >
            DOMINATE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-barlow-condensed text-xl md:text-2xl tracking-widest text-silver/80 mb-10 uppercase"
        >
          Samar Sports Team — Motorsports Excellence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#drivers"
            data-ocid="hero.primary_button"
            className="inline-flex items-center justify-center px-8 py-4 font-barlow-condensed text-sm font-700 tracking-widest uppercase bg-[#FF4500] text-black hover:bg-[#FF6620] transition-all duration-200 animate-pulse-glow"
          >
            Meet the Drivers
          </a>
          <a
            href="#races"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center justify-center px-8 py-4 font-barlow-condensed text-sm font-700 tracking-widest uppercase border border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10 transition-all duration-200"
          >
            View Schedule
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown size={28} className="text-[#FF4500] opacity-70" />
      </div>
    </section>
  );
}
