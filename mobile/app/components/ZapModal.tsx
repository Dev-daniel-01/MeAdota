import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ZapModalProps {
  visible: boolean;
  onClose: () => void;
  tutorName: string;
  tutorPhone?: string;
}

function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('55')) return cleaned;
  if (cleaned.length === 11 || cleaned.length === 10) return `55${cleaned}`;
  return cleaned;
}

export default function ZapModal({ visible, onClose, tutorName, tutorPhone }: ZapModalProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const handleSend = () => {
    if (!name.trim() || !subject.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (!tutorPhone) {
      Alert.alert('Ops', 'Número do tutor não disponível.');
      return;
    }

    const phone = formatPhoneNumber(tutorPhone);
    const message = `Olá ${tutorName}! Meu nome é ${name}. ${subject}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.'));

    setName('');
    setSubject('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color="#564D61" />
          </TouchableOpacity>

          <Text style={styles.title}>Enviar mensagem para o tutor</Text>

          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#A79FB0"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder={`Mensagem para ${tutorName}`}
            placeholderTextColor="#A79FB0"
            value={subject}
            onChangeText={setSubject}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.85}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.sendButtonText}>Enviar via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 11, 46, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#221A2E',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#DDD2E6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#221A2E',
    marginBottom: 12,
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2E9B5B',
    borderRadius: 10,
    paddingVertical: 13,
    marginTop: 4,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
