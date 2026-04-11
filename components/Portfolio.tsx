"use client";

import { Suspense, useState, useCallback, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import Model from "./Model";
import InfoPanel from "./InfoPanel";
import DesignCards from "./DesignCards";
import AnimationButtons from "./AnimationButtons";
import RippleHint from "./RippleHint";
import ModelAdjuster, { Transform } from "./ModelAdjuster";
import ContactPopup from "./ContactPopup";
import LikeButtonDesktop from "./LikeButtonDesktop";

type AnimName = "idle" | "bow";

const DEFAULT_TRANSFORM: Transform = {
  x: 0, y: -0.95, z: 0,
  rotX: 0, rotY: -1.44, rotZ: 0,
  scale: 2.95,
  camX: 0, camY: 0.8, camZ: 2.8,
  camFov: 42,
  targetY: 0.3,
  rippleOffsetX: 0,
  rippleOffsetY: 50,
};

const DEV_MODE = false;

// 🔍 Detect low-end devices (Android + low memory/CPU)
function useDeviceTier() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const lowMemory =
      (navigator as any).deviceMemory !== undefined &&
      (navigator as any).deviceMemory <= 4;
    const lowCPU =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;
    setIsLowEnd(isAndroid && (lowMemory || lowCPU));
  }, []);
  return isLowEnd;
}

