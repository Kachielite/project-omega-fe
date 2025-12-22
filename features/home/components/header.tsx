import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import { TextStyles } from '@/core/common/constants/fonts';
import { AddMenu } from '@/features/home/components/add-menu';

export default function Header() {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.greetings, { color: colors.textPrimary }]}>Good morning</Text>
      <AddMenu />
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
