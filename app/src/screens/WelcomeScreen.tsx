import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Logo from '../components/atoms/Logo';
import AppText from '../components/atoms/AppText';
import AppButton from '../components/atoms/AppButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: spacing['2xl'] + insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <View style={styles.logoArea}>
        <Logo />
      </View>

      <View style={styles.textArea}>
        <AppText variant="h1" align="center">OLÁ</AppText>
        <View style={{ height: spacing.sm }} />
        <AppText align="center" color="muted">
          Bem vindo ao seu melhor{'\n'}aplicativo de comida
        </AppText>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Entrar"
          variant="primary"
          onPress={() => navigation.navigate('Login')}
        />
        <View style={{ height: spacing.md }} />
        <AppButton
          title="Criar conta"
          variant="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    justifyContent: 'space-between',
  },
  logoArea: { alignItems: 'center', marginTop: spacing.xl },
  textArea: { alignItems: 'center' },
  actions: { width: '100%' },
});
