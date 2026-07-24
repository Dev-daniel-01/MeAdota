import style from "./modalZap.module.css";
import { useState } from "react";
import Alert from "./alert";
export default function ModalZap({ onClose, pet }) {
  const [formData, setFormData] = useState({ name: "", subject: "" });
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => setAlertMessage("");
  const tutorName = pet?.user?.name || "Tutor";
  const tutorPhone = pet?.user?.telephone || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("55")) return cleaned;
    if (cleaned.length === 11 || cleaned.length === 10) return `55${cleaned}`;
    return cleaned;
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.subject.trim()) {
      setAlertMessage("Por favor, preencha todos os campos");
      return;
    }

    if (!tutorPhone) {
      setAlertMessage("Número do tutor não disponível");
      return;
    }

    const formattedPhone = formatPhoneNumber(tutorPhone);
    const message = `Olá ${tutorName}! Meu nome é ${formData.name}. ${formData.subject}`;

    window.open(
      `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // limpa o formulário e fecha modal
    setFormData({ name: "", subject: "" });
    onClose();
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.borders}>
        <button className={style.closeButton} onClick={onClose}>
          ✕
        </button>
        <h1 className={style.modalTitle}>Enviar mensagem para o tutor</h1>

        <div className={style.formGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Insira seu nome completo"
            required
          />
        </div>

        <div className={style.formGroup}>
          <textarea
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={`Digite sua mensagem para ${tutorName}`}
            rows="4"
            required
          />
        </div>

        <button className={style.sendButton} onClick={handleSubmit}>
          ENVIAR VIA WHATSAPP
        </button>

        {tutorPhone && (
          <p className={style.contactInfo}>
            Mensagem será enviada para: {tutorPhone}
          </p>
        )}
          </div>
        </div>
        <Alert
        message={alertMessage}
        onClose={closeAlert}
          />
    </div>
  );
}
