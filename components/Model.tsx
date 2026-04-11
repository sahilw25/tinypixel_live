"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Transform } from "./ModelAdjuster";

interface ModelProps {
  onBagClick: () => void;
  onBagScreenPos: (pos: { x: number; y: number }) => void;
  animTrigger: { name: "idle" | "bow"; count: number } | null;
  transform: Transform;
}

const BAG_LOCAL = new THREE.Vector3(0.014, 0.538, -0.092);
// Pre-allocated scratch object — avoids per-frame heap allocations
const _worldBag = new THREE.Vector3();

export default function Model({
  onBagClick,
  onBagScreenPos,
  animTrigger,
  transform,
}: ModelProps) {
  const group = useRef<THREE.Group>(null);

  // ✅ Draco compressed loading — smaller decode time on mobile
  const { scene, animations } = useGLTF("/model.glb", true);

  const { actions, mixer } = useAnimations(animations, group);
  const { camera } = useThree();

  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const frame = useRef(0);

  // 🔥 ONE-TIME SCENE OPTIMIZATION — applied once after GLB loads
  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        // Cull geometry outside view frustum
        obj.frustumCulled = true;

        // Shadows are expensive on mobile — skip entirely
        obj.castShadow = false;
        obj.receiveShadow = false;

        // Use the default prototype raycast (fastest path)
        obj.raycast = THREE.Mesh.prototype.raycast;

        if (obj.material) {
          // Reduce env-map contribution (heavy on mobile GPUs)
          obj.material.envMapIntensity *= 0.6;

          // Downscale textures larger than 1024 — avoids GPU memory thrash
          if (obj.material.map?.image) {
            const img = obj.material.map.image;
            if (img.width > 1024) {
              obj.material.map.minFilter = THREE.LinearFilter;
              obj.material.map.generateMipmaps = false;
            }
          }
        }
      }
    });
  }, [scene]);

  // 🎬 Intro bow — plays once on first load
  useEffect(() => {
    if (!actions || hasPlayedIntro) return;
    const bow = actions["NlaTrack.001"];
    if (!bow) return;
    bow.reset().setLoop(THREE.LoopOnce, 1);
    bow.clampWhenFinished = true;
    bow.play();
    setHasPlayedIntro(true);
    const cb = (e: any) => {
      if (e.action === bow) {
        bow.stop();
        mixer.removeEventListener("finished", cb);
      }
    };
    mixer.addEventListener("finished", cb);
  }, [actions, mixer, hasPlayedIntro]);

  // 🎮 Animation button triggers — faster fade times = snappier transitions
  useEffect(() => {
    if (!animTrigger || !actions) return;
    Object.values(actions).forEach((a) => a?.fadeOut(0.15));
    if (animTrigger.name === "idle") {
      actions["NlaTrack"]
        ?.reset()
        .fadeIn(0.2)
        .setLoop(THREE.LoopRepeat, Infinity)
        .play();
    } else {
      const bow = actions["NlaTrack.001"];
      bow?.reset().fadeIn(0.15).setLoop(THREE.LoopOnce, 1).play();
    }
  }, [animTrigger, actions]);

  // ⚡ Lightweight frame loop
  // Float runs every frame (cheap sin). NDC projection throttled to every 8 frames.
  useFrame((state) => {
    if (!group.current) return;

    group.current.position.y =
      transform.y + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;

    if (++frame.current % 8 !== 0) return;

    _worldBag.copy(BAG_LOCAL).applyMatrix4(group.current.matrixWorld);
    const ndc = _worldBag.clone().project(camera);
    const px = ndc.x * 0.5 + 0.5;
    const py = -ndc.y * 0.5 + 0.5;

    if (px > 0 && px < 1 && py > 0 && py < 1) {
      onBagScreenPos({ x: px, y: py });
    }
  });

  // 🎯 Click handler — walks the hierarchy to find the bag mesh
  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      let obj: THREE.Object3D | null = e.object;
      while (obj) {
        if (obj.name === "tripo_part_9") {
          onBagClick();
          return;
        }
        obj = obj.parent;
      }
    },
    [onBagClick]
  );

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={transform.scale}
        position={[transform.x, transform.y, transform.z]}
        rotation={[transform.rotX, transform.rotY, transform.rotZ]}
        onClick={handleClick}
      />
    </group>
  );
}

// 🔥 Preload with Draco — starts decoding before component mounts
useGLTF.preload("/model.glb", true);
