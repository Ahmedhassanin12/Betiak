import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar, useColorScheme } from 'react-native';


const queryClient = new QueryClient();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    primary: '#667eea',
    accent: '#f93b7a',
    chipBackground: isDark ? '#2a2a2a' : '#f0f0f0',
    chipSelected: '#667eea',
    border: isDark ? '#333333' : '#e0e0e0',
    statusBar: isDark ? '#1e1e1e' : '#667eea',
  };

  return (
    <QueryClientProvider client={queryClient}>

      <StatusBar
        animated={true}
        backgroundColor={theme.statusBar}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        showHideTransition="fade"
      />
      <ThemeProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="match" options={{ presentation: 'modal' }} />
            <Stack.Screen name="settings" />
          </Stack>
        </AuthProvider>
      </ThemeProvider>

    </QueryClientProvider>
  );
}