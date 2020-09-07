import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
//------------------  CONTEXT -----------------------------
import loginContext from '../context/login/loginContext';
import formContext from '../context/form/formContext';
// -------------------- REACT NATIVE ELEMENTS ------------
import {Button, Input, Slider, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//-----------------------------------------------------------------
import AsyncStorage from '@react-native-community/async-storage';
//-------------------- MEDIDAS -----------------------
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//----------------------------------------------------------------
//---------------ITEMS DE FORMULARIO -------
import Select from '../item/Select';
import SelectPlataform from '../item/SelectPlataform';
import Camera from '../item/Camera';
//----------------------------------
//INICIO DE PROGRAMA
//------------------------------------
const Form = ({navigation}) => {
  //Invocacion de datos de USE CONTEXT
  const {datosusuario, funcionCerrarSesion} = useContext(loginContext);
  const {nombre, identificador} = datosusuario;
  const {
    datos,
    funcionPeticionMateriasDocente,
    funcionPeticionPlataformas,
    funcionPeticionFecha,
    funcionPeticionHoraInicial,
    funcionPeticionHoraFinal,
    funcionEnviarDatos,
  } = useContext(formContext);
  console.log('INICIAL');
  console.log(datos);
  //--------------------------------------------------------------
  //EXTRAER LOS DATOS DE FORMULARIO
  const [materia, guardarMateria] = useState('Seleccione una Materia');
  const [titulo, guardarTitulo] = useState('');
  const [cantidad, guardarCantidad] = useState('');
  const [fecha, guardarFecha] = useState({
    estado: false,
    fecha: '',
  });
  const [horainicial, guardarHoraInicial] = useState({
    estado: false,
    horaini: '',
  });
  const [plataforma, guardarPlataforma] = useState('Seleccione una Plataforma');
  const [avance, guardarAvance] = useState(10);
  const [respaldo, guardarRespaldo] = useState(false);
  const [horafinal, guardarHoraFinal] = useState({
    estado: false,
    horafin: '',
  });
  const [foto, guardarFoto] = useState({
    resourcePath: {},
  });
  const [observacion, guardarObservacion] = useState('');
  //------------------------------------------------------------
  //ESTADOS FINALES
  //------------------------------------------------------------
  const [valor, guardarValor] = useState({});
  //Extraer informacion de TITULO
  const onChangeTitulo = (valor) => {
    guardarTitulo(valor);
  };
  //Extraer informacion de cantidad
  const onChangeCantidad = (valor) => {
    guardarCantidad(valor);
  };
  //Extraer informacion de ENTRADA OBSERVACIONES
  const onChangeObservacion = (valor) => {
    guardarObservacion(valor);
  };
  // ONPRESS OBTENER FECHA
  const onPressFecha = () => {
    console.log('FECHA----------------------------');
    const valorFinal = {
      materia: materia,
      titulo: titulo,
      cantidad: cantidad,
      fecha: fecha,
      horaini: horainicial,
      plataforma: plataforma,
      avance: avance,
      respaldo: respaldo,
      horafinal: horafinal,
      foto: foto,
      observacion: observacion,
    };

    funcionPeticionFecha().then((date) => {
      guardarFecha({
        estado: true,
        fecha: date,
      });
    });
  };
  // ONPRESS OBTENER HORA INICIAL
  const onPressHoraInicial = () => {
    funcionPeticionHoraInicial().then((time) => {
      guardarHoraInicial({
        estado: true,
        horaini: time,
      });
    });
  };

  // ONPRESS OBTENER HORA FINAL
  const onPressHoraFinal = () => {
    funcionPeticionHoraFinal().then((time) => {
      guardarHoraFinal({
        estado: true,
        horafin: time,
      });
    });
  };

  //----------------------------------------------------------------
  useEffect(() => {
    //Peticion de seleccion de materias para los SELECT
    funcionPeticionMateriasDocente(identificador);
    funcionPeticionPlataformas();
    //--------------------------------------------------
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //---------------------------------------------------------------
  const removeValue = async () => {
    try {
      //Borro los datos de STORE
      await AsyncStorage.removeItem('@storage_date_user');
      //Le doy los valores predeterminados para limpiar el STATE
      const valor = {
        nombre: '',
        tipo: '',
        identificador: '',
        estado: 'locked',
      };
      //Invoco la funcion de cerrar sesion del CONTEXT
      funcionCerrarSesion(valor);
      //Realizao la redireccion al LOGIN nuevamente
      navigation.navigate('login');
      console.log('Done.');
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  ///------------------------------
  const onPressConfirmar = () => {
    console.log('DENYOS----------------------------');
    const valorFinal = {
      materia: materia,
      titulo: titulo,
      cantidad: cantidad,
      fecha: fecha,
      horaini: horainicial,
      plataforma: plataforma,
      avance: avance,
      respaldo: respaldo,
      horafinal: horafinal,
      foto: foto,
      observacion: observacion,
    };
    funcionEnviarDatos(valorFinal);

    console.log(valorFinal);
  };
  //------------------------------------------------
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.seccion_0}>
            <Text style={styles.texto_titulo_principal}>Control de Clases</Text>
          </View>
          <View style={styles.seccion_1}>
            <View style={styles.entradas}>
              <Text style={styles.left}>BIENVENIDO : </Text>
              <Text style={styles.titulo_docente}>{nombre}</Text>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Materias Actuales del docente : </Text>
              <Select materia={materia} guardarMateria={guardarMateria} />
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Tema Estudiado </Text>
              <View style={styles.right}>
                <Input
                  placeholder="Titulo del Tema Avanzado"
                  multiline={true}
                  numberOfLines={2}
                  style={styles.tema_input}
                  onChangeText={onChangeTitulo}
                  value={titulo}
                />
              </View>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Numero de Estudiantes : </Text>
              <View style={styles.right_entradas}>
                <Input
                  style={styles.estudiantes_input}
                  keyboardType="numeric"
                  placeholder="Cantidad"
                  leftIcon={<Icon name="user" size={15} color="white" />}
                  onChangeText={onChangeCantidad}
                />
              </View>
            </View>

            <View style={styles.entradas}>
              <Text style={styles.left}>Obtener Fecha de Clase</Text>
              <View style={styles.right}>
                {fecha.estado ? (
                  <Button
                    icon={
                      <Icon
                        name="check"
                        size={20}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title={fecha.fecha}
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#64C55F',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                      color: 'black',
                    }}
                  />
                ) : (
                  <Button
                    icon={
                      <Icon
                        name="star"
                        size={15}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title="Obtener Fecha de Inicio"
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#4C2872',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                    }}
                    onPress={onPressFecha}
                  />
                )}
              </View>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Obtener Hora Inicial de Clase </Text>
              <View style={styles.right}>
                {horainicial.estado ? (
                  <Button
                    icon={
                      <Icon
                        name="check"
                        size={20}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title={horainicial.horaini}
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#64C55F',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                      color: 'black',
                    }}
                  />
                ) : (
                  <Button
                    icon={
                      <Icon
                        name="edit"
                        size={15}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title="Obtener Hora de Inicio "
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#4C2872',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                    }}
                    onPress={onPressHoraInicial}
                  />
                )}
              </View>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Plataforma utilizada </Text>
              <SelectPlataform
                plataforma={plataforma}
                guardarPlataforma={guardarPlataforma}
              />
            </View>

            <View style={styles.entradas}>
              <Text style={styles.left}>Avance : </Text>
              <View style={styles.right}>
                <Slider
                  value={avance}
                  onValueChange={guardarAvance}
                  maximumValue={100}
                  minimumValue={0}
                  step={1}
                  style={styles.slider}
                />
                <Text style={styles.titulo_progreso}>Progreso: {avance}%</Text>
              </View>
            </View>

            <View style={styles.entradas}>
              <Text style={styles.left}>Respaldo : </Text>
              <View>
                <CheckBox
                  title="Click Aqui"
                  checked={respaldo}
                  onPress={() => guardarRespaldo(!respaldo)}
                  containerStyle={styles.check}
                  textStyle={styles.text_check}
                  checkedColor={'white'}
                />
              </View>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Obtener Hora Final de Clase </Text>
              <View style={styles.right}>
                {horafinal.estado ? (
                  <Button
                    icon={
                      <Icon
                        name="check"
                        size={20}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title={horafinal.horafin}
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#64C55F',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                      color: 'black',
                    }}
                  />
                ) : (
                  <Button
                    icon={
                      <Icon
                        name="edit"
                        size={15}
                        color="white"
                        style={styles.icono}
                      />
                    }
                    title="Obtener Hora Final  "
                    style={styles.boton}
                    buttonStyle={{
                      backgroundColor: '#4C2872',
                    }}
                    titleStyle={{
                      fontFamily: 'Exo2-Medium',
                    }}
                    onPress={onPressHoraFinal}
                  />
                )}
              </View>
            </View>
            <View style={styles.entradas}>
              <Text style={styles.left}>Observaciones </Text>
              <View style={styles.right}>
                <Input
                  placeholder="Observaciones de sesion"
                  multiline={true}
                  numberOfLines={2}
                  style={styles.tema_input}
                  onChangeText={onChangeObservacion}
                />
              </View>
            </View>
            <Camera foto={foto} guardarFoto={guardarFoto} />
          </View>
          <View style={styles.seccion_3}>
            <Button
              icon={
                <Icon
                  name="check"
                  size={15}
                  color="white"
                  style={styles.icono}
                />
              }
              title="REGISTRAR "
              style={styles.boton_envio}
              buttonStyle={{
                backgroundColor: '#379783',
                marginVertical: 8,
                width: DEVICE_WIDTH * 0.8,
              }}
              titleStyle={{
                fontFamily: 'Exo2-Medium',
              }}
              onPress={onPressConfirmar}
            />
            <Button
              icon={
                <Icon
                  name="arrow-left"
                  size={15}
                  color="white"
                  style={styles.icono}
                />
              }
              title="CANCELAR"
              style={styles.boton_envio}
              buttonStyle={{
                backgroundColor: '#C45E3B',
                marginVertical: 8,
                width: DEVICE_WIDTH * 0.8,
              }}
              titleStyle={{
                fontFamily: 'Exo2-Medium',
              }}
              onPress={removeValue}
            />
          </View>
        </View>
        {/* */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#591822',
  },
  seccion_0: {
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  texto_titulo_principal: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Exo2-Medium',
  },
  seccion_1: {
    width: DEVICE_WIDTH,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  entradas: {
    flexGrow: 3,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  left: {
    flex: 1,
    width: DEVICE_WIDTH * 0.4,
    fontFamily: 'Montserrat-Medium',
  },
  right: {
    width: DEVICE_WIDTH * 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#3B9E99',
  },
  right_entradas: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.8 * 0.1,
    backgroundColor: '#3B9E99',
    borderRadius: 10,
  },
  tema_input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    width: DEVICE_WIDTH * 0.55,
  },
  estudiantes_input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.5,
    height: DEVICE_HEIGHT * 0.05,
  },
  boton: {
    width: DEVICE_WIDTH * 0.1,
    backgroundColor: '#231132',
  },
  titulo_docente: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#3B9E99',

    fontFamily: 'Exo2-Medium',
  },
  slider: {
    marginHorizontal: 5,
  },
  titulo_progreso: {
    color: '#fff',
    marginLeft: 5,
  },
  check: {
    color: 'white',
    backgroundColor: '#992F3B',
  },
  icono: {
    marginHorizontal: 5,
  },
  text_check: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  seccion_3: {
    flex: 1,
    marginVertical: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  boton_envio: {
    marginVertical: 10,
    marginHorizontal: 20,
    width: DEVICE_WIDTH,
  },
});
export default Form;
