import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Caminho ajustado

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace('Welcome');
      })
      .catch((error) => {
        console.log("Erro no login:", error);

        if (error.code === "auth/user-not-found") {
          Alert.alert("Erro", "Usuário não encontrado");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Erro", "Senha incorreta");
        } else {
          Alert.alert("Erro", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10181/10181264.png' }}
        style={styles.icon}
      />

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.title}>ENTRAR</Text>
          <Text style={styles.star}>★</Text>
        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#333"
          style={styles.input}
          keyboardType="email-address"
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Registre-se</Text>
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
    backgroundColor: '#1B1A1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#CE469A',
    width: '85%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'JockeyOne',
    fontSize: 28,
    color: '#6425A9',
    marginHorizontal: 12,
  },
  star: {
    color: '#6425A9',
    fontSize: 35,
  },
  input: {
    width: '100%',
    backgroundColor: '#EFEAEE',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
    fontFamily: 'JockeyOne',
  },
  button: {
    backgroundColor: '#6425A9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JockeyOne',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'JockeyOne',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
  footerStars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 32,
  },
});
