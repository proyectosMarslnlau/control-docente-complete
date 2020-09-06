import React, {useReducer} from 'react';
//------------------
//
import formReducer from './formReducer';
import formContext from './formContext';
//-----------------------------------------------------
const FormState = (props) => {
  //Initial
  const initialState = {
    prueba: 'LENNY LAURA VALENCIA ARUQUIPA',
  };
  //-----------------------
  const [state, dispatch] = useReducer(formReducer, initialState);
  //-----------------------
  const funcionPrueba = (valor) => {
    dispatch({
      type: 'PRUEBA',
      payload: valor,
    });
  };
  return (
    <formContext.Provider
      value={{
        prueba: state.prueba,
        funcionPrueba,
      }}>
      {props.children}
    </formContext.Provider>
  );
};

export default FormState;
