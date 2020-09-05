import React, {useContext} from 'react';

import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
//------------------
import loginContext from '../context/login/loginContext';
//-----------------------------------------------------------------
import AsyncStorage from '@react-native-community/async-storage';

//----------------------------------------------------------------
const Form = ({navigation}) => {
  const {funcionCerrarSesion} = useContext(loginContext);
  //--------------------------------------------------------------
  const removeValue = async () => {
    try {
      //Borro los datos de STORE
      await AsyncStorage.removeItem('@storage_date_user');
      //Le doy los valores predeterminados para limpiar el STATE
      const valor = {
        nombre: '',
        tipo: '',
        estado: 'locked',
      };
      //Invoco la funcion de cerrar sesion del CONTEXT
      funcionCerrarSesion(valor);
      //Realizao la redireccion al LOGIN nuevamente
      navigation.navigate('login');
      console.log('Done.');
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  //------------------------------------------------
  return (
    <View>
      <Text>DESDE EL Form</Text>
      <TouchableHighlight onPress={removeValue}>
        <Text>VOLVER</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Form;
