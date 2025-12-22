import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer, Shadow } from '@/core/common/constants/dimensions';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import ScreenHeader from '@/core/components/screen-header';
import { GlassView } from 'expo-glass-effect';
import { Ionicons } from '@expo/vector-icons';
import {
  TaskItems,
  TaskListDatePicker,
  TaskListHeader,
  TaskListTitle,
  TaskListWrapper,
} from '@/features/task/components/task-list';
import useTaskStore from '@/features/task/state';
import { TASK_DATA } from '@/core/data/task';

export default function TasksPage() {
  const colors = useThemeColors();
  const { query, setQuery } = useTaskStore();
  const onDateChange = (date: string) => {
    setQuery({ ...query, due_date: date });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Tasks">
        <GlassView tintColor={colors.cardBackground} isInteractive style={[styles.addBtn]}>
          <Pressable onPress={() => {}}>
            <Ionicons name="add-sharp" size={24} color={colors.textPrimary} />
          </Pressable>
        </GlassView>
      </ScreenHeader>
      <TaskListWrapper>
        <TaskListHeader>
          <TaskListTitle title="" />
          <TaskListDatePicker
            date={new Date(query.due_date as string)}
            onDateChange={onDateChange}
          />
        </TaskListHeader>
        <TaskItems items={TASK_DATA} fullHeight bottomPadding={250} />
      </TaskListWrapper>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...ScreenContainer,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
});
