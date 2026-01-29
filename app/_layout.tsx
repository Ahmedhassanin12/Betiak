import { AuthProvider } from '@/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { PaperProvider, ThemeProvider } from 'react-native-paper';


const queryClient = new QueryClient();



export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
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
      </PaperProvider>
    </QueryClientProvider>
  );
}