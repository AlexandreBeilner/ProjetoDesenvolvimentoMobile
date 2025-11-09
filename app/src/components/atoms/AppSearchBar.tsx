import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AppIcon } from './AppIcon.tsx';

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
}

export default function AppSearchBar({ containerStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <AppIcon size={26} name={'text-search-variant'} />
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    paddingLeft: 12,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 4
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 16
  },
});
