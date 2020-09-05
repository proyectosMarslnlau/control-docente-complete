import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Importamos la libreria de ALERT
import AwesomeAlert from 'react-native-awesome-alerts';
//Importamos los Context
import alertContext from '../context/alert/alertContext';
//-----------------------------------------------
const AlertError = () => {
  //Invocamos las variables del INITIAL STATE
  const {alerterror, funcionAlertError} = useContext(alertContext);
  const {estado, mensaje} = alerterror;
  // funcion de cerrado
  const onPressAlertErrorClose = () => {
    let valorError = {
      estado: false,
      mensaje: null,
    };
    funcionAlertError(valorError);
  };
  return (
    <View>
      <AwesomeAlert
        show={estado}
        title="Error"
        message={mensaje}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="ACEPTAR"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={onPressAlertErrorClose}
      />
    </View>
  );
};

export default AlertError;
