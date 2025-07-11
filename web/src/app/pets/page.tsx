'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { Menu2 } from "@/components/menu2";
import { Footer } from "@/components/footer";

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

export default function Pets() {
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

  return (
    <>
      <Menu2 />

      <section className={styles.container}>
        <section className={styles.s1}>
          <div className={styles.cardsFlex}>
            {animais.map((pet) => (
              <div key={pet.id} className={styles.card}>
                <Image
                  src={pet.image}
                  alt={pet.name}
                  width={300}
                  height={200}
                  className={styles.image}
                />

                <div className={styles.cardContent}>
                  <p className={styles.ownerName}>{pet.user.name}</p>
                  <p className={styles.petName}>{pet.name}</p>
                  <p className={styles.location}>{pet.enderecoFormatado}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
