"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { ArchiveInterior } from "./ArchiveInterior";
import { ApproachCorridor } from "./ApproachCorridor";
import { MonumentalEntrance } from "./MonumentalEntrance";
import { VentilationAssemblyAsset } from "./VentilationAssemblyAsset";
import { VentilationAssembly } from "./VentilationAssembly";
import type { EntranceSceneRefs } from "./entranceSceneRefs";

const USE_GLTF_VENTILATION_ASSET = false;
const VENTILATION_POSITION: [number, number, number] = [8.2, 8.8, 2];
const VENTILATION_ROTATION: [number, number, number] = [0, -Math.PI / 3, 0];

function ResponsiveCamera({
  lookTargetRef,
}: {
  lookTargetRef: EntranceSceneRefs["cameraLookTarget"];
}) {
  const previousAspectRef = useRef<number | null>(null);

  useFrame(({ camera, size }) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    const aspect = size.width / size.height;
    if (previousAspectRef.current === aspect) return;

    camera.fov = aspect < 0.8 ? 74 : 50;
    const lookTarget = lookTargetRef.current;
    if (lookTarget) camera.lookAt(lookTarget.position);
    camera.updateProjectionMatrix();
    previousAspectRef.current = aspect;
  });

  return null;
}

export function EntranceScene({
  sceneRefsRef,
}: {
  sceneRefsRef: EntranceSceneRefs;
}) {
  const {
    cameraLookTarget: cameraLookTargetRef,
    corridorLight: corridorLightRef,
    entranceLight: entranceLightRef,
    gateIndicatorMaterial: gateIndicatorMaterialRef,
    gateLeft: gateLeftRef,
    gateRight: gateRightRef,
    warningMaterial: warningMaterialRef,
    atriumLights: atriumLightsRef,
    atriumMaterial: atriumMaterialRef,
  } = sceneRefsRef;

  return (
    <>
      <color attach="background" args={["#111211"]} />
      <fog attach="fog" args={["#111211", 42, 105]} />
      <group position={[0, 8, -10]} ref={cameraLookTargetRef} />
      <ResponsiveCamera lookTargetRef={cameraLookTargetRef} />

      <ambientLight color="#d8d0be" intensity={1.5} />
      <hemisphereLight args={["#aab9c1", "#101211", 1.2]} />
      <directionalLight
        color="#c3d0d1"
        intensity={3.1}
        position={[-14, 22, 12]}
      />
      <pointLight
        color="#c18a49"
        distance={33}
        intensity={40}
        position={[0, 11, -13]}
        ref={entranceLightRef}
      />
      <pointLight
        color="#b9854a"
        distance={25}
        intensity={24}
        position={[0, 12, -43]}
      />
      <pointLight
        color="#d1b783"
        distance={26}
        intensity={28}
        position={[0, 9, 8]}
      />

      <ApproachCorridor
        corridorLightRef={corridorLightRef}
        warningMaterialRef={warningMaterialRef}
      />
      {USE_GLTF_VENTILATION_ASSET ? (
        <VentilationAssemblyAsset />
      ) : (
        <group
          position={VENTILATION_POSITION}
          rotation={VENTILATION_ROTATION}
        >
          <VentilationAssembly />
        </group>
      )}
      <MonumentalEntrance
        gateIndicatorMaterialRef={gateIndicatorMaterialRef}
        gateLeftRef={gateLeftRef}
        gateRightRef={gateRightRef}
      />
      <ArchiveInterior
        atriumLightsRef={atriumLightsRef}
        atriumMaterialRef={atriumMaterialRef}
      />
    </>
  );
}
