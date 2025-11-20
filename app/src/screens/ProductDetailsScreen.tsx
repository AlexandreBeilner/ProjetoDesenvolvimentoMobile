import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { ProductStackParamList } from '../navigation/RootNavigator';
import AppText from '../components/atoms/AppText.tsx';
import { AppIcon } from '../components/atoms/AppIcon.tsx';
import Screen from '../components/templates/Screen.tsx';
import { FloatButton } from '../components/atoms/FloatButton.tsx';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ navigation, route }: Props) {
  const [count, setCount] = useState(0);
  const product = route.params.product;
  const price = Number(product.price.split(' ')[1]);

  return (
    <Screen paddingHorizontal={0} paddingTop={0} paddingBottom={0}>
      <View style={s.contentContainer}>
        <Image source={{uri: `data:image/jpeg;base64,${product.image}`}} style={s.image} resizeMode="cover"/>
        <AppText style={s.title}>
          {product.title} - {product.price}
        </AppText>
        <AppText style={s.desc}>
          {product.description}
        </AppText>
      </View>
      <View style={s.paymentContainer}>
        <View style={s.amountContainer}>
          <AppIcon name={'minus'} size={30} onPress={() => {
            if (count > 0) setCount(count - 1);
          }}/>
          <AppText style={s.amountText}>{count}</AppText>
          <AppIcon name={'plus'} size={30} color={colors.brandPurple} onPress={() => {
            setCount(count + 1);
          }}/>
        </View>
        <View style={s.priceContainer}>
          <AppText style={[s.amountText, {color: colors.white}]}>
            Total   R$ {price * count}
          </AppText>
        </View>
      </View>
      <FloatButton position="top-left" onPress={() => navigation.goBack()}>
        <AppIcon name="chevron-left" size={24} />
      </FloatButton>
    </Screen>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg, justifyContent: 'space-between' },
  contentContainer: { height: '88%' },
  image: { width: '100%', height: '65%' },
  title: { fontSize: 24, fontWeight: '700', marginTop: spacing.lg, marginHorizontal: spacing.lg },
  desc: { fontSize: 16, marginTop: spacing.md, marginHorizontal: spacing.lg },
  paymentContainer: { flex: 1, flexDirection: 'row' },
  amountContainer: { width: '40%', flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xl, backgroundColor: colors.brandYellow},
  amountText: {fontSize: 18},
  priceContainer: { width: '60%', alignItems: "center", justifyContent: "center", backgroundColor: colors.brandPurple }
});
