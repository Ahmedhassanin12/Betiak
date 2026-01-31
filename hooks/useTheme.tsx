import { useAppTheme } from '@/providers/ThemeProvider';
import { useTheme as usePaperTheme } from 'react-native-paper';

export function useTheme() {
  const paperTheme = usePaperTheme();
  const { isDark } = useAppTheme();

  return {
    ...paperTheme,
    isDark,
    colors: {
      ...paperTheme.colors,
      // Easy access to common colors
      primary: paperTheme.colors.primary,
      accent: paperTheme.colors.secondary,
      background: paperTheme.colors.background,
      surface: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface,
      textSecondary: paperTheme.colors.onSurfaceVariant,
      border: paperTheme.colors.outline,
      error: paperTheme.colors.error,
    },
  };
}