import { useMutation } from 'react-query';
import { AuthenticationService } from '@/features/authentication/services';
import zustandStorage from '@/core/common/state';
import { AppError } from '@/core/common/errors';
import { Toast } from 'toastify-react-native';

const useGetCurrentUser = () => {
  const { isLoading: isFetchingUser, mutateAsync: fetchUserHandler } = useMutation(
    'get-current-user',
    async () => {
      return AuthenticationService.getCurrentUser();
    },
    {
      onSuccess: (data) => {
        zustandStorage.setUser(data);
      },
      onError: (error: AppError) => {
        Toast.error(error.message || 'An error occurred while fetching current user');
      },
    },
  );

  return {
    isFetchingUser,
    fetchUserHandler,
  };
};

export default useGetCurrentUser;
