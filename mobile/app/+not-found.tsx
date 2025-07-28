import { Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu } from '../app/components/menu';
import { Footer } from './components/footer';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen name="not-found" options={{ headerShown: false }} />
      
      <View style={styles.screen}>
        <Menu />
        
        <View style={styles.container}>
          <Image
            source={require('../assets/images/404-icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.errorText}>ERROR</Text>
          <Text style={styles.codeText}>404</Text>
          <Text style={styles.subText}>Página não encontrada</Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
            <Text style={styles.buttonText}>RETORNAR</Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: -8,
  },
  codeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#660066', // roxo
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
