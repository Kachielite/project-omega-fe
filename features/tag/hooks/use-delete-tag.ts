import useTagsStore from '@/features/tag/state';
import { useMutation } from 'react-query';
import { TagService } from '@/features/tag/service';
import { AppError, logError } from '@/core/common/errors';
import { Toast } from 'toastify-react-native';

const useDeleteTag = () => {
  const { selectedTag, setSelectedTag } = useTagsStore();

  const { isLoading: isDeletingTag, mutateAsync: deleteTagHandler } = useMutation(
    'delete-tag',
    async () => {
      if (!selectedTag) {
        throw new AppError(400, 400, 'No tag selected for deletion');
      }
      return TagService.deleteTag(selectedTag.id);
    },
    {
      onSuccess: () => {
        setSelectedTag(null);
      },
      onError: (error: AppError) => {
        const errorMessage = error.message || 'An error occurred while deleting the tag';
        logError(errorMessage);
        Toast.error(errorMessage);
      },
    },
  );

  return {
    isDeletingTag,
    deleteTagHandler,
  };
};

export default useDeleteTag;
