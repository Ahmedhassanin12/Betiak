import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LifestyleScreen() {
  const { updateProfile } = useProfile();
  const { colors } = useTheme();
  const [smoking, setSmoking] = useState<string | null>(null);
  const [drinking, setDrinking] = useState<string | null>(null);

  const handleContinue = async () => {
    await updateProfile({ smoking, drinking });
    router.push('/profile-details');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Lifestyle</Text>

      <Text style={{ color: colors.text, marginBottom: 12 }}>Do you smoke?</Text>
      <View style={styles.chipRow}>
        {['yes', 'no', 'occasionally'].map((option) => (
          <Chip
            key={option}
            selected={smoking === option}
            onPress={() => setSmoking(option)}
          >
            {option}
          </Chip>
        ))}
      </View>

      <Text style={{ color: colors.text, marginTop: 24, marginBottom: 12 }}>Do you drink?</Text>
      <View style={styles.chipRow}>
        {['yes', 'no', 'socially'].map((option) => (
          <Chip
            key={option}
            selected={drinking === option}
            onPress={() => setDrinking(option)}
          >
            {option}
          </Chip>
        ))}
      </View>

      <Button mode="contained" onPress={handleContinue} style={styles.button}>
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  button: { marginTop: 'auto' },
});