import { StyleSheet, View } from 'react-native';
import React from 'react';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Fonts } from '@/core/common/constants/fonts';
import AuthButton from '@/features/authentication/components/auth-button';
import useLoginApple from '@/features/authentication/hooks/use-login-apple';
import useLoginGoogle from '@/features/authentication/hooks/use-login-google';

const LoginPage = () => {
  const colors = useThemeColors();
  const { loginWithAppleHandler, isLoggingWithApple } = useLoginApple();
  const { loginWithGoogleHandler, isLoggingWithGoogle } = useLoginGoogle();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <Animated.Text
          entering={FadeInDown}
          style={[styles.headline, { color: colors.textPrimary }]}
        >
          Manage your tasks efficiently
        </Animated.Text>
        <LottieView
          source={require('../../../core/assets/lottie/project-x.json')}
          autoPlay
          loop
          style={styles.imageContainer}
        />
        <Animated.Text
          entering={FadeInDown}
          style={[styles.tagline, { color: colors.textPrimary }]}
        >
          Organize, prioritize, and achieve more with our intuitive AI task management app.
        </Animated.Text>
      </View>
      <View style={styles.buttonContainer}>
        <Animated.View entering={FadeInDown.delay(100)}>
          <AuthButton
            label="Sign in with Apple"
            onPress={loginWithAppleHandler}
            logo="logo-apple"
            color="#000000"
            labelColor="#FFFFFF"
            borderColor="#FFFFFF"
            loading={isLoggingWithApple}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200)}>
          <AuthButton
            label="Sign in with Google"
            onPress={loginWithGoogleHandler}
            logo="logo-google"
            color="#FFFFFF"
            borderColor="#000000"
            labelColor="#0F1115"
            loading={isLoggingWithGoogle}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 500,
    height: 600,
  },
  headline: {
    position: 'absolute',
    top: 80,
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    textAlign: 'center',
    width: '100%',
  },
  tagline: {
    position: 'absolute',
    bottom: 15,
    fontSize: 20,
    fontFamily: Fonts.brand,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    gap: 12,
  },
});

export default LoginPage;
