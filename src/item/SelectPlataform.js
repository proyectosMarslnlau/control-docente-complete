import React, {Fragment, useState, useContext} from 'react';

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
//-------------------- MEDIDAS -------------------------
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//-------------------- CONTEXT -------------------------
import formContext from '../context/form/formContext';
//---------------------------------------------------------
const SelectPlataform = ({plataforma, guardarPlataforma}) => {
  //-----------Invamos las form
  const {plataformas} = useContext(formContext);
  //------ State LOCALES -----
  return (
    <Picker
      selectedValue={plataforma}
      style={styles.selector}
      onValueChange={(itemValue, itemIndex) => guardarPlataforma(itemValue)}>
      <Picker.Item
        label="Seleccion una Opcion"
        value="default"
        itemStyle={styles.options}
      />
      {plataformas.map((item) => (
        <Picker.Item
          label={item.plataforma}
          value={item.plataforma}
          key={item.id}
        />
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
export default SelectPlataform;
