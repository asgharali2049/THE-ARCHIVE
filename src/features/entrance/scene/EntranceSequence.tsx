"use client";

import { useLayoutEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { PerspectiveCamera } from "three";
import type {
  EntranceSceneRefs,
  EntranceSequenceControls,
  EntranceState,
} from "./entranceSceneRefs";
import type { RefObject } from "react";

type EntranceSequenceProps = {
  onStateChange: (state: EntranceState) => void;
  reducedMotion: boolean;
  sceneRefsRef: EntranceSceneRefs;
  sequenceControlsRef: RefObject<EntranceSequenceControls | null>;
  sequenceId: number;
};

const FINAL_CAMERA_POSITION = { x: 0, y: 8.5, z: -16 };
const FINAL_LOOK_TARGET = { x: 0, y: 9, z: -37 };
const FINAL_GATE_LEFT_X = -9;
const FINAL_GATE_RIGHT_X = 9;

export function EntranceSequence({
  onStateChange,
  reducedMotion,
  sceneRefsRef,
  sequenceControlsRef,
  sequenceId,
}: EntranceSequenceProps) {
  const { camera, invalidate } = useThree();
  const [, requestSceneRender] = useState(0);

  useLayoutEffect(() => {
    if (sequenceId === 0 || !(camera instanceof PerspectiveCamera)) return;

    let active = true;
    let finished = false;
    let timeline: gsap.core.Timeline | null = null;
    let refreshFrame: number | null = null;
    const setFinalSceneState = () => {
      const gateLeft = sceneRefsRef.gateLeft.current;
      const gateRight = sceneRefsRef.gateRight.current;
      const lookTarget = sceneRefsRef.cameraLookTarget.current;

      if (gateLeft) gateLeft.position.x = FINAL_GATE_LEFT_X;
      if (gateRight) gateRight.position.x = FINAL_GATE_RIGHT_X;
      camera.position.set(
        FINAL_CAMERA_POSITION.x,
        FINAL_CAMERA_POSITION.y,
        FINAL_CAMERA_POSITION.z,
      );
      if (lookTarget) {
        lookTarget.position.set(
          FINAL_LOOK_TARGET.x,
          FINAL_LOOK_TARGET.y,
          FINAL_LOOK_TARGET.z,
        );
      }

      const warningMaterial = sceneRefsRef.warningMaterial.current;
      const gateIndicatorMaterial = sceneRefsRef.gateIndicatorMaterial.current;
      const atriumMaterial = sceneRefsRef.atriumMaterial.current;
      const corridorLight = sceneRefsRef.corridorLight.current;
      const entranceLight = sceneRefsRef.entranceLight.current;

      if (warningMaterial) warningMaterial.emissiveIntensity = 0.85;
      if (gateIndicatorMaterial) gateIndicatorMaterial.emissiveIntensity = 0.8;
      if (atriumMaterial) atriumMaterial.emissiveIntensity = 0.6;
      if (corridorLight) corridorLight.intensity = 17;
      if (entranceLight) entranceLight.intensity = 30;
      sceneRefsRef.atriumLights.forEach((light) => {
        if (light.current) light.current.intensity = 24;
      });

      if (sceneRefsRef.cameraLookTarget.current) {
        camera.lookAt(sceneRefsRef.cameraLookTarget.current.position);
      } else {
        camera.lookAt(
          FINAL_LOOK_TARGET.x,
          FINAL_LOOK_TARGET.y,
          FINAL_LOOK_TARGET.z,
        );
      }
      camera.updateProjectionMatrix();
      invalidate();
      refreshFrame = window.requestAnimationFrame(() => {
        invalidate();
        refreshFrame = null;
      });
    };
    const complete = () => {
      if (!active || finished) return;
      finished = true;
      setFinalSceneState();
      requestSceneRender((revision) => revision + 1);
      onStateChange("ARCHIVE REVEALED");
    };
    const skip = () => {
      if (!active || finished) return;
      timeline?.kill();
      complete();
    };
    const controls: EntranceSequenceControls = { skip };
    sequenceControlsRef.current = controls;

    if (reducedMotion) {
      complete();
    } else {
      const gateLeft = sceneRefsRef.gateLeft.current;
      const gateRight = sceneRefsRef.gateRight.current;
      const lookTarget = sceneRefsRef.cameraLookTarget.current;

      if (!gateLeft || !gateRight || !lookTarget) {
        active = false;
        sequenceControlsRef.current = null;
        return;
      }

      const updateView = () => {
        camera.lookAt(lookTarget.position);
        invalidate();
      };

      timeline = gsap.timeline({ onComplete: complete });
      timeline.to(
        camera.position,
        {
          z: 24,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: updateView,
        },
        0,
      );
      timeline.to(
        sceneRefsRef.warningMaterial.current ?? {},
        {
          emissiveIntensity: 1.6,
          duration: 0.65,
          ease: "power1.inOut",
          onUpdate: invalidate,
        },
        0.15,
      );
      timeline.to(
        sceneRefsRef.corridorLight.current ?? {},
        {
          intensity: 30,
          duration: 0.8,
          ease: "power1.inOut",
          onUpdate: invalidate,
        },
        0.15,
      );
      timeline.to(
        sceneRefsRef.entranceLight.current ?? {},
        {
          intensity: 58,
          duration: 0.8,
          ease: "power1.inOut",
          onUpdate: invalidate,
        },
        0.15,
      );
      timeline.to(
        sceneRefsRef.gateIndicatorMaterial.current ?? {},
        {
          emissiveIntensity: 1.8,
          duration: 0.5,
          ease: "power1.inOut",
          onUpdate: invalidate,
        },
        0.4,
      );
      timeline.call(() => {
        if (active && !finished) onStateChange("OPENING");
      }, [], 1.35);
      timeline.to(
        gateLeft.position,
        {
          x: FINAL_GATE_LEFT_X,
          duration: 2.45,
          ease: "power2.inOut",
          onUpdate: invalidate,
        },
        1.45,
      );
      timeline.to(
        gateRight.position,
        {
          x: FINAL_GATE_RIGHT_X,
          duration: 2.45,
          ease: "power2.inOut",
          onUpdate: invalidate,
        },
        1.45,
      );
      timeline.call(() => {
        if (active && !finished) onStateChange("TRANSIT");
      }, [], 3.95);
      timeline.to(
        camera.position,
        {
          ...FINAL_CAMERA_POSITION,
          duration: 4.2,
          ease: "power2.inOut",
          onUpdate: updateView,
        },
        4,
      );
      timeline.to(
        lookTarget.position,
        {
          ...FINAL_LOOK_TARGET,
          duration: 4.2,
          ease: "power2.inOut",
          onUpdate: updateView,
        },
        4,
      );
      timeline.to(
        sceneRefsRef.atriumLights[0].current ?? {},
        {
          intensity: 34,
          duration: 1.25,
          ease: "sine.out",
          onUpdate: invalidate,
        },
        4,
      );
      timeline.to(
        sceneRefsRef.atriumLights[1].current ?? {},
        {
          intensity: 31,
          duration: 1.25,
          ease: "sine.out",
          onUpdate: invalidate,
        },
        4,
      );
      timeline.to(
        sceneRefsRef.atriumMaterial.current ?? {},
        {
          emissiveIntensity: 1,
          duration: 1.25,
          ease: "sine.out",
          onUpdate: invalidate,
        },
        4,
      );
      timeline.to(
        sceneRefsRef.atriumLights[0].current ?? {},
        {
          intensity: 24,
          duration: 1.1,
          ease: "sine.inOut",
          onUpdate: invalidate,
        },
        6.1,
      );
      timeline.to(
        sceneRefsRef.atriumLights[1].current ?? {},
        {
          intensity: 24,
          duration: 1.1,
          ease: "sine.inOut",
          onUpdate: invalidate,
        },
        6.1,
      );
      timeline.to(
        sceneRefsRef.atriumMaterial.current ?? {},
        {
          emissiveIntensity: 0.6,
          duration: 1.1,
          ease: "sine.inOut",
          onUpdate: invalidate,
        },
        6.1,
      );
    }

    return () => {
      active = false;
      timeline?.kill();
      if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame);
      if (sequenceControlsRef.current === controls) sequenceControlsRef.current = null;
    };
  }, [
    camera,
    invalidate,
    onStateChange,
    reducedMotion,
    sceneRefsRef,
    sequenceControlsRef,
    sequenceId,
  ]);

  return null;
}
