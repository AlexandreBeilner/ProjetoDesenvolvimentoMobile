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
    onSubmit?.({ email: email.trim(), password });
  }

  return (
    <View style={styles.root}>
      <View>
        

        <LabeledInput
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={{ height: spacing.md }} />
        <LabeledInput
          label="Senha"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <AppButton
        title={submitText}
        variant={variant === 'yellow' ? 'secondary' : 'primary'}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', flex: 1, justifyContent: 'space-between' },
});
