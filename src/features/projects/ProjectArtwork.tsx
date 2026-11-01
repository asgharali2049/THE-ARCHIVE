import type { ProjectVisualKind } from "./projectData";

const line = "rgba(216,208,190,.34)";
const subdued = "rgba(216,208,190,.12)";

function RetrievalArtwork() {
  return (
    <>
      <path d="M75 82H230M75 130H230M75 178H230" stroke={line} />
      <path d="M410 82H565M410 130H565M410 178H565" stroke={line} />
      <circle cx="142" cy="82" r="13" fill="none" stroke="currentColor" />
      <circle cx="190" cy="130" r="13" fill="none" stroke="currentColor" />
      <circle cx="118" cy="178" r="13" fill="none" stroke="currentColor" />
      <path d="M230 130H365M365 130l-15-9m15 9-15 9" stroke="currentColor" />
      <path d="M434 82h76M434 130h105M434 178h62" stroke="currentColor" />
      <path d="M278 85v90m18-106v122m18-90v60" stroke={line} strokeWidth="5" />
    </>
  );
}

function BusinessArtwork() {
  return (
    <>
      <rect x="250" y="77" width="140" height="106" rx="4" fill={subdued} stroke="currentColor" />
      <path d="M70 130h145m175 0h165" stroke={line} />
      <path d="M215 130l-14-9m14 9-14 9m175-9 14-9m-14 9 14 9" stroke="currentColor" />
      <circle cx="112" cy="130" r="24" fill={subdued} stroke="currentColor" />
      <circle cx="520" cy="98" r="13" fill="none" stroke="currentColor" />
      <circle cx="520" cy="162" r="13" fill="none" stroke="currentColor" />
      <path d="M275 105h89m-89 21h62m-62 21h77" stroke={line} strokeWidth="5" />
      <path d="M482 98h-70v32m70 32h-70v-32" fill="none" stroke={line} />
    </>
  );
}

function BehaviorArtwork() {
  return (
    <>
      <rect x="76" y="62" width="104" height="138" rx="5" fill={subdued} stroke="currentColor" />
      <path d="M97 86h62M97 101h42M97 158h62M97 173h42" stroke={line} strokeWidth="5" />
      <path d="M180 96h92v-22h90v46h96" fill="none" stroke="currentColor" />
      <path d="M180 165h92v22h90v-46h96" fill="none" stroke={line} />
      <rect x="456" y="74" width="110" height="112" fill={subdued} stroke="currentColor" />
      <path d="M477 158v-30h18v30m12 0V99h18v59m12 0v-44h18v44" fill="none" stroke="currentColor" />
    </>
  );
}

function RecommendationArtwork() {
  return (
    <>
      <path d="M92 75h98v128H92zM270 65h98v138h-98zM448 82h98v121h-98z" fill={subdued} stroke="currentColor" />
      <path d="M109 97h64m-64 17h42m-42 55h60M287 89h62m-62 17h48m-48 54h57M465 105h64m-64 17h43m-43 38h60" stroke={line} strokeWidth="5" />
      <path d="M190 139h80m98 0h80m-90-12 12 12-12 12m80-12 12 12-12 12" fill="none" stroke="currentColor" />
      <circle cx="319" cy="138" r="7" fill="currentColor" />
    </>
  );
}

function ResearchArtwork() {
  return (
    <>
      <rect x="78" y="94" width="136" height="74" fill={subdued} stroke="currentColor" />
      <rect x="252" y="94" width="136" height="74" fill={subdued} stroke="currentColor" />
      <path d="M214 131h38m136 0h38m-38-9 10 9-10 9m38-9 10 9-10 9" stroke="currentColor" />
      <path d="M99 117h91m-91 18h73m-73 17h82m-91-48h72" stroke={line} strokeWidth="5" />
      <path d="M273 117h91m-91 18h73m-73 17h82m-91-48h72" stroke={line} strokeWidth="5" />
      <path d="M426 88h119v86H426z" fill="none" stroke="currentColor" />
      <path d="M444 111h82m-82 18h70m-70 18h55" stroke={line} strokeWidth="5" />
      <path d="M78 192h467" stroke={subdued} />
    </>
  );
}

function VideoArtwork() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((step) => {
        const x = 56 + step * 108;
        return (
          <g key={step}>
            <rect x={x} y={83 + (step % 2) * 10} width="76" height="96" rx="3" fill={subdued} stroke="currentColor" />
            <path d={`M${x + 14} ${111 + (step % 2) * 10}h48M${x + 14} ${126 + (step % 2) * 10}h36M${x + 14} ${157 + (step % 2) * 10}h48`} stroke={line} strokeWidth="4" />
            {step < 4 ? (
              <path d={`M${x + 78} 132h27m-9-8 9 8-9 8`} fill="none" stroke="currentColor" />
            ) : null}
          </g>
        );
      })}
      <path d="M56 202H540" stroke={line} />
    </>
  );
}

function SpeechArtwork() {
  return (
    <>
      <path
        d="M92 130h30l20-48 34 98 32-76 25 52 24-28h290"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path d="M126 195h250m-250 14h180" stroke={line} strokeWidth="5" />
      <circle cx="142" cy="82" r="7" fill="currentColor" />
      <circle cx="208" cy="180" r="7" fill="currentColor" />
      <path d="M452 85v90m18-68v46m18-67v88m18-54v20" stroke={line} strokeWidth="5" />
      <path d="M430 194h96" stroke="currentColor" />
    </>
  );
}

function KnowledgeArtwork() {
  return (
    <>
      <rect x="75" y="77" width="130" height="112" fill={subdued} stroke="currentColor" />
      <rect x="255" y="77" width="130" height="112" fill={subdued} stroke="currentColor" />
      <rect x="435" y="77" width="130" height="112" fill={subdued} stroke="currentColor" />
      <path d="M97 101h86m-86 18h66m-66 44h70M277 101h86m-86 18h66m-66 44h70M457 101h86m-86 18h66m-66 44h70" stroke={line} strokeWidth="5" />
      <path d="M205 132h50m130 0h50m-50-9 10 9-10 9m50-9 10 9-10 9" fill="none" stroke="currentColor" />
      <circle cx="140" cy="151" r="4" fill="currentColor" />
      <circle cx="320" cy="151" r="4" fill="currentColor" />
      <circle cx="500" cy="151" r="4" fill="currentColor" />
    </>
  );
}

const artwork: Record<ProjectVisualKind, () => React.ReactNode> = {
  retrieval: RetrievalArtwork,
  business: BusinessArtwork,
  behavior: BehaviorArtwork,
  recommendation: RecommendationArtwork,
  research: ResearchArtwork,
  video: VideoArtwork,
  speech: SpeechArtwork,
  knowledge: KnowledgeArtwork,
};

export function ProjectArtwork({
  kind,
  accent,
  compact = false,
}: {
  kind: ProjectVisualKind;
  accent: string;
  compact?: boolean;
}) {
  const Art = artwork[kind];

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      viewBox="0 0 640 260"
      preserveAspectRatio="xMidYMid meet"
      style={{ color: accent }}
    >
      <path d="M24 24h592v212H24z" fill="rgba(17,18,17,.42)" stroke={subdued} />
      <path d="M24 47h592" stroke={subdued} />
      <circle cx="42" cy="35" r="3" fill={accent} />
      <circle cx="54" cy="35" r="3" fill="rgba(216,208,190,.35)" />
      <circle cx="66" cy="35" r="3" fill="rgba(216,208,190,.2)" />
      <g transform={compact ? "translate(0 0) scale(1)" : undefined}>
        <Art />
      </g>
    </svg>
  );
}
