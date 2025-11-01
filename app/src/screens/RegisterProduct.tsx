import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import Upload from '../components/atoms/upload';
import { spacing } from '../theme/spacing';
import RegisterProductForm from '../components/organisms/RegisterProductForm.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

export default function Product({ navigation }: Props) {
  function onRegisterProduct(data: {
    title: string;
    description: string;
    price: string;
  }) {
    console.log('Product:', data);
    navigation.navigate('Login');
  }

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="h1" align="center">
          CADASTRO DE PRODUTO
        </AppText>
        <Upload />
        <View style={{ height: spacing.lg }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <RegisterProductForm onSubmit={onRegisterProduct} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  form: { marginTop: spacing['2xl'], flex: 1 },
});
