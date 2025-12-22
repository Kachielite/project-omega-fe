import { StyleSheet } from 'react-native';
import React from 'react';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
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
import { TASK_DATA } from '@/core/data/task';
import ScreenHeader from '@/core/components/screen-header';
import { AddMenu } from '@/features/home/components/add-menu';

export default function HomePage() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Good morning">
        <AddMenu />
      </ScreenHeader>
      <SummaryCard />
      <TaskListWrapper>
        <TaskListHeader>
          <TaskListTitle title="Today's Tasks" />
          <TaskSeeAll onPress={() => {}} />
        </TaskListHeader>
        <TaskItems items={TASK_DATA} />
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
