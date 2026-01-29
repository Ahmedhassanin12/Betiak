import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/providers/AuthProvider';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Text style={[styles.title, { color: colors.text }]}>
        {profile?.full_name || 'Your Profile'}
      </Text>

      <Button mode="outlined" onPress={signOut} style={styles.button}>
        Sign Out
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { marginTop: 24 },
});