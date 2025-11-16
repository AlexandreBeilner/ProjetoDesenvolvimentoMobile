import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledInput from '../molecules/LabeledInput';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit?: (data: { title: string; description: string, price: string }) => void;
  onBack: () => void;
  submitText?: string;
  variant?: 'purple' | 'yellow';
}

export default function RegisterProductForm({
                                   onSubmit,
                                              onBack,
                                   submitText = 'Cadastrar produto',
                                   variant = 'purple',
                                 }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit() {
    onSubmit?.({ title: title.trim(), description: description.trim(), price: price.trim() });
  }

  return (
    <View style={styles.root}>
      <View>
        <LabeledInput
          label="Titulo"
          placeholder="Nome do produto"
          value={title}
          onChangeText={setTitle}
          keyboardType="default"
        />
        <View style={{ height: spacing.md }} />
        <LabeledInput
          label="Descrição"
          placeholder="Descrição do produto"
          value={description}
          onChangeText={setDescription}
        />
        <View style={{ height: spacing.md }} />
        <LabeledInput
          label="Preço"
          placeholder="R$"
          value={price}
          onChangeText={setPrice}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title={submitText}
          variant={variant === 'yellow' ? 'secondary' : 'primary'}
          onPress={handleSubmit}
        />
        <AppButton
          title={'Voltar'}
          variant={'secondary'}
          onPress={onBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', flex: 1, justifyContent: 'space-between' },
  buttonsContainer: { gap: spacing.md },
});
