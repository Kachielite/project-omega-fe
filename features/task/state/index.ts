import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from '@/core/common/utils/zustandStorage';
import { ITask, ITaskQueryParams } from '@/features/task/interfaces';
import ENV from '@/core/common/constants/env';
import { IPaginationMeta } from '@/core/common/interfaces';

interface TaskStore {
  tasks: IPaginationMeta<ITask> | null;
  setTasks: (tasks: IPaginationMeta<ITask> | null) => void;
  selectedTask: ITask | null;
  setSelectedTask: (task: ITask | null) => void;
  query: ITaskQueryParams;
  setQuery: (query: ITaskQueryParams) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: null,
      setTasks: (tasks: IPaginationMeta<ITask> | null) => set({ tasks: tasks }),
      selectedTask: null,
      setSelectedTask: (task: ITask | null) => set({ selectedTask: task }),
      query: {
        page: 1,
        limit: 10,
      },
      setQuery: (query: ITaskQueryParams) => set({ query }),
    }),
    {
      name: ENV.STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useTaskStore;
