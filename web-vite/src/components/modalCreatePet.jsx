import { useState } from "react";
import style from "./modalCreatePet.module.css";

import iconPet     from "../assets/images/dogFace.png";
import iconBreed   from "../assets/images/race.png";
import iconAnimal  from "../assets/images/pata.png";
import iconClock   from "../assets/images/age.png";
import iconSize    from "../assets/images/porte.png";
import iconUser    from "../assets/images/userBlack.png";
import iconComment from "../assets/images/description.png";

export default function ModalCreatePet({ onClose, onAddPet }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    name: "",
    race: "",
    age: "",
    size: "",
    description: "",
    image: "",
    animal: ""
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      alert("⚠️ Nome e imagem são obrigatórios!");
      return;
    }

    const dataToSend = {
      ...formData,
      age: formData.age ? parseFloat(formData.age) : 0 // garante número
    };

    console.log("✅ Dados do form antes de enviar:", dataToSend);

    await onAddPet(dataToSend);
    onClose();
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <button className={style.closeBtn} onClick={onClose}>&times;</button>
        <h2 className={style.modalTitle}>Adicionar Novo Pet</h2>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.imageUpload}>
            <label htmlFor="imageInput" className={style.imageLabel}>
              {previewImage ? (
                <img src={previewImage} alt="Foto do pet" />
              ) : (
                <>
                  <div style={{ fontSize: "3rem" }}>🐾📷</div>
                  <p>Adicione a foto do seu pet</p>
                </>
              )}
            </label>

            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={style.hiddenInput}
            />

            <button
              type="button"
              className={style.uploadBtn}
              onClick={() => document.getElementById("imageInput").click()}
            >
              Enviar Imagem
            </button>
          </div>

          <div className={style.fields}>
            {/* Nome */}
            <div className={style.inputGroup}>
              <label>Nome:</label>
              <div className={style.inputWithIcon}>
                <img src={iconPet} alt="Nome" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome do pet"
                />
              </div>
            </div>

            {/* Raça */}
            <div className={style.inputGroup}>
              <label>Raça:</label>
              <div className={style.inputWithIcon}>
                <img src={iconBreed} alt="Raça" />
                <input
                  type="text"
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  placeholder="Raça"
                />
              </div>
            </div>

            {/* Tipo de Animal */}
            <div className={style.inputGroup}>
              <label>Animal:</label>
              <div className={style.inputWithIcon}>
                <img src={iconAnimal} alt="Animal" />
                <input
                  type="text"
                  name="animal"
                  value={formData.animal}
                  onChange={handleChange}
                  placeholder="Cachorro, gato…"
                />
              </div>
            </div>

            {/* Idade */}
            <div className={style.inputGroup}>
              <label>Idade:</label>
              <div className={style.inputWithIcon}>
                <img src={iconClock} alt="Idade" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Idade"
                />
              </div>
            </div>

            {/* Porte */}
            <div className={style.inputGroup}>
              <label>Porte:</label>
              <div className={style.inputWithIcon}>
                <img src={iconSize} alt="Porte" />
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Porte"
                />
              </div>
            </div>

            {/* Tutor (somente exibição) */}
            <div className={style.inputGroup}>
              <label>Tutor:</label>
              <div className={style.inputWithIcon}>
                <img src={iconUser} alt="Tutor" />
                <input
                  type="text"
                  value={storedUser.name || "Desconhecido"}
                  readOnly
                  disabled
                />
              </div>
            </div>

            {/* Descrição */}
            <div className={style.inputGroupFull}>
              <label>Descrição:</label>
              <div className={style.inputWithIcon}>
                <img src={iconComment} alt="Descrição" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição do pet"
                />
              </div>
            </div>
          </div>

          <button type="submit" className={style.submitBtn}>Concluir</button>
        </form>
      </div>
    </div>
  );
}
