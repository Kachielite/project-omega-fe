import { useQuery } from 'react-query';
import { AuthenticationService } from '@/features/authentication/services';
import zustandStorage from '@/core/common/state';
import { AppError } from '@/core/common/errors';
import { Toast } from 'toastify-react-native';
import React from 'react';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

const useGetCurrentUser = () => {
  const [user, setUser] = React.useState(() => zustandStorage.getUser());
  const token = zustandStorage.getToken();
  const { isLoading: isFetchingUser } = useQuery(
    'get-current-user',
    async () => {
      return AuthenticationService.getCurrentUser();
    },
    {
      enabled: !!token,
      onSuccess: (data) => {
        zustandStorage.setUser(data);
      },
      onError: (error: AppError) => {
        Toast.error(error.message || 'An error occurred while fetching current user');
      },
    },
  );

  React.useEffect(() => {
    const listener = storage.addOnValueChangedListener((key) => {
      if (key === 'user') {
        setUser(zustandStorage.getUser());
      }
    });
    return () => listener.remove();
  }, []);

  return {
    isFetchingUser,
    user,
  };
};

export default useGetCurrentUser;
