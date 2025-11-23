import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import { spacing } from '../../theme/spacing';

export default function LocationCard({ location }) {
  if (!location) {
    return (
      <View style={styles.errorCard}>
        <AppText style={{ color: 'red' }}>Erro: item inválido</AppText>
      </View>
    );
  }

  const hasImage = location.image && location.image !== 'null';

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={
          hasImage
            ? { uri: location.image }
            : require('../../assets/logo.png') // <- SUA LOGO AQUI
        }
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <AppText variant="h4">{location.title}</AppText>
        <AppText numberOfLines={2} style={styles.description}>
          {location.description || 'Sem descrição'}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: 4,
    color: '#777',
  },
  errorCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
});
