import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import AppText from './AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type Variant = 'primary' | 'secondary';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  full?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function AppButton({
                                    title,
                                    onPress,
                                    variant = 'primary',
                                    full = true,
                                    style,
                                    textStyle,
                                    disabled,
                                  }: Props) {
  const bg = variant === 'primary' ? colors.brandPurple : colors.brandYellow;
  const textColor = colors.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: pressed ? 0.9 : 1 },
        full && styles.full,
        style,
      ]}
    >
      <AppText style={[styles.text, { color: textColor }, textStyle]}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: { alignSelf: 'stretch' },
  text: { fontWeight: '600' },
});
