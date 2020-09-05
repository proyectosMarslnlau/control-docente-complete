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
  //Efecto de Carta
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  //Efecto de FAN
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen
          name="form"
          component={Form}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen name="about" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Navigation;
