import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';

import AppText from '../atoms/AppText';
import AppButton from '../atoms/AppButton';
import { spacing } from '../../theme/spacing';

interface Props {
  onSubmit: (data: { title: string; description: string; imageUri?: string }) => void;
  submitText?: string;
  variant?: 'purple' | 'blue';
}

export default function LocationDetailsForm({
  onSubmit,
  submitText = 'Salvar',
  variant = 'purple',
}: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Nome é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    else if (description.trim().length < 20)
      newErrors.description = 'A descrição deve ter no mínimo 20 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      onSubmit({ title, description, imageUri: imageUri || undefined });
    }
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.inputGroup}>
        <AppText variant="label">Nome do Estabelecimento *</AppText>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Pizzaria Bella Napoli"
          placeholderTextColor="#999"
        />
        {errors.title && (
          <AppText variant="caption" style={styles.errorText}>{errors.title}</AppText>
        )}
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <AppText variant="label">Descrição *</AppText>
        <TextInput
          style={[styles.textArea, errors.description && styles.inputError]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva seu estabelecimento..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.description && (
          <AppText variant="caption" style={styles.errorText}>{errors.description}</AppText>
        )}
      </View>

      {/* Image URL */}
      <View style={styles.inputGroup}>
        <AppText variant="label">URL da Logo (opcional)</AppText>
        <TextInput
          style={styles.input}
          value={imageUri}
          onChangeText={setImageUri}
          placeholder="https://exemplo.com/logo.jpg"
          placeholderTextColor="#999"
          keyboardType="url"
        />

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <AppButton onPress={handleSubmit} variant={variant}>
          {submitText}
        </AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: spacing.md,
    minHeight: 120,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
});
