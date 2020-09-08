//Importamos los TYPES
import {
  CAMBIAR_ESTADO_ERROR,
  CAMBIAR_ESTADO_LOADING,
  CAMBIAR_ESTADO_CONFIRM,
  CAMBIAR_ESTADO_EXITOSO,
} from '../../type/index';
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
    case CAMBIAR_ESTADO_CONFIRM:
      return {
        ...state,
        alertconfirm: action.payload,
      };
    case CAMBIAR_ESTADO_EXITOSO:
      return {
        ...state,
        alertsuccess: action.payload,
      };
    default:
      return state;
  }
};
