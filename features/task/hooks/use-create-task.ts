import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { taskCreationSchema, TaskCreationSchemaType } from '@/features/task/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { ICreateTaskDTO, ITaskPriority, ITaskStatus } from '@/features/task/interfaces';
import { TaskService } from '@/features/task/service';
import { Toast } from 'toastify-react-native';
import { AppError, logError } from '@/core/common/errors';

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const taskForm = useForm<TaskCreationSchemaType>({
    resolver: zodResolver(taskCreationSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      due_date: undefined,
      priority: ITaskPriority.MEDIUM,
      status: ITaskStatus.TODO,
      tags: [],
      project_id: undefined,
    },
  });

  const { isLoading: isCreatingTask, mutateAsync: createTaskHandler } = useMutation(
    'create-task',
    async (newTask: TaskCreationSchemaType) => {
      const request: ICreateTaskDTO = {
        title: newTask.title,
        priority: newTask.priority,
      };

      if (newTask.description) {
        request.description = newTask.description;
      }

      if (newTask.due_date) {
        request.due_date = moment(newTask.due_date).toISOString();
      }

      if (newTask.status) {
        request.status = newTask.status;
      }

      if (newTask.tags && newTask.tags.length > 0) {
        request.tags = newTask.tags.map((tag) => tag.id);
      }

      if (newTask.project_id) {
        request.project_id = newTask.project_id;
      }

      return TaskService.createTask(request);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        Toast.success('Task created successfully');
        taskForm.reset();
      },
      onError: (error: AppError) => {
        const errorMessage =
          error.status === 404
            ? 'The project you are trying to add a task to does not exist.'
            : error.message || 'An error occurred while creating the task';
        logError(errorMessage);
        Toast.error(errorMessage);
      },
    },
  );

  return {
    taskForm,
    isCreatingTask,
    createTaskHandler,
  };
};

export default useCreateTask;
