import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Importamos las navegaciones
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//-----------------------------------------------------------------------
import Splash from '../screen/Splash';
import Form from '../screen/Form';
import Login from '../screen/Login';
import About from '../screen/About';

//-------------------------------------------------------------------------
//Creacion de STACK para la navegacion
const Stack = createStackNavigator();
//------------------------------------------------------------------------------
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="form" component={Form} />
        <Stack.Screen name="about" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Navigation;
