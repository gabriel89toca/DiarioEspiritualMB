import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DIARIO = '@diario_posts';

export const salvarPostagem = async (novaPostagem: any) => {
  try {
    // 1. Busca o que já existe
    const postagensAtuais = await buscarPostagens();
    
    // 2. Adiciona a nova no topo da lista
    const novasPostagens = [novaPostagem, ...postagensAtuais];
    
    // 3. Salva de volta como String (JSON)
    await AsyncStorage.setItem(CHAVE_DIARIO, JSON.stringify(novasPostagens));
    return true;
  } catch (e) {
    console.error("Erro ao salvar", e);
    return false;
  }
};

export const buscarPostagens = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CHAVE_DIARIO);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};