import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
}

export default function LabeledInput({
                                       label,
                                       placeholder,
                                       value,
                                       onChangeText,
                                       secureTextEntry,
                                       keyboardType = 'default',
                                     }: Props) {
  return (
    <View style={styles.root}>
      <AppText variant="small" color="text" style={styles.label}>
        {label}
      </AppText>
      <AppTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  label: { marginBottom: spacing.xs, color: colors.text },
});
