"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID       = "service_32k1ngf";
const EMAILJS_LIKE_TEMPLATE_ID = "template_fzeg3cy";
const EMAILJS_PUBLIC_KEY       = "GWgrSlvYxmgBFf-6L";
// ─────────────────────────────────────────────────────────────────

// ─── API endpoint — update this to your actual domain ─────────────
const LIKES_API = "https://tinypixel.in/api/likes.php";
// ─────────────────────────────────────────────────────────────────

// localStorage only tracks if THIS browser has already liked
const LIKED_KEY = "portfolio_has_liked";

// ── Like Modal ────────────────────────────────────────────────────
function LikeModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (name: string, anonymous: boolean) => void;
  onClose: () => void;
}) {
  const [name, setName]           = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anonymous && !name.trim()) return;
    onConfirm(anonymous ? "Anonymous" : name.trim(), anonymous);
  };

  return (
    <motion.div
      key="like-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(26,26,46,0.45)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          background: "#F5F0E8", borderRadius: "20px",
          padding: "32px 28px", width: "min(360px, 90vw)",
          boxShadow: "0 24px 60px rgba(26,26,46,0.18)",
          position: "relative",
        }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#8B8070" }}>
          ×
        </button>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 36 }}>🩷</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.25rem", fontWeight: 700, color: "#1A1A2E", textAlign: "center", marginBottom: 6 }}>
          Who&apos;s leaving a like?
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#8B8070", textAlign: "center", marginBottom: 20 }}>
          Let Sahil know you stopped by!
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={anonymous ? "Staying mysterious 🤫" : "Your name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={anonymous}
            required={!anonymous}
            style={{
              width: "100%", padding: "10px 14px",
              border: "1.5px solid #E8DFD0", borderRadius: 10,
              fontFamily: "var(--font-body, sans-serif)", fontSize: "0.9rem",
              color: "#1A1A2E", background: anonymous ? "#EDE8E0" : "#fff",
              outline: "none", boxSizing: "border-box", marginBottom: 14,
              transition: "background 0.2s",
            }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 22, userSelect: "none" }}>
            <div
              onClick={() => setAnonymous((v) => !v)}
              style={{
                width: 38, height: 22, borderRadius: 999, position: "relative",
                background: anonymous ? "#FF6B35" : "#D0C9BE",
                transition: "background 0.25s", flexShrink: 0, cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", top: 3,
                left: anonymous ? "calc(100% - 19px)" : 3,
                width: 16, height: 16, borderRadius: "50%", background: "#fff",
                transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }} />
            </div>
            <span style={{ fontSize: "0.84rem", color: "#8B8070", fontFamily: "var(--font-body, sans-serif)" }}>
              Like anonymously
            </span>
          </label>
          <button
            type="submit"
            style={{
              width: "100%", padding: "11px 0",
              background: "#FF6B35", color: "#fff", border: "none",
              borderRadius: 999, fontFamily: "var(--font-body, sans-serif)",
              fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#e05a28")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#FF6B35")}
          >
            Send Love ♥
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function LikeButtonDesktop() {
  const [count, setCount]         = useState<number | null>(null); // null = loading
  const [liked, setLiked]         = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [burst, setBurst]         = useState(false);

  // Fetch real count from DB on mount
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
      // POST to DB — response includes updated total
      const res  = await fetch(LIKES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, anonymous }),
      });
      const data = await res.json();
      if (data.total !== undefined) setCount(data.total);
    } catch {
      // Fallback: increment locally if API unreachable
      setCount((c) => (c ?? 0) + 1);
    }

    // Email notification
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_LIKE_TEMPLATE_ID,
        { liker_name: anonymous ? "Anonymous" : name, to_email: "sahil@tinypixel.in" },
        EMAILJS_PUBLIC_KEY
      );
    } catch { /* silent */ }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", bottom: 24, left: 28, zIndex: 200, display: "flex", alignItems: "center", gap: 8 }}
        className="like-desktop-only"
      >
        <button
          onClick={() => { if (!liked) setShowModal(true); }}
          disabled={liked}
          title={liked ? "You already liked this!" : "Like this portfolio"}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 999,
            border: liked ? "1.5px solid #FF6B35" : "1.5px solid rgba(26,26,46,0.18)",
            background: liked ? "rgba(255,107,53,0.1)" : "rgba(245,240,232,0.85)",
            backdropFilter: "blur(8px)",
            cursor: liked ? "default" : "pointer",
            transition: "all 0.25s ease",
            transform: burst ? "scale(1.3)" : "scale(1)",
            boxShadow: "0 2px 12px rgba(26,26,46,0.08)",
          }}
        >
          <span style={{
            fontSize: 18, display: "inline-block",
            transform: burst ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            {liked ? "🩷" : "🤍"}
          </span>
          {/* Show count when loaded, show · while loading */}
          <span style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "0.78rem", fontWeight: 700,
            color: liked ? "#FF6B35" : "#8B8070",
            letterSpacing: "0.04em", minWidth: 14,
          }}>
            {count === null ? "·" : count > 0 ? count : ""}
          </span>
        </button>

        <AnimatePresence>
          {liked && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: "0.72rem", color: "#FF6B35", fontFamily: "var(--font-body, sans-serif)", fontWeight: 500, whiteSpace: "nowrap" }}
            >
              Thanks! 🙌
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <LikeModal onConfirm={handleConfirm} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .like-desktop-only { display: flex !important; }
        @media (max-width: 768px) {
          .like-desktop-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
