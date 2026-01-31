import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput as Input, TextInputProps } from 'react-native-paper';

interface EnhancedInputProps extends TextInputProps {
  error?: boolean;
  helperText?: string;
}

export function TextInput({
  error,
  helperText,
  style,
  ...props
}: EnhancedInputProps) {
  return (
    <View style={styles.container}>
      <Input
        mode="outlined"
        error={!!error}
        style={[styles.input, style]}
        outlineStyle={styles.outline}
        {...props}
      />
      {(error || helperText) && (
        <HelperText type={error ? 'error' : 'info'} visible>
          {error || helperText}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  outline: {
    borderRadius: 12,
  },
});