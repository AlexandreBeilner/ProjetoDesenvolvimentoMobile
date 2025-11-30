import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledInput from '../molecules/LabeledInput';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit?: (data: { email: string; password: string }) => void;
  submitText?: string;
  variant?: 'purple' | 'yellow';
}

export default function AuthForm({
                                   onSubmit,
                                   submitText = 'Entrar',
                                   variant = 'yellow',
                                 }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    const trimmedEmail = email.trim();

    if (!onSubmit) {
      return;
    }

    if (!trimmedEmail || !password) {
      return;
    }

    onSubmit({ email: trimmedEmail, password });
  }

  return (
    <View style={styles.root}>
      <View style={{ gap: spacing.md }}>
        <LabeledInput
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <LabeledInput
          label="Senha"
          placeholder="Digite sua senha"
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
