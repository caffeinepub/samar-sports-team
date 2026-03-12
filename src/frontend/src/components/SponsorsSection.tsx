import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Sponsor } from "../backend.d";
import { Variant_title_official_partner } from "../backend.d";
import { useSponsors } from "../hooks/useQueries";

const FALLBACK_SPONSORS: Sponsor[] = [
  {
    id: 1n,
    name: "VelocityTech",
    tier: Variant_title_official_partner.title,
    website: "https://example.com",
  },
  {
    id: 2n,
    name: "OmegaFuel",
    tier: Variant_title_official_partner.official,
    website: "https://example.com",
  },
  {
    id: 3n,
    name: "AeroCarbon",
    tier: Variant_title_official_partner.official,
    website: "https://example.com",
  },
  {
    id: 4n,
    name: "SwiftLogistics",
    tier: Variant_title_official_partner.partner,
    website: "https://example.com",
  },
  {
    id: 5n,
    name: "NexaElectronics",
    tier: Variant_title_official_partner.partner,
    website: "https://example.com",
  },
  {
    id: 6n,
    name: "PrecisionGear",
    tier: Variant_title_official_partner.partner,
    website: "https://example.com",
  },
];

const tierConfig = {
  [Variant_title_official_partner.title]: {
    label: "Title Sponsor",
    sizeClass: "text-4xl",
    cardClass: "col-span-full md:col-span-2",
  },
  [Variant_title_official_partner.official]: {
    label: "Official Partner",
    sizeClass: "text-2xl",
    cardClass: "",
  },
  [Variant_title_official_partner.partner]: {
    label: "Partner",
    sizeClass: "text-xl",
    cardClass: "",
  },
};

export default function SponsorsSection() {
  const { data: sponsors } = useSponsors();
  const allSponsors =
    sponsors && sponsors.length > 0 ? sponsors : FALLBACK_SPONSORS;

  const byTier = {
    title: allSponsors.filter(
      (s) => s.tier === Variant_title_official_partner.title,
    ),
    official: allSponsors.filter(
      (s) => s.tier === Variant_title_official_partner.official,
    ),
    partner: allSponsors.filter(
      (s) => s.tier === Variant_title_official_partner.partner,
    ),
  };

  const renderCard = (sponsor: Sponsor) => {
    const cfg = tierConfig[sponsor.tier];
    return (
      <motion.a
        key={String(sponsor.id)}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className={`glass-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer min-h-[100px] ${cfg.cardClass}`}
      >
        <div
          className={`font-bebas tracking-widest text-white group-hover:text-[#FF4500] transition-colors ${cfg.sizeClass}`}
        >
          {sponsor.name}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-barlow-condensed text-xs tracking-widest uppercase text-silver/30 group-hover:text-[#FF4500]/60 transition-colors">
            {cfg.label}
          </span>
          <ExternalLink
            size={10}
            className="text-silver/30 group-hover:text-[#FF4500]/60 transition-colors"
          />
        </div>
      </motion.a>
    );
  };

  return (
    <section id="sponsors" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-3">
            Partnerships
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
            OUR <span className="neon-text-orange">PARTNERS</span>
          </h2>
        </motion.div>

        {byTier.title.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {byTier.title.map(renderCard)}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...byTier.official, ...byTier.partner].map(renderCard)}
        </div>
      </div>
    </section>
  );
}
