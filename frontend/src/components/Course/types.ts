export interface Item {
  id: number;
  name: string;
  content: any;
  type: "Video" | "Note" | "Quiz";
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


