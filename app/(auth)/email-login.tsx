import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

// Simplified email-only schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function EmailLoginScreen() {
  const { signInWithOTP } = useAuth();
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleEmailSubmit = async (data: EmailFormData) => {
    setLoading(true);
    try {
      //TODO:: Send magic link or proceed to onboarding
      // For now, we'll navigate to the onboarding flow
      router.push({
        pathname: "./(onboarding)/basic-profile",
        params: { email: data.email }
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    primary: '#667eea',
    primaryLight: isDark ? '#8b9cef' : '#667eea',
    border: isDark ? '#333333' : '#e0e0e0',
    inputBackground: isDark ? '#2a2a2a' : '#ffffff',
    accent: '#f93b7a',
    statusBar: isDark ? '#1e1e1e' : '#667eea',
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor={theme.statusBar}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        showHideTransition="fade"
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={['left', 'right', 'top']}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Button
              mode="text"
              onPress={() => router.back()}
              textColor={theme.text}
              icon={() => <Ionicons name="arrow-back" size={24} color={theme.text} />}
            >
              Back
            </Button>
          </View>

          {/* Content */}
          <View style={[styles.content, { backgroundColor: theme.surface }]}>
            {/* Logo/Icon */}
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
              <Ionicons name="heart" size={48} color={theme.primary} />
            </View>

            <Text style={[styles.title, { color: theme.text }]}>
              Find Your Match
            </Text>

            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Enter your email to begin your journey to a meaningful halal relationship
            </Text>

            {/* Email Input */}
            <Controller
              control={emailForm.control}
              name="email"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                  <TextInput
                    label="Email Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    outlineColor={theme.border}
                    activeOutlineColor={theme.primary}
                    textColor={theme.text}
                    theme={{
                      colors: {
                        background: theme.inputBackground,
                        placeholder: theme.textSecondary,
                      }
                    }}
                    left={<TextInput.Icon icon="email-outline" color={theme.textSecondary} />}
                    error={!!error}
                  />
                  <HelperText type="error" visible={!!error}>
                    {error?.message}
                  </HelperText>
                </>
              )}
            />

            {/* Continue Button */}
            <Button
              mode="contained"
              onPress={emailForm.handleSubmit(handleEmailSubmit)}
              loading={loading}
              disabled={loading}
              style={[styles.submitButton, { backgroundColor: theme.primary }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonLabel}
            >
              Continue
            </Button>

            {/* Privacy Notice */}
            <View style={[styles.privacyNotice, { backgroundColor: theme.background }]}>
              <Ionicons name="shield-checkmark" size={16} color={theme.primaryLight} />
              <Text style={[styles.privacyText, { color: theme.textSecondary }]}>
                Your information is secure and private. We maintain Islamic values in all interactions.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 40,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 4,
    width: '100%',
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
    width: '100%',
  },
  submitButtonContent: {
    height: 56,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  privacyText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
});