'use client'

import { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ── Clipping plane — only show bottom half of globe ───────────────────────
function ClipSetup() {
  const { gl } = { gl: null as any }
  return null
}

// ── The actual GLB model ──────────────────────────────────────────────────
function GlobeModel() {
  const { scene } = useGLTF('/3dglobe-v1.glb')
  const groupRef = useRef<THREE.Group>(null)
  const cloned = useMemo(() => scene.clone(), [scene])

  // ── Center model at world origin ──────────────────────────────────────
  // Compute bounding box of the entire GLB, find its centre, then offset
  // the inner group by -centre so the geometric middle sits at (0,0,0).
  // This makes the clip plane and OrbitControls target the true centre
  // regardless of where the artist placed the model's origin in the file.
  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const center = new THREE.Vector3()
    box.getCenter(center)
    return center.negate()
  }, [cloned])

  // Slow auto-rotation on Y axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  // Apply clipping plane to all meshes
  useEffect(() => {
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.04)
    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((mat) => {
          mat.clippingPlanes = [clipPlane]
          mat.clipShadows = true
          mat.needsUpdate = true
        })
      }
    })
  }, [cloned])

  return (
    <group ref={groupRef}>
      {/* Shift model so its bounding-box centre aligns with world origin */}
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={cloned} />
      </group>
    </group>
  )
}

// ── Main exported component ───────────────────────────────────────────────
export default function OzoGlobe({ height = 260 }: { height?: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        width: '100%',
        height: typeof height === 'string' ? height : height,
        overflow: 'hidden',
        position: 'relative',
        cursor: hovered ? 'grabbing' : 'grab',
        // Fade from transparent at top → fully visible at 40% down
        // Makes it look like the globe is emerging from below the logo
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black %)',
        maskImage:        'linear-gradient(to bottom, transparent 0%, black 38%)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drag hint */}
      {/* <p style={{
        position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.6rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(255,88,134,0.45)', zIndex: 10, pointerEvents: 'none',
        margin: 0,
      }}>
        drag to rotate
      </p> */}

      <Canvas
        camera={{ position: [0, -0.2, 0.9], fov: 52 }}
        style={{ background: 'transparent', height: '100%' }}
        gl={{ alpha: true, antialias: true, localClippingEnabled: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 3, 4]} intensity={1.4} />
        <directionalLight position={[-3, -1, -2]} intensity={0.4} color="#FFE8D6" />
        <pointLight position={[0, 7, 2]} intensity={0.6} color="#FF5886" />

        <Suspense fallback={null}>
          <GlobeModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.35}
          // Lock to horizontal rotation only
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

// Preload so it starts fetching immediately
useGLTF.preload('/3dglobe-v1.glb')
