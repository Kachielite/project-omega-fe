import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@/core/common/hooks/use-load-fonts';
import ToastManager from 'toastify-react-native/components/ToastManager';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLoadFonts();
  return (
    <>
      <Slot />
      <ToastManager />
    </>
  );
}
