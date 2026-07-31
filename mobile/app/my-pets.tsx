import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from './api/api';
import { Menu } from './components/menu';
import { Footer } from './components/footer';
import PetFormModal, { PetFormData } from './components/PetFormModal';
import { useAuth } from './context/AuthContext';

interface Pet extends PetFormData {
  id: number;
  userId: number;
}

export default function MyPetsScreen() {
  const { user, loading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const fetchMyPets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await api.get('/pets');
      setPets(data.filter((p: Pet) => Number(p.userId) === Number(user.id)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
      return;
    }
    fetchMyPets();
  }, [authLoading, user, fetchMyPets]);

  const handleCreate = async (data: PetFormData) => {
    try {
      await api.post('/pets', { ...data, age: parseFloat(data.age) || 0, userId: user!.id });
      setShowCreate(false);
      fetchMyPets();
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível adicionar o pet.');
    }
  };

  const handleUpdate = async (data: PetFormData) => {
    if (!editingPet) return;
    try {
      await api.put(`/pets/${editingPet.id}`, { ...data, age: parseFloat(data.age) || 0, userId: user!.id });
      setEditingPet(null);
      fetchMyPets();
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível atualizar o pet.');
    }
  };

  const handleDelete = (pet: Pet) => {
    Alert.alert('Excluir pet', `Tem certeza que deseja excluir ${pet.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/pets/${pet.id}`);
            fetchMyPets();
          } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível excluir o pet.');
          }
        },
      },
    ]);
  };

  const renderPet = ({ item }: { item: Pet }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petMeta}>{item.animal} · {item.race}</Text>
        <Text style={styles.petAvailability}>
          {item.available ? '✅ Disponível' : '❌ Indisponível'}
        </Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditingPet(item)} activeOpacity={0.85}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)} activeOpacity={0.85}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Menu />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#6D28D9" size="large" />
        </View>
      ) : (
        <FlatList
          data={pets}
          renderItem={renderPet}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Você ainda não cadastrou nenhum pet.</Text>
          }
          ListFooterComponent={
            <>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowCreate(true)} activeOpacity={0.85}>
                <Ionicons name="add" size={18} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar Pet</Text>
              </TouchableOpacity>
              <Footer />
            </>
          }
        />
      )}

      <PetFormModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        title="Adicionar Novo Pet"
      />

      <PetFormModal
        visible={!!editingPet}
        onClose={() => setEditingPet(null)}
        onSubmit={handleUpdate}
        initialData={editingPet ?? undefined}
        title="Editar Pet"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F2FA',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingTop: 76,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD2E6',
    marginBottom: 16,
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: '100%',
    minHeight: 130,
  },
  cardContent: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  petName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#221A2E',
  },
  petMeta: {
    fontSize: 13,
    color: '#564D61',
  },
  petAvailability: {
    fontSize: 12,
    color: '#564D61',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4C3B99',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#E0505C',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#564D61',
    marginTop: 40,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6D28D9',
    borderRadius: 999,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
