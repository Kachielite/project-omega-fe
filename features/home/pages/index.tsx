import { StyleSheet } from 'react-native';
import React from 'react';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import Header from '@/features/home/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SummaryCard from '@/features/home/components/summary-card';

export default function HomePage() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <SummaryCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
