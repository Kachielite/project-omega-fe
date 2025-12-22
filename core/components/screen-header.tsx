import useThemeColors from '@/core/common/hooks/use-theme-colors';
import { StyleSheet, Text, View } from 'react-native';
import { TextStyles } from '@/core/common/constants/fonts';
import React from 'react';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export default function ScreenHeader({ title = 'Good morning', children }: Props) {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.greetings, { color: colors.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  greetings: {
    ...TextStyles.title,
  },
});
