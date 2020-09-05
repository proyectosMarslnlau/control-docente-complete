//Importamos los TYPES
import {CAMBIAR_ESTADO_ERROR, CAMBIAR_ESTADO_LOADING} from '../../type/index';
//
export default (state, action) => {
  switch (action.type) {
    case CAMBIAR_ESTADO_ERROR:
      return {
        ...state,
        alerterror: action.payload,
      };
    case CAMBIAR_ESTADO_LOADING:
      return {
        ...state,
        alertloading: action.payload,
      };
    default:
      return state;
  }
};
