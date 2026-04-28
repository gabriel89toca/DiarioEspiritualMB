import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Importando os ícones
import { Home, BookOpen, History } from 'lucide-react-native';

import HomeScreen from './src/screens/HomeScreen';
import PostagemScreen from './src/screens/PostagemScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown: true,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#075E54',
            tabBarActiveTintColor: '#25D366',
            tabBarInactiveTintColor: 'gray',
            // Essa função define qual ícone aparece em cada aba
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Início') {
                return <Home color={color} size={size} />;
              } else if (route.name === 'Postagem') {
                return <BookOpen color={color} size={size} />;
              } else if (route.name === 'Historico') {
                return <History color={color} size={size} />;
              }
            },
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} options={{ title: 'Menu' }} />
          <Tab.Screen name="Postagem" component={PostagemScreen} options={{ title: 'Novo Diário' }} />
          <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}