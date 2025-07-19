import style from "./InfoPets.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { api } from "../src/api/api"; // ✅ Usando mesma instância de axios

import { Menu2 } from "./components/menu2";
import { Footer } from "./components/footer";

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

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchMyPets = async () => {
            if (!storedUser?.id) {
                alert("Você precisa estar logado para acessar seus pets!");
                navigate("/login");
                return;
            }

            try {
                // ✅ Busca todos os pets
                const { data } = await api.get("/pets");

                const meusPets = data.filter(
                    (pet) => Number(pet.userId) === Number(storedUser.id)
                );

                console.log(meusPets)

                // Formata os endereços com ViaCEP
                const petsComEndereco = await Promise.all(
                    meusPets.map(async (pet) => {
                        const cepLimpo = pet.user.cep.replace(/\D/g, "");
                        try {
                            const viaCepRes = await api.get(
                                `https://viacep.com.br/ws/${cepLimpo}/json/`
                            );
                            const endereco = viaCepRes.data;
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
                console.error("Erro ao buscar seus pets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPets();
    }, []);

    // ✅ Excluir pet
    const handleDeletePet = async (petId) => {
        const confirmDelete = confirm("Tem certeza que deseja excluir este pet?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/pets/${petId}`); // ✅ Agora com Axios

            // Remove da lista sem recarregar
            setMyPets((prev) => prev.filter((p) => p.id !== petId));
        } catch (error) {
            console.error("Erro ao excluir pet:", error);
            alert("Erro ao excluir o pet. Tente novamente.");
        }
    };

    // ✅ Editar pet
    const handleEditPet = (petId) => {
        navigate(`/editar-pet/${petId}`);
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
                                {/* Imagem e dono */}
                                <div className={style.cardImage}>
                                    <img src={pet.image} alt={pet.name} className={style.image} />
                                    <p className={style.ownerName}>
                                        <img src={userBlack} alt="Dono" className={style.icon} />
                                        {pet.user.name}
                                    </p>
                                </div>

                                {/* Conteúdo */}
                                <div className={style.cardContent}>
                                    <h1 className={style.petName}>
                                        <img src={dogface} alt="Pet" className={style.iconName} />
                                        {pet.name}
                                    </h1>

                                    {/* Infos rápidas */}
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

                                    {/* Descrição */}
                                    <div className={style.descriptionSection}>
                                        <img
                                            src={descriptionIcon}
                                            alt="Descrição"
                                            className={style.icon}
                                        />
                                        <p>{pet.description}</p>
                                    </div>

                                    {/* Localização */}
                                    <div className={style.locationSection}>
                                        <img
                                            src={locationIcon}
                                            alt="Localização"
                                            className={style.icon}
                                        />
                                        <span>{pet.enderecoFormatado}</span>
                                    </div>

                                    {/* Botões */}
                                    <div className={style.buttonsRow}>
                                        <button
                                            className={style.editButton}
                                            onClick={() => handleEditPet(pet.id)}
                                        >
                                        Editar
                                        </button>
                                        <button
                                            className={style.deleteButton}
                                            onClick={() => handleDeletePet(pet.id)}
                                        >
                                        Excluir
                                        </button>
                                    </div>
                                    
                                </div>
                              
                            </div>
                            
                        ))}
                          
                    </div>
                )}

                {!loading && myPets.length === 0 && (
                    <p>😢 Você ainda não cadastrou nenhum pet.</p>
                )}
                <button className={style.buttonAddPet}>Adicionar Pet</button>
            </section>

            <Footer />
        </>
    );
}
