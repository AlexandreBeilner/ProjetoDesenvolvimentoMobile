import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View, ScrollView, Pressable } from 'react-native';
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



export default function QrCodeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagamento via QR Code</Text>

      <Image
        source={require("../assets/qr.png")}
        style={styles.qrImagem}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  qrImagem: {
    width: 260,
    height: 260,
    marginBottom: 40,
  },
  botaoVoltar: {
    padding: 12,
  },
  textoVoltar: {
    color: "#0066ff",
    fontSize: 16,
  },
});
