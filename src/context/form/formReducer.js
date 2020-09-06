//Importamos los REDUCER

//------------------
export default (state, action) => {
  switch (action.type) {
    case 'PRUEBA':
      return {
        ...state,
        prueba: action.payload,
      };
    default:
      return state;
  }
};
