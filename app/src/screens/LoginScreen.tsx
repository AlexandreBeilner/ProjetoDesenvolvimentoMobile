import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import Logo from '../components/atoms/Logo';
import AppText from '../components/atoms/AppText';
import AuthForm from '../components/organisms/AuthForm';
import { spacing } from '../theme/spacing';
import { loginUser } from '../services/users.service';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  async function onLogin(data: { email: string; password: string }) {
    try {
      setLoading(true);

      const logged = await loginUser({
        email: data.email,
        password: data.password,
      });

      // aqui “buscamos” as informações do usuário (tipo, nome, etc.)
      setUser({
        id: logged.id,
        name: logged.name,
        email: logged.email,
        userType: logged.userType,
      });

      // só passa para o Feed se o login deu certo
      navigation.replace('Feed');
    } catch (error) {
      let message = 'Não foi possível fazer login.';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 404) {
          message = 'Conta não encontrada. Crie uma conta para continuar.';
        } else if (status === 401) {
          message = 'E-mail ou senha inválidos.';
        } else if (typeof error.response?.data?.error === 'string') {
          message = error.response.data.error;
        }
      }

      Alert.alert('Erro no login', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Logo />
        <View style={{ height: spacing.lg }} />
        <AppText variant="h1" align="center">
          LOGIN
        </AppText>
      </View>

      <View style={styles.form}>
        <AuthForm
          onSubmit={onLogin}
          submitText={loading ? 'Entrando...' : 'Entrar'}
          variant="yellow"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  form: { marginTop: spacing['2xl'], flex: 1 },
});
