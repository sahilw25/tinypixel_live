'use client'
import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Real GLB model ─── */
function Model({ onBagClick }: { onBagClick: () => void }) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const bow = actions['NLAtrack.001']
    const idle = actions['NLAtrack']
    if (bow) {
      bow.setLoop(THREE.LoopOnce, 1)
      bow.clampWhenFinished = true
      bow.play()
      const t = setTimeout(() => {
        bow.fadeOut(0.5)
        idle?.reset().fadeIn(0.5).play()
      }, 2500)
      return () => clearTimeout(t)
    } else {
      idle?.play()
    }
  }, [actions])

  return (
    <group ref={group} onClick={(e) => { e.stopPropagation(); onBagClick() }} dispose={null}>
      <primitive object={scene} scale={2} position={[0, -1.5, 0]} />
    </group>
  )
}

/* ─── Fallback character (no GLB needed) ─── */
function FallbackModel({ onBagClick }: { onBagClick: () => void }) {
  const bodyRef = useRef<THREE.Group>(null)
  const bagRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.07
    }
    if (bagRef.current) {
      bagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.4) * 0.06
    }
  })

  return (
    <group ref={bodyRef}>
      {/* Torso */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 1.0, 24]} />
        <meshStandardMaterial color="#E8DFD0" roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#F5F0E8" roughness={0.5} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.1, 1.1, 0.28]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[0.1, 1.1, 0.28]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#1A1A2E" />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.52, 0.15, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.1, 0.09, 0.75, 16]} />
        <meshStandardMaterial color="#E8DFD0" roughness={0.6} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.52, 0.12, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.1, 0.09, 0.75, 16]} />
        <meshStandardMaterial color="#E8DFD0" roughness={0.6} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.17, -0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.7} />
      </mesh>
      <mesh position={[0.17, -0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.7} />
      </mesh>
      {/* Bag – clickable */}
      <mesh
        ref={bagRef}
        position={[0.78, -0.05, 0]}
        onClick={(e) => { e.stopPropagation(); onBagClick() }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.38, 0.46, 0.22]} />
        <meshStandardMaterial color={hovered ? '#FF6B35' : '#1A1A2E'} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Bag handle */}
      <mesh position={[0.78, 0.28, 0]}>
        <torusGeometry args={[0.1, 0.022, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.5} />
      </mesh>
      {/* Bag clasp */}
      <mesh position={[0.78, 0.04, 0.12]}>
        <circleGeometry args={[0.04, 12]} />
        <meshStandardMaterial color="#FF6B35" />
      </mesh>
    </group>
  )
}

/* ─── Ripple hint ring ─── */
function RippleRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime % 2) / 2
    ref.current.scale.setScalar(1 + t * 1.8)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.45 * (1 - t)
  })
  return (
    <mesh ref={ref} position={[0.78, -0.05, 0.12]}>
      <ringGeometry args={[0.24, 0.3, 32]} />
      <meshBasicMaterial color="#FF6B35" transparent opacity={0.45} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ─── Floor shadow plane ─── */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial opacity={0.18} />
    </mesh>
  )
}

/* ─── Model loader: checks if /model.glb exists, falls back otherwise ─── */
function ModelWithFallback({ onBagClick }: { onBagClick: () => void }) {
  const [hasModel, setHasModel] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/model.glb', { method: 'HEAD' })
      .then(r => setHasModel(r.ok))
      .catch(() => setHasModel(false))
  }, [])

  if (hasModel === null) return null
  if (!hasModel) return <FallbackModel onBagClick={onBagClick} />

  return (
    <Suspense fallback={<FallbackModel onBagClick={onBagClick} />}>
      <Model onBagClick={onBagClick} />
    </Suspense>
  )
}

/* ─── Main export ─── */
export default function ThreeScene({ onBagClick }: { onBagClick: () => void }) {
  const [showRipple, setShowRipple] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowRipple(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 4.2], fov: 44 }}
      style={{ background: '#F5F0E8' }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 8, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -4]} intensity={0.35} color="#FFD4A8" />
      <pointLight position={[0, 3, 3]} intensity={0.4} color="#FF6B35" distance={8} />

      <ModelWithFallback onBagClick={onBagClick} />
      {showRipple && <RippleRing />}
      <Floor />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.75}
        rotateSpeed={0.6}
      />
    </Canvas>
  )
}
