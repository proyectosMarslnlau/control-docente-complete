import React, {useReducer} from 'react';
//-------------------------
import loginReducer from './loginReducer';
import loginContext from './loginContext';
//-------------------------------------------
import {LOGIN_USUARIO, CERRAR_USUARIO} from '../../type/index';
//-----------------------------
const LoginState = (props) => {
  //Datos iniciales
  const initialState = {
    datosusuario: {
      nombre: '',
      tipo: '',
    },
    estado: 'locked',
  };
  //Variables del USE REDUCER
  const [state, dispatch] = useReducer(loginReducer, initialState);
  //-------------------------------------
  //const funcionPeticion
  const funcionPeticionDatos = (valor) => {
    const {user, pass} = valor;
    //--------Simulacion de cambios de estado ------
    if (user === 'uno' && pass === '123') {
      const datos = {
        nombre: 'MARCELO POMA CALLE',
        tipo: 'docente',
        estado: 'unlocked',
      };
      //
      dispatch({
        type: LOGIN_USUARIO,
        payload: datos,
      });
    }
  };
  //
  const funcionCerrarSesion = (valor) => {
    dispatch({
      type: CERRAR_USUARIO,
      payload: valor,
    });
  };
  return (
    <loginContext.Provider
      value={{
        estado: state.estado,
        funcionPeticionDatos,
        funcionCerrarSesion,
      }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
