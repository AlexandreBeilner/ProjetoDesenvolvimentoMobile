import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import Upload from '../components/atoms/upload';
import { spacing } from '../theme/spacing';
import RegisterProductForm from '../components/organisms/RegisterProductForm.tsx';
import { Asset } from 'react-native-image-picker';
import { deleteProduct, updateProduct } from '../services/products.service.ts';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<ProductStackParamList, 'EditProduct'>;

export default function EditProductScreen({ navigation, route }: Props) {
  const { product } = route.params;
  const [image, setImage] = useState<Asset | null>(null);

  async function onEditProduct(data: {
    title: string;
    description: string;
    price: string;
  }) {
    const payload = {
      ...data,
      image: image?.base64 ?? product.image ?? null,
    };

    const response = await updateProduct(product.id, {
      title: payload.title,
      price: payload.price,
      description: payload.description,
      image: payload.image,
    });

    if (response.error) {
      Toast.show({
        type: 'error',
        text1: response.error,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Produto atualizado com sucesso!',
    });

    navigation.goBack();
  }

  async function onDelete() {
    const response = await deleteProduct(product.id);

    if (response.error) {
      Toast.show({
        type: 'error',
        text1: response.error,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Produto deletado com sucesso!',
    });

    navigation.goBack();
  }

  const previewImageUri =
    image?.uri ?? (product.image ? `data:image/jpeg;base64,${product.image}` : null);

  return (
    <Screen>
      <View>
        <View style={styles.headerElements}>
          <AppText variant="h1" align="center">
            EDIÇÃO DE PRODUTO
          </AppText>
          <Upload value={previewImageUri} onChange={setImage} />
          <AppText align="center">Atualize a imagem do produto</AppText>
        </View>
      </View>

      <View style={styles.form}>
        <RegisterProductForm
          onSubmit={onEditProduct}
          onBack={() => navigation.goBack()}
          onDelete={onDelete}
          submitText="Salvar alterações"
          initialValues={{
            title: product.title,
            description: product.description ?? '',
            price: product.price,
          }}
        />
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
