import { useFonts } from 'expo-font';
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

const useLoadFonts = () => {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
    Nunito_500Medium,
    Nunito_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
};

export default useLoadFonts;
