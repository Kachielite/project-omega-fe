import React from 'react';
import { Stack } from 'expo-router';
import useGetCurrentUser from '@/features/authentication/hooks/use-get-current-user';
import GeneralLoader from '@/core/components/loaders/general-loader';

const Layout = () => {
  const { user, isFetchingUser } = useGetCurrentUser();

  if (isFetchingUser) {
    return <GeneralLoader />;
  }

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
export default Layout;
