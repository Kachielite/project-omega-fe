import { useMutation } from 'react-query';
import { AuthenticationService } from '@/features/authentication/services';
import zustandStorage from '@/core/common/state';
import { Toast } from 'toastify-react-native';
import { AppError } from '@/core/common/errors';
import { router } from 'expo-router';

const useAppleGoogle = () => {
  const { isLoading: isLoggingWithApple, mutateAsync: loginWithAppleHandler } = useMutation(
    'login-google',
    async () => {
      const authData = await AuthenticationService.loginApple();
      if (!authData) {
        throw new Error('Apple login failed');
      }
      return AuthenticationService.login(authData);
    },
    {
      onSuccess: async (data) => {
        zustandStorage.setToken(data);
        await AuthenticationService.getCurrentUser();
        router.replace('/(app)/(auth)');
      },
      onError: (error: AppError) => {
        Toast.error(error.message || 'An error occurred during Apple login');
      },
    },
  );

  return {
    isLoggingWithApple,
    loginWithAppleHandler,
  };
};

export default useAppleGoogle;
