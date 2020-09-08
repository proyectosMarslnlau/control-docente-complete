import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Importamos la libreria de ALERT
import AwesomeAlert from 'react-native-awesome-alerts';
//Importamos los Context
import alertContext from '../context/alert/alertContext';
//-----------------------------------------------
const AlertSuccess = () => {
  //Invocamos las variables del INITIAL STATE
  const {alertsuccess, funcionAlertSuccess} = useContext(alertContext);
  const {estado, mensaje} = alertsuccess;
  // funcion de cerrado
  const onPressAlertSuccessClose = () => {
    let valorSuccess = {
      estado: false,
      mensaje: null,
    };
    funcionAlertSuccess(valorSuccess);
  };
  return (
    <View>
      <AwesomeAlert
        show={estado}
        title="Correcto"
        message={mensaje}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="ACEPTAR"
        confirmButtonColor="#15E345"
        onConfirmPressed={onPressAlertSuccessClose}
      />
    </View>
  );
};

export default AlertSuccess;
