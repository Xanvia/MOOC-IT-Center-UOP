export interface Item {
  title: string;
  content: JSX.Element | string;
  type: "video" | "note" | "quiz";
}

export interface Subtopic {
  title: string;
  items?: Item[];
}

export interface Week {
  weekname: string;
  subtopics: Subtopic[];
}
