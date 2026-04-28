import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, Linking, KeyboardAvoidingView,
  Platform, Alert, Switch
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/globalStyles';
import { salvarPostagem } from '../services/storage'; // Importe o serviço



const PostagemScreen = () => {
  // 1. Estados para os textos
  const [Frases, setFrases] = useState('');
  const [Proposito, setProposito] = useState('');
  const [gratidao, setGratidao] = useState('');
  const [ComoViviProposito, setComoViviProposito] = useState('');


  // 2. Estados para os Switches
  const [habAbertura, setHabAbertura] = useState(true);
  const [habFechamento, setHabFechamento] = useState(true);

  const [habFrases, setHabFrases] = useState(true);
  const [habProposito, setHabProposito] = useState(true);
  const [habAprendizado, setHabAprendizado] = useState(true);
  const [habGratidao, setHabGratidao] = useState(true);

  // 3. Estados para as DUAS DATAS
  const [dataAbertura, setDataAbertura] = useState(new Date());
  const [dataFechamento, setDataFechamento] = useState(new Date());

  // Controle de qual seletor abrir (abertura, fechamento ou nenhum)
  const [pickerMode, setPickerMode] = useState<'none' | 'abertura' | 'fechamento'>('none');

  const onChangeData = (event: any, selectedDate?: Date) => {
    const currentMode = pickerMode;
    setPickerMode('none'); // Fecha o seletor imediatamente

    if (selectedDate) {
      if (currentMode === 'abertura') setDataAbertura(selectedDate);
      if (currentMode === 'fechamento') setDataFechamento(selectedDate);
    }
  };

  const enviarWhatsApp = () => {
    let msg = `📖 *DIÁRIO ESPIRITUAL*\n`;
    if (habAbertura && dataAbertura) msg += `📅 *Abertura* ${dataAbertura.toLocaleDateString('pt-BR')}:\n`;

    if (habAbertura && Frases) msg += `✨ *Frases Fortes:*  "${Frases}"\n\n`;
    if (habAbertura && Proposito) msg += `💡 *Proposito:* ${Proposito}\n\n`;

    if (habFechamento && dataFechamento) msg += msg += `🏁 *Fechamento* ${dataFechamento.toLocaleDateString('pt-BR')}:\n\n`;

    if (habFechamento && gratidao) msg += `🙏 *Gratidão:* ${gratidao}`;
    if (habFechamento && ComoViviProposito) msg += `💡 *Como vivi o Proposito:* ${ComoViviProposito}\n\n`;


    const url = `whatsapp://send?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Certifique-se de que o WhatsApp está instalado.');
    });

    // ... dentro da função enviarWhatsApp
    const enviarWhatsApp = async () => {
      const dadosParaSalvar = {
        id: Date.now().toString(), // ID único baseado no timestamp
        dataAbertura: dataAbertura.toISOString(),
        dataFechamento: dataFechamento.toISOString(),
        frases: Frases,
        proposito: Proposito,
        comoVivi: ComoViviProposito,
        gratidao: gratidao,
      };

      // Salva localmente
      const salvo = await salvarPostagem(dadosParaSalvar);

      if (salvo) {
        // Só então abre o WhatsApp
        const msg = `... sua lógica de mensagem ...`;
        const url = `whatsapp://send?text=${encodeURIComponent(msg)}`;
        Linking.openURL(url);

        Alert.alert("Sucesso", "Meditação salva e enviada!");
      }
    };

  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/holy-spirit.png')} style={styles.icone} resizeMode="contain" />
        <Text style={styles.label}>Nova Meditação</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.body}>

          {/* SELETORES DE DATA LADO A LADO */}
          <View style={styles.rowDates}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <View style={styles.switchRow}>
                <Text style={styles.inputLabel2}>Abertura:</Text>

                <Switch value={habAbertura} onValueChange={setHabAbertura} thumbColor="#25D366" />
              </View>
              {habAbertura && (
                <TouchableOpacity style={styles.datePickerButton} onPress={() => setPickerMode('abertura')}>
                  <Text style={styles.dateText}>📅 {dataAbertura.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {pickerMode !== 'none' && (
            <DateTimePicker
              value={pickerMode === 'abertura' ? dataAbertura : dataFechamento}
              mode="date"
              display="default"
              onChange={onChangeData}
            />
          )}

          {/* CAMPOS DE TEXTO (REUTILIZANDO SEU PADRÃO) */}
          {habAbertura && (
            <View style={styles.switchRow}>
              <Text style={styles.inputLabel}>Quais as frase que me marcaram?</Text>
            </View>
          )}
          {habAbertura && (
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} multiline value={Frases} onChangeText={setFrases} placeholder="Escreva aqui..." textAlignVertical="top" />
            </View>
          )}
          {habAbertura && (
            <View style={styles.switchRow}>
              <Text style={styles.inputLabel}>Propósito para o dia de Hoje:</Text>
            </View>
          )}
          {habAbertura && (
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} multiline value={Proposito} onChangeText={setProposito} placeholder="Escreva aqui..." textAlignVertical="top" />
            </View>
          )}


          {/* SELETORES DE DATA LADO A LADO FECHAMENTOS */}
          <View style={styles.rowDates}>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <View style={styles.switchRow}>
                <Text style={styles.inputLabel2}>Fechamento:</Text>
                <Switch value={habFechamento} onValueChange={setHabFechamento} thumbColor="#25D366" />
              </View>
              {habFechamento && (
                <TouchableOpacity style={styles.datePickerButton} onPress={() => setPickerMode('fechamento')}>
                  <Text style={styles.dateText}>📅  {dataFechamento.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {habFechamento && (
            <View style={styles.switchRow}>
              <Text style={styles.inputLabel}>Como você viveu seu propósito hoje?</Text>
            </View>
          )}
          {habFechamento && (
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} multiline value={ComoViviProposito} onChangeText={setComoViviProposito} placeholder="Aprendizado..." textAlignVertical="top" />
            </View>
          )}
          {habFechamento && (
            <View style={styles.switchRow}>
              <Text style={styles.inputLabel}>Pelo que é grato?</Text>
              {/* <Switch value={habGratidao} onValueChange={setHabGratidao} thumbColor="#25D366" /> */}
            </View>
          )}
          {habFechamento && (
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} multiline value={gratidao} onChangeText={setGratidao} placeholder="Gratidão..." textAlignVertical="top" />
            </View>
          )}

          <TouchableOpacity
            style={[globalStyles.button, { marginTop: 30, marginBottom: 40 }]}
            onPress={enviarWhatsApp}
          >
            <Text style={globalStyles.buttonText}>Confirmar e Postar</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  label: { fontSize: 18, fontWeight: 'bold', color: '#075E54' },
  icone: { width: 30, height: 30, marginRight: 10 },
  body: { paddingHorizontal: 20 },

  // Estilos para as datas em linha
  rowDates: { flexDirection: 'row', marginTop: 15 },
  datePickerButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
    elevation: 2
  },
  dateText: { color: '#075E54', fontWeight: 'bold', fontSize: 14 },

  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  inputLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  inputLabel2: { color: '#2f8ec5', fontSize: 20, fontWeight: 'bold' },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    minHeight: 80,
    marginTop: 5,
    elevation: 2,
  },
  input: { fontSize: 16, color: '#333' },
});

export default PostagemScreen;