import { StyleSheet } from 'react-native';
import React from 'react';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import Header from '@/features/home/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SummaryCard from '@/features/home/components/summary-card';
import {
  TaskItems,
  TaskListHeader,
  TaskListTitle,
  TaskListWrapper,
  TaskSeeAll,
} from '@/features/task/components/task-list';
import { Spacing } from '@/core/common/constants/dimensions';

export default function HomePage() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <SummaryCard />
      <TaskListWrapper>
        <TaskListHeader>
          <TaskListTitle title="Today's Tasks" />
          <TaskSeeAll onPress={() => {}} />
        </TaskListHeader>
        <TaskItems items={[]} />
      </TaskListWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    gap: Spacing.lg,
  },
});
