import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import type { Race } from "../backend.d";
import { Variant_upcoming_completed } from "../backend.d";
import { useRaces } from "../hooks/useQueries";

const FALLBACK_RACES: Race[] = [
  {
    id: 1n,
    name: "Dubai Grand Prix",
    location: "Dubai, UAE",
    date: "2026-03-28",
    circuit: "Dubai Autodrome",
    status: Variant_upcoming_completed.upcoming,
  },
  {
    id: 2n,
    name: "Monaco Invitational",
    location: "Monte Carlo, Monaco",
    date: "2026-05-10",
    circuit: "Circuit de Monaco",
    status: Variant_upcoming_completed.upcoming,
  },
  {
    id: 3n,
    name: "Singapore Night Race",
    location: "Singapore",
    date: "2026-09-20",
    circuit: "Marina Bay Street Circuit",
    status: Variant_upcoming_completed.upcoming,
  },
  {
    id: 4n,
    name: "Abu Dhabi Finale",
    location: "Abu Dhabi, UAE",
    date: "2025-12-08",
    circuit: "Yas Marina Circuit",
    status: Variant_upcoming_completed.completed,
  },
  {
    id: 5n,
    name: "Bahrain Opener",
    location: "Sakhir, Bahrain",
    date: "2025-03-02",
    circuit: "Bahrain International Circuit",
    status: Variant_upcoming_completed.completed,
  },
];

const circuitFlags: Record<string, string> = {
  "Dubai Grand Prix": "🇦🇪",
  "Monaco Invitational": "🇲🇨",
  "Singapore Night Race": "🇸🇬",
  "Abu Dhabi Finale": "🇦🇪",
  "Bahrain Opener": "🇧🇭",
};

const ocids = ["races.item.1", "races.item.2", "races.item.3", "races.item.4"];

export default function RacesSection() {
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");
  const { data: races } = useRaces();
  const allRaces = races && races.length > 0 ? races : FALLBACK_RACES;
  const filtered =
    filter === "upcoming"
      ? allRaces.filter((r) => r.status === Variant_upcoming_completed.upcoming)
      : allRaces;

  return (
    <section id="races" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(255,69,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-3">
            Schedule
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
            RACE <span className="neon-text-orange">CALENDAR</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {(["upcoming", "all"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid="races.tab"
              onClick={() => setFilter(tab)}
              className={`font-barlow-condensed text-sm tracking-widest uppercase px-6 py-2 border transition-all duration-200 ${
                filter === tab
                  ? "border-[#FF4500] text-[#FF4500] bg-[#FF4500]/10"
                  : "border-white/20 text-silver/60 hover:border-white/40"
              }`}
            >
              {tab === "upcoming" ? "Upcoming" : "All Races"}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((race, i) => (
            <motion.div
              key={String(race.id)}
              data-ocid={ocids[i] ?? `races.item.${i + 1}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 border transition-all duration-200 group hover:border-[#FF4500]/50 ${
                race.status === Variant_upcoming_completed.upcoming
                  ? "border-[#FF4500]/20 bg-[#FF4500]/5"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-4 mb-3 sm:mb-0">
                <span className="text-2xl">
                  {circuitFlags[race.name] ?? "🏁"}
                </span>
                <div>
                  <h3 className="font-barlow-condensed text-lg font-bold text-white tracking-wide group-hover:text-[#FF4500] transition-colors">
                    {race.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-silver/40" />
                      <span className="text-silver/50 text-xs font-barlow-condensed tracking-wide">
                        {race.location}
                      </span>
                    </div>
                    <span className="text-white/20">·</span>
                    <span className="text-silver/40 text-xs font-barlow-condensed">
                      {race.circuit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-silver/60">
                  <Calendar size={13} />
                  <span className="font-barlow-condensed text-sm tracking-wide">
                    {new Date(race.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span
                  className={`font-barlow-condensed text-xs tracking-widest uppercase px-3 py-1 ${
                    race.status === Variant_upcoming_completed.upcoming
                      ? "bg-[#FF4500]/20 text-[#FF4500] border border-[#FF4500]/40"
                      : "bg-white/5 text-silver/50 border border-white/10"
                  }`}
                >
                  {race.status}
                </span>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div
              data-ocid="races.empty_state"
              className="text-center py-16 text-silver/40 font-barlow-condensed tracking-widest uppercase text-sm"
            >
              No races found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
