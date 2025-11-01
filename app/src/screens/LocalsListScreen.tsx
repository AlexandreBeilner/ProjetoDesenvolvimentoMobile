import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../navigation/RootNavigator';
import Screen from '../components/templates/Screen';
import AppText from '../components/atoms/AppText';

type Props = NativeStackScreenProps<TabParamList, 'LocalList'>;

export default function LocalsListScreen({ navigation }: Props) {

  return (
    <Screen>
      <AppText>
        Lista de Locais
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({

});
