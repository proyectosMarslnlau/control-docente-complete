import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Libreria de ALERT
import AwesomeAlert from 'react-native-awesome-alerts';
//-----------------------------------------------
import alertContext from '../context/alert/alertContext';
//
const AlertLoading = () => {
  //Cargar estado de aparicion
  const {alertloading} = useContext(alertContext);
  return (
    <View>
      <AwesomeAlert
        show={alertloading}
        showProgress={true}
        closeOnTouchOutside={true}
        progressColor={'#000'}
        progressSize={40}
        title=" Cargando Información..."
        message=" Espere un momento "
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default AlertLoading;
