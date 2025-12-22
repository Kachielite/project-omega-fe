import useTaskStore from '@/features/task/state';
import { useQuery } from 'react-query';
import { TaskService } from '@/features/task/service';
import { AppError } from '@/core/common/errors';

const useFetchTask = () => {
  const { selectedTask, setSelectedTask } = useTaskStore();

  const { isLoading: isFetchingTask } = useQuery(
    'fetch-task',
    async () => {
      if (!selectedTask) {
        throw new AppError(404, 404, `There is no selected task`);
      }
      return TaskService.getTaskById(selectedTask?.id);
    },
    {
      enabled: !!selectedTask,
      onSuccess: (data) => {
        setSelectedTask(data);
      },
    },
  );

  return {
    isFetchingTask,
  };
};

export default useFetchTask;
