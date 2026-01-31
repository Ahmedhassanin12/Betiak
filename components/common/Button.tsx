import { brandColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

interface EnhancedButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  buttonColor?: string;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  buttonColor = brandColors.primary,
  style,
  ...props
}: EnhancedButtonProps) {

  const getMode = (): ButtonProps['mode'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained-tonal';
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  return (
    <PaperButton
      mode={getMode()}
      contentStyle={[styles.content, fullWidth && styles.fullWidth]}
      labelStyle={styles.label}
      style={style}
      buttonColor={buttonColor}
      {...props}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  content: {
    height: 48,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});