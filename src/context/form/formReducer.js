//Importamos los REDUCER
import {
  PETICION_MATERIAS,
  PETICION_PLATAFORMAS,
  ACTUALIZAR_STORE,
  RESET_STORE,
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

    case RESET_STORE:
      return {
        ...state,
        reset: action.payload,
      };
    default:
      return state;
  }
};
