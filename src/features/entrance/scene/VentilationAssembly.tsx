"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  MeshStandardMaterial,
  Object3D,
  Shape,
  TorusGeometry,
} from "three";
import type { InstancedMesh } from "three";
import {
  AMBER_SURFACE,
  PAINTED_METAL_SURFACE,
  STRUCTURAL_STEEL_SURFACE,
} from "./industrialMaterials";

const BLADE_COUNT = 8;
const GRILLE_SPOKE_COUNT = 16;
const HOUSING_BOLT_COUNT = 12;

function createBladeShape() {
  const shape = new Shape();
  shape.moveTo(0.28, -0.13);
  shape.bezierCurveTo(0.56, -0.24, 1.12, -0.08, 1.38, 0.17);
  shape.bezierCurveTo(1.02, 0.09, 0.63, 0.23, 0.36, 0.34);
  shape.bezierCurveTo(0.43, 0.12, 0.38, -0.02, 0.28, -0.13);
  return shape;
}

function GrilleSupports({
  material,
}: {
  material: MeshStandardMaterial;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new BoxGeometry(1.16, 0.045, 0.055), []);
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const transform = new Object3D();
    for (let index = 0; index < GRILLE_SPOKE_COUNT; index += 1) {
      const angle = (index / GRILLE_SPOKE_COUNT) * Math.PI * 2;
      transform.position.set(
        Math.cos(angle) * 0.92,
        Math.sin(angle) * 0.92,
        1.38,
      );
      transform.rotation.set(0, 0, angle);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [invalidate]);

  return (
    <instancedMesh
      args={[geometry, material, GRILLE_SPOKE_COUNT]}
      castShadow
      ref={meshRef}
    />
  );
}

function TurbineBlades({
  geometry,
  material,
}: {
  geometry: ExtrudeGeometry;
  material: MeshStandardMaterial;
}) {
  const meshRef = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const transform = new Object3D();
    for (let index = 0; index < BLADE_COUNT; index += 1) {
      transform.position.set(0, 0, 0);
      transform.rotation.set(0, 0, (index / BLADE_COUNT) * Math.PI * 2);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      args={[geometry, material, BLADE_COUNT]}
      castShadow
      receiveShadow
      ref={meshRef}
    />
  );
}

