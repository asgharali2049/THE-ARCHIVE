import { InstancedBoxRun } from "./InstancedBoxRun";
import {
  AMBER_SURFACE,
  PAINTED_METAL_SURFACE,
  STRUCTURAL_STEEL_SURFACE,
} from "./industrialMaterials";
import type { EntranceSceneRefs } from "./entranceSceneRefs";

const BUTTRESSES = [-1, 1].flatMap((side) =>
  [-1, 1].map(
    (depth) => [side * 10.1, 8.4, -10.6 + depth * 2.5] as const,
  ),
);
const GATE_LEFT_RIBS = [-0.65, 0, 0.65].map(
  (x) => [x, 6.8, -10.5] as const,
);
const GATE_RIGHT_RIBS = [0.65, 0, -0.65].map(
  (x) => [x, 6.8, -10.5] as const,
);
const GATE_SLATS = Array.from({ length: 8 }, (_, index) => [
  0,
  1.4 + index * 1.48,
  -11.2,
] as const);
const AMBER_GUIDES = [-1, 1].flatMap((side) =>
  Array.from({ length: 5 }, (_, index) => [
    side * 8.7,
    2.4 + index * 2.4,
    -10.1,
  ] as const),
);
const GATE_PANEL_SEAMS = [-0.96, -0.48, 0, 0.48, 0.96].map(
  (x) => [x, 7.9, -10.84] as const,
);
const TRACK_BRACKETS = [-1, 1].flatMap((side) =>
  Array.from({ length: 5 }, (_, index) => [
    side * (6.6 + index * 0.75),
    14.75,
    -10.8,
  ] as const),
);
const VARIED_METAL = [0.84, 0.94, 1.04, 0.9, 0.98];

