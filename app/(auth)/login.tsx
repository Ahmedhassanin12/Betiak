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

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

export default function LoginScreen() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Form for Login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form for Sign Up
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const currentForm = isSignUp ? signUpForm : loginForm;

  const handleAuth = async (data: LoginFormData | SignUpFormData) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const signUpData = data as SignUpFormData;
        const { error } = await signUpWithEmail(signUpData.email, signUpData.password, {
          full_name: signUpData.fullName,
          country: 'Egypt', // Default country
        });

        if (error) {
          Alert.alert('Sign Up Error', error.message);
        } else {
          Alert.alert(
            'Success',
            'Account created! Please check your email to verify your account.'
          );
          setIsSignUp(false);
          signUpForm.reset();
        }
      } else {
        const loginData = data as LoginFormData;
        const { error } = await signInWithEmail(loginData.email, loginData.password);

        if (error) {
          Alert.alert('Login Error', error.message);
        }
        // Router will automatically navigate to app on success
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    loginForm.reset();
    signUpForm.reset();
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
    noticeBackground: isDark ? '#1a1f3a' : '#f5f7ff',
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

          {/* Form Card */}
          <View style={[styles.formCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isSignUp
                ? 'Join the Halal Match community'
                : 'Sign in to continue your journey'}
            </Text>

            {/* Full Name (Sign Up only) */}
            {isSignUp && (
              <>
                <Controller
                  control={signUpForm.control}
                  name="fullName"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <TextInput
                        label="Full Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={theme.border}
                        activeOutlineColor={theme.primary}
                        textColor={theme.text}
                        theme={{
                          colors: {
                            background: theme.inputBackground,
                            placeholder: theme.textSecondary,
                          }
                        }}
                        left={<TextInput.Icon icon="account" color={theme.textSecondary} />}
                        error={!!error}
                      />
                      <HelperText type="error" visible={!!error}>
                        {error?.message}
                      </HelperText>
                    </>
                  )}
                />
              </>
            )}

            {/* Email */}
            {isSignUp ? (
              <Controller
                control={signUpForm.control}
                name="email"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput
                      label="Email"
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
                      left={<TextInput.Icon icon="email" color={theme.textSecondary} />}
                      error={!!error}
                    />
                    <HelperText type="error" visible={!!error}>
                      {error?.message}
                    </HelperText>
                  </>
                )}
              />
            ) : (
              <Controller
                control={loginForm.control}
                name="email"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput
                      label="Email"
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
                      left={<TextInput.Icon icon="email" color={theme.textSecondary} />}
                      error={!!error}
                    />
                    <HelperText type="error" visible={!!error}>
                      {error?.message}
                    </HelperText>
                  </>
                )}
              />
            )}

            {/* Password */}
            {isSignUp ? (
              <Controller
                control={signUpForm.control}
                name="password"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput
                      label="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      mode="outlined"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      outlineColor={theme.border}
                      activeOutlineColor={theme.primary}
                      textColor={theme.text}
                      theme={{
                        colors: {
                          background: theme.inputBackground,
                          placeholder: theme.textSecondary,
                        }
                      }}
                      left={<TextInput.Icon icon="lock" color={theme.textSecondary} />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(!showPassword)}
                          color={theme.textSecondary}
                        />
                      }
                      error={!!error}
                    />
                    <HelperText type="error" visible={!!error}>
                      {error?.message}
                    </HelperText>
                  </>
                )}
              />
            ) : (
              <Controller
                control={loginForm.control}
                name="password"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput
                      label="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      mode="outlined"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      outlineColor={theme.border}
                      activeOutlineColor={theme.primary}
                      textColor={theme.text}
                      theme={{
                        colors: {
                          background: theme.inputBackground,
                          placeholder: theme.textSecondary,
                        }
                      }}
                      left={<TextInput.Icon icon="lock" color={theme.textSecondary} />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(!showPassword)}
                          color={theme.textSecondary}
                        />
                      }
                      error={!!error}
                    />
                    <HelperText type="error" visible={!!error}>
                      {error?.message}
                    </HelperText>
                  </>
                )}
              />
            )}

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <>
                <Controller
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <TextInput
                        label="Confirm Password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        mode="outlined"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        outlineColor={theme.border}
                        activeOutlineColor={theme.primary}
                        textColor={theme.text}
                        theme={{
                          colors: {
                            background: theme.inputBackground,
                            placeholder: theme.textSecondary,
                          }
                        }}
                        left={<TextInput.Icon icon="lock-check" color={theme.textSecondary} />}
                        error={!!error}
                      />
                      <HelperText type="error" visible={!!error}>
                        {error?.message}
                      </HelperText>
                    </>
                  )}
                />
              </>
            )}

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={currentForm.handleSubmit(handleAuth)}
              loading={loading}
              disabled={loading}
              style={[styles.submitButton, { backgroundColor: theme.primary }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonLabel}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            {/* Toggle Sign Up/Login */}
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
                {isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </Text>
              <Button
                mode="text"
                onPress={toggleMode}
                labelStyle={[styles.toggleButtonLabel, { color: theme.primaryLight }]}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </View>

            {/* Islamic Notice */}
            {isSignUp && (
              <View style={[styles.islamicNotice, { backgroundColor: theme.noticeBackground }]}>
                <Ionicons name="information-circle" size={16} color={theme.primaryLight} />
                <Text style={[styles.noticeText, { color: theme.primaryLight }]}>
                  All profiles are verified to maintain Islamic values
                </Text>
              </View>
            )}
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
  formCard: {
    flex: 1,
    borderRadius: 30,
    marginTop: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  submitButtonContent: {
    height: 56,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  toggleText: {
    fontSize: 14,
  },
  toggleButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  islamicNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  noticeText: {
    fontSize: 12,
    flex: 1,
  },
});

