import { StyleSheet, View } from 'react-native';
import React from 'react';
import useCreateTask from '@/features/task/hooks/use-create-task';
import CustomTextInput from '@/core/components/form/custom-text-input';
import { Spacing } from '@/core/common/constants/dimensions';
import CustomTextAreaInput from '@/core/components/form/custom-text-area-input';
import CustomDatePicker from '@/core/components/form/custom-date-picker';

export default function CreateTaskForm() {
  const { taskForm } = useCreateTask();
  return (
    <View style={styles.form}>
      <CustomTextInput
        id="title"
        label="Title"
        placeholder="Enter task title"
        formController={taskForm}
        required
      />
      <CustomTextAreaInput
        id="description"
        label="Description"
        placeholder="Enter task description"
        formController={taskForm}
        numberOfLines={14}
      />
      <CustomDatePicker
        id="due_date"
        label="Due Date"
        placeholder="Enter due date"
        formController={taskForm}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: Spacing.lg,
  },
});
