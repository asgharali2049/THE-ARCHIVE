import { motion } from "framer-motion";
import type { EntranceState } from "../scene/entranceSceneRefs";

const STATE_LABELS: Record<EntranceState, string> = {
  APPROACH: "Entry 01 / Lower archive approach",
  ACTIVATING: "Powering up entrance systems",
  OPENING: "Entrance mechanisms opening",
  TRANSIT: "Passing into the archive",
  "ARCHIVE REVEALED": "Archive revealed",
};

export function EntranceOverlay({ state }: { state: EntranceState }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#a6a18f]">
            Personal engineering archive
          </p>
          <h1 className="font-mono text-3xl font-medium tracking-[0.16em] sm:text-5xl">
            THE ARCHIVE
          </h1>
        </div>
        <p className="border border-[#b39b67]/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c2ad78] sm:text-xs">
          Environment blockout
        </p>
      </header>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md border-l border-[#b39b67]/60 pl-4"
        initial={{ opacity: 0.65, y: 8 }}
        key={state}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c2ad78]">
          {STATE_LABELS[state]}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#c1c0b7] sm:text-base">
          A service passage opens onto a monumental threshold and the distant
          stacked levels of the archive.
        </p>
        <p className="sr-only">
          A three-dimensional environment depicts a reinforced industrial
          passage, a segmented moving barrier, and a multi-level underground
          atrium.
        </p>
      </motion.div>
    </div>
  );
}
