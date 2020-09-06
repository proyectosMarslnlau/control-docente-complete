import React, {Fragment, useState} from 'react';

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
//-------------------- MEDIDAS -------------------------
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//-------------------- CONTEXT -------------------------
import formContext from '../context/form/formContext';
//---------------------------------------------------------
const Select = () => {
  //------ State LOCALES -----
  const [state, guardarState] = useState({
    language: 'Seleccione una opcion',
  });
  const valores = [
    {item: 'uno', id: '1'},
    {item: 'dos', id: '2'},
    {item: 'tres', id: '3'},
    {item: 'cuatro', id: '4'},
  ];
  return (
    <Picker
      selectedValue={state.language}
      style={styles.selector}
      onValueChange={(itemValue, itemIndex) =>
        guardarState({language: itemValue})
      }>
      <Picker.Item
        label="Seleccion una Opcion"
        value="default"
        itemStyle={styles.options}
      />
      {valores.map((item) => (
        <Picker.Item label={item.item} value={item.id} key={item.id} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  container: {},
  selector: {
    color: 'white',
    height: 50,
    width: DEVICE_WIDTH * 0.6,
    borderRadius: 10,
    backgroundColor: '#3B9E99',
    fontFamily: 'Montserrat-Medium',
  },
  options: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
});
export default Select;
