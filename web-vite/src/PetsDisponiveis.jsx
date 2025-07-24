import { useEffect, useState } from "react";
import { Menu2 } from "./components/menu2";
import style from "./PetsDisponiveis.module.css";
import { Footer } from "./components/footer";
import { useNavigate } from "react-router";
import Alert from "./components/alert";

export default function PetsDisponiveis() {
  const navigate = useNavigate();
  
  const gotoAdocao = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    setAlertMessage("Você precisa estar logado para adotar um pet!");
    navigate("/login");
    return;
  }

  navigate("/adocao");
  };




  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => setAlertMessage("");
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5555/pets");
        const data = await res.json();
        const disponiveis = data.filter((pet) => pet.available);

        setAllPets(disponiveis);
        setFilteredPets(disponiveis);

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

    if (!term.trim()) {
      setFilteredPets(allPets);
      return;
    }

    const filtrados = allPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(lowerTerm) ||    
        pet.animal?.toLowerCase().includes(lowerTerm) ||    
        pet.race?.toLowerCase().includes(lowerTerm) ||        
        pet.user.name.toLowerCase().includes(lowerTerm) ||      
        pet.enderecoFormatado.toLowerCase().includes(lowerTerm) 
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

        <Alert
        message={alertMessage}
        onClose={closeAlert}
          />

      </section>

      <Footer></Footer>
    </>
  );
}
