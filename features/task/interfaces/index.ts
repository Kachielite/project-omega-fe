export interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: ITaskStatus;
  due_date: string;
  priority: ITaskPriority;
  tags: ITags[];
  created_at: string;
  updated_at: string;
}

export interface ITags {
  id: number;
  name: string;
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

export interface IQueryParams {
  status?: ITaskStatus;
  priority?: ITaskPriority;
  due_date?: string;
  tags?: string[];
  search?: string;
  sort_by?: 'due_date' | 'priority' | 'created_at' | 'title';
  sort_order?: 'asc' | 'desc';
  page: number;
  limit: number;
  project_id?: number;
}

export interface ICreateTaskDTO {
  title: string;
  description: string;
  due_date: string;
  priority: ITaskPriority;
  tags?: number[];
  project_id?: number;
}

export interface IUpdateTaskDTO {
  title?: string;
  description?: string;
  status?: ITaskStatus;
  due_date?: string;
  priority?: ITaskPriority;
  tags?: number[];
}
