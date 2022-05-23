import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function checkIn(data, role) {
  return async function () {
    const token = await AsyncStorage.getItem('access_token');
    if (role === 'student') {
      return axios({
        method: 'POST',
        url: 'student/checkin',
        headers: {
          access_token: token,
        },
        data: data,
      });
    } else {
      return axios({
        method: 'POST',
        url: 'staff/checkin',
        headers: {
          access_token: token,
        },
        data: data,
      });
    }
  };
}

export function checkOut(data, role) {
  return async function () {
    const token = await AsyncStorage.getItem('access_token');
    // console.log(role);
    if (role === 'student') {
      return axios({
        method: 'POST',
        url: 'student/checkout',
        headers: {
          access_token: token,
        },
        data: data,
      });
    } else {
      return axios({
        method: 'POST',
        url: 'staff/checkout',
        headers: {
          access_token: token,
        },
        data: data,
      });
    }
  };
}
export function getTodayPresence(role) {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('access_token');
    if (role === 'student') {
      axios({
        method: 'GET',
        url: 'student/today-presence',
        headers: {
          access_token: token,
        },
      })
        .then(({ data }) => {
          dispatch({
            type: 'SET_CHECK_IN',
            checkInTime: data.checkInTime,
          });
          dispatch({
            type: 'SET_CHECK_OUT',
            checkOutTime: data.checkOutTime,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_CHECK_IN',
            checkInTime: '',
          });
          dispatch({
            type: 'SET_CHECK_OUT',
            checkOutTime: '',
          });
        });
    } else {
      axios({
        method: 'GET',
        url: 'staff/today-presence',
        headers: {
          access_token: token,
        },
      })
        .then(({ data }) => {
          dispatch({
            type: 'SET_CHECK_IN',
            checkInTime: data.checkInTime,
          });
          dispatch({
            type: 'SET_CHECK_OUT',
            checkOutTime: data.checkOutTime,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_CHECK_IN',
            checkInTime: '',
          });
          dispatch({
            type: 'SET_CHECK_OUT',
            checkOutTime: '',
          });
        });
    }
  };
}
