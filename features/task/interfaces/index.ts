export interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: ITaskStatus;
  due_date: string;
  priority: ITaskPriority;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export enum ITaskStatus {
  TODO = 'To Do',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum ITaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}
