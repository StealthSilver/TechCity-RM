export type TrackItem = {
  id: string;
  title: string;
  detail: string;
};

export type TrackSubtopic = {
  id: string;
  title: string;
};

export type TrackTopic = {
  id: string;
  title: string;
  detail: string;
  subtopics: TrackSubtopic[];
};

export type TrackSection = {
  id: string;
  title: string;
  summary: string;
  topics: TrackTopic[];
};

export type TrackContent = {
  id: string;
  prerequisites: TrackItem[];
  sections: TrackSection[];
};

export function trackTopicIds(content: TrackContent) {
  return content.sections.flatMap((section) =>
    section.topics.map((topic) => topic.id),
  );
}

export function trackSubtopicIds(content: TrackContent) {
  return content.sections.flatMap((section) =>
    section.topics.flatMap((topic) => topic.subtopics.map((sub) => sub.id)),
  );
}

export function trackPrerequisiteIds(content: TrackContent) {
  return content.prerequisites.map((item) => item.id);
}

