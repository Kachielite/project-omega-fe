import useTagsStore from '@/features/tag/state';
import { useQuery } from 'react-query';
import { TagService } from '@/features/tag/service';
import useGetCurrentUser from '@/features/authentication/hooks/use-get-current-user';

const useFetchTags = () => {
  const { user } = useGetCurrentUser();
  const { setTags } = useTagsStore();

  const { isLoading: isLoadingTags } = useQuery(
    'fetch-tags',
    async () => {
      return TagService.getAllTags();
    },
    {
      enabled: !!user,
      onSuccess: (data) => {
        setTags(data);
      },
    },
  );

  return {
    isLoadingTags,
  };
};

export default useFetchTags;
