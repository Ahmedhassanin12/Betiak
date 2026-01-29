import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';


export default function OnboardingLayout() {
  const { user } = useAuth();

  // Must be logged in to see onboarding
  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="basic-profile" />
      <Stack.Screen name="lifestyle" />
      <Stack.Screen name="profile-details" />
      <Stack.Screen name="relationship-goals" />
      <Stack.Screen name="photos" />
      <Stack.Screen name="verification" />
    </Stack>
  );
}