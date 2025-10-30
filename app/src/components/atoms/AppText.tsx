import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Variant = 'h1' | 'h2' | 'body' | 'small';

interface Props extends TextProps {
  variant?: Variant;
  color?: keyof typeof colors;
  align?: 'left' | 'center' | 'right';
}

export default function AppText({
                                  variant = 'body',
                                  color = 'text',
                                  align = 'left',
                                  style,
                                  children,
                                  ...rest
                                }: Props) {
  return (
    <Text
      style={[styles.base, styles[variant], { color: colors[color], textAlign: align }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { color: colors.text },
  h1: { ...typography.h1 },
  h2: { ...typography.h2 },
  body: { ...typography.body },
  small: { ...typography.small },
});
