import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import Upload from '../components/atoms/upload';
import AuthForm from '../components/organisms/AuthForm';
import { spacing } from '../theme/spacing';
import LabeledInput from '../components/molecules/LabeledInput';
import { Image } from 'react-native/types_generated/index';
import AppButton from '../components/atoms/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

export default function Product({ navigation }: Props) {
  function onProduct(data: { NameProduct: string; password: string }) {
    console.log('Product:', data);
    navigation.navigate('Login');
  }

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="h1" align="center">CADASTRO DE PRODUTO</AppText>
        <Upload />
        <View style={{ height: spacing.lg }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View>
        <AppText variant="h3" align="center">Adicione uma imagem</AppText>
        <LabeledInput
                  label="Titulo"
                  placeholder="Nome Produto"
                  value={''}
                  onChangeText={''}
                  keyboardType="name-product"
                />
        <LabeledInput
                  label="Descrição"
                  placeholder="Descrição do produto"
                  value={''}
                  onChangeText={''}
                  keyboardType="description-product"
                />
        <LabeledInput
                  label="Preço"
                  placeholder="R$"
                  value={''}
                  onChangeText={''}
                  keyboardType="price-product"
                />
         <AppButton title='Cadastrar produto' />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  form: { marginTop: spacing['2xl'], flex: 1 },
});
