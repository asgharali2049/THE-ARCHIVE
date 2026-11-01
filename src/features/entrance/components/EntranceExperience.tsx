"use client";

import { createRef, useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EntranceCanvas } from "./EntranceCanvas";
import { EntranceOverlay } from "./EntranceOverlay";
import type {
  EntranceSceneRefs,
  EntranceSequenceControls,
  EntranceState,
} from "../scene/entranceSceneRefs";
import type { Group, MeshStandardMaterial, PointLight } from "three";

const STATE_ANNOUNCEMENTS: Record<EntranceState, string> = {
  APPROACH: "Entrance ready. Activate entrance to begin.",
  ACTIVATING: "Powering up entrance systems.",
  OPENING: "Entrance mechanisms are opening.",
  TRANSIT: "Passing through to the archive.",
  "ARCHIVE REVEALED": "Archive revealed.",
};

function createSceneRefs(): EntranceSceneRefs {
  return {
    atriumLights: [createRef<PointLight>(), createRef<PointLight>()],
    atriumMaterial: createRef<MeshStandardMaterial>(),
    cameraLookTarget: createRef<Group>(),
    corridorLight: createRef<PointLight>(),
    entranceLight: createRef<PointLight>(),
    gateIndicatorMaterial: createRef<MeshStandardMaterial>(),
    gateLeft: createRef<Group>(),
    gateRight: createRef<Group>(),
    warningMaterial: createRef<MeshStandardMaterial>(),
  };
}

function WebGLFallback() {
  return (
    <div className="pointer-events-auto absolute inset-x-6 top-1/2 z-20 mx-auto max-w-xl -translate-y-1/2 border border-[#8b7959]/60 bg-[#111211]/95 p-6 shadow-2xl sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#c18a49]">
        Visual entry unavailable
      </p>
      <h2 className="mt-3 font-mono text-xl tracking-[0.12em] text-[#ded8c9] sm:text-2xl">
        Continue without the 3D scene
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#c1c0b7]">
        WebGL could not be initialized.         Continue directly to the portfolio projects without the 3D entrance.
      </p>
      <Link
        className="mt-5 inline-flex min-h-11 items-center border border-[#c18a49] px-4 font-mono text-xs uppercase tracking-[0.16em] text-[#e2c99e] outline-none transition-colors hover:bg-[#c18a49]/15 focus-visible:ring-2 focus-visible:ring-[#e2c99e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
        href="/projects"
      >
        Continue to portfolio
      </Link>
    </div>
  );
}

export function EntranceExperience() {
  const [state, setState] = useState<EntranceState>("APPROACH");
  const [sequenceId, setSequenceId] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const sequenceControlsRef = useRef<EntranceSequenceControls | null>(null);
  const activationLockRef = useRef(false);
  const sceneRefsRef = useMemo(() => createSceneRefs(), []);
  const announceState = useCallback((nextState: EntranceState) => {
    setState(nextState);
  }, []);

  const activate = useCallback(() => {
    if (
      activationLockRef.current ||
      state !== "APPROACH" ||
      !webglReady ||
      webglFailed
    ) {
      return;
    }

    activationLockRef.current = true;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(preference.matches);
    setState("ACTIVATING");
    setSequenceId((current) => current + 1);
  }, [state, webglFailed, webglReady]);

  const skip = useCallback(() => {
    if (
      state === "APPROACH" ||
      state === "ARCHIVE REVEALED" ||
      webglFailed
    ) {
      return;
    }

    sequenceControlsRef.current?.skip();
  }, [state, webglFailed]);

  const onWebGLReady = useCallback(() => {
    setWebglReady(true);
    setWebglFailed(false);
  }, []);
  const onWebGLFailure = useCallback(() => {
    setWebglReady(false);
    setWebglFailed(true);
  }, []);

  const statusText = useMemo(() => STATE_ANNOUNCEMENTS[state], [state]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b0c] text-[#ded8c9]">
      <section
        aria-label="The Archive entrance"
        data-experience-state={state}
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        <EntranceCanvas
          onFailure={onWebGLFailure}
          onReady={onWebGLReady}
          onStateChange={announceState}
          reducedMotion={reducedMotion}
          sceneRefsRef={sceneRefsRef}
          sequenceControlsRef={sequenceControlsRef}
          sequenceId={sequenceId}
        />
        <EntranceOverlay state={state} />

        {webglFailed ? (
          <WebGLFallback />
        ) : (
          <div className="pointer-events-auto absolute bottom-28 right-6 z-10 flex flex-col items-end gap-3 sm:bottom-32 sm:right-10 lg:right-14">
            {state === "APPROACH" ? (
              <button
                className="min-h-12 border border-[#c18a49] bg-[#171915]/90 px-5 font-mono text-xs uppercase tracking-[0.18em] text-[#f0dfc0] outline-none transition-colors hover:bg-[#c18a49]/20 focus-visible:ring-2 focus-visible:ring-[#e2c99e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211] disabled:cursor-wait disabled:opacity-50"
                disabled={!webglReady}
                onClick={activate}
                type="button"
              >
                {webglReady ? "Activate entrance" : "Preparing entrance"}
              </button>
            ) : null}
            {state !== "APPROACH" && state !== "ARCHIVE REVEALED" ? (
              <button
                className="min-h-11 border border-[#9d927c]/70 bg-[#111211]/90 px-4 font-mono text-xs uppercase tracking-[0.16em] text-[#ded8c9] outline-none transition-colors hover:border-[#c18a49] hover:text-[#f0dfc0] focus-visible:ring-2 focus-visible:ring-[#e2c99e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
                onClick={skip}
                type="button"
              >
                Skip
              </button>
            ) : null}
            {state === "ARCHIVE REVEALED" ? (
              <Link
                className="min-h-11 border border-[#c18a49] bg-[#171915]/90 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[#f0dfc0] outline-none transition-colors hover:bg-[#c18a49]/20 focus-visible:ring-2 focus-visible:ring-[#e2c99e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
                href="/projects"
              >
                Continue to portfolio
              </Link>
            ) : null}
          </div>
        )}

        <motion.p
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          key={statusText}
        >
          {statusText}
        </motion.p>
      </section>
    </main>
  );
}
