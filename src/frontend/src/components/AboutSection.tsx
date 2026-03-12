import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 radial-glow-orange" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-4">
              Our Heritage
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-6 neon-underline">
              THE SAMAR
              <br />
              <span className="neon-text-orange">LEGACY</span>
            </h2>
            <p className="text-silver/70 text-lg leading-relaxed mb-6">
              Born from a relentless passion for speed and precision
              engineering, Samar Sports Team has carved its name into the annals
              of motorsport history. Since our founding, we have pushed the
              boundaries of what is mechanically and humanly possible — lap
              after lap, race after race.
            </p>
            <p className="text-silver/70 text-lg leading-relaxed mb-8">
              Our machines are built with aerospace-grade composites, our
              drivers trained to operate at the absolute edge of physics. Every
              component, every decision, every millisecond — optimized for one
              singular purpose:{" "}
              <span className="text-[#FF4500] font-semibold">Victory</span>.
            </p>
            <div className="flex gap-6">
              <div>
                <div className="font-bebas text-4xl neon-text-orange">2012</div>
                <div className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/50">
                  Founded
                </div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="font-bebas text-4xl neon-text-orange">18+</div>
                <div className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/50">
                  Countries Raced
                </div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="font-bebas text-4xl neon-text-orange">300+</div>
                <div className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/50">
                  Race Entries
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#FF4500]/10 blur-2xl rounded-full" />
            <img
              src="/assets/generated/track-aerial.dim_1200x600.jpg"
              alt="Samar Race Track"
              className="relative w-full h-80 md:h-96 object-cover border border-[#FF4500]/20"
            />
            <div className="absolute inset-0 border border-[#FF4500]/30 translate-x-3 translate-y-3 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
