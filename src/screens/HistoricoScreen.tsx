import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Trash2, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react-native';
import { buscarPostagens, salvarPostagem } from '../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoricoScreen = () => {
  const [postagens, setPostagens] = useState<any[]>([]);
  const [expandido, setExpandido] = useState<string | null>(null);

  // Carrega os dados sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const dados = await buscarPostagens();
        setPostagens(dados);
      };
      carregarDados();
    }, [])
  );

  const apagarItem = (id: string) => {
    Alert.alert("Apagar Histórico", "Tem certeza que deseja excluir esta meditação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          const novaLista = postagens.filter(item => item.id !== id);
          await AsyncStorage.setItem('@diario_meditacoes', JSON.stringify(novaLista));
          setPostagens(novaLista);
        }
      }
    ]);
  };

  const toggleExpandir = (id: string) => {
    setExpandido(expandido === id ? null : id);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isExpandido = expandido === item.id;
    const dataAbertura = new Date(item.dataAbertura).toLocaleDateString('pt-BR');

    return (
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.headerCard} 
          onPress={() => toggleExpandir(item.id)}
        >
          <View style={styles.row}>
            {/* Ícones de Abertura/Fechamento indicativos */}
            <Sun size={18} color="#fbc02d" style={{ marginRight: 5 }} />
            <Moon size={18} color="#5c6bc0" style={{ marginRight: 10 }} />
            
            <Text style={styles.dataText}>{dataAbertura}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => apagarItem(item.id)} style={styles.deleteButton}>
              <Trash2 size={20} color="#ff5252" />
            </TouchableOpacity>
            {isExpandido ? <ChevronUp color="#075E54" /> : <ChevronDown color="#075E54" />}
          </View>
        </TouchableOpacity>

        {isExpandido && (
          <View style={styles.content}>
            <Text style={styles.textoDiario}>{item.textoFormatado}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postagens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum histórico encontrado.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#075E54', padding: 15 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 10, 
    overflow: 'hidden',
    elevation: 3 
  },
  headerCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15 
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  dataText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  deleteButton: { marginRight: 15, padding: 5 },
  content: { 
    padding: 15, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    backgroundColor: '#f9f9f9' 
  },
  textoDiario: { fontSize: 14, color: '#444', lineHeight: 20 },
  empty: { color: '#fff', textAlign: 'center', marginTop: 50, fontSize: 16 }
});

export default HistoricoScreen;