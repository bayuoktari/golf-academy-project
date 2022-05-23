import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getStudentList(data) {
  return async function () {
    const token = await AsyncStorage.getItem('access_token');
    return axios({
      method: 'GET',
      url: 'student/verified',
      headers: {
        access_token: token,
      },
    });
  };
}
