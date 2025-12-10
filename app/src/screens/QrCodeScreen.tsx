import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppIcon } from '../components/atoms/AppIcon';

export default function QrCodeScreen({ navigation, route }) {
  const { method } = route.params;

  return (
    <View style={styles.container}>

      {/* Botão de voltar circular */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonInner}>
          <AppIcon name="chevron-left" size={28} color="#000" />
        </View>
      </TouchableOpacity>

      {/* Título atualizado */}
      <Text style={styles.titulo}>
        QR Code para retirada do pedido
      </Text>

      <Text style={styles.metodo}>
        Método escolhido: {method}
      </Text>

      <Image
        source={require("../assets/qr.png")}
        style={styles.qrImagem}
        resizeMode="contain"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  backButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },

  titulo: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  metodo: {
    marginBottom: 15,
    fontSize: 16,
    color: "#444",
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