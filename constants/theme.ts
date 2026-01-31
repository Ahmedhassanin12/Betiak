import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Your brand colors
export const brandColors = {
  primary: '#1db954',      // Spotify Green
  secondary: '#f93b7a',    // Pink
  tertiary: '#191414',     // Dark background
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Custom light theme
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    tertiary: brandColors.tertiary,
    error: brandColors.error,

    // Surface colors
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceVariant: '#f0f0f0',

    // Text colors
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onSurface: '#1a1a1a',
    onSurfaceVariant: '#666666',

    // Custom additions
    success: brandColors.success,
    warning: brandColors.warning,
  },
  roundness: 12,
};

// Custom dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    tertiary: brandColors.tertiary,
    error: brandColors.error,

    // Surface colors
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2a2a2a',

    // Text colors
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onSurface: '#ffffff',
    onSurfaceVariant: '#b0b0b0',

    // Custom additions
    success: brandColors.success,
    warning: brandColors.warning,
  },
  roundness: 12,
};

// Type augmentation for custom colors
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
      warning: string;
    }
  }
}