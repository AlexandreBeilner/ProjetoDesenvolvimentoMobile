// src/screens/ProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import AppText from '../components/atoms/AppText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useAuth } from '../context/AuthContext.tsx';
import { FloatButton } from '../components/atoms/FloatButton.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/RootNavigator.tsx';
import Screen from '../components/templates/Screen.tsx';
import { AppIcon } from '../components/atoms/AppIcon.tsx';
import { getByUserId } from '../services/products.service.ts';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<ProductStackParamList, 'Profile'>;

type Product = {
  id: number;
  title: string;
  description?: string | null;
  price: string;
  image?: string | null;
};

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user || !isFocused) {
      return;
    }

    getByUserId(user.id).then(response => {
      setProducts(response.items);
    });
  }, [user, isFocused]);

  return (
    <Screen paddingTop={0} paddingHorizontal={0}>
      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              user?.image
                ? { uri: user.image }
                : require('../assets/logo.png')
            }
            style={styles.profileImage}
          />
        </View>
        <AppText variant="h1">{user?.title}</AppText>
        <AppText>{user?.description}</AppText>
      </View>

      <FloatButton
        backgroundColor={colors.brandPurple}
        position="top-left"
        onPress={() => navigation.goBack()}
      >
        <AppIcon name="chevron-left" size={24} />
      </FloatButton>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {products.map(item => (
          <Pressable
            key={item.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('EditProduct', { product: item })}
          >
            <View style={styles.productImageContainer}>
              {item.image ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                  style={styles.productImage}
                />
              ) : (
                <AppIcon name="image" size={28} />
              )}
            </View>
            <View style={styles.productInfo}>
              <AppText variant="body">{item.title}</AppText>
              {item.description ? (
                <AppText numberOfLines={2}>{item.description}</AppText>
              ) : null}
              <AppText variant="small">R$ {item.price}</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    alignItems: 'center',
    gap: 12,
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    backgroundColor: colors.brandPurple,
    borderWidth: 2,
    borderColor: 'black',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: '100%',
    height: 3,
    backgroundColor: '#000000',
    marginTop: spacing.lg,
  },
  listContent: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  productCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    gap: spacing.md,
  },
  productImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.brandPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
});
