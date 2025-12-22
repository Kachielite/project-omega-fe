import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { taskUpdateSchema, TaskUpdateSchemaType } from '@/features/task/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { IUpdateTaskDTO } from '@/features/task/interfaces';
import { TaskService } from '@/features/task/service';
import { Toast } from 'toastify-react-native';
import { AppError, logError } from '@/core/common/errors';
import useTaskStore from '@/features/task/state';

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { selectedTask } = useTaskStore();

  const taskUpdateForm = useForm<TaskUpdateSchemaType>({
    resolver: zodResolver(taskUpdateSchema),
    mode: 'onBlur',
    defaultValues: {
      title: selectedTask?.title || '',
      description: selectedTask?.description || '',
      due_date: selectedTask?.due_date || undefined,
      priority: selectedTask?.priority || undefined,
      status: selectedTask?.status || undefined,
      tags: selectedTask?.tags || [],
    },
  });

  const { isLoading: isUpdatingTask, mutateAsync: updateTaskHandler } = useMutation(
    'update-task',
    async (task: TaskUpdateSchemaType) => {
      const request: IUpdateTaskDTO = {};

      if (task.title) {
        request.title = task.title;
      }

      if (task.priority) {
        request.priority = task.priority;
      }

      if (task.description) {
        request.description = task.description;
      }

      if (task.due_date) {
        request.due_date = moment(task.due_date).toISOString();
      }

      if (task.status) {
        request.status = task.status;
      }

      if (task.tags && task.tags.length > 0) {
        request.tags = task.tags.map((tag) => tag.id);
      }

      return TaskService.updateTask(request, selectedTask!.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        Toast.success('Task created successfully');
        taskUpdateForm.reset();
      },
      onError: (error: AppError) => {
        const errorMessage = error.message || 'An error occurred while creating the task';
        logError(errorMessage);
        Toast.error(errorMessage);
      },
    },
  );

  return {
    taskUpdateForm,
    isUpdatingTask,
    updateTaskHandler,
  };
};

export default useCreateTask;
