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

  const enviarWhatsApp = async () => {

    const validaTela = true;
    if (Frases == null && Proposito == null) {
      Alert.alert("Atenção", "Preencher a Diário!");
      let validaTela = false;
    }

    if (gratidao == null && ComoViviProposito == null) {
      Alert.alert("Atenção", "Preencher a Fechamento!");
      let validaTela = false;
    }


    // 1. Geramos a data e hora atual
    const agora = new Date();
    const dataPost = agora.toLocaleDateString('pt-BR');
    const horaPost = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });


    // 1. MONTAGEM DA STRING (Lógica Corrigida)
    let msg = `📖 *DIÁRIO ESPIRITUAL*\n`;


    if (validaTela) {
      // Bloco de Abertura
      if (habAbertura) {
        msg += `📅 *Dia* ${dataAbertura.toLocaleDateString('pt-BR')}:\n\n`;
        if (Frases) msg += `✨ *Frases Fortes:* \n "${Frases}"\n\n`;
        if (Proposito) msg += `💡 *Proposito:* ${Proposito}\n\n\n`;
      }

      // Bloco de Fechamento (Corrigido o erro do += msg +=)
      if (habFechamento) {
        msg += `🏁 *FECHAMENTO* ${dataFechamento.toLocaleDateString('pt-BR')}:\n\n`;
        if (gratidao) msg += `🙏 *Gratidão por:* \n ${gratidao}\n`;
        if (ComoViviProposito) msg += `💡 *Como vivi o Propósito:* \n ${ComoViviProposito}\n\n`;
      }


      // 2. PREPARAÇÃO DOS DADOS (Usando suas variáveis de estado)
      const dadosParaSalvar = {
        id: Date.now().toString(),
        dataExibicao: dataPost,
        horaPostagem: horaPost,
        dataAbertura: dataAbertura.toISOString(),
        dataFechamento: dataFechamento.toISOString(),
        frases: Frases,
        proposito: Proposito,
        comoVivi: ComoViviProposito,
        gratidao: gratidao,
        textoFormatado: msg, // Guardamos a mensagem pronta para o histórico
      };

      try {
        // 3. SALVAMENTO LOCAL
        const salvo = await salvarPostagem(dadosParaSalvar);

        Alert.alert("Sucesso", "Meditação salva e enviada!");
        // Opcional: Limpar campos após o sucesso


        // 4. ENVIO WHATSAPP 
        const url = `whatsapp://send?text=${encodeURIComponent(msg)}`;
        Linking.openURL(url).catch(() => {
          Alert.alert('Erro', 'Certifique-se de que o WhatsApp está instalado.');
        });

      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar a postagem.");
        console.error(error);
      } finally {
        // 3. Código executado sempre (ex: finalizar carregamento)
        setFrases(''); setProposito(''); setGratidao(''); setComoViviProposito('');
        setHabAbertura(true);
        setHabFechamento(true);
      }
    }
  };


  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Image source={require('../../assets/holy-spirit.png')} style={globalStyles.icone} resizeMode="contain" />
        <Text style={globalStyles.label}>Nova Meditação</Text>
        <TouchableOpacity
          style={[globalStyles.buttonIcone]}
          onPress={enviarWhatsApp}
        ><Image source={require('../../assets/compartilhar.png')} style={globalStyles.icone} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={globalStyles.body}>
          <View style={globalStyles.switchRow}>
            <Text style={globalStyles.inputLabel2}>Abertura:</Text>

            <Switch value={habAbertura} onValueChange={setHabAbertura} thumbColor="#075E54"
              trackColor={{ false: '#363b38', true: '#48d148' }} />
          </View>
          {/* SELETORES DE DATA LADO A LADO */}
          <View style={globalStyles.rowDates}>
            <View style={{ flex: 1, marginRight: 5 }}>

              {habAbertura && (
                <TouchableOpacity style={globalStyles.datePickerButton} onPress={() => setPickerMode('abertura')}>
                  <Text style={globalStyles.dateText}>📅 {dataAbertura.toLocaleDateString('pt-BR')}</Text>
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
            <View style={globalStyles.switchRow}>
              <Text style={globalStyles.inputLabel}>Quais as frase que me marcaram?</Text>
            </View>
          )}
          {habAbertura && (
            <View style={globalStyles.inputContainer}>
              <TextInput style={globalStyles.input} multiline value={Frases} onChangeText={setFrases} placeholder="Escreva aqui..."
                placeholderTextColor="#646060" textAlignVertical="top" />
            </View>
          )}
          {habAbertura && (
            <View style={globalStyles.switchRow}>
              <Text style={globalStyles.inputLabel}>Propósito para o dia de Hoje:</Text>
            </View>
          )}
          {habAbertura && (
            <View style={globalStyles.inputContainer}>
              <TextInput style={globalStyles.input} multiline value={Proposito} onChangeText={setProposito} placeholder="Escreva aqui..."
                placeholderTextColor="#646060" textAlignVertical="top" />
            </View>
          )}

          <View style={globalStyles.switchRow}>
            <Text style={globalStyles.inputLabel2}>Fechamento:</Text>
            <Switch value={habFechamento} onValueChange={setHabFechamento} thumbColor="#075E54"
              trackColor={{ false: '#363b38', true: '#48d148' }} />
          </View>
          {/* SELETORES DE DATA LADO A LADO FECHAMENTOS */}
          <View style={globalStyles.rowDates}>
            <View style={{ flex: 1, marginLeft: 5 }}>

              {habFechamento && (
                <TouchableOpacity style={globalStyles.datePickerButton} onPress={() => setPickerMode('fechamento')}>
                  <Text style={globalStyles.dateText}>📅  {dataFechamento.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {habFechamento && (
            <View style={globalStyles.switchRow}>
              <Text style={globalStyles.inputLabel}>Como você viveu seu propósito hoje?</Text>
            </View>
          )}
          {habFechamento && (
            <View style={globalStyles.inputContainer}>
              <TextInput style={globalStyles.input} multiline value={ComoViviProposito} onChangeText={setComoViviProposito}
                placeholder="Aprendizado..." placeholderTextColor="#646060" textAlignVertical="top" />
            </View>
          )}
          {habFechamento && (
            <View style={globalStyles.switchRow}>
              <Text style={globalStyles.inputLabel}>Pelo que é grato?</Text>
              {/* <Switch value={habGratidao} onValueChange={setHabGratidao} thumbColor="#25D366" /> */}
            </View>
          )}
          {habFechamento && (
            <View style={globalStyles.inputContainer}>
              <TextInput style={globalStyles.input} multiline value={gratidao} onChangeText={setGratidao} placeholder="Gratidão..."
                placeholderTextColor="#646060" textAlignVertical="top" />
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