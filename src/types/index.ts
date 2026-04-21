export type Id = string | number;
export type Priority = 'low' | 'medium' | 'high';
export type IssueType = 'task' | 'bug' | 'story' | 'epic';
export type Theme = 'light' | 'dark';

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface Column {
  id: Id;
  title: string;
}

export interface Task {
  id: Id;
  key: string;
  columnId: Id;
  content: string;
  description: string;
  priority: Priority;
  type: IssueType;
  assignee: string;
  dueDate: string;
  comments: Comment[];
}