import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhotosScreen() {
  const { colors } = useTheme();
  const [photos, setPhotos] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    //TODO Upload photos to Supabase Storage here
    router.push('/relationship-goals');
  };

  const handleSkip = () => {
    router.push('/relationship-goals');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <Text style={[styles.title, { color: colors.text }]}>Add Photos</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Add at least 3 photos. First photo will be your profile picture.
        </Text>

        <View style={styles.grid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <IconButton
                icon="close-circle"
                size={24}
                onPress={() => removePhoto(index)}
                style={styles.removeButton}
              />
              {index === 0 && (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryText}>Primary</Text>
                </View>
              )}
            </View>
          ))}

          {photos.length < 6 && (
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.addButton}
              icon={() => <Ionicons name="camera" size={32} color={colors.primary} />}
            >
              Add Photo
            </Button>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={photos.length === 0}
          style={styles.continueButton}
        >
          Continue ({photos.length}/6)
        </Button>

        <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
          Skip for now
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  photoContainer: { width: '30%', aspectRatio: 1, position: 'relative' },
  photo: { width: '100%', height: '100%', borderRadius: 12 },
  removeButton: { position: 'absolute', top: -8, right: -8 },
  primaryBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  primaryText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  addButton: { width: '30%', aspectRatio: 1, justifyContent: 'center' },
  continueButton: { marginTop: 32 },
  skipButton: { marginTop: 16 },
});