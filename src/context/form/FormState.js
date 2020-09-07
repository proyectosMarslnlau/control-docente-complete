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
} from '../../type/index';

//-----------------------------
import axios from 'axios';
//-----------------------------------------------------
const FormState = (props) => {
  //Initial
  const initialState = {
    materiasactuales: [],
    plataformas: [],
    datos: {
      materia: 'Seleccione una Materiaaaa',
      titulo: 'LENNYTA LAURA VALENCIA',
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
  };
  //-----------------------
  const [state, dispatch] = useReducer(formReducer, initialState);
  //-----------------------
  //FUNCION de peticion de materias
  const funcionPeticionMateriasDocente = async (valor) => {
    try {
      const urlMateriasDocente = `http://localhost:5000/docente?usuario=${valor}`;
      const peticion = await axios.get(urlMateriasDocente);
      const respuestaLogin = peticion.data;

      if (respuestaLogin[0].materias.length !== 0) {
        dispatch({
          type: PETICION_MATERIAS,
          payload: respuestaLogin[0].materias,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionPlataformas = async () => {
    try {
      const urlMateriasPlataformas = `http://localhost:5000/plataformas`;
      const peticion = await axios.get(urlMateriasPlataformas);
      const respuestaLogin = peticion.data;
      if (respuestaLogin.length !== 0) {
        dispatch({
          type: PETICION_PLATAFORMAS,
          payload: respuestaLogin,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionFecha = async () => {
    try {
      const urlFecha = `http://localhost:5000/date`;
      const peticion = await axios.get(urlFecha);
      const respuestaFecha = peticion.data;

      if (Object.entries(respuestaFecha).length !== 0) {
        return respuestaFecha.fecha;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionPeticionHoraInicial = async () => {
    try {
      const urlTimeStart = `http://localhost:5000/timeStart`;
      const peticion = await axios.get(urlTimeStart);
      const respuestaTime = peticion.data;

      if (Object.entries(respuestaTime).length !== 0) {
        return respuestaTime.time;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionPeticionHoraFinal = async () => {
    try {
      const urlTimeEnd = `http://localhost:5000/timeEnd`;
      const peticion = await axios.get(urlTimeEnd);
      const respuestaTime = peticion.data;
      console.log(respuestaTime);
      if (Object.entries(respuestaTime).length !== 0) {
        return respuestaTime.time;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const funcionEnviarDatos = async (valor) => {
    try {
      const urlEnvioDate = `http://localhost:5000/datos`;
      const envio = await axios.post(urlEnvioDate, {
        store: valor,
      });
      const respuestaEnvio = envio.data;
      console.log(respuestaEnvio);
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
  return (
    <formContext.Provider
      value={{
        materiasactuales: state.materiasactuales,
        plataformas: state.plataformas,
        datos: state.datos,
        funcionPeticionMateriasDocente,
        funcionPeticionPlataformas,
        funcionPeticionFecha,
        funcionPeticionHoraInicial,
        funcionPeticionHoraFinal,
        funcionEnviarDatos,
        funcionActualizarStore,
      }}>
      {props.children}
    </formContext.Provider>
  );
};

export default FormState;
