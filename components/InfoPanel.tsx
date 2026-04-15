"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID       = "service_32k1ngf";
const EMAILJS_LIKE_TEMPLATE_ID = "template_fzeg3cy";
const EMAILJS_PUBLIC_KEY       = "GWgrSlvYxmgBFf-6L";
// ─────────────────────────────────────────────────────────────────

// ─── API endpoint — update to your actual domain ──────────────────
const LIKES_API = "https://tinypixel.in/api/likes.php";
// ─────────────────────────────────────────────────────────────────

const LIKED_KEY = "portfolio_has_liked";

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } },
  item: { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } },
};

// ── Like Modal ────────────────────────────────────────────────────
function LikeModal({ onConfirm, onClose }: { onConfirm: (name: string, anonymous: boolean) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anonymous && !name.trim()) return;
    onConfirm(anonymous ? "Anonymous" : name.trim(), anonymous);
  };
  return (
    <motion.div
      key="like-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(26,26,46,0.45)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ background: "#F5F0E8", borderRadius: "20px", padding: "32px 28px", width: "min(360px, 90vw)", boxShadow: "0 24px 60px rgba(26,26,46,0.18)", position: "relative" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#8B8070" }}>×</button>
        <div style={{ textAlign: "center", marginBottom: 16 }}><span style={{ fontSize: 36 }}>🩷</span></div>
        <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.25rem", fontWeight: 700, color: "#1A1A2E", textAlign: "center", marginBottom: 6 }}>Who&apos;s leaving a like?</h3>
        <p style={{ fontSize: "0.82rem", color: "#8B8070", textAlign: "center", marginBottom: 20 }}>Let Sahil know you stopped by!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text" placeholder={anonymous ? "Staying mysterious 🤫" : "Your name"}
            value={name} onChange={(e) => setName(e.target.value)}
            disabled={anonymous} required={!anonymous}
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E8DFD0", borderRadius: 10, fontFamily: "var(--font-body, sans-serif)", fontSize: "0.9rem", color: "#1A1A2E", background: anonymous ? "#EDE8E0" : "#fff", outline: "none", boxSizing: "border-box", marginBottom: 14, transition: "background 0.2s" }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 22, userSelect: "none" }}>
            <div onClick={() => setAnonymous((v) => !v)} style={{ width: 38, height: 22, borderRadius: 999, position: "relative", background: anonymous ? "#FF6B35" : "#D0C9BE", transition: "background 0.25s", flexShrink: 0, cursor: "pointer" }}>
              <div style={{ position: "absolute", top: 3, left: anonymous ? "calc(100% - 19px)" : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
            </div>
            <span style={{ fontSize: "0.84rem", color: "#8B8070", fontFamily: "var(--font-body, sans-serif)" }}>Like anonymously</span>
          </label>
          <button type="submit" style={{ width: "100%", padding: "11px 0", background: "#FF6B35", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
            Send Love ♥
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ── Mobile Like Button ─────────────────────────────────────────────
function MobileLikeButton() {
  const [count, setCount]         = useState<number | null>(null);
  const [liked, setLiked]         = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [burst, setBurst]         = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LIKED_KEY) === "true") setLiked(true);
    fetch(LIKES_API)
      .then((r) => r.json())
      .then((d) => setCount(d.total ?? 0))
      .catch(() => setCount(0));
  }, []);

  const handleConfirm = async (name: string, anonymous: boolean) => {
    setShowModal(false);
    setBurst(true);
    setLiked(true);
    localStorage.setItem(LIKED_KEY, "true");
    setTimeout(() => setBurst(false), 600);

    try {
      const res  = await fetch(LIKES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, anonymous }),
      });
      const data = await res.json();
      if (data.total !== undefined) setCount(data.total);
    } catch {
      setCount((c) => (c ?? 0) + 1);
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_LIKE_TEMPLATE_ID,
        { liker_name: anonymous ? "Anonymous" : name, to_email: "sahil@tinypixel.in" },
        EMAILJS_PUBLIC_KEY
      );
    } catch { /* silent */ }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <button
          onClick={() => { if (!liked) setShowModal(true); }}
          disabled={liked}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 999,
            border: liked ? "1.5px solid #FF6B35" : "1.5px solid rgba(26,26,46,0.18)",
            background: liked ? "rgba(255,107,53,0.1)" : "rgba(245,240,232,0.85)",
            cursor: liked ? "default" : "pointer",
            transition: "all 0.25s ease",
            transform: burst ? "scale(1.3)" : "scale(1)",
          }}
        >
          <span style={{ fontSize: 18, transform: burst ? "scale(1.5)" : "scale(1)", transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)", display: "inline-block" }}>
            {liked ? "🩷" : "🤍"}
          </span>
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.78rem", fontWeight: 700, color: liked ? "#FF6B35" : "#8B8070", letterSpacing: "0.04em", minWidth: 14 }}>
            {count === null ? "·" : count > 0 ? count : ""}
          </span>
        </button>
        {liked && (
          <span style={{ fontSize: "0.72rem", color: "#FF6B35", fontFamily: "var(--font-body, sans-serif)", fontWeight: 500 }}>
            Thanks! 🙌
          </span>
        )}
      </div>
      <AnimatePresence>
        {showModal && <LikeModal onConfirm={handleConfirm} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}

// ── InfoPanel ─────────────────────────────────────────────────────
interface InfoPanelProps {
  onGetInTouch?: () => void;
  onPortfolioClick?: () => void;
  showLikeButton?: boolean; // Only true on mobile layout
}

export default function InfoPanel({ onGetInTouch, onPortfolioClick, showLikeButton = false }: InfoPanelProps) {
  return (
    <motion.div
      className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-xl"
      variants={stagger.container} initial="hidden" animate="show"
    >
      <motion.div variants={stagger.item} className="mb-6">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8B8070] font-body">
          <span className="w-6 h-px bg-[#FF6B35] inline-block" />
          Hi there, I&apos;m
          <span className="w-2 h-2 rounded-full bg-[#7DC95E] animate-pulse inline-block" />
        </span>
      </motion.div>

      <motion.h1 variants={stagger.item} className="font-display text-[#1A1A2E] leading-[1.05] mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700 }}>
        Sahil<br />Walawalkar<span className="text-[#FF6B35]">.</span>
      </motion.h1>

      <motion.p variants={stagger.item} className="font-display text-[#8B8070] font-medium mb-8" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", letterSpacing: "0.02em" }}>
        UX Designer & Fullstack Developer
      </motion.p>

      <motion.div variants={stagger.item} className="w-12 h-0.5 bg-[#FF6B35] mb-8" />

      <motion.p variants={stagger.item} className="font-body text-[#8B8070] leading-relaxed mb-10 max-w-sm" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
        UX designer and fullstack developer passionate about creating simple, intuitive, and visually appealing digital experiences. I enjoy learning about user needs, experimenting with design ideas, and bringing them to life using modern frontend and backend technologies while continuously improving my skills.
      </motion.p>

      {/* Portfolio button */}
      <motion.div variants={stagger.item} className="flex items-center gap-3 mt-2">
        <button data-hover onClick={onPortfolioClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35] text-white rounded-full font-body text-sm font-semibold hover:bg-[#e05a28] transition-colors duration-300 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          View Portfolio
        </button>
      </motion.div>

      {/* TinyPixel Studio link */}
      <motion.div variants={stagger.item} className="flex items-center gap-3 mt-4">
        <a href="/" target="_blank" rel="noopener noreferrer" data-hover
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1A1A2E]/20 rounded-full text-[#1A1A2E] font-body text-sm font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors duration-300">
          <svg width="14" height="18" viewBox="0 0 1236 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M297.313 1343.28C459.537 1343.28 591.045 1472.39 591.045 1631.64C591.045 1790.9 459.537 1920 297.313 1920C135.09 1920 3.58203 1790.9 3.58203 1631.64C3.5822 1472.39 135.09 1343.28 297.313 1343.28ZM297.313 1444.21C191.868 1444.21 106.388 1528.13 106.388 1631.64C106.388 1735.16 191.868 1819.08 297.313 1819.08C402.759 1819.08 488.238 1735.16 488.238 1631.64C488.238 1528.13 402.758 1444.21 297.313 1444.21ZM1184.41 0C1212.8 0.000406294 1235.82 23.0186 1235.82 51.4131V958.567L1235.82 960.476C1234.79 1122.61 1103.03 1253.73 940.657 1253.73H717.683L717.018 1253.73C689.15 1253.37 666.626 1230.85 666.273 1202.98L666.269 1202.32V51.4141L666.273 50.749C666.629 22.6604 689.51 0 717.683 0H1184.41ZM297.313 677.015C459.537 677.015 591.045 806.117 591.045 965.373C591.045 1124.63 459.537 1253.73 297.313 1253.73C135.09 1253.73 3.58227 1124.63 3.58203 965.373C3.58203 806.117 135.09 677.015 297.313 677.015ZM297.313 777.939C191.868 777.939 106.388 861.857 106.388 965.373C106.388 1068.89 191.868 1152.81 297.313 1152.81C402.758 1152.81 488.238 1068.89 488.238 965.373C488.238 861.857 402.759 777.94 297.313 777.939ZM809.553 1110.45H940.657C1024.54 1110.45 1092.54 1042.45 1092.54 958.567V143.283H809.553V1110.45ZM288.358 0C447.614 0.000134407 576.717 131.508 576.717 293.731C576.717 455.955 447.614 587.463 288.358 587.463C129.103 587.463 4.85871e-05 455.955 0 293.731C0 131.508 129.103 0 288.358 0ZM288.358 102.806C184.842 102.806 100.926 188.286 100.926 293.731C100.926 399.177 184.842 484.656 288.358 484.656C391.875 484.656 475.791 399.176 475.791 293.731C475.791 188.286 391.875 102.806 288.358 102.806Z" fill="#333" />
          </svg>
          TinyPixel Studio ↗
        </a>
      </motion.div>

      {/* Like button — only rendered in the mobile layout instance */}
      {showLikeButton && (
        <motion.div variants={stagger.item} style={{ marginTop: 16 }}>
          <MobileLikeButton />
        </motion.div>
      )}
    </motion.div>
  );
}
