"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!background || !finePointer.matches || reducedMotion.matches) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const animateSpotlight = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      background.style.setProperty("--pointer-x", `${currentX}px`);
      background.style.setProperty("--pointer-y", `${currentY}px`);

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        frame = window.requestAnimationFrame(animateSpotlight);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(animateSpotlight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="archive-atmosphere"
      ref={backgroundRef}
    >
      <div className="archive-cursor-light" />
      <div className="archive-blueprints" />
      <div className="archive-signal-nodes">
        <span className="archive-signal-node archive-signal-node--one" />
        <span className="archive-signal-node archive-signal-node--two" />
        <span className="archive-signal-node archive-signal-node--three" />
        <span className="archive-signal-runner" />
      </div>
    </div>
  );
}
