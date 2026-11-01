import type { RefObject } from "react";
import type { Group, MeshStandardMaterial, PointLight } from "three";

export type EntranceSceneRefs = {
  atriumLights: [
    RefObject<PointLight | null>,
    RefObject<PointLight | null>,
  ];
  atriumMaterial: RefObject<MeshStandardMaterial | null>;
  cameraLookTarget: RefObject<Group | null>;
  corridorLight: RefObject<PointLight | null>;
  entranceLight: RefObject<PointLight | null>;
  gateIndicatorMaterial: RefObject<MeshStandardMaterial | null>;
  gateLeft: RefObject<Group | null>;
  gateRight: RefObject<Group | null>;
  warningMaterial: RefObject<MeshStandardMaterial | null>;
};

export type EntranceState =
  | "APPROACH"
  | "ACTIVATING"
  | "OPENING"
  | "TRANSIT"
  | "ARCHIVE REVEALED";

export type EntranceSequenceControls = {
  skip: () => void;
};
