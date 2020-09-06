import React, {useReducer} from 'react';
//-------------------------
import loginReducer from './loginReducer';
import loginContext from './loginContext';
//-------------------------------------------
import {LOGIN_USUARIO, CERRAR_USUARIO, COPIAR_USUARIO} from '../../type/index';
//-----------------------------
import axios from 'axios';
//------------------------------------
const LoginState = (props) => {
  //Datos iniciales
  const initialState = {
    datosusuario: {
      nombre: '',
      tipo: '',
      identificador: '',
    },
    estado: 'locked',
  };
  //Variables del USE REDUCER
  const [state, dispatch] = useReducer(loginReducer, initialState);
  //-------------------------------------
  //const funcionPeticion
  const funcionPeticionDatos = async (valor) => {
    const {user, pass} = valor;
    //Cliente AXIOS
    //--------Simulacion de cambios de estado ------
    try {
      const urlLogin = `http://localhost:5000/dates?usuario=${user}&password=${pass}`;
      const peticion = await axios.get(urlLogin);
      const respuestaLogin = peticion.data;
      console.log(respuestaLogin);
      if (respuestaLogin.length !== 0) {
        //Anade el valor de unlocked
        respuestaLogin[0].estado = 'unlocked';
        dispatch({
          type: LOGIN_USUARIO,
          payload: respuestaLogin[0],
        });
        return 'correcto';
      } else {
        return 'datos_erroneos';
      }
    } catch (error) {
      console.log(error);
      return 'service_no_disponible';
    }
  };
  //Copiar al state desde el STORE
  const funcionCopiarUsuario = (valor) => {
    dispatch({
      type: COPIAR_USUARIO,
      payload: valor,
    });
  };
  //Cerrar sesion de usuario x
  const funcionCerrarSesion = (valor) => {
    dispatch({
      type: CERRAR_USUARIO,
      payload: valor,
    });
  };
  return (
    <loginContext.Provider
      value={{
        datosusuario: state.datosusuario,
        estado: state.estado,
        funcionPeticionDatos,
        funcionCerrarSesion,
        funcionCopiarUsuario,
      }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
