import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import LabeledInput from '../components/molecules/LabeledInput';
import AppButton from '../components/atoms/AppButton';
import { spacing } from '../theme/spacing';
import { registerUser } from '../services/users.service';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetails'>;

export default function LocationDetailsScreen({ route, navigation }: Props) {
  const { userData } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  async function pickImage() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (result?.assets?.length) {
      const img = result.assets[0];
      setImage(`data:${img.type};base64,${img.base64}`);
    }
  }

  async function handleSubmit() {
    if (!title.trim()) {
      Alert.alert('Erro', 'Título é obrigatório');
      return;
    }

    try {
      await registerUser({
        ...userData,
        title: title.trim(),
        description: description.trim(),
        image: image ?? null,
      });

      Alert.alert('Sucesso', 'Estabelecimento cadastrado!');
      navigation.replace("Login");
    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Falha ao cadastrar');
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>CADASTRO DE ESTABELECIMENTO</Text>

      <TouchableOpacity style={styles.uploadCircle} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <Image 
            source={require('../assets/upload.png')} 
            style={styles.icon} 
          />
        )}
      </TouchableOpacity>

      <Text style={styles.uploadText}>Adicione uma imagem</Text>

      <View style={{ width: '100%' }}>
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

      <View style={styles.buttons}>
        <AppButton title="Finalizar cadastro" onPress={handleSubmit} />
        <AppButton title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.md,
  },

  uploadCircle: {
    width: 140,
    height: 140,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  icon: {
    width: 70,
    height: 70,
    tintColor: '#000',
  },

  preview: {
    width: '100%',
    height: '100%',
  },

  uploadText: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: 14,
    color: '#333',
  },

  buttons: {
    width: '100%',
    gap: spacing.md,
  },
});
