import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
}

export default function AppTextInput({ containerStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
  },
});
