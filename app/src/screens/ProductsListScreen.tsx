import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';

type Props = NativeStackScreenProps<TabParamList, 'ProductList'>;

export default function ProductsListScreen({ navigation }: Props) {

  return (
    <Screen>
      <AppText>
        Listagem produtos
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({

});
