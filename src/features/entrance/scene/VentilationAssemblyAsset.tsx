"use client";

import { Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { ReactNode } from "react";
import { Component } from "react";
import { Vector3 } from "three";

const ASSET_PATH = "/assets/3d/ventilation-assembly.glb";
const ASSET_POSITION = new Vector3(8.2, 8.8, 2);
const LOAD_DISTANCE = 25.3;
const ASSET_ROTATION: [number, number, number] = [0, -Math.PI / 3, 0];

function LoadedVentilationAssembly() {
  const { scene } = useGLTF(ASSET_PATH);

  return (
    <primitive
      object={scene}
      position={ASSET_POSITION}
      rotation={ASSET_ROTATION}
    />
  );
}

type AssetErrorBoundaryProps = {
  children: ReactNode;
};

type AssetErrorBoundaryState = {
  hasError: boolean;
};

class AssetErrorBoundary extends Component<
  AssetErrorBoundaryProps,
  AssetErrorBoundaryState
> {
  state: AssetErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AssetErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(
      `Optional ventilation asset could not be loaded from ${ASSET_PATH}. The corridor will render without it.`,
      error,
    );
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function VentilationAssemblyAsset() {
  const [loadAsset, setLoadAsset] = useState(false);

  useFrame(({ camera }) => {
    if (loadAsset) return;
    if (camera.position.distanceToSquared(ASSET_POSITION) < LOAD_DISTANCE ** 2) {
      setLoadAsset(true);
    }
  });

  if (!loadAsset) return null;

  return (
    <AssetErrorBoundary>
      <Suspense fallback={null}>
        <LoadedVentilationAssembly />
      </Suspense>
    </AssetErrorBoundary>
  );
}
