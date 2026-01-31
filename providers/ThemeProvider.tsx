
import { darkTheme, lightTheme } from '@/constants/theme';
import React, { createContext, ReactNode, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

interface ThemeContextType {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);