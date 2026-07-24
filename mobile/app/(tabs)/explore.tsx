import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu } from '@/app/components/menu';
import { Footer } from '../components/footer';

interface Pet {
  id: number;
  name: string;
  animal: string;
  image: string;
  available: boolean;
  user: {
    name: string;
    cep: string;
  };
}

interface PetComEndereco extends Pet {
  enderecoFormatado: string;
}

export default function TabTwoScreen() {
  const [animais, setAnimais] = useState<PetComEndereco[]>([]);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const res = await fetch('http://localhost:5555/pets');
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
      </View>
    </View>
  );

  return (
    <ScrollView> 
      <ImageBackground
        source={require('../../assets/images/fundo2.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <Menu />

        <FlatList
          data={animais}
          renderItem={renderPet}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
      <Footer></Footer>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    width: "100%",
    minHeight: "100%",
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: require("../../assets/images/fundo2.png")
  },
  listContent: {
    paddingTop: 100, 
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15
  },
  image: {
    width: '100%',
    aspectRatio: 1.3,
  },
  cardContent: {
    padding: 10,
  },
  ownerName: {
    color: '#C36C09',
    fontWeight: '400',
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
});
