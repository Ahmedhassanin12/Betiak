import { Button } from '@/components/common/Button';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

// Simplified email-only schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function EmailLoginScreen() {
  const theme = useTheme();

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
        pathname: "/basic-profile",
        params: { email: data.email }
      });

    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <SafeAreaProvider>

      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
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
              textColor={theme.colors.text}
              buttonColor='transparent'
              icon={() => <Ionicons name="arrow-back" size={20} color={theme.colors.text} />}
            >
              Back
            </Button>
          </View>

          {/* Content */}
          <View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
            {/* Logo/Icon */}
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
              <Image style={styles.logo} source={require("@/assets/images/betiak.png")} />
            </View>

            <Text style={[styles.title, { color: theme.colors.text }]}>
              Find Your Match
            </Text>

            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
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
                    outlineColor={theme.colors.border}
                    activeOutlineColor={theme.colors.primary}
                    textColor={theme.colors.text}
                    theme={{
                      colors: {
                        background: theme.colors.surface,
                        placeholder: theme.colors.textSecondary,
                      }
                    }}
                    left={<TextInput.Icon icon="email-outline" color={theme.colors.textSecondary} />}
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
              style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonLabel}
              buttonColor={theme.colors.primary}
            >
              Continue
            </Button>

            {/* Privacy Notice */}
            <View style={[styles.privacyNotice, { backgroundColor: theme.colors.surface }]}>
              <Ionicons name="shield-checkmark" size={16} color={theme.colors.primary} />
              <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
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
    paddingHorizontal: 12,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logo: {
    objectFit: "contain",
    width: 150,
    height: 100,

  },
  content: {
    flex: 1,
    borderRadius: 30,
    marginTop: 10,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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