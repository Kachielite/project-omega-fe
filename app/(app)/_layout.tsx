import React from 'react';
import { Stack } from 'expo-router';
import zustandStorage from '@/core/common/state';

const Layout = () => {
  const user = zustandStorage.getUser();
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
