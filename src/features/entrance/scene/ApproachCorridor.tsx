import { InstancedBoxRun } from "./InstancedBoxRun";
import {
  CONCRETE_SURFACE,
  FLOOR_SURFACE,
  STRUCTURAL_STEEL_SURFACE,
} from "./industrialMaterials";
import type { EntranceSceneRefs } from "./entranceSceneRefs";

const RIB_Z = Array.from({ length: 10 }, (_, index) => 12 - index * 3.6);
const RIB_COLUMNS = RIB_Z.flatMap((z) => [
  [-8.7, 6.7, z] as const,
  [8.7, 6.7, z] as const,
]);
const RIB_BEAMS = RIB_Z.map((z) => [0, 13.1, z] as const);

const WALKWAY_POSTS = Array.from({ length: 20 }, (_, index) => {
  const z = 17 - index * 1.7;
  return [
    [-7.3, 3.8, z] as const,
    [7.3, 3.8, z] as const,
  ];
}).flat();

const CEILING_FIXTURES = Array.from({ length: 8 }, (_, index) => [
  0,
  12.35,
  14 - index * 3.7,
] as const);

const WARNING_MARKERS = Array.from({ length: 5 }, (_, index) => [
  8.28,
  7.5,
  13 - index * 7.2,
] as const);
const WALL_PANEL_SEAMS = Array.from({ length: 15 }, (_, index) => {
  const z = 29 - index * 4.2;
  return [
    [-9.82, 6, z] as const,
    [9.82, 6, z] as const,
  ];
}).flat();
const RIB_BASES = RIB_Z.flatMap((z) => [
  [-8.7, 0.75, z] as const,
  [8.7, 0.75, z] as const,
]);
const CEILING_BRACES = RIB_Z.map((z) => [0, 13.55, z] as const);
const VARIED_STEEL = [0.82, 0.94, 1, 0.9, 1.06, 0.86];

export function ApproachCorridor({
  warningMaterialRef,
  corridorLightRef,
}: {
  warningMaterialRef: EntranceSceneRefs["warningMaterial"];
  corridorLightRef: EntranceSceneRefs["corridorLight"];
}) {
  return (
    <group>
      <mesh position={[0, -0.5, 1]}>
        <boxGeometry args={[23, 1, 68]} />
        <meshStandardMaterial {...FLOOR_SURFACE} color="#242824" roughness={0.96} />
      </mesh>

      <mesh position={[-10.8, 6, 1]}>
        <boxGeometry args={[1.8, 12, 68]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#292d29" roughness={0.98} />
      </mesh>
      <mesh position={[10.8, 6, 1]}>
        <boxGeometry args={[1.8, 12, 68]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#252925" roughness={0.98} />
      </mesh>
      <mesh position={[0, 14.15, 1]}>
        <boxGeometry args={[23, 0.7, 68]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#1b1e1c" roughness={0.96} />
      </mesh>

      <InstancedBoxRun
        color="#464943"
        dimensions={[0.14, 10.6, 0.24]}
        instanceColorScales={VARIED_STEEL}
        metalness={0.16}
        positions={WALL_PANEL_SEAMS}
        roughness={0.88}
        surface="paintedMetal"
      />
      <InstancedBoxRun
        color="#373b36"
        dimensions={[0.2, 0.26, 68]}
        metalness={0.2}
        positions={[
          [-9.75, 1.4, 1],
          [9.75, 1.4, 1],
          [-9.75, 10.6, 1],
          [9.75, 10.6, 1],
        ]}
        roughness={0.86}
        surface="paintedMetal"
      />
      <InstancedBoxRun
        color="#4b4d46"
        dimensions={[0.72, 13.7, 0.92]}
        instanceColorScales={VARIED_STEEL}
        metalness={0.42}
        positions={RIB_COLUMNS}
        roughness={0.72}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#55574f"
        dimensions={[19.1, 0.82, 0.92]}
        instanceColorScales={[0.9, 1, 0.86, 0.96]}
        metalness={0.38}
        positions={RIB_BEAMS}
        roughness={0.74}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#56584f"
        dimensions={[1.5, 0.7, 1.45]}
        instanceColorScales={VARIED_STEEL}
        metalness={0.32}
        positions={RIB_BASES}
        roughness={0.78}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#3c403b"
        dimensions={[19.4, 0.28, 0.3]}
        metalness={0.56}
        positions={CEILING_BRACES}
        roughness={0.58}
        surface="structuralSteel"
      />

      <mesh position={[-7.55, 3.05, 0]}>
        <boxGeometry args={[3, 0.42, 64]} />
        <meshStandardMaterial {...FLOOR_SURFACE} color="#343733" metalness={0.16} roughness={0.88} />
      </mesh>
      <mesh position={[7.55, 3.05, 0]}>
        <boxGeometry args={[3, 0.42, 64]} />
        <meshStandardMaterial {...FLOOR_SURFACE} color="#343733" metalness={0.16} roughness={0.88} />
      </mesh>

      <InstancedBoxRun
        color="#53544d"
        dimensions={[0.18, 1.15, 0.18]}
        instanceColorScales={VARIED_STEEL}
        metalness={0.55}
        positions={WALKWAY_POSTS}
        roughness={0.62}
        surface="structuralSteel"
      />
      <mesh position={[-7.3, 4.38, 0]}>
        <boxGeometry args={[0.18, 0.18, 64]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#6a6a60" metalness={0.64} roughness={0.58} />
      </mesh>
      <mesh position={[7.3, 4.38, 0]}>
        <boxGeometry args={[0.18, 0.18, 64]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#6a6a60" metalness={0.64} roughness={0.58} />
      </mesh>

      <InstancedBoxRun
        color="#3d403b"
        dimensions={[0.24, 0.26, 0.24]}
        metalness={0.68}
        positions={CEILING_FIXTURES}
        roughness={0.48}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#a57942"
        dimensions={[0.14, 0.42, 0.14]}
        emissive="#c18a49"
        emissiveIntensity={0.42}
        metalness={0.24}
        materialRef={warningMaterialRef}
        positions={WARNING_MARKERS}
        roughness={0.44}
        surface="amber"
      />

      <mesh
        position={[0, 13.55, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.22, 0.22, 64, 10]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#55564e" metalness={0.76} roughness={0.48} />
      </mesh>
      <mesh
        position={[-2.2, 13.35, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.14, 0.14, 64, 8]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#434740" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh
        position={[2.2, 13.35, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.14, 0.14, 64, 8]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#434740" metalness={0.7} roughness={0.5} />
      </mesh>

      {CEILING_FIXTURES.filter((_, index) => index % 3 === 0).map(
        ([, , z], index) => (
          <group key={z}>
            <pointLight
              color="#e2bb7b"
              distance={13}
              intensity={15}
              position={[0, 11.9, z]}
              ref={index === 0 ? corridorLightRef : undefined}
            />
            <mesh position={[0, 13.75, z]}>
              <boxGeometry args={[2.3, 0.12, 0.42]} />
              <meshStandardMaterial
                color="#c2a16a"
                emissive="#c18a49"
                emissiveIntensity={2}
                roughness={0.4}
              />
            </mesh>
          </group>
        ),
      )}
    </group>
  );
}
