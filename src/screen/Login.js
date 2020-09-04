import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
//-----------------------------------------------------
import loginContext from '../context/login/loginContext';
import {TouchableHighlight} from 'react-native-gesture-handler';
const Login = () => {
  const {prueba, functionPrueba} = useContext(loginContext);
  const onPressPrueba = () => {
    functionPrueba('MARCELO POMA CALLE ');
  };
  return (
    <View>
      <Text>DESDE EL LOGIN {prueba}</Text>
      <TouchableHighlight onPress={onPressPrueba}>
        <Text>CAMBIAR ESTADO</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Login;
