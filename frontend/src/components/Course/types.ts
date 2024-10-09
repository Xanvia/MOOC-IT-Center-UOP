export interface Item {
  id: number;
  name: string;
  content: any;
  type: "Video" | "Note" | "Quiz" | "Code" | "Notifications";
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

// types.ts

export interface Discussion {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  threadCount?: number;
  visibility: "all" | "teachers";
}

export interface ThreadMessage {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  visibility: "all" | "teachers";
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}
