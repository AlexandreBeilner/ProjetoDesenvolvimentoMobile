import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import Logo from '../components/atoms/Logo';
import AppText from '../components/atoms/AppText';
import { spacing } from '../theme/spacing';
import RegisterForm from '../components/organisms/RegisterForm';
import { registerUser } from '../services/users.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [userType, setUserType] = useState<'consumer' | 'location'>('consumer');

  async function onRegister(data: { name: string; email: string; password: string }) {
    if (userType === 'location') {
      navigation.navigate('LocationDetails', {
        userData: { ...data, userType },
      });
      return;
    }

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        userType: 'consumer',
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso. Faça login para continuar.');
      navigation.navigate('Login');
    } catch (err: any) {
      let message = 'Não foi possível criar a conta.';

      if (err?.response?.data?.error) {
        message = String(err.response.data.error);
      }

      Alert.alert('Erro no cadastro', message);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Logo />
        <View style={{ height: spacing.lg }} />
        <AppText variant="h1" align="center">
          CRIAR CONTA
        </AppText>
      </View>

      <View style={styles.typeSelector}>
        <AppText variant="body" align="center" style={styles.typeLabel}>
          Você é:
        </AppText>
        <View style={styles.typeButtons}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              userType === 'consumer' && styles.typeButtonActive,
            ]}
            onPress={() => setUserType('consumer')}
          >
            <AppText
              variant="body"
              style={[
                styles.typeButtonText,
                userType === 'consumer' && styles.typeButtonTextActive,
              ]}
            >
              Consumidor
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              userType === 'location' && styles.typeButtonActive,
            ]}
            onPress={() => setUserType('location')}
          >
            <AppText
              variant="body"
              style={[
                styles.typeButtonText,
                userType === 'location' && styles.typeButtonTextActive,
              ]}
            >
              Estabelecimento
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <RegisterForm
          onSubmit={onRegister}
          submitText={userType === 'location' ? 'Próximo' : 'Criar conta'}
          variant="purple"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  typeSelector: {
    marginTop: spacing['2xl'],
    width: '100%',
  },
  typeLabel: {
    marginBottom: spacing.sm,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3F0FF',
  },
  typeButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
  form: {
    marginTop: spacing.xl,
    flex: 1,
  },
});
