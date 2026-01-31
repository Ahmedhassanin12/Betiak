import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileDetailsScreen() {
  const { updateProfile } = useProfile();
  const { colors } = useTheme();
  const [bio, setBio] = useState('');

  const handleComplete = async () => {
    await updateProfile({
      bio,
      onboarding_completed: true
    });
    router.replace('/relationship-goals');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>About You</Text>

      <TextInput
        label="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleComplete} style={styles.button}>
        Complete Profile
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  input: { marginBottom: 24 },
  button: { marginTop: 'auto' },
});