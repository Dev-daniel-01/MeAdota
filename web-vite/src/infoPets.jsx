import style from "./InfoPets.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { api } from "../src/api/api";

import { Menu2 } from "./components/menu2";
import { Footer } from "./components/footer";
import ModalCreatePet from "./components/modalCreatePet";
import ModalEditPet from "./components/modalEditPet";
import Alert from "./components/alert";
import ConfirmAlert from "./components/alertconfirm";

import descriptionIcon from "../src/assets/images/description.png";
import dogface from "../src/assets/images/dogFace.png";
import userBlack from "../src/assets/images/userBlack.png";
import raceIcon from "../src/assets/images/race.png";
import pataNegra from "../src/assets/images/pataNegra.png";
import locationIcon from "../src/assets/images/location.png";
import ageIcon from "../src/assets/images/age.png";
import porteIcon from "../src/assets/images/porte.png";

export default function InfoPets() {
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const closeAlert = () => setAlertMessage("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchMyPets = async () => {
      if (!storedUser?.id) {
        setAlertMessage("Você precisa estar logado para acessar seus pets!");
        navigate("/login");
        return;
      }

      try {
        const { data } = await api.get("/pets");

        const meusPets = data.filter(
          (pet) => Number(pet.userId) === Number(storedUser.id)
        );

        const petsComEndereco = await Promise.all(
          meusPets.map(async (pet) => {
            const cepLimpo = pet.user?.cep?.replace(/\D/g, "");
            if (!cepLimpo) {
              return { ...pet, enderecoFormatado: "Endereço não encontrado" };
            }
            try {
              const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
              if (!res.ok) throw new Error("Erro na consulta CEP");
              const endereco = await res.json();
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

        setMyPets(petsComEndereco);
      } catch (error) {
        console.error("❌ Erro ao buscar seus pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, []);

  const handleDeletePet = (petId) => {
    setPetToDelete(petId);
    setConfirmVisible(true);
  };

  const confirmDeletePet = async () => {
    try {
      await api.delete(`/pets/${petToDelete}`);
      setMyPets((prev) => prev.filter((p) => p.id !== petToDelete));
      setAlertMessage("🐾 Pet excluído com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao excluir pet:", error);
      setAlertMessage("Erro ao excluir o pet. Tente novamente.");
    } finally {
      setConfirmVisible(false);
      setPetToDelete(null);
    }
  };

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
  };

  const handleUpdatePet = async (updatedData) => {
    try {
      const { data } = await api.put(`/pets/${selectedPet.id}`, updatedData);

      setMyPets((prev) =>
        prev.map((p) => (p.id === selectedPet.id ? { ...p, ...data } : p))
      );

      setAlertMessage("✅ Pet atualizado com sucesso!");
      setSelectedPet(null);
    } catch (error) {
      console.error("❌ Erro ao atualizar pet:", error);
      setAlertMessage("❌ Erro ao atualizar o pet!");
    }
  };

  const handleAddPet = async (newPet) => {
    try {
      if (!storedUser?.id) {
        setAlertMessage("Você precisa estar logado para adicionar um pet!");
        navigate("/login");
        return;
      }

      const petData = {
        ...newPet,
        age: parseFloat(newPet.age),
        userId: Number(storedUser.id),
        available: true,
      };

      const { data: createdPet } = await api.post("/pets", petData);

      setMyPets((prev) => [...prev, createdPet]);
      setAlertMessage("✅ Pet adicionado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao adicionar pet:", error);

      if (error.response) {
        setAlertMessage(`Erro do servidor: ${error.response.data.message || "Verifique os campos enviados"}`);
      } else {
        setAlertMessage("Erro desconhecido ao adicionar o pet!");
      }
    }
  };

  return (
    <>
      <Menu2 />

      <section className={style.container}>
        {loading && <p>🔄 Carregando seus pets...</p>}

        {!loading && myPets.length > 0 && (
          <div className={style.cardsFlex}>
            {myPets.map((pet) => (
              <div key={pet.id} className={style.card}>
                <div className={style.cardImage}>
                  <img src={pet.image} alt={pet.name} className={style.image} />
                  <p className={style.ownerName}>
                    <img src={userBlack} alt="Dono" className={style.icon} />
                    {pet.user?.name || "Sem dono"}
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

                  <div className={style.buttonsRow}>
                    <button className={style.editButton} onClick={() => handleEditPet(pet)}>Editar</button>
                    <button className={style.deleteButton} onClick={() => handleDeletePet(pet.id)}>Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && myPets.length === 0 && (
          <p>😢 Você ainda não cadastrou nenhum pet.</p>
        )}

        <button className={style.buttonAddPet} onClick={() => setShowModalAdd(true)}>Adicionar Pet</button>

        {showModalAdd && (
          <ModalCreatePet
            onClose={() => setShowModalAdd(false)}
            onAddPet={handleAddPet}
          />
        )}

        {selectedPet && (
          <ModalEditPet
            petData={selectedPet}
            onClose={() => setSelectedPet(null)}
            onSave={handleUpdatePet}
          />
        )}

        <Alert
          message={alertMessage}
          onClose={closeAlert}
        />

        {confirmVisible && (
          <ConfirmAlert
            message="Tem certeza que deseja excluir este pet?"
            onConfirm={confirmDeletePet}
            onCancel={() => setConfirmVisible(false)}
          />
        )}
      </section>

      <Footer />
    </>
  );
}
