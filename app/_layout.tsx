import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@/core/common/presentation/hooks/use-load-fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLoadFonts();
  return <Slot />;
}
