import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Border, Input, Radius, Spacing } from '@/core/common/constants/dimensions';
import { TextStyles } from '@/core/common/constants/fonts';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Foundation } from '@expo/vector-icons';

interface Props<T extends FieldValues> {
  id: Path<T>;
  formController: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function CustomTextInput<T extends FieldValues>({
  label,
  placeholder,
  id,
  formController,
  required,
}: Props<T>) {
  const colors = useThemeColors();

  const {
    register,
    formState: { errors },
  } = formController;
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
        {required && (
          <Foundation
            style={styles.asterisk}
            name="asterisk"
            size={10}
            color={colors.textPrimary}
          />
        )}
      </View>
      <TextInput
        style={[styles.input, { color: colors.textPrimary, borderColor: colors.border }]}
        placeholder={placeholder}
        {...register(id)}
      />
      {errorMessage && <Text style={[styles.error, { color: colors.error }]}>{errorMessage}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: Spacing.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  label: {
    ...TextStyles.label,
  },
  asterisk: {
    marginTop: 2,
  },
  input: {
    ...Input,
    borderWidth: Border.thin,
    borderRadius: Radius.md,
  },
  error: {
    ...TextStyles.error,
  },
});
