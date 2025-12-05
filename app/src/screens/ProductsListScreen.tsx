import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard, Product } from '../components/molecules/ProductCard';
import AppText from '../components/atoms/AppText';
import { FloatButton } from '../components/atoms/FloatButton';
import { AppIcon } from '../components/atoms/AppIcon';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { ProductStackParamList } from '../navigation/RootNavigator';
import AppSearchBar from '../components/atoms/AppSearchBar.tsx';
import { getProducts } from '../services/products.service.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { HeaderScreen } from '../components/molecules/HeaderScreen.tsx';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>;

type Restaurant = { id: string; name: string; products: Product[] };

export default function ProductsListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [restaurantProducts, setRestaurantProducts] = useState<Restaurant[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(true);
  const { user } = useAuth();
  const isLocation = user?.userType === 'location';

  const list = useMemo(() => {
    if (!query.trim()) return restaurantProducts;
    const t = query.toLowerCase();
    return restaurantProducts.map(r => ({
      ...r,
      products: r.products.filter(p =>
        p.title.toLowerCase().includes(t),
      ),
    })).filter(r => r.products.length);
  }, [query, restaurantProducts]);

  useEffect(() => {
    if (refreshFlag) {
      getProducts().then((result = {}) => {
        const products: Restaurant[] = [];
        Object.entries(result).forEach(([key, value]: [string, any]) => {
          products.push({
            id: key,
            name: value.title,
            products: value.products.map((product: any) => ({
              id: product.id,
              title: product.title,
              price: `R$ ${product.price}`,
              image: product.image,
              description: product.description
            })),
          })
        })
        setRestaurantProducts(products);
      })
      setRefreshFlag(false);
    }
  }, [refreshFlag])

  const onSelectProduct = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  }


  return (
    <SafeAreaView style={s.safe}>
      <FlatList
        refreshing={refreshFlag}
        onRefresh={() => {
          setRefreshFlag(true)
        }}
        data={list}
        keyExtractor={(r) => r.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
        ListHeaderComponent={
          <HeaderScreen
            query={query}
            setQuery={setQuery}
          />
        }
        renderItem={({ item }) => (
          <View style={s.section}>
            <AppText variant="small" style={s.sectionTitle}>{item.name}</AppText>

            <FlatList
              horizontal
              data={item.products}
              keyExtractor={(p) => p.id}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={4}
              windowSize={5}
              removeClippedSubviews
              renderItem={({ item: p }) => <ProductCard data={p} onPress={() => onSelectProduct(p)} />}
            />
          </View>
        )}
      />

      {isLocation && (
        <FloatButton
          position="bottom-right"
          onPress={() => navigation.navigate('RegisterProduct')}
        >
          <AppIcon name="plus" size={24} />
        </FloatButton>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  section: { marginBottom: spacing.lg, gap: spacing.sm },
  sectionTitle: { fontWeight: '700' },
});
