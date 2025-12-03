import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../navigation/RootNavigator";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AppIcon } from "../components/atoms/AppIcon";

type Props = NativeStackScreenProps<ProductStackParamList, "Payment">;

export default function PaymentScreen({ navigation, route }: Props) {
  const { product, count, total } = route.params;
  const [selected, setSelected] = useState<number | null>(null);

  const payments = [
    { id: 1, label: "Pix", icon: require("../assets/pay/pix.png") },
    { id: 2, label: "Dinheiro", icon: require("../assets/pay/money.png") },
    { id: 3, label: "Cartão Crédito/Débito", icon: require("../assets/pay/card.png") },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Formas de Pagamento</Text>

      {/* Opções */}
      <View style={styles.paymentBox}>
        {payments.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.option, selected === p.id && styles.optionSelected]}
            onPress={() => setSelected(p.id)}
          >
            <Image source={p.icon} style={styles.icon} />
            <Text style={styles.optionText}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resumo */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>R$ {total.toFixed(2)}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.summaryLabel}>Detalhe:</Text>
          <Text style={styles.detail}>{count}x</Text>
          <Text style={styles.detailItem}>{product.title}</Text>
        </View>
      </View>

      {/* Botão */}
      <TouchableOpacity
        style={styles.button}
        disabled={!selected}
        onPress={() => {
          // depois conectamos ao backend
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AppIcon name="chevron-left" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.lg,
  },

  paymentBox: {
    backgroundColor: "#E3E3E3",
    padding: 12,
    borderRadius: 15,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  optionSelected: {
    backgroundColor: "#4d4d4d",
  },

  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },

  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  summary: {
    marginTop: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  detail: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
  },

  detailItem: {
    fontSize: 16,
    marginTop: 2,
  },

  button: {
    backgroundColor: "#A020F0",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  backBtn: {
    position: "absolute",
    top: 15,
    left: 10,
    padding: 10,
  },
});
