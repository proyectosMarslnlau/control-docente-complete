import React, {useReducer} from 'react';
//-Importamos los componentes
import alertContext from './alertContext';
import alertReducer from './alertReducer';
//Importamos los types
import {
  CAMBIAR_ESTADO_ERROR,
  CAMBIAR_ESTADO_LOADING,
  CAMBIAR_ESTADO_CONFIRM,
  CAMBIAR_ESTADO_EXITOSO,
} from '../../type/index';
//--------------------------------------------------------
const AlertState = (props) => {
  const initialState = {
    alerterror: {
      estado: false,
      mensaje: null,
    },
    alertloading: false,
    alertconfirm: {
      estado: false,
      valor: null,
    },
    alertsuccess: {
      estado: false,
      mensaje: null,
    },
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //FUNCIONES DE DISPATCH
  const funcionAlertError = (valor) => {
    dispatch({
      type: CAMBIAR_ESTADO_ERROR,
      payload: valor,
    });
  };
  //
  const funcionAlertLoading = (valor) => {
    dispatch({
      type: CAMBIAR_ESTADO_LOADING,
      payload: valor,
    });
  };
  //
  const funcionAlertConfirm = (valor) => {
    dispatch({
      type: CAMBIAR_ESTADO_CONFIRM,
      payload: valor,
    });
  };
  //
  const funcionAlertSuccess = (valor) => {
    dispatch({
      type: CAMBIAR_ESTADO_EXITOSO,
      payload: valor,
    });
  };
  return (
    <alertContext.Provider
      value={{
        alerterror: state.alerterror,
        alertloading: state.alertloading,
        alertconfirm: state.alertconfirm,
        alertsuccess: state.alertsuccess,
        funcionAlertError,
        funcionAlertLoading,
        funcionAlertConfirm,
        funcionAlertSuccess,
      }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
