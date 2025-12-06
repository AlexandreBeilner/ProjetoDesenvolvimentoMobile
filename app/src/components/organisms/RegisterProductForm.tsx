import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledInput from '../molecules/LabeledInput';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit?: (data: { title: string; description: string; price: string }) => void;
  onBack: () => void;
  submitText?: string;
  variant?: 'purple' | 'yellow';
  initialValues?: {
    title?: string;
    description?: string | null;
    price?: string;
  };
  onDelete?: () => void
}

export default function RegisterProductForm({
                                              onSubmit,
                                              onBack,
                                              onDelete,
                                              submitText = 'Cadastrar produto',
                                              variant = 'purple',
                                              initialValues,
                                            }: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [price, setPrice] = useState(initialValues?.price ?? '');

  function handleSubmit() {
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      price: price.trim(),
    });
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
          keyboardType="numeric"
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
        {initialValues && <AppButton
          title={'Deletar'}
          variant={'delete'}
          onPress={onDelete}
        />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', flex: 1, justifyContent: 'space-between' },
  buttonsContainer: { gap: spacing.md },
});
