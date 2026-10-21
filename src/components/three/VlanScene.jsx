import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { isLowPowerDevice } from '../../hooks/useMediaQuery'

/* --------------------------------------------------------------------------
   Interactive model of a small switched network:
   R1 (router-on-a-stick) ── SW1 ══ trunk ══ SW2, hosts in VLAN 10 / 20 / 30.
   Same-VLAN traffic crosses the trunk; inter-VLAN traffic is routed via R1.
   -------------------------------------------------------------------------- */

export const VLANS = {
  10: { color: '#3764D8', name: 'VLAN 10' },
  20: { color: '#9A95E6', name: 'VLAN 20' },
  30: { color: '#36B5C5', name: 'VLAN 30' },
}
const DIM = '#CBD5E1'

const ROUTER = new THREE.Vector3(0, 1.75, 0)
const SWITCHES = [new THREE.Vector3(-1.85, 0.15, 0), new THREE.Vector3(1.85, 0.15, 0)]

const HOST_LAYOUT = [
  // [switchIndex, vlan]
  [0, 10], [0, 20], [0, 30], [0, 10], [0, 20],
  [1, 10], [1, 30], [1, 20], [1, 30], [1, 10],
]

function buildHosts() {
  const perSwitch = [0, 0]
  return HOST_LAYOUT.map(([sw, vlan], i) => {
    const k = perSwitch[sw]++
    // fan the hosts out in front of / around their switch
    const theta = THREE.MathUtils.degToRad(-64 + k * 32)
    const base = SWITCHES[sw]
    const pos = new THREE.Vector3(
      base.x + Math.sin(theta) * 1.25,
      -1.3 - (k % 2) * 0.22,
      Math.cos(theta) * 1.05 - 0.25,
    )
    return { id: i, sw, vlan, pos }
  })
}

function pathBetween(src, dst) {
  const a = SWITCHES[src.sw]
  const b = SWITCHES[dst.sw]
  if (src.vlan === dst.vlan) {
    return src.sw === dst.sw ? [src.pos, a, dst.pos] : [src.pos, a, b, dst.pos]
  }
  // inter-VLAN: routed through R1
  return [src.pos, a, ROUTER, b, dst.pos]
}

function Link({ from, to, color, opacity = 0.5, width = 1 }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([...from.toArray(), ...to.toArray()], 3))
    return g
  }, [from, to])
  useEffect(() => () => geom.dispose(), [geom])
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={width} />
    </lineSegments>
  )
}

/* Thick link for the trunk (lines can't be thick in WebGL, so use a tube) */
function Trunk({ from, to }) {
  const curve = useMemo(() => new THREE.LineCurve3(from, to), [from, to])
  return (
    <mesh>
      <tubeGeometry args={[curve, 1, 0.03, 8, false]} />
      <meshStandardMaterial color="#24324B" transparent opacity={0.55} />
    </mesh>
  )
}

/* Labels portal into our own overlay div (avoids a mount race with the canvas parent) */
const LabelLayer = createContext(null)

function Label({ position, children }) {
  const layer = useContext(LabelLayer)
  return (
    <Html position={position} center portal={layer} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
      <span className="whitespace-nowrap rounded-full border border-line bg-white/90 px-2 py-0.5 font-mono text-[10px] font-medium text-ink shadow-sm">
        {children}
      </span>
    </Html>
  )
}

