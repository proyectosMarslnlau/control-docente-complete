import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//REACCT NATIVE ELEMENTS
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//
const Camera = ({foto, guardarFoto}) => {
  //------------------------------------------------------------
  /*useEffect(() => {
    if (reiniciar !== false) {
      guardarState({
        resourcePath: {},
      });
    }
  }, [reiniciar]);*/
  //-------------------------------------------------------------
  const [state, guardarState] = useState({
    resourcePath: {},
  });

  if (Object.keys(foto.resourcePath).length === 0) {
    console.log('vacio');
  } else {
    console.log('revisar');
  }
  const selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [],
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Buscar en mis Archivos',
      chooseFromLibraryButtonTitle: null,
      quality: 0.3,
      maxWidth: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        maxWidth: 200,
        maxHeight: 200,
        quality: 0.2,
      },
    };

    ImagePicker.showImagePicker(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        guardarFoto({
          resourcePath: source,
        });
        console.log('LENNY LAURA VALENCIA');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {Object.keys(foto.resourcePath).length === 0 ? (
          <Image
            source={require('../resource/img/images.png')}
            style={{width: 100, height: 100, marginBottom: 5}}
          />
        ) : (
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + foto.resourcePath.data,
            }}
            style={{width: 100, height: 100, marginBottom: 5}}
          />
        )}

        {Object.keys(foto.resourcePath).length === 0 ? (
          <Image
            source={require('../resource/img/images.png')}
            style={{width: 200, height: 200, marginBottom: 5}}
          />
        ) : (
          <Image
            source={{uri: foto.resourcePath.uri}}
            style={{width: 200, height: 200, marginBottom: 5}}
          />
        )}

        <Text style={{alignItems: 'center'}}>{foto.resourcePath.uri}</Text>

        <Button
          onPress={selectFile}
          icon={
            <Icon name="upload" size={15} color="white" style={styles.icono} />
          }
          title="Subir imagen Foto"
          titleStyle={{
            fontFamily: 'Exo2-Italic',
          }}
        />
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  icono: {
    marginHorizontal: 5,
  },
});
