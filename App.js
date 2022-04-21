import React from 'react'

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//importando las pantallas o componentes
import Home from './screens/Home'
import Login from './screens/Login'
import Comidas from './screens/Comidas'
import Ventas from './screens/Ventas'
import Vender from './screens/Vender'


export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "LOGIN",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#E89A5F" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "COMIDASAPP",
            headerStyle: { backgroundColor: "#E89A5F" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Comidas"
          component={Comidas}
          options={{
            title: "COMIDASAPP",
            headerStyle: { backgroundColor: "#E89A5F" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Ventas"
          component={Ventas}
          options={{
            title: "COMIDASAPP",
            headerStyle: { backgroundColor: "#E89A5F" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Vender"
          component={Vender}
          options={{
            title: "COMIDASAPP",
            headerStyle: { backgroundColor: "#E89A5F" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
  

// });
