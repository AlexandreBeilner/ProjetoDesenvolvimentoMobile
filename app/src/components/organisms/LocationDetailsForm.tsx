import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledInput from '../molecules/LabeledInput';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit?: (data: { title: string; description: string }) => void;
  onBack: () => void;
  submitText?: string;
  variant?: 'purple' | 'yellow';
}

export default function LocationDetailsForm({
  onSubmit,
  onBack,
  submitText = 'Finalizar cadastro',
  variant = 'purple',
}: Props) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit() {
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
    });
  }

  return (
    <View style={styles.root}>
      <View>
        <LabeledInput
          label="Título"
          placeholder="Nome do estabelecimento"
          value={title}
          onChangeText={setTitle}
        />

        <View style={{ height: spacing.md }} />

        <LabeledInput
          label="Descrição"
          placeholder="Descrição do estabelecimento"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton
          title={submitText}
          variant={variant === 'yellow' ? 'secondary' : 'primary'}
          onPress={handleSubmit}
        />

        <AppButton
          title="Voltar"
          variant="secondary"
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
