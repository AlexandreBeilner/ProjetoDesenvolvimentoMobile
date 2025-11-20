import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import Upload from '../components/atoms/upload';
import { spacing } from '../theme/spacing';
import RegisterProductForm from '../components/organisms/RegisterProductForm.tsx'
import { Asset } from 'react-native-image-picker';
import { createProduct } from '../services/products.service.ts';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<ProductStackParamList, 'RegisterProduct'>;

export default function Product({ navigation }: Props) {
  const [image, setImage] = useState<Asset | null>(null);

  async function onRegisterProduct(data: {
    title: string;
    description: string;
    price: string;
  }) {
    const payload = { ...data, image };
    const response = await createProduct({
      title: payload.title,
      price: payload.price,
      image: image?.base64 ?? '',
      description: payload.description,
      userId: '1'
    })

    if (response.error) {
      Toast.show({
        type: 'error',
        text1: response.error
      })
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Produto cadastrado com sucesso!'
    })
    navigation.goBack();
  }

  return (
    <Screen>
      <View>
        <View style={styles.headerElements}>
          <AppText variant="h1" align="center">
            CADASTRO DE PRODUTO
          </AppText>
          <Upload value={image?.uri} onChange={setImage} />
          <AppText align="center">Adicione uma imagem</AppText>
        </View>
      </View>

      <View style={styles.form}>
        <RegisterProductForm onSubmit={onRegisterProduct} onBack={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerElements: { alignItems: 'center', gap: 12 },
  form: { marginTop: spacing['2xl'], flex: 1 },
  backButton: {
    width: 100,
    marginBottom: spacing.lg,
  },
});
