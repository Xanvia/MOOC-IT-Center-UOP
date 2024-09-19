export interface Item {
  id: number;
  name: string;
  content: any;
  type: "Video" | "Note" | "Quiz";
  has_started: boolean;
  completed: boolean;
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

export interface Permissions {
  canEdit: boolean;
  canDelete: boolean;
  canCreateItems: boolean;
  canUploadFiles: boolean;
}
