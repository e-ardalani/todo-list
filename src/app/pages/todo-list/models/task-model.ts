export interface Task {
  description: string;
  title: string;
  creationDate: number;
  deleteDate?: number;
  isBookmark: boolean;
  isDone: boolean;
  id: string;
}
