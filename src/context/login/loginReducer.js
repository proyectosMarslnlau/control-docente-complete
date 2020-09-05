//Importamos los TYPES
import {LOGIN_USUARIO, CERRAR_USUARIO, COPIAR_USUARIO} from '../../type/index';
//------------------------------------------
import {storeData} from '../../resource/js/StoreLogin';
//-----------------------

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USUARIO:
      storeData(action.payload);
      return {
        ...state,
        datosusuario: {
          nombre: action.payload.nombre,
          tipo: action.payload.tipo,
        },
        estado: action.payload.estado,
      };
    case CERRAR_USUARIO:
      return {
        ...state,
        datosusuario: {
          nombre: action.payload.nombre,
          tipo: action.payload.tipo,
        },
        estado: action.payload.estado,
      };
    case COPIAR_USUARIO:
      return {
        ...state,
        datosusuario: {
          nombre: action.payload.nombre,
          tipo: action.payload.tipo,
        },
        estado: action.payload.estado,
      };
    default:
      return state;
  }
};
