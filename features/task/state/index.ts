import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from '@/core/common/utils/zustandStorage';
import { ITask } from '@/features/task/interfaces';
import ENV from '@/core/common/constants/env';

interface TaskStore {
  tasks: ITask[];
  setTask: (task: ITask) => void;
  selectedTask: ITask | null;
  setSelectedTask: (task: ITask | null) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      setTask: (task: ITask) => set({ tasks: [...get().tasks, task] }),
      selectedTask: null,
      setSelectedTask: (task: ITask | null) => set({ selectedTask: task }),
    }),
    {
      name: ENV.STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useTaskStore;
