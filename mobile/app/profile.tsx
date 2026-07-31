import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { Menu } from './components/menu';
import { Footer } from './components/footer';
import { useAuth } from './context/AuthContext';

export default function ProfileScreen() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', telephone: '', cep: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
      return;
    }
    if (!user) return;

    (async () => {
      try {
        const data = await api.get(`/users/${user.id}`);
        setForm({ name: data.name, email: data.email, telephone: data.telephone, cep: data.cep, password: '' });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, user]);

  const setField = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleUpdate = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const payload: Record<string, string> = { ...form };
      if (!payload.password) delete payload.password;

      await api.put(`/users/${user.id}`, payload);
      await login({ id: user.id, name: form.name, email: form.email });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro ao atualizar', error?.message || 'Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(tabs)');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#6D28D9" size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Menu />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.headerIcon}>
          <Ionicons name="person-circle-outline" size={72} color="#6D28D9" />
        </View>

        <FormField icon="person-outline" placeholder="Nome completo" value={form.name} onChangeText={setField('name')} />
        <FormField icon="mail-outline" placeholder="E-mail" value={form.email} onChangeText={setField('email')} autoCapitalize="none" />

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={18} color="#8A8093" />
          <TextInput
            style={styles.input}
            placeholder="Nova senha (opcional)"
            placeholderTextColor="#A79FB0"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={setField('password')}
          />
          <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#8A8093" />
          </TouchableOpacity>
        </View>

        <FormField icon="call-outline" placeholder="Telefone" value={form.telephone} onChangeText={setField('telephone')} />
        <FormField icon="location-outline" placeholder="CEP" value={form.cep} onChangeText={setField('cep')} />

        <TouchableOpacity style={styles.submitButton} onPress={handleUpdate} disabled={saving} activeOpacity={0.85}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Salvar alterações</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.myPetsButton} onPress={() => router.push('/my-pets')} activeOpacity={0.85}>
          <Ionicons name="paw-outline" size={16} color="#55187A" />
          <Text style={styles.myPetsButtonText}>Meus Pets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

function FormField({
  icon,
  ...props
}: React.ComponentProps<typeof TextInput> & { icon: React.ComponentProps<typeof Ionicons>['name'] }) {
  return (
    <View style={styles.inputGroup}>
      <Ionicons name={icon} size={18} color="#8A8093" />
      <TextInput style={styles.input} placeholderTextColor="#A79FB0" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: 24,
    paddingTop: 90,
  },
  headerIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 14,
    color: '#221A2E',
  },
  submitButton: {
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  myPetsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F1E0F8',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 14,
  },
  myPetsButtonText: {
    color: '#55187A',
    fontWeight: '700',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#E0505C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