export function MonumentalEntrance({
  gateLeftRef,
  gateRightRef,
  gateIndicatorMaterialRef,
}: {
  gateLeftRef: EntranceSceneRefs["gateLeft"];
  gateRightRef: EntranceSceneRefs["gateRight"];
  gateIndicatorMaterialRef: EntranceSceneRefs["gateIndicatorMaterial"];
}) {
  return (
    <group>
      <InstancedBoxRun
        color="#41443e"
        dimensions={[2.2, 17.5, 3.3]}
        instanceColorScales={[0.9, 1.04]}
        metalness={0.32}
        positions={[
          [-9.1, 8.75, -10.2],
          [9.1, 8.75, -10.2],
        ]}
        roughness={0.84}
        surface="paintedMetal"
      />
      <mesh position={[0, 17.2, -10.2]}>
        <boxGeometry args={[20.4, 2.8, 4.2]} />
        <meshStandardMaterial {...PAINTED_METAL_SURFACE} color="#454741" metalness={0.22} roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.1, -10.2]}>
        <boxGeometry args={[20.4, 2.2, 4.2]} />
        <meshStandardMaterial {...PAINTED_METAL_SURFACE} color="#30332f" metalness={0.18} roughness={0.9} />
      </mesh>

      <InstancedBoxRun
        color="#50534b"
        dimensions={[1.2, 16, 1.3]}
        instanceColorScales={VARIED_METAL}
        metalness={0.44}
        positions={BUTTRESSES}
        roughness={0.75}
        surface="structuralSteel"
      />
      <mesh position={[0, 19.1, -10.7]}>
        <boxGeometry args={[17.4, 0.8, 3]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#55564d" metalness={0.72} roughness={0.56} />
      </mesh>
      <InstancedBoxRun
        color="#62645b"
        dimensions={[0.28, 0.55, 2.6]}
        instanceColorScales={VARIED_METAL}
        metalness={0.66}
        positions={TRACK_BRACKETS}
        roughness={0.54}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#77786e"
        dimensions={[10.4, 0.12, 0.22]}
        metalness={0.76}
        positions={[
          [0, 14.68, -11.2],
          [0, 1.55, -11.2],
        ]}
        roughness={0.44}
        surface="structuralSteel"
      />
      <mesh position={[-7.65, 15.55, -11.1]}>
        <boxGeometry args={[2.1, 1.2, 1.8]} />
        <meshStandardMaterial {...PAINTED_METAL_SURFACE} color="#343833" metalness={0.2} roughness={0.84} />
      </mesh>
      <mesh position={[7.65, 15.55, -11.1]}>
        <boxGeometry args={[2.1, 1.2, 1.8]} />
        <meshStandardMaterial {...PAINTED_METAL_SURFACE} color="#343833" metalness={0.2} roughness={0.84} />
      </mesh>

      <group position={[-5.8, 0, 0]} ref={gateLeftRef}>
        <mesh position={[0, 7.9, -11.35]}>
          <boxGeometry args={[2.4, 12.4, 0.9]} />
          <meshStandardMaterial
            {...PAINTED_METAL_SURFACE}
            color="#3b403d"
            metalness={0.24}
            roughness={0.82}
          />
        </mesh>
        <InstancedBoxRun
          color="#242825"
          dimensions={[0.07, 11.8, 0.12]}
          metalness={0.34}
          positions={GATE_PANEL_SEAMS}
          roughness={0.82}
          surface="paintedMetal"
        />
        <InstancedBoxRun
          color="#77786e"
          dimensions={[0.09, 12, 0.12]}
          metalness={0.76}
          positions={GATE_LEFT_RIBS}
          roughness={0.48}
          surface="structuralSteel"
        />
        <InstancedBoxRun
          color="#464a44"
          dimensions={[2.9, 0.18, 0.24]}
          metalness={0.6}
          positions={GATE_SLATS}
          roughness={0.58}
          surface="paintedMetal"
        />
      </group>
      <group position={[5.8, 0, 0]} ref={gateRightRef}>
        <mesh position={[0, 7.9, -11.35]}>
          <boxGeometry args={[2.4, 12.4, 0.9]} />
          <meshStandardMaterial
            {...PAINTED_METAL_SURFACE}
            color="#3b403d"
            metalness={0.24}
            roughness={0.82}
          />
        </mesh>
        <InstancedBoxRun
          color="#242825"
          dimensions={[0.07, 11.8, 0.12]}
          metalness={0.34}
          positions={GATE_PANEL_SEAMS}
          roughness={0.82}
          surface="paintedMetal"
        />
        <InstancedBoxRun
          color="#77786e"
          dimensions={[0.09, 12, 0.12]}
          metalness={0.76}
          positions={GATE_RIGHT_RIBS}
          roughness={0.48}
          surface="structuralSteel"
        />
        <InstancedBoxRun
          color="#464a44"
          dimensions={[2.9, 0.18, 0.24]}
          metalness={0.6}
          positions={GATE_SLATS}
          roughness={0.58}
          surface="paintedMetal"
        />
      </group>

      <mesh position={[0, 14.3, -11.4]}>
        <boxGeometry args={[10.8, 0.65, 1.5]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#53554e" metalness={0.76} roughness={0.52} />
      </mesh>
      <mesh position={[0, 1.9, -11.4]}>
        <boxGeometry args={[10.8, 0.65, 1.5]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#53554e" metalness={0.76} roughness={0.52} />
      </mesh>

      <InstancedBoxRun
        color="#a67842"
        dimensions={[0.16, 0.72, 0.18]}
        metalness={0.3}
        positions={AMBER_GUIDES}
        roughness={0.42}
        surface="amber"
      />
      <mesh position={[0, 16.25, -12]}>
        <boxGeometry args={[1.1, 0.45, 0.3]} />
        <meshStandardMaterial
          {...AMBER_SURFACE}
          color="#c18a49"
          emissive="#c18a49"
          emissiveIntensity={0.7}
          metalness={0.2}
          roughness={0.44}
          ref={gateIndicatorMaterialRef}
        />
      </mesh>
    </group>
  );
}
