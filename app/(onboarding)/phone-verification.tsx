import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationScreen() {
  const { updateProfile } = useProfile();
  const { colors } = useTheme();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const sendCode = async () => {
    // TODO: Integrate with Supabase Phone Auth or Twilio
    setCodeSent(true);
    Alert.alert('Code Sent', `Verification code sent to ${phone}`);
  };

  const verifyCode = async () => {
    // TODO: Verify the code
    await updateProfile({
      phone_verified: true,
      onboarding_completed: true
    });
    router.replace('../(tabs)');
  };

  const handleSkip = async () => {
    await updateProfile({ onboarding_completed: true });
    router.replace('../(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Verify Your Phone</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        This helps us keep the community safe and authentic
      </Text>

      {!codeSent ? (
        <>
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <Button mode="contained" onPress={sendCode} style={styles.button}>
            Send Verification Code
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Verification Code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Button mode="contained" onPress={verifyCode} style={styles.button}>
            Verify & Complete
          </Button>
          <Button mode="text" onPress={sendCode} style={styles.resendButton}>
            Resend Code
          </Button>
        </>
      )}

      <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
        Skip - I&apos;ll verify later
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 32 },
  input: { marginBottom: 24 },
  button: {},
  resendButton: { marginTop: 16 },
  skipButton: { marginTop: 32 },
});