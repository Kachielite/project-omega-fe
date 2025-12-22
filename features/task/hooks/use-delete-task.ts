import { useMutation, useQueryClient } from 'react-query';
import useTaskStore from '@/features/task/state';
import { AppError, logError } from '@/core/common/errors';
import { TaskService } from '@/features/task/service';
import { Toast } from 'toastify-react-native';

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { setSelectedTask, selectedTask } = useTaskStore();

  const { isLoading: isDeletingTask, mutateAsync: deleteTaskHandler } = useMutation(
    'delete-task',
    async () => {
      if (!selectedTask) {
        throw new AppError(404, 404, `There is no selected task to delete`);
      }
      return TaskService.deleteTask(selectedTask.id);
    },
    {
      onSuccess: () => {
        setSelectedTask(null);
        queryClient.invalidateQueries('tasks');
      },
      onError: (error: AppError) => {
        const errorMessage =
          error.status === 404
            ? 'The task you are trying to delete does not exist.'
            : error.message || 'An error occurred while deleting the task';
        logError(errorMessage);
        Toast.error(errorMessage);
      },
    },
  );

  return {
    isDeletingTask,
    deleteTaskHandler,
  };
};

export default useDeleteTask;
