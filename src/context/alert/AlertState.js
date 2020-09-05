import React, {useReducer} from 'react';
//-Importamos los componentes
import alertContext from './alertContext';
import alertReducer from './alertReducer';
//Importamos los types
import {CAMBIAR_ESTADO_ERROR, CAMBIAR_ESTADO_LOADING} from '../../type/index';
//--------------------------------------------------------
const AlertState = (props) => {
  const initialState = {
    alerterror: {
      estado: false,
      mensaje: null,
    },
    alertloading: false,
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
  return (
    <alertContext.Provider
      value={{
        alerterror: state.alerterror,
        alertloading: state.alertloading,
        funcionAlertError,
        funcionAlertLoading,
      }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
