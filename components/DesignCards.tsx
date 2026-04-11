"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="4" y1="4" x2="14" y2="14" />
    <line x1="14" y1="4" x2="4" y2="14" />
  </svg>
);

// Real projects from TinyPixel UX Studio
const DESIGNS = [
  {
    id: 1,
    title: "OZo Ads",
    category: "Web Design",
    year: "2026",
    tag: "Website Design",
    color: "#1A1A2E",
    accent: "#FF5886",
    preview: "bg-gradient-to-br from-[#1A1A2E] to-[#2D1A2E]",
    description: "OOH advertising website design for OZo, showcasing an innovative approach to outdoor advertising.",
    // TODO: Add OZo Ads image → replace null with "/images/ozo-ads-poster.png"
    image: "/images/Ozo_thumnail.png",
    href: "/casestudies/ozo-ads",
  },
  
  {
    id: 2,
    title: "PlaySpot",
    category: "UX / UI Design",
    year: "2024",
    tag: "Web Design",
    color: "#1A1A2E",
    accent: "#FF6B35",
    preview: "bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]",
    description: "A sports facility booking app designed to streamline discovering and reserving venues.",
    image: "/images/playspot-poster.png",
    href: "/casestudies/playspot",
  },
  {
    id: 3,
    title: "Time Slot Selector",
    category: "Product Design",
    year: "2024",
    tag: "Case Study",
    color: "#0D1B2A",
    accent: "#37C1DB",
    preview: "bg-gradient-to-br from-[#0D1B2A] to-[#1A3A52]",
    description: "An intuitive scheduling component that simplifies time slot selection for booking systems.",
    image: "/images/timeselector-poster.png",
    href: "/casestudies/timeslot",
  },
];

interface DesignCardsProps {
  open: boolean;
  onClose: () => void;
}

export default function DesignCards({ open, onClose }: DesignCardsProps) {
  const router = useRouter();

  const handleCardClick = (href: string) => {
    if (href && href !== "#") {
      onClose();
      router.push(href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Blurred backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backdropFilter: "blur(16px)", background: "rgba(26,26,46,0.55)" }}
            onClick={onClose}
          />

          {/* Cards container */}
          <div className="relative z-10 flex flex-col h-fill px-8 pt-12 pb-8 overflow-hidden">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="text-[#FF6B35] text-xs tracking-[0.25em] uppercase font-body mb-1">
                  Selected Work
                </p>
                <h2 className="text-white font-display text-3xl font-semibold">
                  My Designs
                </h2>
              </div>
              <button
                onClick={onClose}
                data-hover
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <XIcon />
              </button>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto flex-1 pr-1">
              {DESIGNS.map((design, i) => (
                <motion.div
                  key={design.id}
                  className="design-card rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  initial={{ y: 40, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  data-hover
                  onClick={() => handleCardClick(design.href)}
                >
                  {/* Preview area */}
                  <div className={`${design.preview} h-40 relative overflow-hidden`}>
                    {design.image ? (
                      <img
                        src={design.image}
                        alt={design.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `linear-gradient(${design.accent}44 1px, transparent 1px), linear-gradient(90deg, ${design.accent}44 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                          <div className="h-2 rounded-full" style={{ background: design.accent, width: "60%", opacity: 0.8 }} />
                          <div className="h-1.5 rounded-full bg-white/20 w-full" />
                          <div className="h-1.5 rounded-full bg-white/20" style={{ width: "75%" }} />
                        </div>
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full opacity-90" style={{ background: design.accent }} />
                      </>
                    )}

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-body font-semibold tracking-widest uppercase px-2 py-1 rounded-full"
                        style={{ background: design.accent + "33", color: design.accent, border: `1px solid ${design.accent}55` }}
                      >
                        {design.tag}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p
                      className="text-xs tracking-[0.15em] uppercase mb-1 font-body font-semibold"
                      style={{ color: design.accent, opacity: 0.8 }}
                    >
                      {design.category} · {design.year}
                    </p>
                    <h3 className="text-white font-display font-semibold text-base leading-tight mb-2">
                      {design.title}
                    </h3>
                    <p className="text-white/50 text-sm font-body leading-relaxed">
                      {design.description}
                    </p>
                  </div>

                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: design.accent }}
                  />

                  {/* View arrow on hover */}
                  {design.href !== "#" && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 10L10 2M10 2H4M10 2V8" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-white/30 text-xs font-body tracking-widest uppercase text-center mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              Click a case study to view details
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
