import { useState } from "react";
import style from "./modalEditPet.module.css";

import iconPet from "../assets/images/dogFace.png";
import iconBreed from "../assets/images/race.png";
import iconAnimal from "../assets/images/pata.png";
import iconClock from "../assets/images/age.png";
import iconUser from "../assets/images/userBlack.png";
import iconComment from "../assets/images/description.png";

const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

export default function ModalEditPet({ petData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: petData.name || "",
    race: petData.race || "",
    animal: petData.animal || "",
    age: petData.age !== undefined ? petData.age.toString() : "", // manter como string para input
    size: petData.size || "",
    description: petData.description || "",
    available: petData.available ?? true,
    image: petData.image || "",
    userId: petData.userId || storedUser.id, // para enviar no update
  });

  const tutorName = petData.user?.name || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleAvailable = () => {
    setFormData((prev) => ({
      ...prev,
      available: !prev.available,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converter age para float e garantir userId número
    const dataToSend = {
      name: formData.name,
      race: formData.race,
      animal: formData.animal,
      age: parseFloat(formData.age), // conversão
      size: formData.size,
      description: formData.description,
      available: formData.available,
      image: formData.image,
      userId: Number(formData.userId), // garantia número
    };

    onSave(dataToSend);
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Editar Pet</h2>

        <div className={style.contentWrapper}>
          {/* Seção da Imagem */}
          <div className={style.imageSection}>
            {formData.image ? (
              <img src={formData.image} alt="Pet" className={style.petImage} />
            ) : (
              <div className={style.imagePlaceholder}>Adicione a foto do seu pet</div>
            )}
            <button className={style.uploadBtn}>Enviar Imagem</button>
          </div>

          {/* Seção do Formulário */}
          <form className={style.formSection} onSubmit={handleSubmit}>
            {/* Nome */}
            <div className={style.row}>
              <div className={style.inputGroup}>
                <label>Nome:</label>
                <div className={style.inputWithIcon}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome do pet"
                  />
                  <img src={iconPet} alt="icone pet" />
                </div>
              </div>

              {/* Raça */}
              <div className={style.inputGroup}>
                <label>Raça:</label>
                <div className={style.inputWithIcon}>
                  <input
                    type="text"
                    name="race"
                    value={formData.race}
                    onChange={handleChange}
                    placeholder="Raça"
                  />
                  <img src={iconBreed} alt="icone raça" />
                </div>
              </div>

              {/* Animal */}
              <div className={style.inputGroup}>
                <label>Animal:</label>
                <div className={style.inputWithIcon}>
                  <input
                    type="text"
                    name="animal"
                    value={formData.animal}
                    onChange={handleChange}
                    placeholder="Cachorro, gato..."
                  />
                  <img src={iconAnimal} alt="icone animal" />
                </div>
              </div>
            </div>

            {/* Idade / Porte / Tutor */}
            <div className={style.row}>
              <div className={style.inputGroup}>
                <label>Idade:</label>
                <div className={style.inputWithIcon}>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Idade"
                  />
                  <img src={iconClock} alt="icone idade" />
                </div>
              </div>

              <div className={style.inputGroup}>
                <label>Porte:</label>
                <div className={style.inputWithIcon}>
                  <select name="size" value={formData.size} onChange={handleChange}>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>

              <div className={style.inputGroup}>
                <label>Tutor:</label>
                <div className={style.inputWithIcon}>
                  <input type="text" value={tutorName} disabled />
                  <img src={iconUser} alt="icone tutor" />
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className={style.inputGroup}>
              <label>Descrição:</label>
              <div className={style.inputWithIcon}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição do pet"
                />
                <img src={iconComment} alt="icone descrição" />
              </div>
            </div>

            {/* Disponibilidade */}
            <div className={style.inputGroup}>
              <label>Disponibilidade:</label>
              <div className={style.toggleAvailable}>
                <label className={style.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleToggleAvailable}
                  />
                  <span>{formData.available ? "✅ Disponível" : "❌ Indisponível"}</span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className={style.buttonsRow}>
              <button type="submit" className={style.saveBtn}>
                Salvar Alterações
              </button>
              <button type="button" className={style.cancelBtn} onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
