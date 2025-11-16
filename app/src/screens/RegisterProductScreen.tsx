import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import Upload from '../components/atoms/upload';
import { spacing } from '../theme/spacing';
import RegisterProductForm from '../components/organisms/RegisterProductForm.tsx'

type Props = NativeStackScreenProps<ProductStackParamList, 'RegisterProduct'>;

export default function Product({ navigation }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  function onRegisterProduct(data: {
    title: string;
    description: string;
    price: string;
  }) {
    const payload = { ...data, imageUri };
    console.log('Product:', payload);
  }

  return (
    <Screen>
      <View>
        <View style={styles.headerElements}>
          <AppText variant="h1" align="center">
            CADASTRO DE PRODUTO
          </AppText>
          <Upload value={imageUri} onChange={setImageUri} />
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
