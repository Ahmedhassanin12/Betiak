import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';


interface LoadingSpinnerProps {
  size?: 'small' | 'large' | number;
  text?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export function LoadingSpinner({
  size = 'large',
  text,
  fullScreen = false,
  style,
}: LoadingSpinnerProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <ActivityIndicator size={size} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
  },
  text: {
    marginTop: 12,
  },
});