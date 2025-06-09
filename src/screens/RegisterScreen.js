import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // corrigido para subir duas pastas

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState(""); // opcional, você pode salvar em banco depois
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password || !name) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Welcome"); // redireciona para a tela Welcome após cadastro
      })
      .catch(error => {
        Alert.alert("Erro no cadastro", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/10181/10181264.png" }}
        style={styles.icon}
      />

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.title}>CADASTRAR</Text>
          <Text style={styles.star}>★</Text>
        </View>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#333"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#333"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#333"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.footerStars}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1A1C",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#CE469A",
    width: "85%",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: "JockeyOne",
    fontSize: 28,
    color: "#6425A9",
    marginHorizontal: 12,
  },
  star: {
    color: "#6425A9",
    fontSize: 35,
  },
  input: {
    width: "100%",
    backgroundColor: "#EFEAEE",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#000",
    fontFamily: "JockeyOne",
  },
  button: {
    backgroundColor: "#6425A9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "JockeyOne",
  },
  footerStars: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 32,
  },
});
