import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ModalContainer } from '@/core/common/constants/dimensions';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import ModalHeader from '@/core/components/model-header';
import CreateTaskForm from '@/features/task/components/create-task-form';

export default function CreateTaskPage() {
  const colors = useThemeColors();
  return (
    <View style={[styles.modelContainer, { backgroundColor: colors.background }]}>
      <ModalHeader title="Create Task" />
      <CreateTaskForm />
    </View>
  );
}
const styles = StyleSheet.create({
  modelContainer: {
    ...ModalContainer,
  },
});
