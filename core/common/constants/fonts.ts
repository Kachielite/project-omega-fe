export const Fonts = {
  brand: 'Nunito',
  brandBold: 'Nunito_700Bold',
  brandBlack: 'Nunito_900Black',
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  black: 'Nunito_900Black',
};

export const FontSize = {
  xs: 12, // captions, helper text
  sm: 14, // secondary text
  md: 16, // body text (default)
  lg: 18, // emphasized body
  xl: 20, // section titles
  xxl: 24, // page titles
  xxxl: 32, // hero headlines
};

export const LineHeight = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 28,
  xxl: 32,
  xxxl: 40,
};

export const TextStyles = {
  hero: {
    fontFamily: Fonts.black,
    fontSize: FontSize.xxxl,
    lineHeight: LineHeight.xxxl,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.xxl,
    lineHeight: LineHeight.xxl,
  },

  title2: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.xl,
    lineHeight: LineHeight.xl,
  },
  title3: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
  },
  tile4: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },
  title5: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },

  subtitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.xl,
  },

  body: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },

  bodyMedium: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },

  bodySmall: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },
  bodyExtraSmall: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
  },

  caption: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },

  button: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },

  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },
  error: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.sm,
  },
};
