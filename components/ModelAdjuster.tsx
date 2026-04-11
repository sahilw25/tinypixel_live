"use client";

import { useState } from "react";

export interface Transform {
  x: number; y: number; z: number;
  rotX: number; rotY: number; rotZ: number;
  scale: number;
  camX: number; camY: number; camZ: number;
  camFov: number;
  targetY: number;
  rippleOffsetX: number;  // % nudge on projected bag X
  rippleOffsetY: number;  // % nudge on projected bag Y
}

const DEFAULT: Transform = {
  x: 0, y: -0.95, z: 0,
  rotX: 0, rotY: -1.44, rotZ: 0,
  scale: 2.95,
  camX: 0, camY: 0.8, camZ: 2.8,
  camFov: 42,
  targetY: 0.3,
  rippleOffsetX: 0,
  rippleOffsetY: 0,
};

function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-right text-[#8B8070] shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 accent-[#FF6B35]" />
      <span className="w-14 text-[#1A1A2E] font-mono text-right">{value.toFixed(2)}</span>
    </div>
  );
}

export default function ModelAdjuster({ onChange }: { onChange: (t: Transform) => void }) {
  const [t, setT] = useState<Transform>(DEFAULT);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof Transform, val: number) => {
    const next = { ...t, [key]: val };
    setT(next);
    onChange(next);
  };

  const code = `const DEFAULT_TRANSFORM: Transform = {
  x: ${t.x}, y: ${t.y.toFixed(3)}, z: ${t.z},
  rotX: ${t.rotX}, rotY: ${t.rotY.toFixed(3)}, rotZ: ${t.rotZ},
  scale: ${t.scale.toFixed(2)},
  camX: ${t.camX}, camY: ${t.camY.toFixed(2)}, camZ: ${t.camZ.toFixed(2)},
  camFov: ${t.camFov},
  targetY: ${t.targetY.toFixed(2)},
  rippleOffsetX: ${t.rippleOffsetX.toFixed(1)},
  rippleOffsetY: ${t.rippleOffsetY.toFixed(1)},
};`;

  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const reset = () => { setT(DEFAULT); onChange(DEFAULT); };

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] bg-white border border-[#E8DFD0] rounded-2xl shadow-xl overflow-hidden"
      style={{ width: 340 }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A2E] cursor-pointer select-none"
        onClick={() => setOpen(!open)}>
        <span className="text-white text-xs font-bold tracking-widest uppercase">⚙ Model Adjuster</span>
        <span className="text-[#FF6B35] text-xs">{open ? "▲ hide" : "▼ show"}</span>
      </div>

      {open && (
        <div className="p-4 flex flex-col gap-2 max-h-[82vh] overflow-y-auto">

          <p className="text-[10px] tracking-widest text-[#FF6B35] uppercase">Position</p>
          <Slider label="pos X"    value={t.x}    min={-3}   max={3}   step={0.01} onChange={(v) => update("x", v)} />
          <Slider label="pos Y"    value={t.y}    min={-5}   max={2}   step={0.05} onChange={(v) => update("y", v)} />
          <Slider label="pos Z"    value={t.z}    min={-3}   max={3}   step={0.01} onChange={(v) => update("z", v)} />

          <p className="text-[10px] tracking-widest text-[#FF6B35] uppercase mt-1">Rotation (rad)</p>
          <Slider label="rot X"    value={t.rotX} min={-3.14} max={3.14} step={0.01} onChange={(v) => update("rotX", v)} />
          <Slider label="rot Y"    value={t.rotY} min={-3.14} max={3.14} step={0.01} onChange={(v) => update("rotY", v)} />
          <Slider label="rot Z"    value={t.rotZ} min={-3.14} max={3.14} step={0.01} onChange={(v) => update("rotZ", v)} />

          <p className="text-[10px] tracking-widest text-[#FF6B35] uppercase mt-1">Scale</p>
          <Slider label="scale"    value={t.scale} min={0.1} max={6}  step={0.05} onChange={(v) => update("scale", v)} />

          <p className="text-[10px] tracking-widest text-[#FF6B35] uppercase mt-1">Camera</p>
          <Slider label="cam X"    value={t.camX}  min={-3}  max={3}  step={0.05} onChange={(v) => update("camX", v)} />
          <Slider label="cam Y"    value={t.camY}  min={-2}  max={5}  step={0.05} onChange={(v) => update("camY", v)} />
          <Slider label="cam Z"    value={t.camZ}  min={0.5} max={10} step={0.1}  onChange={(v) => update("camZ", v)} />
          <Slider label="FOV"      value={t.camFov} min={20} max={90} step={1}    onChange={(v) => update("camFov", v)} />
          <Slider label="target Y" value={t.targetY} min={-2} max={3} step={0.05} onChange={(v) => update("targetY", v)} />

          <p className="text-[10px] tracking-widest text-[#FF6B35] uppercase mt-1">🎯 Ripple Offset (nudge %)</p>
          <Slider label="ripple X" value={t.rippleOffsetX} min={-30} max={30} step={0.5} onChange={(v) => update("rippleOffsetX", v)} />
          <Slider label="ripple Y" value={t.rippleOffsetY} min={-30} max={30} step={0.5} onChange={(v) => update("rippleOffsetY", v)} />

          <div className="mt-2 bg-[#F5F0E8] rounded-xl p-3">
            <p className="text-[10px] text-[#8B8070] mb-2 uppercase tracking-widest">Generated Code</p>
            <pre className="text-[10px] text-[#1A1A2E] whitespace-pre-wrap leading-relaxed">{code}</pre>
          </div>

          <div className="flex gap-2 mt-1">
            <button onClick={copy}
              className="flex-1 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#e55a24] transition-colors">
              {copied ? "✓ Copied!" : "Copy Code"}
            </button>
            <button onClick={reset}
              className="px-4 py-2 rounded-xl bg-[#E8DFD0] text-[#1A1A2E] text-xs font-bold hover:bg-[#d4c9b5] transition-colors">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
