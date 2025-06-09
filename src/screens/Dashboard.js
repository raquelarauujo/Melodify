import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSpotifyUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Token não encontrado", "Faça login novamente.");
        navigation.replace("Welcome");
        return;
      }

      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        navigation.replace("Welcome");
        return;
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      Alert.alert("Erro ao carregar dados", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D74595" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Olá, {userData.display_name}!</Text>
          <Text style={styles.subtitle}>Email: {userData.email}</Text>
          <Text style={styles.info}>ID: {userData.id}</Text>
        </>
      ) : (
        <Text style={styles.error}>Não foi possível carregar os dados do usuário.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "JockeyOne",
    color: "#D74595",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "JockeyOne",
    color: "#fff",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    fontFamily: "JockeyOne",
    color: "#ccc",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
