import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CLIENT_ID = "f6e14c5d7c2f445f8824dd363d403635";
const REDIRECT_URI = "https://auth.expo.io/@blews/App-Melodify";
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-read-recently-played",
  "user-top-read",
];

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: "token",
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
      usePKCE: false,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      AsyncStorage.setItem("token", access_token);
      navigation.replace("Dashboard");
    } else if (response?.type === "error" || response?.type === "dismiss") {
      Alert.alert("Erro ao fazer login com o Spotify");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="star"
        size={48}
        color="#D74595"
        style={styles.star}
      />
      <Text style={styles.title}>Bem Vindo(a)</Text>
      <Text style={styles.description}>
        Melodify é um aplicativo para você expandir seus horizontes musicais,
        e também fazer uma análise do seu gosto musical!{"\n\n"}
        Conecte sua conta do Spotify para poder entrar nessa experiência
      </Text>
      <TouchableOpacity
        style={[styles.button, !request && { backgroundColor: "#999" }]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <MaterialCommunityIcons
          name="spotify"
          size={24}
          color="#fff"
          style={styles.spotifyIcon}
        />
        <Text style={styles.buttonText}>Conectar Spotify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1A1C",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  star: {
    marginBottom: 12,
  },
  title: {
    fontFamily: "Jaro",
    fontSize: 40,
    fontWeight: "bold",
    color: "#D74595",
  },
  description: {
    fontFamily: "JockeyOne",
    fontSize: 20,
    color: "#EFEAEE",
    marginTop: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6425A9",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
  },
  spotifyIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: "#EFEAEE",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "JockeyOne",
  },
});