function Packets({ hosts, selected, count, reduced }) {
  const refs = useRef([])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const state = useMemo(() => Array.from({ length: count }, () => ({ path: null, seg: 0, t: 0, speed: 1, color: '#fff' })), [count])

  const spawn = (pk) => {
    const pool = selected ? hosts.filter((h) => h.vlan === selected) : hosts
    const src = pool[Math.floor(Math.random() * pool.length)]
    let dst = src
    while (dst === src) dst = hosts[Math.floor(Math.random() * hosts.length)]
    pk.path = pathBetween(src, dst)
    pk.seg = 0
    pk.t = Math.random() * 0.4
    pk.speed = 1.1 + Math.random() * 0.7
    pk.color = VLANS[src.vlan].color
  }

  // re-seed when the VLAN filter changes
  useEffect(() => {
    state.forEach(spawn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, hosts])

  useFrame((_, delta) => {
    if (reduced) return
    const d = Math.min(delta, 0.05)
    state.forEach((pk, i) => {
      const mesh = refs.current[i]
      if (!mesh || !pk.path) return
      const a = pk.path[pk.seg]
      const b = pk.path[pk.seg + 1]
      const len = a.distanceTo(b) || 1
      pk.t += (d * pk.speed) / len
      if (pk.t >= 1) {
        pk.seg++
        pk.t = 0
        if (pk.seg >= pk.path.length - 1) spawn(pk)
      }
      const p0 = pk.path[pk.seg]
      const p1 = pk.path[pk.seg + 1]
      tmp.lerpVectors(p0, p1, pk.t)
      mesh.position.copy(tmp)
      mesh.material.color.set(pk.color)
    })
  })

  if (reduced) return null
  return state.map((_, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)}>
      <sphereGeometry args={[0.065, 14, 14]} />
      <meshBasicMaterial toneMapped={false} />
    </mesh>
  ))
}

function Topology({ selected, reduced, low }) {
  const hosts = useMemo(buildHosts, [])
  const group = useRef()

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      {/* Router (cylinder, like the classic router symbol) */}
      <mesh position={ROUTER}>
        <cylinderGeometry args={[0.42, 0.42, 0.26, 40]} />
        <meshStandardMaterial color="#3764D8" roughness={0.35} metalness={0.1} />
      </mesh>
      <Label position={[ROUTER.x, ROUTER.y + 0.42, ROUTER.z]}>R1 · router</Label>

      {/* Switches */}
      {SWITCHES.map((s, i) => (
        <group key={i}>
          <mesh position={s}>
            <boxGeometry args={[0.9, 0.24, 0.55]} />
            <meshStandardMaterial color="#36B5C5" roughness={0.4} />
          </mesh>
          <Label position={[s.x, s.y + 0.38, s.z]}>{`SW${i + 1}`}</Label>
          <Link from={ROUTER} to={s} color="#3764D8" opacity={0.45} />
        </group>
      ))}
      <Trunk from={SWITCHES[0]} to={SWITCHES[1]} />
      <Label position={[0, SWITCHES[0].y + 0.28, 0]}>802.1Q trunk</Label>

      {/* Hosts */}
      {hosts.map((h) => {
        const on = !selected || selected === h.vlan
        const color = on ? VLANS[h.vlan].color : DIM
        return (
          <group key={h.id}>
            <mesh position={h.pos} scale={on && selected ? 1.25 : 1}>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshStandardMaterial color={color} roughness={0.3} transparent opacity={on ? 1 : 0.55} />
            </mesh>
            <Link from={SWITCHES[h.sw]} to={h.pos} color={color} opacity={on ? 0.6 : 0.25} />
          </group>
        )
      })}

      <Packets hosts={hosts} selected={selected} count={low ? 5 : 8} reduced={reduced} />

    </group>
  )
}

/* Touch devices: no drag controls (so the page scrolls freely) — slow auto-spin instead */
function Spinner({ enabled, children }) {
  const ref = useRef()
  useFrame((_, d) => {
    if (enabled && ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.18
  })
  return <group ref={ref}>{children}</group>
}

export default function VlanScene({ active = true, reduced = false, selected = null, interactive = true }) {
  const low = useMemo(() => isLowPowerDevice(), [])
  const layer = useRef(null)
  return (
    <div className="absolute inset-0">
    <Canvas
      className="!absolute inset-0"
      dpr={low ? [1, 1.5] : [1, 2]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 1.3, 7.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#A5A1EB" />
      <LabelLayer.Provider value={layer}>
        <Spinner enabled={!interactive && !reduced}>
          <Topology selected={selected} reduced={reduced} low={low} />
        </Spinner>
      </LabelLayer.Provider>
      {interactive && (
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={interactive}
        autoRotate={!reduced}
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.95}
        target={[0, 0.15, 0]}
      />
      )}
    </Canvas>
    <div ref={layer} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  )
}
