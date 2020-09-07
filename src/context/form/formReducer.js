//Importamos los REDUCER
import {
  PETICION_MATERIAS,
  PETICION_PLATAFORMAS,
  PETICION_FECHA,
  ACTUALIZAR_STORE,
} from '../../type/index';
//
import {storeDataTime} from '../../resource/js/StoreTime';
//------------------
export default (state, action) => {
  switch (action.type) {
    case PETICION_MATERIAS:
      return {
        ...state,
        materiasactuales: action.payload,
      };
    case PETICION_PLATAFORMAS:
      return {
        ...state,
        plataformas: action.payload,
      };
    case ACTUALIZAR_STORE:
      return {
        ...state,
        datos: action.payload,
      };
    default:
      return state;
  }
};
