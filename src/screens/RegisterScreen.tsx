import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import Logo from '../components/atoms/Logo';
import AppText from '../components/atoms/AppText';
import AuthForm from '../components/organisms/AuthForm';
import { spacing } from '../theme/spacing';


type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  function onRegister(data: {nome:string; email: string; password: string }) {
    console.log('register:', data);
    navigation.navigate('Login');
  }

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <Logo />
        <View style={{ height: spacing.lg }} />
        <AppText variant="h1" align="center">CRIAR CONTA</AppText>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <AuthForm onSubmit={onRegister} submitText="Criar conta" variant="purple" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  form: { marginTop: spacing['2xl'], flex: 1 },
});
