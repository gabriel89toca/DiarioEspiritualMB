import React, { useState, useCallback } from 'react';
import { 
  View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { buscarPostagens } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const HistoricoScreen = () => {
  const [postagens, setPostagens] = useState([]);

  // Recarrega os dados sempre que o Mateus entrar na tela
  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const dados = await buscarPostagens();
        setPostagens(dados);
      };
      carregarDados();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardData}>📅 {new Date(item.dataAbertura).toLocaleDateString('pt-BR')}</Text>
        <Text style={styles.cardStatus}>Meditação</Text>
      </View>
      
      {item.frases ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Frases Fortes:</Text>
          <Text style={styles.sectionText}>"{item.frases}"</Text>
        </View>
      ) : null}

      {item.proposito ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Propósito:</Text>
          <Text style={styles.sectionText}>{item.proposito}</Text>
        </View>
      ) : null}

      {item.comoVivi ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💪 Vivência:</Text>
          <Text style={styles.sectionText}>{item.comoVivi}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Histórico</Text>
      </View>

      <FlatList
        data={postagens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma meditação salva ainda. 🙏</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#075E54', textAlign: 'center' },
  listContent: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#25D366',
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 5
  },
  cardData: { fontWeight: 'bold', color: '#333' },
  cardStatus: { color: '#2f8ec5', fontSize: 12, fontWeight: '600' },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#075E54' },
  sectionText: { fontSize: 14, color: '#555', fontStyle: 'italic' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#fff', fontSize: 16 }
});

export default HistoricoScreen;