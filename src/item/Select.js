import React, {Fragment, useState, useContext} from 'react';

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
//-------------------- MEDIDAS -------------------------
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//-------------------- CONTEXT -------------------------
import formContext from '../context/form/formContext';
//---------------------------------------------------------
const Select = ({materia, guardarMateria}) => {
  //-----------Invamos las form
  const {materiasactuales} = useContext(formContext);
  //------------------------------------------------------
  return (
    <Picker
      selectedValue={materia}
      style={styles.selector}
      onValueChange={(itemValue, itemIndex) => guardarMateria(itemValue)}>
      <Picker.Item label={materia} value={materia} itemStyle={styles.options} />
      {materiasactuales.map((item) => (
        <Picker.Item label={item.materia} value={item.sigla} key={item.id} />
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
