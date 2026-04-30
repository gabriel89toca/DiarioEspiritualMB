import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigScreen = () => {
  const [nome, setNome] = useState('');
  const [fraternidade, setFraternidade] = useState('');
  const [planilhaId, setPlanilhaId] = useState('');

  // Carregar dados salvos ao abrir a tela
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedNome = await AsyncStorage.getItem('@user_nome');
      const savedFrat = await AsyncStorage.getItem('@user_fraternidade');
      const savedPlanilha = await AsyncStorage.getItem('@planilha_id');

      if (savedNome) setNome(savedNome);
      if (savedFrat) setFraternidade(savedFrat);
      if (savedPlanilha) setPlanilhaId(savedPlanilha);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar as configurações.");
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('@user_nome', nome);
      await AsyncStorage.setItem('@user_fraternidade', fraternidade);
      await AsyncStorage.setItem('@planilha_id', planilhaId);
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar os dados.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações de Perfil</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput 
          style={styles.input} 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Ex: Mateus Silva"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fraternidade</Text>
        <TextInput 
          style={styles.input} 
          value={fraternidade} 
          onChangeText={setFraternidade} 
          placeholder="Ex: São Francisco de Assis"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ID da Planilha (Google Sheets)</Text>
        <TextInput 
          style={styles.input} 
          value={planilhaId} 
          onChangeText={setPlanilhaId} 
          placeholder="Cole aqui o ID ou Link da planilha"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>SALVAR CONFIGURAÇÕES</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#075E54', marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: '600' },
  input: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd',
    fontSize: 16 
  },
  button: { 
    backgroundColor: '#075E54', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default ConfigScreen;