function HousingBolts({
  geometry,
  material,
}: {
  geometry: CylinderGeometry;
  material: MeshStandardMaterial;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const transform = new Object3D();
    for (let index = 0; index < HOUSING_BOLT_COUNT; index += 1) {
      const angle = (index / HOUSING_BOLT_COUNT) * Math.PI * 2;
      transform.position.set(
        Math.cos(angle) * 1.72,
        Math.sin(angle) * 1.72,
        1.02,
      );
      transform.rotation.set(Math.PI / 2, 0, 0);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [invalidate]);

  return (
    <instancedMesh
      args={[geometry, material, HOUSING_BOLT_COUNT]}
      castShadow
      ref={meshRef}
    />
  );
}

export function VentilationAssembly() {
  const bladeGeometry = useMemo(
    () =>
      new ExtrudeGeometry(createBladeShape(), {
        depth: 0.075,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        curveSegments: 8,
      }),
    [],
  );
  const boltGeometry = useMemo(
    () => new CylinderGeometry(0.065, 0.065, 0.07, 8),
    [],
  );
  const materials = useMemo(
    () => ({
      painted: new MeshStandardMaterial({
        ...PAINTED_METAL_SURFACE,
        color: "#343832",
        metalness: 0.34,
        roughness: 0.76,
      }),
      structural: new MeshStandardMaterial({
        ...STRUCTURAL_STEEL_SURFACE,
        color: "#62645c",
        metalness: 0.72,
        roughness: 0.58,
      }),
      dark: new MeshStandardMaterial({
        color: "#171a18",
        metalness: 0.48,
        roughness: 0.82,
      }),
      blade: new MeshStandardMaterial({
        ...STRUCTURAL_STEEL_SURFACE,
        color: "#555950",
        metalness: 0.76,
        roughness: 0.48,
        side: 2,
      }),
      amber: new MeshStandardMaterial({
        ...AMBER_SURFACE,
        color: "#c18a49",
        emissive: "#c18a49",
        emissiveIntensity: 0.55,
        metalness: 0.18,
        roughness: 0.56,
      }),
    }),
    [],
  );
  const housingPanels = useMemo(
    () => [
      { position: [-2.27, 0, -0.48] as const, size: [0.66, 3.6, 1.04] as const },
      { position: [2.27, 0, -0.48] as const, size: [0.66, 3.6, 1.04] as const },
      { position: [0, 1.58, -0.48] as const, size: [3.9, 0.44, 1.04] as const },
      { position: [0, -1.58, -0.48] as const, size: [3.9, 0.44, 1.04] as const },
    ],
    [],
  );
  const grilleRings = useMemo(
    () =>
      [0.56, 1.12, 1.64].map(
        (radius) => new TorusGeometry(radius, radius === 1.64 ? 0.075 : 0.035, 8, 48),
      ),
    [],
  );

  return (
    <group position={[0, 0, 0.8]}>
      <mesh position={[0, 0, -0.48]} material={materials.dark}>
        <boxGeometry args={[5.2, 3.8, 1.04]} />
      </mesh>
      {housingPanels.map(({ position, size }) => (
        <mesh key={position.join(",")} position={position} material={materials.painted}>
          <boxGeometry args={size} />
        </mesh>
      ))}

      {[-0.71, 0.71].map((x) => (
        <mesh key={x} position={[x, 0, -1.75]} material={materials.painted}>
          <boxGeometry args={[1.34, 1.05, 2.4]} />
        </mesh>
      ))}
      <mesh position={[0, 1.02, -1.63]} material={materials.structural}>
        <boxGeometry args={[2.25, 0.14, 1.5]} />
      </mesh>
      <mesh position={[0, 0.58, -2.82]} material={materials.structural}>
        <boxGeometry args={[2.9, 0.16, 0.16]} />
      </mesh>
      <mesh position={[0, 1.48, -0.82]} material={materials.painted}>
        <boxGeometry args={[2.6, 0.3, 0.48]} />
      </mesh>

      <mesh
        position={[0, 0, 0.58]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.dark}
      >
        <cylinderGeometry args={[1.7, 1.7, 0.92, 48]} />
      </mesh>
      <mesh position={[0, 0, 1.12]} material={materials.structural}>
        <torusGeometry args={[1.68, 0.14, 10, 48]} />
      </mesh>
      <mesh position={[0, 0, 1.18]} material={materials.dark}>
        <circleGeometry args={[1.48, 48]} />
      </mesh>

      <group position={[0, 0, 1.24]}>
        <TurbineBlades geometry={bladeGeometry} material={materials.blade} />
        <mesh
          position={[0, 0, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.structural}
        >
          <cylinderGeometry args={[0.38, 0.38, 0.2, 24]} />
        </mesh>
        <mesh
          position={[0, 0, 0.21]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.painted}
        >
          <cylinderGeometry args={[0.23, 0.23, 0.08, 16]} />
        </mesh>
      </group>

      {grilleRings.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          position={[0, 0, 1.38]}
          material={materials.structural}
        />
      ))}
      <GrilleSupports material={materials.structural} />
      <HousingBolts geometry={boltGeometry} material={materials.structural} />

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.48, 0, 0]}>
          <mesh position={[0, -1.45, -1.42]} material={materials.structural}>
            <boxGeometry args={[0.2, 0.62, 1.65]} />
          </mesh>
          <mesh position={[0, -1.72, -0.78]} rotation={[0, 0, side * -0.16]} material={materials.painted}>
            <boxGeometry args={[0.72, 0.14, 0.88]} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.88, 1.35, 0.12]} material={materials.amber}>
        <boxGeometry args={[0.18, 0.24, 0.12]} />
      </mesh>
      <mesh position={[0.88, 1.35, 0.12]} material={materials.amber}>
        <boxGeometry args={[0.18, 0.24, 0.12]} />
      </mesh>
    </group>
  );
}
