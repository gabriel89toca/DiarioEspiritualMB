import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importação das telas
import HomeScreen from './src/screens/HomeScreen';
import PostagemScreen from './src/screens/PostagemScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{
            headerShown: true, // Mantém o título lá em cima
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#075E54',
            headerTitleAlign: 'center',
            tabBarActiveTintColor: '#25D366', // Cor do ícone quando selecionado
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen 
            name="Início" 
            component={HomeScreen} 
            options={{ title: 'Menu' }}
          />
          <Tab.Screen 
            name="Postagem" 
            component={PostagemScreen} 
            options={{ title: 'Novo Diário' }}
          />
          <Tab.Screen 
            name="Historico" 
            component={HistoricoScreen} 
            options={{ title: 'Histórico' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}