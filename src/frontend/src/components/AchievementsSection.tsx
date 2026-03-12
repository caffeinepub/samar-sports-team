import { motion } from "framer-motion";
import { Star, Trophy, Zap } from "lucide-react";
import type { Achievement } from "../backend.d";
import { Variant_championship_podium_record } from "../backend.d";
import { useAchievements } from "../hooks/useQueries";

const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1n,
    title: "World Endurance Championship",
    year: 2023n,
    description: "Dominant season-long campaign across 6 continents",
    category: Variant_championship_podium_record.championship,
  },
  {
    id: 2n,
    title: "GT Series Title",
    year: 2021n,
    description: "Back-to-back victories across 12 rounds",
    category: Variant_championship_podium_record.championship,
  },
  {
    id: 3n,
    title: "Le Mans Class Victory",
    year: 2022n,
    description: "Overall class winner after 24 hours of racing",
    category: Variant_championship_podium_record.podium,
  },
  {
    id: 4n,
    title: "Spa 1-2 Finish",
    year: 2023n,
    description: "Both Samar cars crossed the finish line first and second",
    category: Variant_championship_podium_record.podium,
  },
  {
    id: 5n,
    title: "Fastest Lap Record",
    year: 2024n,
    description: "Nurburgring Nordschleife fastest production-based lap",
    category: Variant_championship_podium_record.record,
  },
  {
    id: 6n,
    title: "Pit Stop World Record",
    year: 2022n,
    description: "1.82s tire change at Bahrain International Circuit",
    category: Variant_championship_podium_record.record,
  },
];

const categoryConfig = {
  [Variant_championship_podium_record.championship]: {
    icon: Trophy,
    label: "Championships",
    color: "#FF4500",
  },
  [Variant_championship_podium_record.podium]: {
    icon: Star,
    label: "Podiums",
    color: "#C0C0C0",
  },
  [Variant_championship_podium_record.record]: {
    icon: Zap,
    label: "Records",
    color: "#FF0022",
  },
};

const categories = [
  Variant_championship_podium_record.championship,
  Variant_championship_podium_record.podium,
  Variant_championship_podium_record.record,
];

export default function AchievementsSection() {
  const { data: achievements } = useAchievements();
  const allAchievements =
    achievements && achievements.length > 0
      ? achievements
      : FALLBACK_ACHIEVEMENTS;

  return (
    <section id="achievements" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,69,0,0.1) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-3">
            Glory
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
            HALL OF <span className="neon-text-orange">GLORY</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;
            const items = allAchievements.filter((a) => a.category === cat);

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="flex items-center gap-3 mb-6 pb-4 border-b"
                  style={{ borderColor: `${cfg.color}33` }}
                >
                  <Icon size={20} style={{ color: cfg.color }} />
                  <h3
                    className="font-bebas text-2xl tracking-widest"
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </h3>
                  <span
                    className="ml-auto font-bebas text-4xl"
                    style={{ color: cfg.color, opacity: 0.4 }}
                  >
                    {items.length.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((a, i) => (
                    <motion.div
                      key={String(a.id)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 border border-white/5 bg-white/[0.02] group hover:border-[var(--cat-color)] transition-all duration-200"
                      style={
                        { "--cat-color": cfg.color } as React.CSSProperties
                      }
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-barlow-condensed text-sm font-bold text-white tracking-wide group-hover:text-[var(--cat-color)] transition-colors">
                          {a.title}
                        </h4>
                        <span
                          className="font-bebas text-sm shrink-0 px-2 py-0.5 border"
                          style={{
                            color: cfg.color,
                            borderColor: `${cfg.color}40`,
                            backgroundColor: `${cfg.color}10`,
                          }}
                        >
                          {String(a.year)}
                        </span>
                      </div>
                      <p className="text-silver/40 text-xs leading-relaxed">
                        {a.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
