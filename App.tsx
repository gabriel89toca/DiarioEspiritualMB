import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das suas telas
import HomeScreen from './src/screens/HomeScreen';
import PostagemScreen from './src/screens/PostagemScreen';

// Criação do Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          // Estilo padrão para o cabeçalho de todas as telas
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#075E54',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tela Principal com o Menu */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Diário Espiritual' }} 
        />

        {/* Tela de Formulário para Nova Meditação */}
        <Stack.Screen 
          name="Postagem" 
          component={PostagemScreen} 
          options={{ title: 'Nova Meditação' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}