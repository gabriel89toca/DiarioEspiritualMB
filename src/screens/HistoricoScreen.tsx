import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Trash2, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react-native';
//import { buscarPostagens, salvarPostagem } from '../services/storage';
import { buscarPostagens, removerPostagem } from '../services/storage';
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

  // ... dentro do componente
  const apagarItem = (id: string) => {
    Alert.alert("Apagar", "Deseja excluir esta meditação?", [
      { text: "Cancelar" },
      {
        text: "Sim",
        onPress: async () => {
          const novaLista = await removerPostagem(id);
          if (novaLista) {
            setPostagens(novaLista); // Atualiza a tela imediatamente
          }
        }
      }
    ]);
  };

  /*   const apagarItem = (id: string) => {
      Alert.alert("Apagar Histórico", "Tem certeza que deseja excluir esta meditação?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            const novaLista = postagens.filter(item => item.id !== id);
            await AsyncStorage.setItem('@diario_posts', JSON.stringify(novaLista));
            setPostagens(novaLista);
          }
        }
      ]);
    }; */

  const toggleExpandir = (id: string) => {
    setExpandido(expandido === id ? null : id);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isExpandido = expandido === item.id;
    const dataAbertura = new Date(item.dataAbertura).toLocaleDateString('pt-BR');

    // Verificação lógica: existe texto ou a flag de abertura era true?
    const temAbertura = item.frases || item.proposito;
    const temFechamento = item.gratidao || item.comoVivi;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.headerCard}
          onPress={() => toggleExpandir(item.id)}
        >

          <View style={styles.expandChevro}>
            {isExpandido ? <ChevronUp color="#075E54" /> : <ChevronDown color="#075E54" />}
          </View>

          <View style={styles.leftGroup}>
            {/* Exibindo Data e Hora lado a lado apenas aqui */}
            <Text style={styles.dataText}> {item.dataExibicao} </Text>
            <Text style={styles.horaText}>({item.horaPostagem}): </Text>
           
            {/* <Text style={styles.dataText}>{dataAbertura}</Text> */}
            
            {/* Ícones de Abertura/Fechamento indicativos */}
            {temAbertura && (
              <Sun size={18} color="#fbc02d" style={{ marginHorizontal: 5 }} />
            )}
            {temFechamento && (
              <Moon size={18} color="#5c6bc0" style={{ marginHorizontal: 5 }} />
            )}

          </View>

          <View style={styles.actions}>

            <TouchableOpacity onPress={() => apagarItem(item.id)} style={styles.deleteButton}>
              <Trash2 size={20} color="#ff5252" />
            </TouchableOpacity>
            
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
  row: { flexDirection: 'row', alignItems: 'flex-start'},
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Faz esse grupo ocupar o espaço necessário à esquerda
  },
  expandChevro: { flexDirection: 'row', alignItems: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'},
  dataText: { fontSize: 16, fontWeight: 'bold', color: '#333', alignItems: 'flex-start'},
  horaText: { fontSize: 16, fontWeight: 'bold', color: '#333', alignItems: 'flex-start' },
  deleteButton: { marginRight: 15, padding: 5, backgroundColor: '#eedbdb', borderRadius: 5, textAlign: 'right'},
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