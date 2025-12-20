import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card, Radius, Spacing } from '@/core/common/constants/dimensions';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import { GlassView } from 'expo-glass-effect';
import { TextStyles } from '@/core/common/constants/fonts';
import ProgressBar from '@/core/components/progress-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SummaryCard() {
  const colors = useThemeColors();

  return (
    <GlassView style={[styles.container]} tintColor={colors.cardBackground}>
      <View style={styles.heading}>
        <Text style={[TextStyles.bodyMedium, { color: colors.textPrimary }]}>Summary</Text>
        <Text style={[TextStyles.caption, { color: colors.textPrimary }]}>Attention required</Text>
      </View>
      <ProgressBar progress={30} barColor={colors.textPrimary} containerColor={colors.textMuted} />
      <View style={styles.details}>
        <View style={styles.detailsItemContainer}>
          <View style={styles.detailsItem}>
            <MaterialCommunityIcons name="progress-check" size={18} color={colors.textPrimary} />
            <Text style={[TextStyles.caption, { color: colors.textPrimary }]}>In progress:</Text>
            <Text style={[TextStyles.bodyMedium, { color: colors.textPrimary }]}>5</Text>
          </View>
          <View style={styles.detailsItem}>
            <MaterialCommunityIcons name="sign-caution" size={18} color={colors.textPrimary} />
            <Text style={[TextStyles.caption, { color: colors.textPrimary }]}>Overdue:</Text>
            <Text style={[TextStyles.bodyMedium, { color: colors.textPrimary }]}>5</Text>
          </View>
          <View></View>
        </View>
        <Text style={[styles.progress, { color: colors.textPrimary }]}>30%</Text>
      </View>
    </GlassView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: Card.paddingSm,
    borderRadius: Radius.md,
    gap: Spacing.xl,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.xs,
    ...TextStyles.caption,
  },
  detailsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: Spacing.sm,
  },
  progress: {
    ...TextStyles.hero,
  },
});
