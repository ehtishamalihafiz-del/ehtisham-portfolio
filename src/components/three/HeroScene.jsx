import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { attachPointer, pointer } from './pointer'
import { isLowPowerDevice } from '../../hooks/useMediaQuery'

const PALETTE = ['#3764D8', '#3764D8', '#36B5C5', '#A5A1EB']
const RADIUS = 2.6

/* Evenly distributed points on a sphere */
function fibonacciSphere(n, r) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = r * (0.96 + Math.random() * 0.08)
    pts.push(new THREE.Vector3(Math.cos(theta) * rad * jitter, y * jitter, Math.sin(theta) * rad * jitter))
  }
  return pts
}

/* Connect every node to its k nearest neighbours (deduplicated) */
function buildEdges(pts, k) {
  const edges = new Map()
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => [j, p.distanceToSquared(q)])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, k)
    near.forEach(([j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!edges.has(key)) edges.set(key, [Math.min(i, j), Math.max(i, j)])
    })
  })
  return [...edges.values()]
}

function NetworkGlobe({ count, packets, reduced }) {
  const group = useRef()
  const nodesRef = useRef()
  const packetsRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { pts, edges, linePositions, colors, scales } = useMemo(() => {
    const pts = fibonacciSphere(count, RADIUS)
    const edges = buildEdges(pts, 3)
    const linePositions = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      pts[a].toArray(linePositions, i * 6)
      pts[b].toArray(linePositions, i * 6 + 3)
    })
    const colors = pts.map(() => new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]))
    const scales = pts.map(() => (Math.random() < 0.12 ? 1.9 : 0.7 + Math.random() * 0.6))
    return { pts, edges, linePositions, colors, scales }
  }, [count])

  /* Packets travelling along random edges */
  const packetState = useMemo(
    () =>
      Array.from({ length: packets }, () => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.35 + Math.random() * 0.45,
        dir: Math.random() > 0.5 ? 1 : -1,
      })),
    [packets, edges],
  )
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    const mesh = nodesRef.current
    if (!mesh) return
    pts.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.scale.setScalar(scales[i])
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, colors[i])
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [pts, colors, scales, dummy])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const d = Math.min(delta, 0.05)
    if (!reduced) g.rotation.y += d * 0.09
    // Gentle parallax toward the pointer
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.22, 2.5, d)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -pointer.x * 0.08, 2.5, d)
    g.position.x = THREE.MathUtils.damp(g.position.x, pointer.x * 0.18, 2.5, d)

    const pm = packetsRef.current
    if (!pm || reduced) return
    packetState.forEach((pk, i) => {
      pk.t += d * pk.speed
      if (pk.t >= 1) {
        // hop to a connected edge to keep traffic flowing
        const end = pk.dir === 1 ? pk.edge[1] : pk.edge[0]
        const next = edges.filter((e) => e[0] === end || e[1] === end)
        pk.edge = next[Math.floor(Math.random() * next.length)] || edges[0]
        pk.dir = pk.edge[0] === end ? 1 : -1
        pk.t = 0
      }
      const [a, b] = pk.dir === 1 ? pk.edge : [pk.edge[1], pk.edge[0]]
      tmp.lerpVectors(pts[a], pts[b], pk.t)
      dummy.position.copy(tmp)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      pm.setMatrixAt(i, dummy.matrix)
    })
    pm.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group} rotation={[0.35, 0, 0.12]}>
      {/* soft inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#EAF1FE" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3764D8" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, pts.length]}>
        <sphereGeometry args={[0.038, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {!reduced && (
        <instancedMesh ref={packetsRef} args={[undefined, undefined, packets]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color="#36B5C5" toneMapped={false} />
        </instancedMesh>
      )}
      <OrbitRing radius={RADIUS + 0.3} tilt={[1.2, 0.2, 0.3]} color="#A5A1EB" speed={0.35} reduced={reduced} />
      <OrbitRing radius={RADIUS + 0.55} tilt={[1.75, -0.4, -0.2]} color="#36B5C5" speed={-0.22} reduced={reduced} />
    </group>
  )
}

function OrbitRing({ radius, tilt, color, speed, reduced }) {
  const sat = useRef()
  useFrame(({ clock }) => {
    if (!sat.current) return
    const t = reduced ? 0.8 : clock.elapsedTime * speed
    sat.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
  })
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.75} />
      </mesh>
      <mesh ref={sat}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Faceted pastel "gems" floating around the globe */
function Gem({ position, geometry = 'ico', scale = 0.32, color = '#CFE0FB', speed = 1.4 }) {
  return (
    <Float speed={speed} rotationIntensity={1.1} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        {geometry === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'oct' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'tet' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} flatShading roughness={0.35} metalness={0.05} />
      </mesh>
    </Float>
  )
}

function Dust({ count }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return arr
  }, [count])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8E8AE0" size={0.03} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}

export default function HeroScene({ active = true, reduced = false }) {
  useEffect(() => attachPointer(), [])
  const low = useMemo(() => isLowPowerDevice(), [])

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? [1, 1.5] : [1, 2]}
      frameloop={active && !reduced ? 'always' : 'demand'}
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#A5A1EB" />
      <NetworkGlobe count={low ? 70 : 120} packets={low ? 6 : 12} reduced={reduced} />
      {!low && <Dust count={140} />}
      <Gem position={[-2.6, 2.35, 0.4]} geometry="ico" scale={0.28} color="#CFE0FB" />
      <Gem position={[2.6, -2.45, 0.5]} geometry="oct" scale={0.3} color="#D6F1F4" speed={1.1} />
      {!low && <Gem position={[2.55, 2.5, -0.6]} geometry="tet" scale={0.22} color="#E2E0FA" speed={1.7} />}
    </Canvas>
  )
}
