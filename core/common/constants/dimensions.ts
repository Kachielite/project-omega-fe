/**
 * Design Tokens
 * Expo / React Native
 * Use these instead of hardcoded values
 */

export const Spacing = {
  // Page
  pageHorizontal: 16,
  pageVertical: 20,

  // Sections
  section: 24,
  sectionLarge: 32,

  // Generic gaps
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  '3xl': 40,
  '4xl': 48,
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const Border = {
  hairline: 0.5,
  thin: 1,
};

export const Card = {
  paddingSm: 12,
  padding: 16,
  paddingLg: 20,

  gap: 12,
  gapLg: 16,

  radius: Radius.md,
};

export const Button = {
  heightSm: 40,
  height: 48,
  heightLg: 56,

  paddingHorizontal: 16,
  paddingHorizontalLg: 20,

  gap: 8,
  radius: Radius.lg,
};

export const Input = {
  height: 48,
  paddingHorizontal: 14,
  paddingVertical: 12,

  gap: 8,
  radius: Radius.sm,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const ScreenContainer = {
  flex: 1,
  paddingHorizontal: 12,
  gap: Spacing.lg,
};

export const ModalContainer = {
  flex: 1,
  padding: Spacing.lg,
  gap: Spacing.lg,
};
