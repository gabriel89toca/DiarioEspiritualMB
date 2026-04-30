import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse, CameraOptions } from 'react-native-image-picker';
/* import { Camera, useCameraDevices } from 'react-native-vision-camera'; */




const PostagemPhotoScreen = () => {
  // Informamos ao TypeScript que este estado pode ser uma string OU null
const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  // 1. Pegamos todos os dispositivos disponíveis
//const devices = useCameraDevices();

// 2. Filtramos para encontrar especificamente a câmera traseira ('back')
//const device = devices.find((d) => d.position === 'back');

  // --- ABORDAGEM 1: Image Picker (Simples) ---
const usarImagePicker = () => {
  const options: CameraOptions = { // <--- Adicione o tipo aqui
    mediaType: 'photo',
    saveToPhotos: true,
    quality: 0.8,
  };

  launchCamera(options, (response: ImagePickerResponse) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Erro', response.errorMessage || 'Erro desconhecido');
    } else if (response.assets && response.assets.length > 0) {
      setPhotoUri(response.assets[0].uri || null);
    }
  });
 
};

  // --- ABORDAGEM 2: Vision Camera (Profissional) ---
  // Nota: Esta abordagem exigiria um componente <Camera /> em tela cheia.
  // Para este teste, vamos focar na permissão.
/* const pedirPermissaoVision = async () => {
  try {
    // Chamada direta do método estático
    const status: CameraPermissionStatus = await Camera.requestCameraPermission();
    
    if (status === 'granted') {
      Alert.alert("Sucesso", "Permissão concedida para Vision Camera!");
    } else {
      Alert.alert("Aviso", "A permissão não foi concedida.");
    }
  } catch (error) {
    Alert.alert("Erro", "Não foi possível solicitar a permissão.");
    console.error(error);
  }
}; */

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Foto do Diário</Text>

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.buttonBlue} onPress={usarImagePicker}>
        <Text style={styles.buttonText}>USAR IMAGE PICKER (Câmera do Sistema)</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.buttonGreen} onPress={pedirPermissaoVision}>
        <Text style={styles.buttonText}>TESTAR PERMISSÃO VISION CAMERA</Text>
      </TouchableOpacity> */}
      
      <Text style={styles.info}>
        * Image Picker: Abre a câmera que você já usa no celular.{"\n"}
        * Vision Camera: Permite criar uma câmera customizada dentro do app.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#274253', marginBottom: 20, textAlign: 'center' },
  preview: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20, backgroundColor: '#ddd' },
  buttonBlue: { backgroundColor: '#274253', padding: 15, borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  buttonGreen: { backgroundColor: '#25D366', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  info: { marginTop: 20, color: '#666', fontSize: 12, fontStyle: 'italic' }
});

export default PostagemPhotoScreen;