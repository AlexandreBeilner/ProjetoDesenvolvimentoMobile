import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import Logo from '../components/atoms/Logo';
import AppText from '../components/atoms/AppText';
import AuthForm from '../components/organisms/AuthForm';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  function onLogin(data: { email: string; password: string }) {
    console.log('login:', data);
    // navigation.replace('Home');
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Logo />
        <View style={{ height: spacing.lg }} />
        <AppText variant="h1" align="center">LOGIN</AppText>
      </View>

      <View style={styles.form}>
        <AuthForm onSubmit={onLogin} submitText="Entrar" variant="yellow" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  form: { marginTop: spacing['2xl'], flex: 1 },
});
