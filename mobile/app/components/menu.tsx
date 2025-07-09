import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export const Menu = () => {
  const [open, setOpen] = useState(false);

  const gotoApp = () => router.push('/');
  const gotoExplore = () => router.push('/explore');

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

        {/* Menu lateral aberto */}
        {open && (
          <>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoOpen}
            />

            <View style={styles.separator} />

            <TouchableOpacity onPress={gotoApp} style={styles.item}>
              <Image
                source={require('@/assets/images/botao-home.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoExplore} style={styles.item}>
              <Image
                source={require('@/assets/images/animais-de-estimacao.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Animais</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpen(false)} style={styles.item}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },

  topBar: {
    backgroundColor: '#6C087C',
    width: '100%',
    height: '8%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    zIndex: 10,
    position: 'fixed'
  },

  sidebar: {
    backgroundColor: '#6C087C',
    width: 230,
    height: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomRightRadius: 20,
    top: 0,
    zIndex: 11, 
    position: 'fixed'
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: '#fff',
  },

  logoClosed: {
    width: 55,
    height: 40,
    tintColor: '#fff',
  },

  logoOpen: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
    tintColor: '#fff',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 12,
    width: '100%',
  },

  label: {
    color: '#fff',
    fontSize: 16,
  },
});