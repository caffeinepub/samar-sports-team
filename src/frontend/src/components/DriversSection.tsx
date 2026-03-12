import { motion } from "framer-motion";
import { Flag, Star, Trophy } from "lucide-react";
import type { Driver } from "../backend.d";
import { useDrivers } from "../hooks/useQueries";

const FALLBACK_DRIVERS: Driver[] = [
  {
    id: 1n,
    name: "Alessandro Samar",
    number: 7n,
    nationality: "🇮🇹 Italian",
    position: 1n,
    bio: "Team principal and lead driver",
    wins: 18n,
    podiums: 42n,
  },
  {
    id: 2n,
    name: "Kenji Watanabe",
    number: 23n,
    nationality: "🇯🇵 Japanese",
    position: 2n,
    bio: "Technical precision specialist",
    wins: 12n,
    podiums: 31n,
  },
  {
    id: 3n,
    name: "Carlos Mendez",
    number: 41n,
    nationality: "🇲🇽 Mexican",
    position: 3n,
    bio: "Aggressive overtaking maestro",
    wins: 9n,
    podiums: 24n,
  },
  {
    id: 4n,
    name: "Lena Voss",
    number: 88n,
    nationality: "🇩🇪 German",
    position: 4n,
    bio: "Data-driven race strategist",
    wins: 8n,
    podiums: 31n,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

const ocids = [
  "drivers.card.1",
  "drivers.card.2",
  "drivers.card.3",
  "drivers.card.4",
];

export default function DriversSection() {
  const { data: drivers } = useDrivers();
  const displayDrivers = (
    drivers && drivers.length > 0 ? drivers : FALLBACK_DRIVERS
  ).slice(0, 4);

  return (
    <section id="drivers" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 speed-gradient" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-3">
            The Lineup
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
            OUR <span className="neon-text-orange">DRIVERS</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDrivers.map((driver, i) => (
            <motion.div
              key={String(driver.id)}
              data-ocid={ocids[i] ?? `drivers.card.${i + 1}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass-card p-6 cursor-default relative overflow-hidden group transition-all duration-300"
            >
              {/* Driver number watermark */}
              <div
                className="absolute -right-4 -top-4 font-bebas text-[120px] leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,69,0,0.06)" }}
              >
                {String(driver.number)}
              </div>

              <div className="relative z-10">
                <div className="mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center border border-[#FF4500]/40 mb-3 font-bebas text-2xl"
                    style={{ color: "#FF4500" }}
                  >
                    #{String(driver.number)}
                  </div>
                  <h3 className="font-barlow-condensed text-xl font-bold text-white tracking-wide">
                    {driver.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Flag size={12} className="text-silver/50" />
                    <span className="font-barlow-condensed text-xs text-silver/60 tracking-wide">
                      {driver.nationality}
                    </span>
                  </div>
                </div>

                <p className="text-silver/50 text-sm mb-5 leading-relaxed">
                  {driver.bio}
                </p>

                <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Trophy size={10} className="text-[#FF4500]" />
                      <span className="font-bebas text-2xl neon-text-orange">
                        {String(driver.wins)}
                      </span>
                    </div>
                    <span className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/40">
                      Wins
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Star size={10} className="text-[#FF4500]" />
                      <span className="font-bebas text-2xl text-silver">
                        {String(driver.podiums)}
                      </span>
                    </div>
                    <span className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/40">
                      Podiums
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
