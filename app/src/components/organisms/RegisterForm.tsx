import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledInput from '../molecules/LabeledInput';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  submitText?: string;
  variant?: 'purple' | 'yellow';
}

export default function RegisterForm({
                                       onSubmit,
                                       submitText = 'Criar conta',
                                       variant = 'purple',
                                     }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!onSubmit) {
      return;
    }

    if (!trimmedName || !trimmedEmail || !password) {
      return;
    }

    onSubmit({ name: trimmedName, email: trimmedEmail, password });
  }

  return (
    <View style={styles.root}>
      <View style={{ gap: spacing.md }}>
        <LabeledInput
          label="Nome"
          placeholder="Seu nome completo"
          value={name}
          onChangeText={setName}
        />

        <LabeledInput
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <LabeledInput
          label="Senha"
          placeholder="Crie uma senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <AppButton
        title={submitText}
        variant={variant === 'yellow' ? 'secondary' : 'primary'}
        onPress={handleSubmit}
        full
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', flex: 1, justifyContent: 'space-between' },
});
