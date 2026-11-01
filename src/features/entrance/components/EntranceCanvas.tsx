"use client";

import dynamic from "next/dynamic";
import type {
  EntranceSceneRefs,
  EntranceSequenceControls,
  EntranceState,
} from "../scene/entranceSceneRefs";
import type { RefObject } from "react";

export type EntranceCanvasProps = {
  onFailure: () => void;
  onReady: () => void;
  onStateChange: (state: EntranceState) => void;
  reducedMotion: boolean;
  sceneRefsRef: EntranceSceneRefs;
  sequenceControlsRef: RefObject<EntranceSequenceControls | null>;
  sequenceId: number;
};

const EntranceCanvasRenderer = dynamic(
  () => import("./EntranceCanvasRenderer"),
  { ssr: false },
);

export function EntranceCanvas(props: EntranceCanvasProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <EntranceCanvasRenderer {...props} />
    </div>
  );
}
