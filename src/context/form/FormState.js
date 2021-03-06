import React, {useReducer} from 'react';
//------------------
//
import formReducer from './formReducer';
import formContext from './formContext';
//---------------------------
import {
  PETICION_MATERIAS,
  PETICION_PLATAFORMAS,
  PETICION_FECHA,
  ACTUALIZAR_STORE,
  RESET_STORE,
  CAMBIAR_ESTADO_EXITOSO,
} from '../../type/index';
import {
  url_peticion_datos_usuario,
  url_peticion_datos_plataformas,
  url_peticion_fecha,
  url_peticion_hora_final,
  url_envio_datos,
  url_peticion_hora_inicial,
} from '../../resource/js/constants';
//-----------------------------
import axios from 'axios';
//-----------------------------------------------------
const FormState = (props) => {
  //Initial
  const initialState = {
    materiasactuales: [],
    plataformas: [],
    datos: {},
    datosiniciales: {
      materia: 'Seleccione una Materia',
      titulo: '',
      cantidad: '',
      fecha: {
        estado: false,
        fecha: '',
      },
      horaini: {
        estado: false,
        horaini: '',
      },
      plataforma: 'Seleccione una Plataforma',
      avance: 10,
      respaldo: false,
      horafinal: {
        estado: false,
        horafin: '',
      },
      foto: {
        resourcePath: {},
      },
      observacion: '',
    },
    reset: false,
  };
  //-----------------------
  const [state, dispatch] = useReducer(formReducer, initialState);
  //-----------------------
  //FUNCION de peticion de materias
  const funcionPeticionMateriasDocente = async (valor) => {
    try {
      const urlMateriasDocente = url_peticion_datos_usuario;
      const peticion = await axios.post(urlMateriasDocente, {
        carnet: valor,
      });
      const respuestaLogin = peticion.data;

      if (respuestaLogin.request.length !== 0) {
        dispatch({
          type: PETICION_MATERIAS,
          payload: respuestaLogin.request,
        });
      }
    } catch (error) {
      console.log('ERROR DE LENNY');
      console.log(error);
    }
  };
  //
  const funcionPeticionPlataformas = async () => {
    try {
      const urlMateriasPlataformas = url_peticion_datos_plataformas;
      const peticion = await axios.post(urlMateriasPlataformas);
      const respuestaLogin = peticion.data;

      if (respuestaLogin.request.length !== 0) {
        dispatch({
          type: PETICION_PLATAFORMAS,
          payload: respuestaLogin.request,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionFecha = async () => {
    try {
      const urlFecha = url_peticion_fecha;
      const peticion = await axios.post(urlFecha);
      const respuestaFecha = peticion.data;
      if (Object.entries(respuestaFecha).length !== 0) {
        return respuestaFecha.response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionPeticionHoraInicial = async () => {
    try {
      const urlTimeStart = url_peticion_hora_inicial;
      const peticion = await axios.post(urlTimeStart);
      const respuestaTime = peticion.data;
      console.log(respuestaTime);
      if (Object.entries(respuestaTime).length !== 0) {
        return respuestaTime.response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionPeticionHoraFinal = async () => {
    try {
      const urlTimeEnd = url_peticion_hora_final;
      const peticion = await axios.post(urlTimeEnd);
      const respuestaTime = peticion.data;

      if (Object.entries(respuestaTime).length !== 0) {
        return respuestaTime.response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionEnviarDatos = async (valor) => {
    try {
      const urlEnvioDate = url_envio_datos;
      const envio = await axios.post(urlEnvioDate, {
        store: valor,
      });
      const respuestaEnvio = envio.data;
      return 'correcto';
    } catch (error) {
      console.log(error);
    }
  };
  const funcionActualizarStore = (valor) => {
    dispatch({
      type: ACTUALIZAR_STORE,
      payload: valor,
    });
  };
  //
  const funcionReset = (valor) => {
    dispatch({
      type: RESET_STORE,
      payload: valor,
    });
  };
  return (
    <formContext.Provider
      value={{
        materiasactuales: state.materiasactuales,
        plataformas: state.plataformas,
        datos: state.datos,
        datosiniciales: state.datosiniciales,
        reset: state.reset,
        funcionPeticionMateriasDocente,
        funcionPeticionPlataformas,
        funcionPeticionFecha,
        funcionPeticionHoraInicial,
        funcionPeticionHoraFinal,
        funcionEnviarDatos,
        funcionActualizarStore,
        funcionReset,
      }}>
      {props.children}
    </formContext.Provider>
  );
};

export default FormState;
