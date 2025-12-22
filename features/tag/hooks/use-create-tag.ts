import { useForm } from 'react-hook-form';
import { tagCreationSchema, TagCreationSchemaType } from '@/features/tag/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import { ICreateTagDTO } from '@/features/tag/interfaces';
import { TagService } from '@/features/tag/service';
import { Toast } from 'toastify-react-native';
import { AppError, logError } from '@/core/common/errors';

const useCreateTag = () => {
  const queryClient = useQueryClient();
  const tagForm = useForm<TagCreationSchemaType>({
    resolver: zodResolver(tagCreationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  const { isLoading: isCreatingTag, mutateAsync: createTagHandler } = useMutation(
    'create-tag',
    async (data: TagCreationSchemaType) => {
      const payload: ICreateTagDTO = {
        name: data.name,
      };
      return TagService.createTag(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetch-tags');
        Toast.success('Tag created successfully');
        tagForm.reset();
      },
      onError: (error: AppError) => {
        const errorMessage = error.message || 'An error occurred while creating the tag';
        logError(errorMessage);
        Toast.error(errorMessage);
      },
    },
  );

  return {
    tagForm,
    isCreatingTag,
    createTagHandler,
  };
};

export default useCreateTag;
