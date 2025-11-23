import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../components/atoms/AppText';
import AppSearchBar from '../components/atoms/AppSearchBar';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { listLocations } from '../services/users.service';
import LocationCard from '../components/molecules/LocationCard';


export default function LocalsListScreen() {
  console.log("LIST ===>", filtered);

  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const result = await listLocations();
        setLocations(result);
      } catch (err) {
        console.log("Erro ao carregar locais:", err);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return locations;
    const t = query.toLowerCase();
    return locations.filter(
      l =>
        l.title?.toLowerCase().includes(t) ||
        l.description?.toLowerCase().includes(t)
    );
  }, [query, locations]);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.content}>
        <AppSearchBar
          placeholder="Buscar"
          value={query}
          onChangeText={setQuery}
          containerStyle={{ marginBottom: spacing.xl }}
        />

        <AppText variant="h4" style={s.header}>
          LOCAIS PARA FAZER SUA REFEIÇÃO
        </AppText>

        <FlatList
  data={filtered}
  keyExtractor={(loc) => String(loc.id)}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 50 }}
  renderItem={({ item }) => (
    <LocationCard location={item} />
  )}
/>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  header: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  
});
