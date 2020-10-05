import React, {Fragment, useState, useContext, useEffect} from 'react';
//---------------------------------------------------------
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
//-------------------- CONTEXT -------------------------
import loginContext from '../context/login/loginContext';
import alertContext from '../context/alert/alertContext';
//-------------------- MEDIDAS -----------------------
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//------------ Importamos de react native elemets ---------------
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
//------------------- ALERT ------------------------
import AlertLoading from '../item/AlertLoading';
import AlertError from '../item/AlertError';
//------------------- STORE LOGIN-----------------------
import {getData} from '../resource/js/StoreLogin';
//-------------------------------------------------------------------------
//                        INICIO DE PROGRAMA
//-------------------------------------------------------------------------
const Login = ({navigation}) => {
  //------------------------- CONTEXT VARIABLES---------------------------
  const {funcionAlertError, funcionAlertLoading} = useContext(alertContext);
  const {estado, funcionPeticionDatos, funcionCopiarUsuario} = useContext(
    loginContext,
  );

  //----------------------------------------------------------------------
  // USEEFFECT
  useEffect(() => {
    //EXTRAE EL VALOR DEL STORE
    getData().then((key) => {
      //Verificamos si el valor del STORE esta vacio
      if (key !== null) {
        //Verificamos si el estado esta desbloqueado
        if (key.estado === 'unlocked') {
          //Debemos copiar los datos del STORE al CONTEXT
          funcionCopiarUsuario(key);
          //Nos redirigimos a la carpeta FORM
          navigation.navigate('form');
          return null;
        }
      } else {
        console.log('VACIO');
      }
    });
  }, [estado]);

  //-------------------- STATE LOCAL --------------------------

  //-------------------- EXTRACCION DE VALORES DE FORMULARIO -------------
  const [user, guardarUser] = useState('');
  const [pass, guardarPass] = useState('');
  //
  const onChangeUsuario = (valor) => {
    guardarUser(valor);
  };
  const onChangePass = (valor) => {
    guardarPass(valor);
  };
  //--------------------- FUNCIONES -------------------------
  const onPressForm = () => {
    //Saneamiento de variables
    if (user.trim() === '' || pass.trim() === '') {
      let valorError = {
        estado: true,
        mensaje: 'Datos Ingresados Vacios Revise Nuevamente',
      };
      funcionAlertError(valorError);
    } else {
      funcionAlertLoading(true);
      const datosUsuario = {
        user: user.toLowerCase(),
        pass: pass.toLowerCase(),
      };

      funcionPeticionDatos(datosUsuario).then((key) => {
        if (key === 'datos_erroneos') {
          let valorError = {
            estado: true,
            mensaje: 'Datos ingresados Erroneos Intente nuevamente',
          };
          funcionAlertError(valorError);
        } else if (key === 'service_no_disponible') {
          let valorError = {
            estado: true,
            mensaje: 'Service no Disponible Intente Mas Tarde',
          };
          funcionAlertError(valorError);
        }
        resetEntradas();
      });
      setTimeout(() => {
        funcionAlertLoading(false);
      }, 1500);
    }
  };
  //
  const resetEntradas = () => {
    guardarPass('');
    guardarUser('');
  };
  //------------------ Inicio de CODIGO ---------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.seccion_1}>
        <View style={styles.seccion_1_1}>
          <Image
            source={require('../resource/img/etnf.jpg')}
            style={styles.imagen}
          />
        </View>
        {/* SECCION DE FORMULARIO */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.seccion_1_2}>
            <Text style={styles.titulo_formulario}>
              Ingrese sus Credencialesss
            </Text>
            <Fragment>
              <View style={styles.entradas}>
                <Input
                  placeholder="Usuario"
                  leftIcon={<Icon name="user" size={18} color="black" />}
                  onChangeText={onChangeUsuario}
                  inputStyle={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-Medium',
                  }}
                  value={user}
                />
                <Input
                  placeholder="Password"
                  leftIcon={<Icon name="lock" size={18} color="black" />}
                  onChangeText={onChangePass}
                  inputStyle={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-Medium',
                  }}
                  value={pass}
                />
                <Button
                  icon={
                    <Icon
                      name="unlock"
                      size={15}
                      color="white"
                      style={styles.icono}
                    />
                  }
                  style={styles.boton}
                  title="Ingresar"
                  onPress={onPressForm}
                  buttonStyle={{
                    backgroundColor: '#2F8383',
                  }}
                  titleStyle={{
                    fontFamily: 'Exo2-Medium',
                  }}
                />
              </View>
            </Fragment>
          </View>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.seccion_2}></View>
      {/* SECCION DE FOOTER */}
      <View style={styles.seccion_3}>
        <Text style={styles.titulo_footer}>
          {'\u00A9'}Carrera de Ingenieria Electrónica
        </Text>
      </View>
      {/* SECCION DE ALERTS */}
      <AlertError />
      <AlertLoading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seccion_1: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.6,
    backgroundColor: 'black',
  },
  //------------------------------------- Imagen
  seccion_1_1: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.7 * 0.4,
    alignItems: 'center',
    backgroundColor: '#591822',
  },
  imagen: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.28,
  },
  //------------------------------------ formulario
  seccion_1_2: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.7 * 0.6,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titulo_formulario: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  entradas: {
    width: DEVICE_WIDTH * 0.8,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  icono: {
    marginHorizontal: 5,
  },
  //-------------------------------------------------
  seccion_2: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.35,
    backgroundColor: 'white',
  },
  seccion_3: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: '#af253b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo_footer: {
    borderTopColor: 'black',
    marginHorizontal: 10,
    color: '#fff',
    fontFamily: 'Exo2-Italic',
  },
  boton: {
    fontFamily: 'Exo2-Medium',
    color: 'black',
  },
});
export default Login;
