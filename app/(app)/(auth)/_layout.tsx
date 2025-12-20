import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(menus)/add"
        options={{
          presentation: 'formSheet',
          headerShown: false,
          title: 'Add',
        }}
      />
    </Stack>
  );
};
export default AuthLayout;
