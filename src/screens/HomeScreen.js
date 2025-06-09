import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/564x/48/60/fa/4860fae41776551ea30eb172cdac6d35.jpg' }}
        resizeMode="cover"
        style={styles.background}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10181/10181264.png' }}
            style={styles.topImage}
          />

          <Text style={styles.title}>MELODIFY</Text>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F3FA3',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  topImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Jaro',
    fontSize: 48,
    color: '#CE469A',
    marginBottom: 60,
  },
  loginButton: {
    backgroundColor: '#F2DAE9',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'JockeyOne',
    fontSize: 20,
    color: '#CE469A',
  },
  registerButton: {
    backgroundColor: '#CE469A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'JockeyOne',
    fontSize: 20,
    color: '#F2DAE9',
  },
});
