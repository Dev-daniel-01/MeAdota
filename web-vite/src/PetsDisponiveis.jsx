import { useEffect, useState } from "react";
import { Menu2 } from "./components/menu2";
import style from "./PetsDisponiveis.module.css";
import { Footer } from "./components/footer";
import { useNavigate } from "react-router";


export default function PetsDisponiveis() {
  const navigate = useNavigate();
  const gotoAdocao = () => navigate('/adocao')

  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5555/pets");
        const data = await res.json();
        const disponiveis = data.filter((pet) => pet.available);

        // mostra primeiro sem endereço
        setAllPets(disponiveis);
        setFilteredPets(disponiveis);

        // depois busca endereços sem travar a tela
        const petsComEndereco = await Promise.all(
          disponiveis.map(async (pet) => {
            const cepLimpo = pet.user.cep.replace(/\D/g, "");
            try {
              const viaCepRes = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
              const endereco = await viaCepRes.json();
              return {
                ...pet,
                enderecoFormatado: endereco.localidade && endereco.uf
                  ? `${endereco.localidade}, ${endereco.uf}`
                  : "Endereço não encontrado"
              };
            } catch {
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

    // Se não digitou nada, mostra todos
    if (!term.trim()) {
      setFilteredPets(allPets);
      return;
    }

    // Filtros praa busca 
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
        {!loading && filteredPets.length > 0 && (
          <div className={style.wrapButton}>
            <button className={style.button} onClick={gotoAdocao}>
              Quero Adotar
            </button>
          </div>
        )}

      </section>

      <Footer></Footer>
    </>
  );
}
