import { InstancedBoxRun } from "./InstancedBoxRun";
import {
  CONCRETE_SURFACE,
  FLOOR_SURFACE,
  STRUCTURAL_STEEL_SURFACE,
} from "./industrialMaterials";
import type { EntranceSceneRefs } from "./entranceSceneRefs";

const ATRIUM_COLUMNS = [-1, 1].flatMap((side) =>
  [0, 1, 2].flatMap((bay) =>
    [-1, 1].map(
      (depth) => [side * (13.5 + bay * 5), 17, -31 + depth * 18] as const,
    ),
  ),
);
const BALCONY_POSTS = [-1, 1].flatMap((side) =>
  [0, 1, 2, 3].flatMap((level) =>
    Array.from({ length: 8 }, (_, index) => [
      side * 8.4,
      4.5 + level * 4.4,
      -27 - index * 4.2,
    ] as const),
  ),
);
const FAR_LIGHTS = Array.from({ length: 7 }, (_, index) => [
  -9 + index * 3,
  15,
  -61,
] as const);
const ATRIUM_PRACTICALS = [
  [-11, 18, -34] as const,
  [11, 23, -43] as const,
  [0, 31, -61] as const,
];
const ATRIUM_BRIDGES = [7, 17, 27].flatMap((y) => [
  [0, y, -56] as const,
  [0, y, -70] as const,
]);
const FAR_WALL_BAYS = [-28, -20, -12, -4, 4, 12, 20, 28].map(
  (x) => [x, 17, -74.85] as const,
);
const FAR_WALL_LEVELS = [2, 8, 14, 20, 26, 32].map(
  (y) => [0, y, -74.82] as const,
);
const ATRIUM_EDGE_BEAMS = [0, 1, 2, 3].flatMap((level) => {
  const y = 3.5 + level * 4.4;
  return [-1, 1].map((side) => [side * 8.4, y - 0.28, -44] as const);
});
const VARIED_ATRIUM = [0.78, 0.9, 1, 0.86, 0.96, 1.08];

export function ArchiveInterior({
  atriumMaterialRef,
  atriumLightsRef,
}: {
  atriumMaterialRef: EntranceSceneRefs["atriumMaterial"];
  atriumLightsRef: EntranceSceneRefs["atriumLights"];
}) {
  return (
    <group>
      <mesh position={[0, 17, -76]}>
        <boxGeometry args={[64, 40, 1.5]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#202421" roughness={0.98} />
      </mesh>
      <mesh position={[-31, 17, -53]}>
        <boxGeometry args={[2, 40, 46]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#252925" roughness={0.98} />
      </mesh>
      <mesh position={[31, 17, -53]}>
        <boxGeometry args={[2, 40, 46]} />
        <meshStandardMaterial {...CONCRETE_SURFACE} color="#292d29" roughness={0.98} />
      </mesh>
      <InstancedBoxRun
        color="#4d534c"
        dimensions={[0.48, 37, 0.42]}
        instanceColorScales={[0.82, 0.94, 1.04, 0.88]}
        metalness={0.28}
        positions={FAR_WALL_BAYS}
        roughness={0.78}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#555a52"
        dimensions={[62, 0.34, 0.42]}
        instanceColorScales={[0.86, 0.96, 1.02]}
        metalness={0.32}
        positions={FAR_WALL_LEVELS}
        roughness={0.72}
        surface="structuralSteel"
      />

      {[0, 1, 2, 3].map((level) => {
        const y = 3.5 + level * 4.4;
        const z = -31 - level * 1.2;
        return (
          <group key={level}>
            <mesh position={[-8.8, y, z]}>
              <boxGeometry args={[9.6, 0.55, 29]} />
              <meshStandardMaterial
                {...FLOOR_SURFACE}
                color={level % 2 === 0 ? "#343a36" : "#3c403b"}
                metalness={0.12}
                roughness={0.94}
              />
            </mesh>
            <mesh position={[8.8, y, z]}>
              <boxGeometry args={[9.6, 0.55, 29]} />
              <meshStandardMaterial
                {...FLOOR_SURFACE}
                color={level % 2 === 0 ? "#343a36" : "#3c403b"}
                metalness={0.12}
                roughness={0.94}
              />
            </mesh>
            <mesh position={[-8.8, y + 0.75, z + 0.3]}>
              <boxGeometry args={[9.6, 0.12, 0.12]} />
              <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#77766b" metalness={0.7} roughness={0.58} />
            </mesh>
            <mesh position={[8.8, y + 0.75, z + 0.3]}>
              <boxGeometry args={[9.6, 0.12, 0.12]} />
              <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#77766b" metalness={0.7} roughness={0.58} />
            </mesh>
            <mesh position={[-8.8, y + 1.8, z - 8]}>
              <boxGeometry args={[9.6, 0.16, 0.16]} />
              <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#686a62" metalness={0.62} roughness={0.62} />
            </mesh>
            <mesh position={[8.8, y + 1.8, z - 8]}>
              <boxGeometry args={[9.6, 0.16, 0.16]} />
              <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#686a62" metalness={0.62} roughness={0.62} />
            </mesh>
          </group>
        );
      })}

      <InstancedBoxRun
        color="#464943"
        dimensions={[1.25, 34, 1.5]}
        instanceColorScales={VARIED_ATRIUM}
        metalness={0.3}
        positions={ATRIUM_COLUMNS}
        roughness={0.82}
        surface="concrete"
      />
      <InstancedBoxRun
        color="#686a61"
        dimensions={[0.14, 0.8, 0.14]}
        instanceColorScales={VARIED_ATRIUM}
        metalness={0.56}
        positions={BALCONY_POSTS}
        roughness={0.62}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#343a36"
        dimensions={[1.2, 0.48, 29]}
        instanceColorScales={[0.86, 0.96, 1.04, 0.9]}
        metalness={0.42}
        positions={ATRIUM_EDGE_BEAMS}
        roughness={0.76}
        surface="structuralSteel"
      />
      <InstancedBoxRun
        color="#50554e"
        dimensions={[54, 0.72, 0.9]}
        instanceColorScales={[0.84, 0.94, 1.02]}
        metalness={0.48}
        positions={ATRIUM_BRIDGES}
        roughness={0.66}
        surface="structuralSteel"
      />
      <mesh position={[-8.4, 5.2, -37]}>
        <boxGeometry args={[0.18, 0.18, 34]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#77766b" metalness={0.7} roughness={0.58} />
      </mesh>
      <mesh position={[8.4, 5.2, -37]}>
        <boxGeometry args={[0.18, 0.18, 34]} />
        <meshStandardMaterial {...STRUCTURAL_STEEL_SURFACE} color="#77766b" metalness={0.7} roughness={0.58} />
      </mesh>

      <InstancedBoxRun
        color="#c18a49"
        dimensions={[1.4, 0.18, 0.32]}
        emissive="#c18a49"
        emissiveIntensity={0.3}
        metalness={0.2}
        materialRef={atriumMaterialRef}
        positions={FAR_LIGHTS}
        roughness={0.5}
        surface="amber"
      />
      {ATRIUM_PRACTICALS.map(([x, y, z], index) => (
          <pointLight
            key={`${x}-${y}`}
            color="#c18a49"
            distance={38}
            intensity={18}
            position={[x, y, z]}
            ref={index < 2 ? atriumLightsRef[index] : undefined}
          />
      ))}
    </group>
  );
}
