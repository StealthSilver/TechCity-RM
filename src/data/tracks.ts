import { aimlTrack } from "@/data/aiml";
import { cloudTrack } from "@/data/cloud";
import { dsaTrack } from "@/data/dsa";
import { javaTrack } from "@/data/java";
import { mernTrack } from "@/data/mern";
import { pythonTrack } from "@/data/python";
import type { TrackContent } from "@/data/track";

export const tracks: Record<string, TrackContent> = {
  dsa: dsaTrack,
  aiml: aimlTrack,
  cloud: cloudTrack,
  mern: mernTrack,
  python: pythonTrack,
  java: javaTrack,
};

export function getTrack(slug: string) {
  return tracks[slug];
}

export const liveTrackIds = Object.keys(tracks);
