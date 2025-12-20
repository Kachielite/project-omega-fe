import { useMutation } from 'react-query';
import { AuthenticationService } from '@/features/authentication/services';
import zustandStorage from '@/core/common/state';
import { Toast } from 'toastify-react-native';
import { AppError } from '@/core/common/errors';
import { router } from 'expo-router';

const useLoginGoogle = () => {
  const { isLoading: isLoggingWithGoogle, mutateAsync: loginWithGoogleHandler } = useMutation(
    'login-google',
    async () => {
      const authData = await AuthenticationService.loginGoogle();
      if (!authData) {
        throw new Error('Google login failed');
      }
      return await AuthenticationService.login(authData);
    },
    {
      onSuccess: async (data) => {
        zustandStorage.setToken({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        zustandStorage.setUser(data.user);
        router.replace('/(app)/(auth)');
      },
      onError: (error: AppError) => {
        Toast.error(error.message || 'An error occurred during Google login');
      },
    },
  );

  return {
    isLoggingWithGoogle,
    loginWithGoogleHandler,
  };
};

export default useLoginGoogle;
