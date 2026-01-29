import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BasicProfileScreen() {
  const { updateProfile } = useProfile();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleContinue = async () => {
    await updateProfile({
      full_name: name,
      age: parseInt(age)
    });
    router.push('/lifestyle');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Basic Profile</Text>

      <TextInput label="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" style={styles.input} />

      <Button mode="contained" onPress={handleContinue}>
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  input: { marginBottom: 16 },
});