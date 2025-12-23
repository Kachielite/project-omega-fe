import useThemeColors from '@/core/common/hooks/use-theme-colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextStyles } from '@/core/common/constants/fonts';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  title?: string;
}

export default function ModalHeader({ title = 'Create' }: Props) {
  const router = useRouter();
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.greetings, { color: colors.textPrimary }]}>{title}</Text>
      <Pressable onPress={() => router.dismiss()} style={styles.menuItem}>
        <Ionicons name="close-circle" size={30} color={colors.textPrimary} />
      </Pressable>
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
    ...TextStyles.title2,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
