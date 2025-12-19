import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@/core/common/hooks/use-load-fonts';
import ToastManager from 'toastify-react-native/components/ToastManager';
import { QueryClient, QueryClientProvider } from 'react-query';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function RootLayout() {
  useLoadFonts();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <ToastManager />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
