import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Libreria de ALERT
import AwesomeAlert from 'react-native-awesome-alerts';
//-----------------------------------------------
import alertContext from '../context/alert/alertContext';
import formContext from '../context/form/formContext';
//
import {removeDataTime} from '../resource/js/StoreTime';
//
const AlertConfirm = ({guardarFecha, guardarHoraInicial, guardarHoraFinal}) => {
  //Cargar estado de aparicion
  const {
    datos,
    reset,
    funcionPeticionFecha,
    funcionPeticionHoraInicial,
    funcionPeticionHoraFinal,
    funcionEnviarDatos,
    funcionReset,
  } = useContext(formContext);
  const {alertconfirm, funcionAlertConfirm} = useContext(alertContext);
  //-----------------------------------------------
  const onPressCancel = () => {
    funcionAlertConfirm({
      estado: false,
      valor: null,
    });
  };
  const onPressConfirm = () => {
    if (alertconfirm.valor === 1) {
      funcionPeticionFecha().then((date) => {
        guardarFecha({
          estado: true,
          fecha: date,
        });
        funcionAlertConfirm({
          estado: false,
          valor: null,
        });
      });
    } else if (alertconfirm.valor === 2) {
      funcionPeticionHoraInicial().then((time) => {
        guardarHoraInicial({
          estado: true,
          horaini: time,
        });
        funcionAlertConfirm({
          estado: false,
          valor: null,
        });
      });
    } else if (alertconfirm.valor === 3) {
      funcionPeticionHoraFinal().then((time) => {
        guardarHoraFinal({
          estado: true,
          horafin: time,
        });
        funcionAlertConfirm({
          estado: false,
          valor: null,
        });
      });
    } else if (alertconfirm.valor === 10) {
      console.log('apreto 10');
      funcionEnviarDatos(datos).then((resultado) => {
        if (resultado === 'correcto') {
          funcionReset(true);
          removeDataTime();
        }
        funcionAlertConfirm({
          estado: false,
          valor: null,
        });
      });
    } else {
      funcionAlertConfirm({
        estado: false,
        valor: null,
      });
    }
  };
  return (
    <View>
      <AwesomeAlert
        show={alertconfirm.estado}
        showProgress={false}
        title="Confirmar"
        message="Desea Obtener Data de tiempo"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        cancelButtonColor="#882E2A"
        confirmText="Yes, obtener"
        confirmButtonColor="#3E5D24"
        onCancelPressed={onPressCancel}
        onConfirmPressed={onPressConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default AlertConfirm;
