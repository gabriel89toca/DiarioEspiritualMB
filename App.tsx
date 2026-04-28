import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importe suas telas (vamos criá-las em arquivos separados)
import HomeScreen from './src/screens/HomeScreen';
import PostagemScreen from './src/screens/PostagemScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Esconde o header padrão para usar o seu customizado
          tabBarActiveTintColor: '#25D366', // Cor do ícone ativo (Verde WhatsApp)
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Nova" component={HomeScreen} />
        <Tab.Screen name="Histórico" component={HistoricoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Nova" component={PostagemScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
    </Tab.Navigator>
  );
}

// Definição das rotas (O contrato das telas)
export type RootStackParamList = {
  Home: undefined;
  Postagem: { tipo: string }; // Tela de postagem espera saber se é diário ou fechamento
};

const Stack = createStackNavigator<RootStackParamList>();

// Componente customizado para o Header
const LogoTitle = ({ title }: { title: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#075E54' }}>
      {title}
    </Text>
    <Image
      style={{ width: 130, height: 40, marginLeft: 25, borderRadius: 5 }}
      source={require('./assets/logoMB.jpg')}
      resizeMode="contain"
    />
  </View>
);
const LogoTitleHome = ({ title }: { title: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      style={{ width: 30, height: 30, marginRight: 20, marginVertical: 5, borderRadius: 5 }}
      source={require('./assets/home-black.png')}
      resizeMode="contain"
    />
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#075E54' }}>
      {title}
    </Text>
    <Image
      style={{ width: 130, height: 40, marginLeft: 25, borderRadius: 5 }}
      source={require('./assets/logoMB.jpg')}
      resizeMode="contain"
    />
  </View>
);


/* const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#075E54',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        /* Aqui você declara suas telas como se fossem rotas no Angular */
        /* <Stack.Screen 
         name="Home" 
          component={HomeScreen} 
          options={{ 
            headerTitle: () => <LogoTitleHome title="Diário Espiritual"></LogoTitleHome>
           }} // Esconde o topo na home se quiser usar seu header customizado
        />
        <Stack.Screen 
          name="Postagem" 
          component={PostagemScreen} 
           options={{ 
            headerTitle: () => <LogoTitle title="Diário Espiritual"></LogoTitle>
           }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; */

//export default App;