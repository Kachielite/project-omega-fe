import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ModalContainer } from '@/core/common/constants/dimensions';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import ModalHeader from '@/core/components/model-header';
import CustomTextInput from '@/core/components/form/custom-text-input';
import useCreateTask from '@/features/task/hooks/use-create-task';

export default function CreateTaskPage() {
  const colors = useThemeColors();
  const { taskForm } = useCreateTask();
  return (
    <View style={[styles.modelContainer, { backgroundColor: colors.background }]}>
      <ModalHeader title="Create Task" />
      <CustomTextInput
        id="title"
        label="Title"
        placeholder="Enter task title"
        formController={taskForm}
        required
      />
    </View>
  );
}
const styles = StyleSheet.create({
  modelContainer: {
    ...ModalContainer,
  },
});
