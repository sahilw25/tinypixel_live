"use client";

import { motion } from "framer-motion";

type AnimName = "idle" | "bow";

interface AnimationButtonsProps {
  onPlay: (anim: AnimName) => void;
  activeAnim: AnimName | null;
}

export default function AnimationButtons({ onPlay, activeAnim }: AnimationButtonsProps) {
  const buttons: { key: AnimName; label: string; icon: string; desc: string }[] = [
    { key: "idle", label: "Idle", icon: "◎", desc: "Loop idle stance" },
    { key: "bow",  label: "Bow",  icon: "↓", desc: "Play bow once"   },
  ];

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[#8B8070] text-xs tracking-[0.2em] uppercase font-body mb-1">
        Animations
      </p>
      {buttons.map((btn) => (
        <motion.button
          key={btn.key}
          onClick={() => onPlay(btn.key)}
          data-hover
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 text-left"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              activeAnim === btn.key
                ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B3540]"
                : "bg-[#E8DFD0] text-[#1A1A2E] group-hover:bg-[#1A1A2E] group-hover:text-white"
            }`}
          >
            {btn.icon}
          </div>
          <div>
            <p className="font-display text-[#1A1A2E] text-sm font-semibold leading-none mb-0.5">
              {btn.label}
            </p>
            <p className="text-[#8B8070] text-[10px] font-body">{btn.desc}</p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
