import useTaskStore from '@/features/task/state';
import { useQuery } from 'react-query';
import { TaskService } from '@/features/task/service';
import useGetCurrentUser from '@/features/authentication/hooks/use-get-current-user';
import { ITaskQueryParams } from '@/features/task/interfaces';
import { useState } from 'react';
import useDebounce from '@/core/common/hooks/use-debounce';

const useFetchTasks = () => {
  const { user } = useGetCurrentUser();
  const { setTasks, query } = useTaskStore();

  const [title, setTitle] = useState('');
  const debounce = useDebounce(title, 500);

  // TODO: Add project_id when project feature is implemented
  const queryRequest: ITaskQueryParams = {
    page: query.page,
    limit: query.limit,
    due_date: query.due_date,
    ...(query.status ? { status: query.status } : {}),
    ...(query.priority ? { priority: query.priority } : {}),
    ...(query.tags ? { tags: query.tags } : {}),
    ...(query.sort_by ? { sort_by: query.sort_by } : {}),
    ...(query.sort_order ? { sort_order: query.sort_order } : {}),
    ...(debounce ? { title: debounce } : {}),
  };

  const { isLoading: isFetchingTasks } = useQuery(
    'fetch-tasks',
    async () => {
      return TaskService.getAllTasks(queryRequest);
    },
    {
      enabled: !!user,
      onSuccess: (data) => {
        setTasks(data);
      },
    },
  );

  return {
    isFetchingTasks,
    setTitle,
    title,
  };
};

export default useFetchTasks;
