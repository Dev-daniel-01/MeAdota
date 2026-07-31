import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const go = (path: Parameters<typeof router.push>[0]) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Overlay escuro quando menu aberto */}
      {open && (
        <Pressable
          style={styles.overlay}
          onPress={() => setOpen(false)}
        />
      )}

      <View style={open ? styles.sidebar : styles.topBar}>
        {/* Botão de abrir menu */}
        {!open && (
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={require('@/assets/images/options.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {/* Logo no topo quando menu fechado */}
        {!open && (
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logoClosed}
          />
        )}

        {!open && <View style={{ width: 26 }} />}

        {open && (
          <>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoOpen}
            />

            <View style={styles.separator} />

            <TouchableOpacity onPress={() => go('/')} style={styles.item}>
              <Image
                source={require('@/assets/images/botao-home.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => go('/explore')} style={styles.item}>
              <Image
                source={require('@/assets/images/animais-de-estimacao.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Animais</Text>
            </TouchableOpacity>

            {user ? (
              <>
                <TouchableOpacity onPress={() => go('/my-pets')} style={styles.item}>
                  <Ionicons name="paw-outline" size={22} color="#55187A" style={styles.iconVector} />
                  <Text style={styles.label}>Meus Pets</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => go('/profile')} style={styles.item}>
                  <Ionicons name="person-outline" size={22} color="#55187A" style={styles.iconVector} />
                  <Text style={styles.label}>Perfil</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => go('/login')} style={styles.item}>
                <Ionicons name="log-in-outline" size={22} color="#55187A" style={styles.iconVector} />
                <Text style={styles.label}>Entrar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setOpen(false)} style={[styles.item, { borderBottomWidth: 0 }]}>
              <Image
                source={require('@/assets/images/botao-excluir.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Fechar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(27, 11, 46, 0.5)',
    zIndex: 9,
  },

  topBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD2E6',
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    zIndex: 10,
    position: 'absolute'
  },

  sidebar: {
    backgroundColor: '#FFFFFF',
    width: 230,
    height: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomRightRadius: 20,
    top: 0,
    zIndex: 11,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },

  icon: {
    width: 26,
    height: 26,
    marginRight: 12,
    tintColor: '#55187A',
  },

  iconVector: {
    marginRight: 12,
    width: 26,
  },

  logoClosed: {
    width: 48,
    height: 36,
    tintColor: '#55187A',
  },

  logoOpen: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
    tintColor: '#55187A',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#DDD2E6',
    marginBottom: 20,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE6F3',
    paddingBottom: 12,
    width: '100%',
  },

  label: {
    color: '#221A2E',
    fontSize: 16,
    fontWeight: '500',
  },
});
