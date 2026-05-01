import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, SafeAreaView, Platform, Linking, KeyboardAvoidingView, Switch } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/globalStyles';
import Share from 'react-native-share'; // Importe a biblioteca no topo
import { salvarPostagem } from '../services/storage';



const PostagemPhotoScreen = () => {

  const [habAbertura, setHabAbertura] = useState(true);
  const [habFechamento, setHabFechamento] = useState(true);

  const [dataAbertura, setDataAbertura] = useState(new Date());
  const [dataFechamento, setDataFechamento] = useState(new Date());

  const [pickerMode, setPickerMode] = useState<'none' | 'abertura' | 'fechamento'>('none');
  const [tipoPostagem, setTipoPostagem] = useState<'Abertura' | 'Fechamento'>('Abertura');


  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const onChangeData = (event: any, selectedDate?: Date) => {
    const currentMode = pickerMode;
    setPickerMode('none');
    if (selectedDate) {
      if (currentMode === 'abertura') setDataAbertura(selectedDate);
      if (currentMode === 'fechamento') setDataFechamento(selectedDate);
    }
  };

  const tirarFoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7, saveToPhotos: true }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri || null);
      }
    });
  };

  // ... dentro do seu componente PostagemPhotoScreen

  const enviarPostagem = async () => {
    if (!photoUri) {
      Alert.alert("Atenção", "Tire uma foto antes de postar.");
      return;
    }

    setLoading(true);
    try {
      const nome = await AsyncStorage.getItem('@user_nome');
      const frat = await AsyncStorage.getItem('@user_fraternidade');

      // Preparando as datas conforme os Switches
      const dAb = habAbertura ? dataAbertura.toLocaleDateString('pt-BR') : 'N/A';
      const dFe = habFechamento ? dataFechamento.toLocaleDateString('pt-BR') : 'N/A';

      // 1. Geramos a data e hora atual
      const agora = new Date();
      const dataPost = agora.toLocaleDateString('pt-BR');
      const horaPost = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      let mensagem = `*Diário de Meditação* 📖\n\n`;
      // Montando a legenda (Caption)
      if (habAbertura) {
        // `👤 *Dev:* ${nome || 'Não identificado'}\n` +
        // `🏠 *Fraternidade:* ${frat || 'Geral'}\n` +
        mensagem += `📅 *Abertura:* ${dAb}\n`
      }
      if (habFechamento) {
        mensagem += `🏁 *Fechamento:* ${dFe}`;
      };


      const dadosParaSalvar = {
        id: Date.now().toString(),
        dataExibicao: dataPost,
        horaPostagem: horaPost,
        dataAbertura: dataAbertura.toISOString(),
        dataFechamento: dataFechamento.toISOString(),
        frases: 'Post por Foto',
        proposito: 'Post por Foto',
        comoVivi: 'Post por Foto',
        gratidao: 'Post por Foto',
        textoFormatado: mensagem, // Guardamos a mensagem pronta para o histórico
      };


      const shareOptions = {
        title: 'Enviar Diário',
        message: mensagem,
        url: photoUri, // A URI da foto que você já tem no estado
        type: 'image/jpeg',
        social: Share.Social.WHATSAPP, // Tenta abrir o WhatsApp direto
      };

      // Usamos o Share.open para abrir a gaveta de compartilhamento do Android
      // ou Share.shareSingle se quiser forçar o WhatsApp

      if (!habAbertura && !habFechamento) {
        Alert.alert("Atenção!", "Selecione pelo menos uma data!");
      } else {
        const salvo = await salvarPostagem(dadosParaSalvar);
        await Share.open(shareOptions);

        Alert.alert("Sucesso", "Compartilhamento concluído!");
        setPhotoUri(null); // Limpa a tela após o envio
      }


    } catch (error: any) {
      // O erro 'User did not share' acontece se o usuário voltar sem enviar
      if (error && error.message && error.message.includes('User did not share')) {
        console.log("Usuário cancelou o compartilhamento");
      } else {
        Alert.alert("Erro", "Não foi possível compartilhar a imagem.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const enviarPostagem2 = async () => {
    if (!photoUri) {
      Alert.alert("Atenção", "Tire uma foto antes de postar.");
      return;
    }
    setLoading(true);
    try {
      const nome = await AsyncStorage.getItem('@user_nome');
      const frat = await AsyncStorage.getItem('@user_fraternidade');
      const dadosParaEnvio = {
        usuario: nome || 'Não identificado',
        fraternidade: frat || 'Geral',
        tipo: tipoPostagem,
        dataReferencia: tipoPostagem === 'Abertura'
          ? dataAbertura.toLocaleDateString('pt-BR')
          : dataFechamento.toLocaleDateString('pt-BR'),
        imagem: photoUri
      };
      console.log("Enviando:", dadosParaEnvio);
      Alert.alert("Sucesso", `Foto de ${tipoPostagem} enviada!`);
      setPhotoUri(null);
    } catch (e) {
      Alert.alert("Erro", "Falha ao enviar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Image source={require('../../assets/holy-spirit.png')} style={globalStyles.icone} resizeMode="contain" />
        <Text style={globalStyles.label}>Nova Meditação</Text>
        <TouchableOpacity
                  style={[globalStyles.buttonIcone]}
                  onPress={enviarPostagem}
                ><Image source={require('../../assets/compartilhar.png')} style={globalStyles.icone} resizeMode="contain" />
                </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.body}>
        {/* Container das Switch */}
        <View style={globalStyles.switchRow}>
          <Text style={globalStyles.inputLabel2}>Abertura:</Text>
          <Switch value={habAbertura} onValueChange={setHabAbertura} thumbColor="#075E54"
            trackColor={{ false: '#363b38', true: '#48d148' }} />

        </View>
        {/* Container das Datas */}
        <View style={globalStyles.rowDates}>
          <View style={{ flex: 1 }}>
            {habAbertura && (
              <TouchableOpacity
                style={globalStyles.datePickerButton}
                onPress={() => setPickerMode(tipoPostagem === 'Abertura' ? 'abertura' : 'fechamento')}
              >
                <Text style={globalStyles.dateText}>
                  📅 {tipoPostagem === 'Abertura'
                    ? dataAbertura.toLocaleDateString('pt-BR')
                    : dataFechamento.toLocaleDateString('pt-BR')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={globalStyles.switchRow}>
          <Text style={globalStyles.inputLabel2}>Fechamento:</Text>
          <Switch value={habFechamento} onValueChange={setHabFechamento} thumbColor="#075E54"
            trackColor={{ false: '#363b38', true: '#48d148' }} />

        </View>
        <View style={globalStyles.rowDates}>
          <View style={{ flex: 1, marginLeft: 5 }}>

            {habFechamento && (
              <TouchableOpacity style={globalStyles.datePickerButton} onPress={() => setPickerMode('fechamento')}>
                <Text style={globalStyles.dateText}>📅  {dataFechamento.toLocaleDateString('pt-BR')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={globalStyles.switchRow}>
          <Text style={globalStyles.inputLabel}>Registrar Foto do Diário</Text>
        </View>
        <View style={styles.photoBox}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.preview} />
          ) : (
            <Text style={styles.placeholderText}>Nenhuma foto capturada</Text>
          )}
        </View>

        <TouchableOpacity style={styles.cameraButton} onPress={tirarFoto}>
          <Text style={styles.buttonText}>TIRAR NOVA FOTO</Text>
        </TouchableOpacity>

        {photoUri && (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={enviarPostagem}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "ENVIANDO..." : "POSTAR AGORA"}</Text>
          </TouchableOpacity>
        )}

        {/* RENDERIZAÇÃO DO PICKER (Obrigatório estar aqui fora) */}
        {pickerMode !== 'none' && (
          <DateTimePicker
            value={pickerMode === 'abertura' ? dataAbertura : dataFechamento}
            mode="date"
            display="default"
            onChange={onChangeData}
          />
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}></KeyboardAvoidingView>
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
  rowDates: { flexDirection: 'row', marginTop: 10 },
  datePickerButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
    //elevation: 2
  },
  dateText: { color: '#075E54', fontWeight: 'bold', fontSize: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  inputLabel2: { color: '#2f8ec5', fontSize: 20, fontWeight: 'bold' },

  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#274253', marginBottom: 20, textAlign: 'center' },
  selectorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  typeButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#274253', alignItems: 'center', marginHorizontal: 5, borderRadius: 8 },
  activeButton: { backgroundColor: '#274253' },
  typeText: { color: '#274253', fontWeight: 'bold' },
  activeText: { color: '#fff' },
  photoBox: { width: '100%', height: 300, backgroundColor: '#ddd', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden' },
  preview: { width: '100%', height: '100%' },
  placeholderText: { color: '#666' },
  cameraButton: { backgroundColor: '#25D366', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  sendButton: { backgroundColor: '#075E54', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default PostagemPhotoScreen;