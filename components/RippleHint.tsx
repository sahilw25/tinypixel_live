"use client";

import { useEffect, useRef, useState } from "react";

interface RippleProps {
  x: number;       // projected bag position 0-1
  y: number;
  offsetX?: number; // manual nudge in % of canvas width  (default 0)
  offsetY?: number; // manual nudge in % of canvas height (default 0)
}

export default function RippleHint({ x, y, offsetX = 0, offsetY = 0 }: RippleProps) {
  const [waves, setWaves] = useState<number[]>([]);
  const counterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fire = () => {
    const id = counterRef.current++;
    setWaves((w) => [...w, id]);
    setTimeout(() => setWaves((w) => w.filter((v) => v !== id)), 3500);
  };

  useEffect(() => {
    if (x === 0 && y === 0) return;
    const t = setTimeout(() => {
      fire();
      intervalRef.current = setInterval(fire, 10000);
    }, 2000);
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalX = x * 100 + offsetX;
  const finalY = y * 100 + offsetY;

  if (waves.length === 0) return null;

  return (
    <>
      {waves.map((id) => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{ left: `${finalX}%`, top: `${finalY}%`, transform: "translate(-50%, -50%)", zIndex: 30 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              position: "absolute", width: 44, height: 44, top: -22, left: -22,
              borderRadius: "50%", border: "2px solid #FF6B35",
              animation: `rippleGo 1.8s ease-out ${i * 0.4}s forwards`, opacity: 0,
            }} />
          ))}
          <span style={{
            position: "absolute", width: 10, height: 10, top: -5, left: -5,
            borderRadius: "50%", background: "#FF6B35",
            animation: "dotPulse 0.9s ease-in-out 4",
          }} />
          <span style={{
            position: "absolute", top: 32, left: "50%", transform: "translateX(-50%)",
            fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#FF6B35", whiteSpace: "nowrap",
            animation: "labelIn 0.5s 0.4s forwards", opacity: 0,
          }}>
            click bag
          </span>
        </div>
      ))}
      <style>{`
        @keyframes rippleGo  { 0% { transform:scale(0.3);opacity:0.9} 100%{transform:scale(3.8);opacity:0} }
        @keyframes dotPulse  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:0.4} }
        @keyframes labelIn   { to { opacity:1 } }
      `}</style>
    </>
  );
}
