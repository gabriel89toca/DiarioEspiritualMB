import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// O componente recebe 'navigation' automaticamente porque está declarado no Stack.Screen
import { globalStyles } from '../styles/globalStyles';


const HomeScreen = ({ navigation }: { navigation: any }) => {



  const aoClicar = (idDaOpcao: string) => {
    // .navigate(nomeDaTela, parâmetros)
    // O primeiro argumento deve ser IGUAL ao 'name' definido no App.tsx
    navigation.navigate('Postagem', { tipo: idDaOpcao });
  };

  // ... no seu botão (TouchableOpacity)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/biblia.png')} style={styles.icone} resizeMode="contain" />
        <Text style={styles.headerTitle}>Menu Principal</Text>
      </View>
      <View style={globalStyles.body}>
        <TouchableOpacity style={globalStyles.button2} onPress={() => aoClicar('diario')}>
          <Text style={styles.buttonText}>Postar Diário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#25D366',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold', fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#274253'
  },
  header: {
    flexDirection: 'row',     // Alinha em linha (horizontal)
    alignItems: 'center',     // Centraliza o ícone e o texto verticalmente entre si
    justifyContent: 'flex-start', // Começa do início da linha

    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    elevation: 5, // Sombra no Android
  },
  icone: {
    width: 40,
    height: 40,
    marginRight: 20  // Ajuste o tamanho conforme necessário   
  },
  logo: {
    width: 160,  // Ajuste o tamanho conforme necessário
    height: 40,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10 // Opcional: se quiser bordas arredondadas no logo
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#075E54' },
  headerSubtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  listContent: { paddingHorizontal: 20 },
  menuItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    elevation: 2,
  },
  menuIcon: { fontSize: 24, marginRight: 15 },
  menuTitle: { fontSize: 18, color: '#333', fontWeight: '500' },
});

// Sem isso, o App.tsx não entende que este arquivo é um módulo de tela
export default HomeScreen;