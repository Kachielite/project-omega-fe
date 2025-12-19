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
      return AuthenticationService.login(authData);
    },
    {
      onSuccess: (data) => {
        zustandStorage.setToken(data);
        router.push('/(app)/(auth)');
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
