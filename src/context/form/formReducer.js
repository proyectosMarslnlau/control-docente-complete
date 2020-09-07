//Importamos los REDUCER
import {
  PETICION_MATERIAS,
  PETICION_PLATAFORMAS,
  PETICION_FECHA,
} from '../../type/index';
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
    default:
      return state;
  }
};
