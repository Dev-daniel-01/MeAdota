import style from "./Adocao.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Menu2 } from "./components/menu2";
import { Footer } from './components/footer';
import ModalZap from "./components/modalZap";

import descriptionIcon from "../src/assets/images/description.png";
import dogface from "../src/assets/images/dogFace.png";
import userBlack from "../src/assets/images/userBlack.png";
import raceIcon from "../src/assets/images/race.png";
import pataNegra from "../src/assets/images/pataNegra.png";
import locationIcon from "../src/assets/images/location.png";
import ageIcon from "../src/assets/images/age.png";
import porteIcon from "../src/assets/images/porte.png";

export default function Adocao() {
  const navigate = useNavigate();

  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  const gotoZap = (pet) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Você precisa estar logado para acessar o perfil!");
      navigate("/login");
      return;
    }

    setSelectedPet(pet);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5555/pets");
        const data = await res.json();
        console.log(data);

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
                enderecoFormatado:
                  endereco.localidade && endereco.uf
                    ? `${endereco.localidade}, ${endereco.uf}`
                    : "Endereço não encontrado",
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
        pet.enderecoFormatado?.toLowerCase().includes(lowerTerm) 
    );

    setFilteredPets(filtrados);
  };

  return (
    <>
      <Menu2 onSearch={handleSearch} option01="petsDisponiveis"/>

      <section className={style.container}>
        {loading && <p>🔄 Carregando pets disponíveis...</p>}

        {!loading && filteredPets.length > 0 && (
          <div className={style.cardsFlex}>
            {filteredPets.map((pet) => (
              <div key={pet.id} className={style.card}>
                <div className={style.cardImage}>
                  <img src={pet.image} alt={pet.name} className={style.image} />
                  <p className={style.ownerName}>
                    <img src={userBlack} alt="Dono" className={style.icon} />
                    {pet.user.name}
                  </p>
                </div>

                <div className={style.cardContent}>
                  <h1 className={style.petName}>
                    <img src={dogface} alt="Pet" className={style.iconName} />
                    {pet.name}
                  </h1>
                  <div className={style.containerInfos}>
                    <div className={style.infoRow}>
                      <img src={pataNegra} alt="Tipo" className={style.icon} />
                      <span>{pet.animal}</span>
                    </div>
                    <div className={style.infoRow}>
                      <img src={raceIcon} alt="Raça" className={style.icon} />
                      <span>{pet.race}</span>
                    </div>

                    <div className={style.infoRow}>
                      <img src={ageIcon} alt="Idade" className={style.icon} />
                      <span>{pet.age}</span>
                    </div>

                    <div className={style.infoRow}>
                      <img src={porteIcon} alt="Porte" className={style.icon} />
                      <span>{pet.size}</span>
                    </div>
                  </div>

                  <div className={style.descriptionSection}>
                    <img src={descriptionIcon} alt="Descrição" className={style.icon} />
                    <p>{pet.description}</p>
                  </div>

                  <div className={style.locationSection}>
                    <img src={locationIcon} alt="Localização" className={style.icon} />
                    <span>{pet.enderecoFormatado}</span>
                  </div>

                  <button className={style.adoptButton} onClick={() => gotoZap(pet)}>
                    Quero adotar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPets.length === 0 && (
          <p>😢 Nenhum pet encontrado com essa busca</p>
        )}
      </section>

      {showModal && <ModalZap onClose={closeModal} pet={selectedPet} />}
      <Footer />
    </>
  );
}
