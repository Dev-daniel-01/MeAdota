import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export interface PetFormData {
  name: string;
  race: string;
  animal: string;
  age: string;
  size: string;
  description: string;
  image: string;
  available: boolean;
}

interface PetFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: PetFormData) => Promise<void>;
  initialData?: Partial<PetFormData>;
  title: string;
}

const emptyForm: PetFormData = {
  name: '',
  race: '',
  animal: '',
  age: '',
  size: '',
  description: '',
  image: '',
  available: true,
};

export default function PetFormModal({ visible, onClose, onSubmit, initialData, title }: PetFormModalProps) {
  const [form, setForm] = useState<PetFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setForm({ ...emptyForm, ...initialData });
    }
  }, [visible, initialData]);

  const setField = (field: keyof PetFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Autorize o acesso às fotos para enviar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const mime = asset.mimeType || 'image/jpeg';
      setForm((prev) => ({ ...prev, image: `data:${mime};base64,${asset.base64}` }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.image) {
      Alert.alert('Atenção', 'Nome e foto são obrigatórios.');
      return;
    }
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color="#564D61" />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          <ScrollView keyboardShouldPersistTaps="handled">
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.85}>
              {form.image ? (
                <Image source={{ uri: form.image }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera-outline" size={28} color="#8A8093" />
                  <Text style={styles.imagePlaceholderText}>Adicionar foto</Text>
                </View>
              )}
            </TouchableOpacity>

            <FormField icon="paw-outline" placeholder="Nome do pet" value={form.name} onChangeText={setField('name')} />
            <FormField icon="paw-outline" placeholder="Raça" value={form.race} onChangeText={setField('race')} />
            <FormField icon="paw-outline" placeholder="Animal (cachorro, gato...)" value={form.animal} onChangeText={setField('animal')} />
            <FormField icon="time-outline" placeholder="Idade" value={form.age} onChangeText={setField('age')} keyboardType="numeric" />
            <FormField icon="resize-outline" placeholder="Porte (Pequeno, Médio, Grande)" value={form.size} onChangeText={setField('size')} />
            <FormField
              icon="document-text-outline"
              placeholder="Descrição"
              value={form.description}
              onChangeText={setField('description')}
              multiline
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Disponível para adoção</Text>
              <Switch
                value={form.available}
                onValueChange={(v) => setForm((prev) => ({ ...prev, available: v }))}
                trackColor={{ false: '#DDD2E6', true: '#C9A0DC' }}
                thumbColor={form.available ? '#6D28D9' : '#fff'}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={saving} activeOpacity={0.85}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Salvar</Text>}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function FormField({
  icon,
  ...props
}: React.ComponentProps<typeof TextInput> & { icon: React.ComponentProps<typeof Ionicons>['name'] }) {
  return (
    <View style={[styles.inputGroup, props.multiline && styles.inputGroupMultiline]}>
      <Ionicons name={icon} size={18} color="#8A8093" style={{ marginTop: props.multiline ? 2 : 0 }} />
      <TextInput
        style={[styles.input, props.multiline && styles.textarea]}
        placeholderTextColor="#A79FB0"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 11, 46, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    maxHeight: '88%',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#221A2E',
    textAlign: 'center',
    marginBottom: 16,
  },
  imagePicker: {
    marginBottom: 14,
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 14,
  },
  imagePlaceholder: {
    height: 140,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#DDD2E6',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F2FA',
    gap: 6,
  },
  imagePlaceholderText: {
    color: '#8A8093',
    fontSize: 13,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD2E6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 10,
    gap: 8,
  },
  inputGroupMultiline: {
    height: 90,
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#221A2E',
  },
  textarea: {
    height: '100%',
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#221A2E',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6D28D9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
