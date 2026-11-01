"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, MeshStandardMaterial, Object3D } from "three";
import type { InstancedMesh } from "three";
import type { RefObject } from "react";
import {
  getIndustrialSurface,
  type IndustrialSurface,
} from "./industrialMaterials";

type Position = readonly [number, number, number];

type InstancedBoxRunProps = {
  color: string;
  dimensions: readonly [number, number, number];
  emissive?: string;
  emissiveIntensity?: number;
  instanceColorScales?: readonly number[];
  metalness?: number;
  materialRef?: RefObject<MeshStandardMaterial | null>;
  positions: readonly Position[];
  roughness?: number;
  surface?: IndustrialSurface;
};

export function InstancedBoxRun({
  color,
  dimensions,
  emissive = "#000000",
  emissiveIntensity = 0,
  instanceColorScales,
  metalness = 0.2,
  materialRef,
  positions,
  roughness = 0.82,
  surface = "paintedMetal",
}: InstancedBoxRunProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const [width, height, depth] = dimensions;
  const geometry = useMemo(
    () => new BoxGeometry(width, height, depth),
    [depth, height, width],
  );
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        ...getIndustrialSurface(surface),
        color,
        emissive,
        emissiveIntensity,
        metalness,
        roughness,
      }),
    [color, emissive, emissiveIntensity, metalness, roughness, surface],
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    if (materialRef) materialRef.current = material;

    const transform = new Object3D();
    const color = new Color();
    positions.forEach(([x, y, z], index) => {
      transform.position.set(x, y, z);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
      if (instanceColorScales?.length) {
        mesh.setColorAt(index, color.setScalar(instanceColorScales[index % instanceColorScales.length]));
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (instanceColorScales?.length && mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [instanceColorScales, material, materialRef, positions]);

  return (
    <instancedMesh
      args={[geometry, material, positions.length]}
      castShadow
      receiveShadow
      ref={meshRef}
    />
  );
}
