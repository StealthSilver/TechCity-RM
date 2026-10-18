"use client";

import { useState } from "react";
import RoadmapBoard from "@/components/RoadmapBoard";
import type { Roadmap } from "@/data/roadmaps";

export default function RoadmapSession({ roadmap }: { roadmap: Roadmap }) {
  const [stageIndex, setStageIndex] = useState(0);

  return (
    <RoadmapBoard
      roadmap={roadmap}
      stageIndex={stageIndex}
      onStage={setStageIndex}
      audience="student"
    />
  );
}
