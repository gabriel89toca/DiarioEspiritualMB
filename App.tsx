import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Importando os ícones
import { Home, BookOpen, History, Settings, Camera } from 'lucide-react-native';
import { Image, View, Text, StyleSheet } from 'react-native';
import { globalStyles } from './src/styles/globalStyles';

import HomeScreen from './src/screens/HomeScreen';
import PostagemScreen from './src/screens/PostagemScreen';
import PostagemPhotoScreen from './src/screens/PostagemPhotoScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import ConfigScreen from './src/screens/ConfigScreen';

const Tab = createBottomTabNavigator();

// Função que cria o componente do Título com Logo
const CustomHeaderTitle = () => (
  <View style={globalStyles.headerContainer}>
    <Image
      source={require('./assets/logoMB.jpg')} // Use o caminho do seu logo
      style={globalStyles.headerLogo}
    />
    <Text style={globalStyles.headerText}>Diário Espiritual</Text>
    
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        // Se estiver usando Stack.Navigator envolta das Tabs:
        {/* <Stack.Screen name="PostagemPhoto" component={PostagemPhotoScreen} options={{ title: 'Foto do Diário' }} /> */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerTitle: () => <CustomHeaderTitle />, // Aplica o logo em todas as telas
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#274253',
              height: 100, // Ajuste a altura se necessário
            },
            headerShown: true,
            //headerStyle: { backgroundColor: '#fff' },
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
              } else if (route.name === 'Ajustes') {
                return <Settings color={color} size={size} />; // Novo ícone de engrenagem
              } else if (route.name === 'PostagemPhoto') {
                return <Camera color={color} size={size} />; // Novo ícone de engrenagem
              }
            },
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} options={{ title: 'Menu' }} />
          <Tab.Screen name="Postagem" component={PostagemScreen} options={{ title: 'Novo Diário' }} />
          <Tab.Screen name="PostagemPhoto" component={PostagemPhotoScreen} options={{
            title: 'Diário Foto'//, tabBarButton: () => null,  Isso esconde o botão da aba inferior
          }} />
          <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
          <Tab.Screen name="Ajustes" component={ConfigScreen} options={{ title: 'Configurações' }} />

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({



});