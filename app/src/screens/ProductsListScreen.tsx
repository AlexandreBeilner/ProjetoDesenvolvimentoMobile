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

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>;

type Restaurant = { id: string; name: string; products: Product[] };

const DATA: Restaurant[] = [
  {
    id: 'abc',
    name: 'Restaurante ABC',
    products: [
      { id: 'p1', title: 'Hamburguer', subtitle: 'Tradicional', price: 'R$ 16,00', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800' },
      { id: 'p2', title: 'Pastel de carne', subtitle: 'Crocante', price: 'R$ 12,00', image: 'https://images.unsplash.com/photo-1604908813115-ef7a59b2e2f0?w=800' },
      { id: 'p3', title: 'Batata', subtitle: 'Cheddar', price: 'R$ 10,00', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800' },
    ],
  },
  {
    id: 'xyz',
    name: 'Restaurante XYZ',
    products: [
      { id: 'p4', title: 'Hamburguer', subtitle: 'Tradicional', price: 'R$ 16,00', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800' },
      { id: 'p5', title: 'Pastel de carne', subtitle: 'Artesanal', price: 'R$ 13,00', image: 'https://images.unsplash.com/photo-1604908813115-ef7a59b2e2f0?w=800' },
      { id: 'p6', title: 'Açaí', subtitle: '300ml', price: 'R$ 14,00', image: 'https://images.unsplash.com/photo-1615485737652-6f4e22b9d1e2?w=800' },
    ],
  },
];

export default function ProductsListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    if (!query.trim()) return DATA;
    const t = query.toLowerCase();
    return DATA.map(r => ({
      ...r,
      products: r.products.filter(p =>
        p.title.toLowerCase().includes(t) || p.subtitle.toLowerCase().includes(t),
      ),
    })).filter(r => r.products.length);
  }, [query]);

  useEffect(() => {
    getProducts().then(result => {
      console.log('Fetched products:', result);
    })
  }, [])


  return (
    <SafeAreaView style={s.safe}>
      <FlatList
        data={list}
        keyExtractor={(r) => r.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
        ListHeaderComponent={
          <AppSearchBar
            placeholder="Buscar"
            containerStyle={{ marginBottom: spacing.lg }}
            value={query}
            onChangeText={setQuery}
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
              renderItem={({ item: p }) => <ProductCard data={p} />}
            />
          </View>
        )}
      />

      <FloatButton position="bottom-right" onPress={() => navigation.navigate('RegisterProduct')}>
        <AppIcon name="plus" size={24} />
      </FloatButton>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  section: { marginBottom: spacing.lg, gap: spacing.sm },
  sectionTitle: { fontWeight: '700' },
});
