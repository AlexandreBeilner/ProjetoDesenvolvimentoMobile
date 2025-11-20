import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface Props {
  children: ReactNode;
  paddingBottom?: number;
  paddingTop?: number;
  paddingHorizontal?: number;
}

export default function Screen({ children, paddingBottom, paddingHorizontal, paddingTop }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Number.isInteger(paddingTop) ? Number(paddingTop) + insets.top : spacing['3xl'] + insets.top,
            paddingHorizontal: paddingHorizontal ?? spacing.xl,
            paddingBottom: Number.isInteger(paddingBottom) ? Number(paddingBottom) + insets.bottom : spacing['2xl'] + insets.bottom,
          },
        ]}
      >
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: colors.bg,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
