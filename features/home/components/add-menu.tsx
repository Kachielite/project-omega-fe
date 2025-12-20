import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { Radius, Shadow } from '@/core/common/constants/dimensions';
import { GlassView } from 'expo-glass-effect';
import { Ionicons } from '@expo/vector-icons';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import Animated, { FadeInUp } from 'react-native-reanimated';

function MenuItem({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon: 'checkmark' | 'folder';
}) {
  const colors = useThemeColors();
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <Text style={[styles.menuText, { color: colors.textPrimary }]}>{label}</Text>
      <Ionicons name={icon} size={24} color={colors.textPrimary} />
    </Pressable>
  );
}

export function AddMenu() {
  const colors = useThemeColors();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Add Button */}
      <GlassView tintColor={colors.cardBackground} isInteractive style={[styles.profile]}>
        <Pressable onPress={() => setOpen(!open)}>
          <Ionicons name="add" size={24} color={colors.textPrimary} />
        </Pressable>
      </GlassView>

      {/* Overlay */}
      {open && (
        <Animated.View entering={FadeInUp.delay(20)} style={styles.overlay}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <GlassView style={[styles.menu]} isInteractive tintColor={colors.background}>
              <MenuItem
                label="Add Task"
                onPress={() => {
                  setOpen(false);
                }}
                icon="checkmark"
              />
              <MenuItem
                label="Add Project"
                onPress={() => {
                  setOpen(false);
                }}
                icon="folder"
              />
            </GlassView>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 40,
    height: 40,
    borderRadius: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
  },

  menu: {
    borderRadius: Radius.md,
    paddingVertical: 8,
    height: 100,
    width: 250,
    gap: 2,
    ...Shadow.md,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  menuText: {
    fontSize: 16,
  },
});