// Optimized Canvas — adapts quality to device tier
function ModelCanvas({
  transform,
  animTrigger,
  onBagClick,
  onBagScreenPos,
  onCreated,
  isLowEnd,
}: {
  transform: Transform;
  animTrigger: { name: AnimName; count: number } | null;
  onBagClick: () => void;
  onBagScreenPos: (pos: { x: number; y: number }) => void;
  onCreated: () => void;
  isLowEnd: boolean;
}) {
  // Cap DPR lower on weak devices to reduce fill-rate cost
  const dpr: [number, number] = isLowEnd ? [1, 1.25] : [1, 1.75];

  return (
    <Canvas
      camera={{
        position: [transform.camX, transform.camY, transform.camZ],
        fov: transform.camFov,
      }}
      shadows={!isLowEnd}
      dpr={dpr}
      gl={{
        antialias: !isLowEnd,
        alpha: true,
        powerPreference: isLowEnd ? "low-power" : "high-performance",
        // Bail out gracefully if GPU can't meet minimum requirements
        failIfMajorPerformanceCaveat: true,
      }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        {/* Ambient — slightly dimmer on weak devices */}
        <ambientLight intensity={isLowEnd ? 0.9 : 1.2} />

        {/* Shadow-casting light only on capable devices */}
        {!isLowEnd && (
          <directionalLight
            position={[3, 6, 4]}
            intensity={2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
        )}

        {/* Extra accent lights — desktop/high-end only */}
        {!isLowEnd && (
          <>
            <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#FFE8D6" />
            <pointLight position={[0, 4, 2]} intensity={0.5} color="#FF6B35" />
          </>
        )}

        {/* Lighter env preset on mobile saves GPU bandwidth */}
        <Environment preset={isLowEnd ? "sunset" : "city"} />

        <Model
          onBagClick={onBagClick}
          onBagScreenPos={onBagScreenPos}
          animTrigger={animTrigger}
          transform={transform}
        />

        {/* Contact shadows skipped on low-end — expensive per-frame blur */}
        {!isLowEnd && (
          <ContactShadows
            position={[0, transform.y + 0.05, 0]}
            opacity={0.25}
            scale={6}
            blur={2.5}
            far={4}
            color="#1A1A2E"
          />
        )}

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.7}
          target={[0, transform.targetY, 0]}
        />
      </Suspense>
    </Canvas>
  );
}

export default function Portfolio() {
  const [cardsOpen, setCardsOpen] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [animTrigger, setAnimTrigger] = useState<{
    name: AnimName;
    count: number;
  } | null>(null);
  const [activeAnim, setActiveAnim] = useState<AnimName | null>(null);
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);
  const [bagPos, setBagPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isLowEnd = useDeviceTier();

  // Detect breakpoint once on mount — ensures only ONE Canvas is ever mounted
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleBagClick = useCallback(() => setCardsOpen(true), []);
  const handleBagScreenPos = useCallback(
    (pos: { x: number; y: number }) => setBagPos(pos),
    []
  );
  const handleAnimTrigger = useCallback((name: AnimName) => {
    setActiveAnim(name);
    setAnimTrigger((prev) => ({ name, count: (prev?.count ?? 0) + 1 }));
  }, []);

  // ✅ Memoized canvas — prevents full WebGL teardown on unrelated state changes
  const canvas = useMemo(
    () => (
      <ModelCanvas
        transform={transform}
        animTrigger={animTrigger}
        onBagClick={handleBagClick}
        onBagScreenPos={isMobile ? () => {} : handleBagScreenPos}
        onCreated={() => setModelReady(true)}
        isLowEnd={isLowEnd}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transform, animTrigger, isMobile, isLowEnd]
  );

  return (
    <div className="portfolio-root">
      {/* ── Top-right action buttons ── */}
      <div className="top-right-actions">
        <button
          data-hover
          onClick={() => setContactOpen(true)}
          className="tr-btn tr-btn--outline"
        >
          Contact Me
        </button>
        <a
          href="/cv.pdf"
          data-hover
          className="tr-btn tr-btn--solid"
          download="Sahil-Walawalkar_UX_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: "#FF6B35" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#1A1A2E 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Desktop layout ── */}
      <div className="desktop-layout">
        <div className="canvas-panel">
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
            style={{ pointerEvents: "auto" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <AnimationButtons onPlay={handleAnimTrigger} activeAnim={activeAnim} />
          </div>

          {/* Canvas rendered here on desktop only */}
          {!isMobile && canvas}

          <div className="absolute inset-0 pointer-events-none">
            {bagPos.x > 0 && (
              <RippleHint
                x={bagPos.x}
                y={bagPos.y}
                offsetX={transform.rippleOffsetX}
                offsetY={transform.rippleOffsetY}
              />
            )}
            <motion.div
              className="absolute bottom-6 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-[#8B8070] text-[10px] tracking-[0.3em] uppercase font-body">
                Drag to rotate
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="w-px bg-[#E8DFD0] flex-shrink-0 self-stretch my-12"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="info-panel-wrapper">
          <InfoPanel
            onGetInTouch={() => setContactOpen(true)}
            onPortfolioClick={() => setCardsOpen(true)}
            showLikeButton={false}
          />
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="mobile-layout">
        <div className="mobile-canvas-wrap">
          {/* Canvas rendered here on mobile only — never both at once */}
          {isMobile && canvas}
          <p className="text-[#8B8070] text-[10px] tracking-[0.3em] uppercase font-body text-center pb-1">
            Drag to rotate
          </p>
        </div>

        <div className="mobile-info-wrap">
          <InfoPanel
            onGetInTouch={() => setContactOpen(true)}
            onPortfolioClick={() => setCardsOpen(true)}
            showLikeButton={true}
          />
        </div>
      </div>

      <DesignCards open={cardsOpen} onClose={() => setCardsOpen(false)} />
      <ContactPopup isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      {DEV_MODE && <ModelAdjuster onChange={setTransform} />}

      <LikeButtonDesktop />

      <style jsx global>{`
        .portfolio-root {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          background: #f5f0e8;
          overflow-x: hidden;
        }
        .top-right-actions {
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tr-btn {
          font-family: var(--font-body, sans-serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
        }
        .tr-btn--outline {
          border: 1.5px solid #1a1a2e;
          background: rgba(245, 240, 232, 0.85);
          backdrop-filter: blur(8px);
          color: #1a1a2e;
        }
        .tr-btn--outline:hover {
          background: #1a1a2e;
          color: #fff;
        }
        .tr-btn--solid {
          border: 1.5px solid #ff6b35;
          background: #ff6b35;
          color: #fff;
        }
        .tr-btn--solid:hover {
          background: #e05a28;
          border-color: #e05a28;
        }
        .desktop-layout {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .canvas-panel {
          position: relative;
          flex-shrink: 0;
          width: 40%;
          height: 100%;
        }
        .info-panel-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .mobile-layout {
          display: none;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }
        .mobile-canvas-wrap {
          width: 100%;
          height: 58vw;
          min-height: 300px;
          max-height: 440px;
          position: relative;
          flex-shrink: 0;
          margin-top: 56px;
        }
        .mobile-info-wrap {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 3rem;
        }
        @media (max-width: 768px) {
          .desktop-layout {
            display: none !important;
          }
          .mobile-layout {
            display: flex !important;
          }
          .top-right-actions {
            top: 10px;
            right: 12px;
            gap: 6px;
          }
          .tr-btn {
            font-size: 0.68rem;
            padding: 6px 12px;
          }
        }
      `}</style>
    </div>
  );
}
