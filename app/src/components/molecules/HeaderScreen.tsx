// src/components/molecules/HeaderScreen.tsx

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppSearchBar from '../atoms/AppSearchBar.tsx';
import { spacing } from '../../theme/spacing.ts';
import React from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { colors } from '../../theme/colors.ts';
import { useNavigation } from '@react-navigation/native';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const HeaderScreen = ({ query, setQuery }: Props) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppSearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar produtos"
        containerStyle={styles.search}
      />

      {user?.userType === 'location' && <TouchableOpacity
        style={styles.profileButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Profile' as never)}
      >
        <Image
          source={ user.image ? { uri: user.image }
            : require('../../assets/logo.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  search: {
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.brandPurple,
    borderWidth: 2,
    borderColor: 'black'
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
