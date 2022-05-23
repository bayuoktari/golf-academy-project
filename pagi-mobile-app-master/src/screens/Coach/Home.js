import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Thumbnail } from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import ButtonMenu from '../../components/ButtonMenu';
import { getTodayPresence } from '../../store/actions/absence';

export default function HomeCoach({ navigation }) {
  const dispatch = useDispatch();
  const { name, checkInTime, checkOutTime } = useSelector(state => state.user);
  let tempName = name || 'User';
  const [role, setRole] = useState('');
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
  });

  function logout() {
    navigation.dispatch(StackActions.replace('Login'));
  }
  function movePage(page) {
    if (page === 'CheckIn' && checkInTime) {
      setShowAlert({
        ...showAlert,
        show: true,
        message: 'You Already Check In !',
      });
    } else if (page === 'CheckOut' && checkOutTime) {
      setShowAlert({
        ...showAlert,
        show: true,
        message: 'You Already Check Out !',
      });
    } else {
      navigation.navigate(page);
    }
  }
  useEffect(async () => {
    dispatch({
      type: 'SET_USER_NAME',
      fullname: await AsyncStorage.getItem('name'),
    });
    setRole(await AsyncStorage.getItem('role'));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getTodayPresence('staff'));
      return () => null;
    }, [dispatch]),
  );

  function hmsToSeconds(s) {
    var b = s.split(':');
    return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
  }

  function secondsToHMS(secs) {
    function z(n) {
      return (n < 10 ? '0' : '') + n;
    }
    var sign = secs < 0 ? '-' : '';
    secs = Math.abs(secs);
    return (
      sign +
      z((secs / 3600) | 0) +
      ':' +
      z(((secs % 3600) / 60) | 0) +
      ':' +
      z(secs % 60)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.welcomeMessage}>Welcome Back,</Text>
          <Text style={styles.usernameText}>{name}</Text>
        </View>
        <View>
          <Thumbnail
            large
            source={{
              uri: `https://ui-avatars.com/api/?name=${tempName
                .split()
                .join('+')}`,
            }}
          />
        </View>
      </View>
      <View style={styles.timeWrapper}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.timeText}>
            {checkInTime ? checkInTime : '-- : --'}
          </Text>
          <Text style={{ fontWeight: '700' }}>Check In</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.timeText}>
            {checkOutTime ? checkOutTime : '-- : --'}
          </Text>
          <Text style={{ fontWeight: '700' }}>Check Out</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.timeText}>
            {checkOutTime && checkInTime
              ? secondsToHMS(
                  hmsToSeconds(checkOutTime) - hmsToSeconds(checkInTime),
                )
              : '-- : --'}
          </Text>
          <Text style={{ fontWeight: '700' }}>Duration</Text>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <ButtonMenu
          title="Check In"
          icon="briefcase-clock"
          action={movePage}
          // disable={checkInTime ? true : false}
          role={role}
        />
        <ButtonMenu
          title="Check Out"
          icon="clock-fast"
          action={movePage}
          // disable={checkOutTime ? true : false}
          role={role}
        />
        <ButtonMenu
          title="Student Report"
          icon="file-document-edit"
          action={movePage}
          role={role}
        />
        {/* <ButtonMenu
          title="Tournament Info"
          icon="trophy"
          disable={true}
          role={role}
        /> */}
        <ButtonMenu title="Logout" icon="logout" logout={logout} role={role} />
      </View>
      <AwesomeAlert
        show={showAlert.show}
        showProgress={false}
        title="Something Wrong"
        message={showAlert.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#10B981"
        onConfirmPressed={() => {
          setShowAlert({ ...showAlert, show: false });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d2dae2',
  },
  heading: {
    paddingTop: getStatusBarHeight() - 20,
    backgroundColor: '#EF6637',
    height: hp('25%'),
    paddingHorizontal: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: '14%',
    alignItems: 'center',
  },
  timeWrapper: {
    shadowColor: '#000',
    marginBottom: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
    backgroundColor: '#fff',
    width: wp('95%'),
    height: hp('13%'),
    alignSelf: 'center',
    borderRadius: 8,
    position: 'relative',
    top: hp('-4%'),
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  welcomeMessage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  usernameText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
  },
  profilePict: {
    borderRadius: 40,
    height: hp('10.3%'),
    width: wp('18%'),
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  menuWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: wp('95%'),
  },
});
