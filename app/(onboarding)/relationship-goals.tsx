import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RelationshipGoalsScreen() {
  const { updateProfile } = useProfile();
  const { colors } = useTheme();
  const [timeline, setTimeline] = useState<string | null>(null);
  const [children, setChildren] = useState<string | null>(null);
  const [relocate, setRelocate] = useState<boolean | null>(null);

  const handleContinue = async () => {
    await updateProfile({
      marriage_timeline: timeline,
      want_children: children,
      willing_to_relocate: relocate,
    });
    router.push('/phone-verification');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <Text style={[styles.title, { color: colors.text }]}>Relationship Goals</Text>

        {/* Marriage Timeline */}
        <View style={styles.section}>
          <Text style={[styles.question, { color: colors.text }]}>
            When are you looking to get married?
          </Text>
          <View style={styles.chipRow}>
            {[
              { value: 'asap', label: 'ASAP' },
              { value: '1-2-years', label: '1-2 Years' },
              { value: 'exploring', label: 'Just Exploring' },
              { value: 'no-rush', label: 'No Rush' },
            ].map((option) => (
              <Chip
                key={option.value}
                selected={timeline === option.value}
                onPress={() => setTimeline(option.value)}
                style={styles.chip}
              >
                {option.label}
              </Chip>
            ))}
          </View>
        </View>

        {/* Children */}
        <View style={styles.section}>
          <Text style={[styles.question, { color: colors.text }]}>
            Do you want children?
          </Text>
          <View style={styles.chipRow}>
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'maybe', label: 'Maybe' },
              { value: 'open', label: 'Open to Discussion' },
            ].map((option) => (
              <Chip
                key={option.value}
                selected={children === option.value}
                onPress={() => setChildren(option.value)}
                style={styles.chip}
              >
                {option.label}
              </Chip>
            ))}
          </View>
        </View>

        {/* Relocation */}
        <View style={styles.section}>
          <Text style={[styles.question, { color: colors.text }]}>
            Would you relocate for marriage?
          </Text>
          <View style={styles.chipRow}>
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map((option) => (
              <Chip
                key={String(option.value)}
                selected={relocate === option.value}
                onPress={() => setRelocate(option.value)}
                style={styles.chip}
              >
                {option.label}
              </Chip>
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!timeline || !children || relocate === null}
          style={styles.button}
        >
          Continue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  section: { marginBottom: 32 },
  question: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { marginBottom: 8 },
  button: { marginTop: 16 },
});