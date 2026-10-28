import { useRef, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_POINT_COUNT = 1400;
const EDGE_DIST = 1.7;
const MAX_EDGES_PER_POINT = 5;
const GLOBAL_EDGE_CAP = 2200;

const PALETTE = [new THREE.Color(0x22d3ee), new THREE.Color(0x818cf8)];

/** Dial the particle count down on phones / low-memory devices. */
function getPointCount() {
  if (typeof window === 'undefined') return MAX_POINT_COUNT;

  const width = window.innerWidth;
  const memory = navigator.deviceMemory ?? 8;

  if (width < 768 || memory <= 4) return 600;
  if (width < 1200) return 1000;
  return MAX_POINT_COUNT;
}

function generateConstellationData(pointCount) {
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const baseY = new Float32Array(pointCount);
  const offsets = new Float32Array(pointCount);

  let seed = 42;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < pointCount; i++) {
    const r = 2.0 + rnd() * 4.6;
    const phi = rnd() * Math.PI;
    const theta = rnd() * Math.PI * 2;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    baseY[i] = positions[i * 3 + 1];
    offsets[i] = rnd() * Math.PI * 2;
    const c = PALETTE[i % 2];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const edgePos = [];
  const edgeCol = [];
  let edgeCount = 0;
  const perPoint = new Array(pointCount).fill(0);
  const edgeCap = Math.round(GLOBAL_EDGE_CAP * (pointCount / MAX_POINT_COUNT));

  for (let i = 0; i < pointCount && edgeCount < edgeCap; i++) {
    const xi = positions[i * 3];
    const yi = positions[i * 3 + 1];
    const zi = positions[i * 3 + 2];
    for (let j = i + 1; j < pointCount && edgeCount < edgeCap; j++) {
      if (perPoint[i] >= MAX_EDGES_PER_POINT || perPoint[j] >= MAX_EDGES_PER_POINT) continue;
      const dx = xi - positions[j * 3];
      const dy = yi - positions[j * 3 + 1];
      const dz = zi - positions[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < EDGE_DIST) {
        edgePos.push(xi, yi, zi, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        edgeCol.push(0.14, 0.14, 0.2, 0.14, 0.14, 0.2);
        perPoint[i]++;
        perPoint[j]++;
        edgeCount++;
      }
    }
  }

  return {
    positions,
    colors,
    baseY,
    offsets,
    edgePositions: new Float32Array(edgePos),
    edgeColors: new Float32Array(edgeCol),
    edgeCount,
  };
}

function Constellation({ pointer }) {
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const [pointCount] = useState(getPointCount);

  const {
    positions,
    colors,
    baseY,
    offsets,
    edgePositions,
    edgeColors,
    edgeCount,
  } = useMemo(() => generateConstellationData(pointCount), [pointCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const points = pointsRef.current;
    const lines = linesRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position;
    if (posAttr) {
      const posArr = posAttr.array;
      for (let i = 0; i < pointCount; i++) {
        posArr[i * 3 + 1] = baseY[i] + Math.sin(time * 0.35 + offsets[i]) * 0.06;
        posArr[i * 3] += Math.cos(time * 0.12 + offsets[i] * 0.5) * 0.0015;
      }
      posAttr.needsUpdate = true;
    }

    points.rotation.y += 0.00025;
    points.rotation.x += 0.00015;

    if (lines) {
      lines.rotation.y = points.rotation.y;
      lines.rotation.x = points.rotation.x;
    }

    state.camera.position.x += (pointer.current.x * 1.2 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-pointer.current.y * 0.8 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 6]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-6, -6, 2]} intensity={0.45} color="#818cf8" />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointCount}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attach="attributes-color"
            count={pointCount}
            itemSize={3}
            array={colors}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>

      {edgeCount > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={edgeCount * 2}
              itemSize={3}
              array={edgePositions}
            />
            <bufferAttribute
              attach="attributes-color"
              count={edgeCount * 2}
              itemSize={3}
              array={edgeColors}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </>
  );
}

/**
 * Interactive 3D constellation: floating points connected by edges,
 * drifting with the mouse. Gracefully degraded by Hero (WebGL detection).
 */
export default function HeroConstellation() {
  const pointer = useRef({ x: 0, y: 0 });
  const [isCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  const onPointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  return (
    <Canvas
      className="hero-gl"
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={isCompact ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !isCompact, powerPreference: 'high-performance' }}
      onPointerMove={onPointerMove}
      style={{ touchAction: 'auto', width: '100%', height: '100%' }}
    >
      <Constellation pointer={pointer} />
    </Canvas>
  );
}
