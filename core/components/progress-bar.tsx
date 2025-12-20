import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Radius } from '@/core/common/constants/dimensions';

interface Props {
  progress: number;
  containerColor: string;
  barColor: string;
}

export default function ProgressBar({ progress, barColor, containerColor }: Props) {
  const width = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <View style={[styles.container, { backgroundColor: containerColor }]}>
      <View style={[styles.bar, { width: width, backgroundColor: barColor }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: Radius.md,
  },
});
