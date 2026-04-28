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

// Crie esta função para não precisar manipular AsyncStorage direto na tela
export const removerPostagem = async (id: string) => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_DIARIO);
    if (dados) {
      const lista = JSON.parse(dados);
      const novaLista = lista.filter((item: any) => item.id !== id);
      await AsyncStorage.setItem(CHAVE_DIARIO, JSON.stringify(novaLista));
      return novaLista; // Retorna a lista atualizada para o estado da tela
    }
    return [];
  } catch (e) {
    console.error("Erro ao remover:", e);
    return null;
  }
};