import { useFonts } from 'expo-font';
import { JockeyOne_400Regular } from '@expo-google-fonts/jockey-one';
import { Jaro_400Regular } from '@expo-google-fonts/jaro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    JockeyOne: JockeyOne_400Regular,
    Jaro: Jaro_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
