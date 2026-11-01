import {
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  SRGBColorSpace,
  UnsignedByteType,
  RGBAFormat,
} from "three";

const TEXTURE_SIZE = 64;

function hash(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, y: number, cells: number, seed: number) {
  const gx = x * cells;
  const gy = y * cells;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const tx = gx - x0;
  const ty = gy - y0;
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  const top = hash(x0, y0, seed) * (1 - sx) + hash(x0 + 1, y0, seed) * sx;
  const bottom =
    hash(x0, y0 + 1, seed) * (1 - sx) + hash(x0 + 1, y0 + 1, seed) * sx;
  return top * (1 - sy) + bottom * sy;
}

function createSurfaceTexture(
  seed: number,
  channel: "color" | "roughness" | "bump",
  brushed = false,
) {
  const data = new Uint8Array(TEXTURE_SIZE * TEXTURE_SIZE * 4);

  for (let y = 0; y < TEXTURE_SIZE; y += 1) {
    for (let x = 0; x < TEXTURE_SIZE; x += 1) {
      const u = x / TEXTURE_SIZE;
      const v = y / TEXTURE_SIZE;
      const broad = smoothNoise(u, v, 5, seed) - 0.5;
      const medium = smoothNoise(u, v, 17, seed + 1) - 0.5;
      const grain = hash(x, y, seed + 2) - 0.5;
      const directional = brushed
        ? smoothNoise(u, v * 0.12, 38, seed + 3) - 0.5
        : 0;
      const variation =
        channel === "bump"
          ? broad * 20 + medium * 14 + grain * 10 + directional * 8
          : broad * 22 + medium * 14 + grain * 7 + directional * 9;
      const base = channel === "color" ? 236 : channel === "roughness" ? 232 : 128;
      const value = Math.max(0, Math.min(255, Math.round(base + variation)));
      const offset = (y * TEXTURE_SIZE + x) * 4;
      data[offset] = value;
      data[offset + 1] = value;
      data[offset + 2] = value;
      data[offset + 3] = 255;
    }
  }

  const texture = new DataTexture(data, TEXTURE_SIZE, TEXTURE_SIZE, RGBAFormat, UnsignedByteType);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.generateMipmaps = true;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.colorSpace = channel === "color" ? SRGBColorSpace : "";
  texture.needsUpdate = true;
  return texture;
}

function surfaceMaps(seed: number, brushed = false, bumpScale = 0.018) {
  return {
    map: createSurfaceTexture(seed, "color", brushed),
    roughnessMap: createSurfaceTexture(seed + 11, "roughness", brushed),
    bumpMap: createSurfaceTexture(seed + 23, "bump", brushed),
    bumpScale,
  };
}

export const CONCRETE_SURFACE = surfaceMaps(4, false, 0.065);
export const STRUCTURAL_STEEL_SURFACE = surfaceMaps(12, true, 0.025);
export const PAINTED_METAL_SURFACE = surfaceMaps(21, false, 0.035);
export const FLOOR_SURFACE = surfaceMaps(31, false, 0.05);
export const AMBER_SURFACE = surfaceMaps(42, true, 0.015);

export type IndustrialSurface =
  | "concrete"
  | "floor"
  | "structuralSteel"
  | "paintedMetal"
  | "amber";

export function getIndustrialSurface(surface: IndustrialSurface) {
  switch (surface) {
    case "concrete":
      return CONCRETE_SURFACE;
    case "floor":
      return FLOOR_SURFACE;
    case "structuralSteel":
      return STRUCTURAL_STEEL_SURFACE;
    case "paintedMetal":
      return PAINTED_METAL_SURFACE;
    case "amber":
      return AMBER_SURFACE;
  }
}
