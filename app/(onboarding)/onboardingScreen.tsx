import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, Chip, ProgressBar, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingData {
  email: string;
  smoking: 'yes' | 'no' | 'occasionally' | null;
  drinking: 'yes' | 'no' | 'socially' | null;
  diet: 'halal-only' | 'halal-preferred' | 'no-preference' | null;
  prayer: 'five-times' | 'sometimes' | 'rarely' | 'learning' | null;
  religiosity: 'very-religious' | 'moderately-religious' | 'somewhat-religious' | 'not-religious' | null;
}

export default function OnboardingScreen() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [formData, setFormData] = useState<OnboardingData>({
    email: params.email as string || '',
    smoking: null,
    drinking: null,
    diet: null,
    prayer: null,
    religiosity: null,
  });

  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isComplete = () => {
    return formData.smoking && formData.drinking && formData.diet && formData.prayer && formData.religiosity;
  };

  const handleContinue = () => {
    if (!isComplete()) {
      Alert.alert('Incomplete', 'Please answer all questions to continue');
      return;
    }

    // Navigate to next step (profile details, photos, etc.)
    // router.push({
    //   pathname: '/onboarding/profile-details',
    //   params: formData as any
    // });
  };

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    primary: '#667eea',
    accent: '#f93b7a',
    chipBackground: isDark ? '#2a2a2a' : '#f0f0f0',
    chipSelected: '#667eea',
    border: isDark ? '#333333' : '#e0e0e0',
    statusBar: isDark ? '#1e1e1e' : '#667eea',
  };

  const answeredCount = Object.values(formData).filter(v => v !== null && v !== params.email).length;
  const totalQuestions = 5;
  const progress = answeredCount / totalQuestions;

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
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {answeredCount} of {totalQuestions} answered
          </Text>
          <ProgressBar
            progress={progress}
            color={theme.primary}
            style={styles.progressBar}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, { backgroundColor: theme.surface }]}>
            <Text style={[styles.mainTitle, { color: theme.text }]}>
              Let&apos;s get to know you better
            </Text>
            <Text style={[styles.mainSubtitle, { color: theme.textSecondary }]}>
              Help us find your perfect match by answering these questions
            </Text>

            {/* Question 1: Smoking */}
            <View style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Ionicons name="fitness-outline" size={24} color={theme.primary} />
                <Text style={[styles.questionTitle, { color: theme.text }]}>
                  Do you smoke?
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {[
                  { value: 'no', label: 'No', icon: 'close-circle-outline' },
                  { value: 'occasionally', label: 'Occasionally', icon: 'time-outline' },
                  { value: 'yes', label: 'Yes', icon: 'checkmark-circle-outline' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    selected={formData.smoking === option.value}
                    onPress={() => updateField('smoking', option.value as any)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: formData.smoking === option.value
                          ? theme.chipSelected
                          : theme.chipBackground
                      }
                    ]}
                    textStyle={[
                      styles.chipText,
                      { color: formData.smoking === option.value ? '#fff' : theme.text }
                    ]}
                    icon={option.icon}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Question 2: Drinking */}
            <View style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Ionicons name="wine-outline" size={24} color={theme.primary} />
                <Text style={[styles.questionTitle, { color: theme.text }]}>
                  Do you drink alcohol?
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {[
                  { value: 'no', label: 'No', icon: 'close-circle-outline' },
                  { value: 'socially', label: 'Socially', icon: 'people-outline' },
                  { value: 'yes', label: 'Yes', icon: 'checkmark-circle-outline' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    selected={formData.drinking === option.value}
                    onPress={() => updateField('drinking', option.value as any)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: formData.drinking === option.value
                          ? theme.chipSelected
                          : theme.chipBackground
                      }
                    ]}
                    textStyle={[
                      styles.chipText,
                      { color: formData.drinking === option.value ? '#fff' : theme.text }
                    ]}
                    icon={option.icon}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Question 3: Diet/Halal */}
            <View style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Ionicons name="restaurant-outline" size={24} color={theme.primary} />
                <Text style={[styles.questionTitle, { color: theme.text }]}>
                  What&apos;s your diet preference?
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {[
                  { value: 'halal-only', label: 'Halal Only', icon: 'checkmark-done' },
                  { value: 'halal-preferred', label: 'Halal Preferred', icon: 'star-outline' },
                  { value: 'no-preference', label: 'No Preference', icon: 'remove-circle-outline' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    selected={formData.diet === option.value}
                    onPress={() => updateField('diet', option.value as any)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: formData.diet === option.value
                          ? theme.chipSelected
                          : theme.chipBackground
                      }
                    ]}
                    textStyle={[
                      styles.chipText,
                      { color: formData.diet === option.value ? '#fff' : theme.text }
                    ]}
                    icon={option.icon}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Question 4: Prayer */}
            <View style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Ionicons name="moon-outline" size={24} color={theme.primary} />
                <Text style={[styles.questionTitle, { color: theme.text }]}>
                  How often do you pray?
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {[
                  { value: 'five-times', label: 'Five Times Daily', icon: 'star' },
                  { value: 'sometimes', label: 'Sometimes', icon: 'time-outline' },
                  { value: 'rarely', label: 'Rarely', icon: 'ellipsis-horizontal' },
                  { value: 'learning', label: 'Still Learning', icon: 'school-outline' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    selected={formData.prayer === option.value}
                    onPress={() => updateField('prayer', option.value as any)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: formData.prayer === option.value
                          ? theme.chipSelected
                          : theme.chipBackground
                      }
                    ]}
                    textStyle={[
                      styles.chipText,
                      { color: formData.prayer === option.value ? '#fff' : theme.text }
                    ]}
                    icon={option.icon}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Question 5: Religiosity Level */}
            <View style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Ionicons name="book-outline" size={24} color={theme.primary} />
                <Text style={[styles.questionTitle, { color: theme.text }]}>
                  How would you describe your religiosity?
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {[
                  { value: 'very-religious', label: 'Very Religious', icon: 'star' },
                  { value: 'moderately-religious', label: 'Moderately Religious', icon: 'star-half' },
                  { value: 'somewhat-religious', label: 'Somewhat Religious', icon: 'star-outline' },
                  { value: 'not-religious', label: 'Not Religious', icon: 'remove-circle-outline' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    selected={formData.religiosity === option.value}
                    onPress={() => updateField('religiosity', option.value as any)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: formData.religiosity === option.value
                          ? theme.chipSelected
                          : theme.chipBackground
                      }
                    ]}
                    textStyle={[
                      styles.chipText,
                      { color: formData.religiosity === option.value ? '#fff' : theme.text }
                    ]}
                    icon={option.icon}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Continue Button */}
            <Button
              mode="contained"
              onPress={handleContinue}
              disabled={!isComplete()}
              style={[
                styles.continueButton,
                {
                  backgroundColor: isComplete() ? theme.primary : theme.border,
                  opacity: isComplete() ? 1 : 0.5
                }
              ]}
              contentStyle={styles.continueButtonContent}
              labelStyle={styles.continueButtonLabel}
            >
              Continue to Profile Details
            </Button>

            {/* Info Notice */}
            <View style={[styles.infoNotice, { backgroundColor: theme.chipBackground }]}>
              <Ionicons name="information-circle-outline" size={20} color={theme.primary} />
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Your answers help us find compatible matches who share your values and lifestyle preferences
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
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  continueButton: {
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
  },
  continueButtonContent: {
    height: 56,
  },
  continueButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
});