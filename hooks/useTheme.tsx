import { COLORS } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isDark,
    colors: {
      primary: COLORS.primary,
      accent: COLORS.accent,
      background: isDark ? COLORS.dark.background : COLORS.light.background,
      surface: isDark ? COLORS.dark.surface : COLORS.light.surface,
      text: isDark ? COLORS.dark.text : COLORS.light.text,
      textSecondary: isDark ? COLORS.dark.textSecondary : COLORS.light.textSecondary,
    },
  };
}