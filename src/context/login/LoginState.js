import React, {useReducer} from 'react';
//-------------------------
import loginReducer from './loginReducer';
import loginContext from './loginContext';
//-------------------------------------------
import {PRUEBA} from '../../type/index';
//-----------------------------
const LofinState = (props) => {
  const initialState = {
    prueba: 'LENNY LAURA VALENCIA',
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);
  //-------------------------------------
  const functionPrueba = (valor) => {
    dispatch({
      type: PRUEBA,
      payload: valor,
    });
  };
  return (
    <loginContext.Provider
      value={{
        prueba: state.prueba,
        functionPrueba,
      }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LofinState;
