import { useEffect, useState } from "react";
import { Menu2 } from "./components/menu2";
import style from "./PetsDisponiveis.module.css";

export default function PetsDisponiveis() {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5555/pets");
        const data = await res.json();

        const disponiveis = data.filter((pet) => pet.available);

        const petsComEndereco = await Promise.all(
          disponiveis.map(async (pet) => {
            try {
              const cepLimpo = pet.user.cep.replace(/\D/g, "");
              const viaCepRes = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
              const endereco = await viaCepRes.json();

              const enderecoFormatado =
                endereco.localidade && endereco.uf
                  ? `${endereco.localidade}, ${endereco.uf}`
                  : "Endereço não encontrado";

              return { ...pet, enderecoFormatado };
            } catch (err) {
              console.error("Erro ao buscar CEP:", err);
              return { ...pet, enderecoFormatado: "Endereço não encontrado" };
            }
          })
        );

        setAllPets(petsComEndereco);
        setFilteredPets(petsComEndereco);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);


  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();

    if (!term.trim()) {
      // Se não digitou nada, mostra todos
      setFilteredPets(allPets);
      return;
    }

    // Filtra por nome do pet ou do dono
    const filtrados = allPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(lowerTerm) ||           // nome do pet
        pet.animal?.toLowerCase().includes(lowerTerm) ||        // tipo do animal
        pet.race?.toLowerCase().includes(lowerTerm) ||          // raça
        pet.user.name.toLowerCase().includes(lowerTerm) ||      // nome do dono
        pet.enderecoFormatado.toLowerCase().includes(lowerTerm) // cidade/UF
    );

    setFilteredPets(filtrados);
  };

  return (
    <>

      <Menu2 onSearch={handleSearch} />

      <section className={style.container}>
        {loading && <p>🔄 Carregando pets disponíveis...</p>}

        {!loading && filteredPets.length > 0 && (
          <div className={style.cardsFlex}>
            {filteredPets.map((pet) => (
              <div key={pet.id} className={style.card}>
                <img
                  src={pet.image}
                  alt={pet.name}
                  className={style.image}
                  width={300}
                  height={200}
                />

                <div className={style.cardContent}>
                  <p className={style.ownerName}>{pet.user.name}</p>
                  <p className={style.petName}>{pet.name}</p>
                  <p className={style.location}>{pet.enderecoFormatado}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPets.length === 0 && (
          <p>😢 Nenhum pet encontrado com essa busca</p>
        )}
      </section>
    </>
  );
}
