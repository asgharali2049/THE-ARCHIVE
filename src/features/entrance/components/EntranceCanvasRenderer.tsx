"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import type { EntranceCanvasProps } from "./EntranceCanvas";
import { EntranceSequence } from "../scene/EntranceSequence";
import { EntranceScene } from "../scene/EntranceScene";

function WebGLFailureSignal({ onFailure }: { onFailure: () => void }) {
  useEffect(() => {
    onFailure();
  }, [onFailure]);

  return null;
}

export default function EntranceCanvasRenderer({
  onFailure,
  onReady,
  onStateChange,
  reducedMotion,
  sceneRefsRef,
  sequenceControlsRef,
  sequenceId,
}: EntranceCanvasProps) {
  return (
    <Canvas
      camera={{
        fov: 50,
        far: 120,
        near: 0.1,
        position: [0, 8.5, 27],
        rotation: [0.1, 0, 0],
      }}
      dpr={[1, 1.5]}
      fallback={<WebGLFailureSignal onFailure={onFailure} />}
      frameloop="demand"
      gl={{ antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <EntranceScene sceneRefsRef={sceneRefsRef} />
      <EntranceSequence
        onStateChange={onStateChange}
        reducedMotion={reducedMotion}
        sceneRefsRef={sceneRefsRef}
        sequenceControlsRef={sequenceControlsRef}
        sequenceId={sequenceId}
      />
    </Canvas>
  );
}
