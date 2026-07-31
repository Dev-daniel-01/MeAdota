import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Menu } from '@/app/components/menu';
import { Footer } from '../components/footer';
import ZapModal from '../components/ZapModal';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { API_BASE_URL } from '../api/api';

interface Pet {
  id: number;
  name: string;
  animal: string;
  image: string;
  available: boolean;
  user: {
    name: string;
    cep: string;
    telephone?: string;
  };
}

interface PetComEndereco extends Pet {
  enderecoFormatado: string;
}

export default function TabTwoScreen() {
  const { user } = useAuth();
  const [animais, setAnimais] = useState<PetComEndereco[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetComEndereco | null>(null);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pets`);
        const data = await res.json();
        const disponiveis: Pet[] = data.filter((pet: Pet) => pet.available);

        const petsComEndereco = await Promise.all(
          disponiveis.map(async (pet) => {
            try {
              const cepLimpo = pet.user.cep.replace(/\D/g, '');
              const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
              const endereco = await response.json();

              const enderecoFormatado =
                endereco.localidade && endereco.uf
                  ? `${endereco.localidade}, ${endereco.uf}`
                  : 'Endereço não encontrado';

              return { ...pet, enderecoFormatado };
            } catch (err) {
              console.error('Erro ao buscar CEP:', err);
              return { ...pet, enderecoFormatado: 'Endereço não encontrado' };
            }
          })
        );

        setAnimais(petsComEndereco);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };

    fetchAnimais();
  }, []);

  const handleAdopt = (pet: PetComEndereco) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedPet(pet);
  };

  const renderPet = ({ item }: { item: PetComEndereco }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.ownerName}>{item.user.name}</Text>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.location}>{item.enderecoFormatado}</Text>
        <TouchableOpacity style={styles.adoptButton} onPress={() => handleAdopt(item)} activeOpacity={0.85}>
          <Text style={styles.adoptButtonText}>Quero Adotar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Menu />

      <FlatList
        data={animais}
        renderItem={renderPet}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />

      <ZapModal
        visible={!!selectedPet}
        onClose={() => setSelectedPet(null)}
        tutorName={selectedPet?.user.name ?? 'Tutor'}
        tutorPhone={selectedPet?.user.telephone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F2FA',
  },
  listContent: {
    paddingTop: 76,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD2E6',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 1.3,
  },
  cardContent: {
    padding: 12,
  },
  ownerName: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  petName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#221A2E',
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: '#564D61',
    marginTop: 4,
    marginBottom: 10,
  },
  adoptButton: {
    backgroundColor: '#2E9B5B',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
