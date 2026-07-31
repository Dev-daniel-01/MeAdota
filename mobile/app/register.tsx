import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from './api/api';

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: '', email: '', password: '', telephone: '', cep: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.telephone || !form.cep) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/users', form);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (error: any) {
      Alert.alert('Erro ao cadastrar', error?.message || 'Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#A79FB0"
            value={form.name}
            onChangeText={setField('name')}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={20} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#A79FB0"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={setField('email')}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha"
            placeholderTextColor="#A79FB0"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={setField('password')}
          />
          <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8A8093" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="call-outline" size={20} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="Número de telefone"
            placeholderTextColor="#A79FB0"
            keyboardType="phone-pad"
            value={form.telephone}
            onChangeText={setField('telephone')}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="location-outline" size={20} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            placeholderTextColor="#A79FB0"
            keyboardType="number-pad"
            value={form.cep}
            onChangeText={setField('cep')}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backLink} onPress={() => router.push('/login')}>
          <Text style={styles.backLinkText}>Já tem conta? <Text style={styles.registerLink}>Entrar</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  logo: {
    width: 72,
    height: 56,
    resizeMode: 'contain',
    tintColor: '#55187A',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#221A2E',
    marginBottom: 24,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F6F2FA',
    borderWidth: 1.5,
    borderColor: '#DDD2E6',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#221A2E',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  registerLink: {
    color: '#6D28D9',
    fontWeight: '700',
  },
  backLink: {
    marginTop: 20,
  },
  backLinkText: {
    color: '#564D61',
    fontSize: 14,
  },
});
