//-----------------------------------------------------------------
import AsyncStorage from '@react-native-community/async-storage';

//----------------------------------------------------------------

const storeDataTime = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_date_time', jsonValue);
  } catch (e) {
    // saving error
  }
};

const getDataTime = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_date_time');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const removeDataTime = async () => {
  try {
    await AsyncStorage.removeItem('@storage_date_time');
    return true;
  } catch (exception) {
    return false;
  }
};

export {storeDataTime, getDataTime, removeDataTime};
