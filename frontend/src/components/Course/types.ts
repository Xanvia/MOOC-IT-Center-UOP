export interface Item {
  title: string;
  content: JSX.Element | string;
  type: "video" | "note" | "quiz";
}

export interface Chapter {
  title: string;
  items?: Item[];
}

export interface Week {
  weekname: string;
  chapters: Chapter[];
}
