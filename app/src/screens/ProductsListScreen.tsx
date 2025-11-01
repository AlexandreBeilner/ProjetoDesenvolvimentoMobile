import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ProductStackParamList,
} from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';
import { FloatButton } from '../components/atoms/FloatButton.tsx';
import { AppIcon } from '../components/atoms/AppIcon.tsx';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>;

export default function ProductsListScreen({ navigation }: Props) {

  return (
    <Screen paddingBottom={0}>
      <AppText>
        Listagem produtos
      </AppText>
      <FloatButton position={'bottom-right'} onPress={() => navigation.navigate('RegisterProduct')}>
        <AppIcon name={'plus'} size={24}/>
      </FloatButton>
    </Screen>
  );
}

const styles = StyleSheet.create({

});
