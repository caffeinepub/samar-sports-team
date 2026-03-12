import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { label: "Race Wins", value: 47, suffix: "+" },
  { label: "Podiums", value: 128, suffix: "+" },
  { label: "Championships", value: 6, suffix: "" },
  { label: "Seasons", value: 12, suffix: "" },
];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-12 bg-black border-y border-white/5 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,69,0,0.05), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center px-4"
            >
              <div className="font-bebas text-5xl md:text-7xl neon-text-orange">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="font-barlow-condensed text-xs tracking-widest uppercase mt-1"
                style={{ color: "#C0C0C0" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
