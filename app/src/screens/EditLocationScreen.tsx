import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { AppIcon } from "../components/atoms/AppIcon";
import Upload from "../components/atoms/upload";  // 👈 usando o mesmo componente
import { spacing } from "../theme/spacing";

export default function EditLocationScreen({ navigation }) {
  const { user, setUser } = useAuth();

  const [title, setTitle] = useState(user?.title ?? "");
  const [description, setDescription] = useState(user?.description ?? "");
  const [image, setImage] = useState(user?.image ? { uri: user.image } : null);

  async function handleSave() {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          image: image?.base64 ?? null, // 👈 pega base64 do Upload
        }),
      });

      const data = await response.json();

      if (data.user) {
        setUser(data.user); // atualiza o contexto
      }

      navigation.goBack();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AppIcon name="chevron-left" size={28} />
      </TouchableOpacity>

      {/* Upload da imagem (igual Cadastro de Produto) */}
      <View style={styles.uploadContainer}>
    <Upload
        value={image?.uri ?? null}
        onChange={setImage}
    />
    </View>


      <Text style={styles.title}>Editar Estabelecimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do estabelecimento"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Descrição"
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar alterações</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

    uploadContainer: {
  width: "100%",
  alignItems: "center",   // 👈 centraliza horizontalmente
  justifyContent: "center",
  marginBottom: 20,
},

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#7A1CF5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
