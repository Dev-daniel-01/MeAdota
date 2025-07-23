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
  const [previewImage, setPreviewImage] = useState(petData.image || null);

  const [formData, setFormData] = useState({
    name: petData.name || "",
    race: petData.race || "",
    animal: petData.animal || "",
    age: petData.age !== undefined ? petData.age.toString() : "",
    size: petData.size || "",
    description: petData.description || "",
    available: petData.available ?? true,
    image: petData.image || "",
    userId: petData.userId || storedUser.id,
  });

  // 👉 Apenas seleciona a imagem e atualiza o preview + formData.image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

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

    const dataToSend = {
      name: formData.name,
      race: formData.race,
      animal: formData.animal,
      age: parseFloat(formData.age),
      size: formData.size,
      description: formData.description,
      available: formData.available,
      image: formData.image, // 👈 vai com a nova imagem (se trocada)
      userId: Number(formData.userId),
    };

    onSave(dataToSend);
  };

  const tutorName = petData.user?.name || storedUser.name || "";

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Editar Pet</h2>

        <div className={style.contentWrapper}>
          <div className={style.imageSection}>
            {previewImage ? (
              <img src={previewImage} alt="Pet" className={style.petImage} />
            ) : (
              <div className={style.imagePlaceholder}>
                Adicione a foto do seu pet
              </div>
            )}

            <input
              id="editImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <button
              type="button"
              className={style.uploadBtn}
              onClick={() => document.getElementById("editImageInput").click()}
            >
              Enviar Imagem
            </button>
          </div>

          <form className={style.formSection} onSubmit={handleSubmit}>
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

            <div className={style.inputGroup}>
              <label>Descrição:</label>
              <div className={style.inputWithIcon}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição do pet"
                />
                <img src={iconComment} alt="icone descrição" className={style.imgTextArea}/>
              </div>
            </div>

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
