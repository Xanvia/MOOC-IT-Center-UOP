export interface Item {
  id?: number;
  name: string;
  content: JSX.Element | string;
  type: "video" | "note" | "quiz";
}

export interface Chapter {
  id?: number;
  name: string;
  items?: Item[];
}

export interface Week {
  id?: number;
  name: string;
  chapters: Chapter[];
}
