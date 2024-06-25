export interface Item {
  title: string;
  content: JSX.Element | string;
  type: "video" | "note" | "quiz";
}

export interface Subtopic {
  title: string;
  items: Item[];
}

export interface Topic {
  category: string;
  subtopics: Subtopic[];
}
