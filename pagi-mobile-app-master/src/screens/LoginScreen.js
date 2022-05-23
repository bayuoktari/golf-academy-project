import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Form, Label, Input, Item, Button, Text } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Login, LoginCoach } from '../store/actions/user';

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.other);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRole, setLoginRole] = useState(1);

  function handleChangeEmail(e) {
    setEmail(e.nativeEvent.text);
  }
  function handleChangePass(e) {
    setPassword(e.nativeEvent.text);
  }
  function changeLoginRole(role) {
    setLoginRole(role);
  }

  useEffect(async () => {
    const token = await AsyncStorage.getItem('access_token');
    const role = await AsyncStorage.getItem('role');
    if (token) {
      if (role === 'student') {
        props.navigation.dispatch(StackActions.replace('Home'));
      } else {
        props.navigation.dispatch(StackActions.replace('Home Coach'));
      }
    }
  }, []);

  function login() {
    if (loginRole === 1) {
      dispatch(Login({ email, password }))
        .then(async ({ data }) => {
          dispatch({
            type: 'SET_ERROR',
            val: { status: false, message: '' },
          });
          await AsyncStorage.setItem('access_token', data.access_token);
          await AsyncStorage.setItem('name', data.name);
          await AsyncStorage.setItem('role', data.role);
          dispatch({
            type: 'SET_PROFILE_PICT',
            profilePict: data.profilePict,
          });
          dispatch({
            type: 'SET_USER_NAME',
            fullname: data.name,
          });
          props.navigation.dispatch(StackActions.replace('Home'));
        })
        .catch(err => {
          // console.log(JSON.stringify(err));
          // console.log(err.response);
          let errmsg;
          if (err.response) {
            // console.log(err.response.data.errors);
            errmsg = err.response.data.errors.join();
          } else {
            errmsg = err.message;
          }
          dispatch({
            type: 'SET_ERROR',
            val: { status: true, message: errmsg },
          });
        });
    } else {
      dispatch(LoginCoach({ email, password }))
        .then(async ({ data }) => {
          // console.log('masook');
          dispatch({
            type: 'SET_ERROR',
            val: { status: false, message: '' },
          });
          await AsyncStorage.setItem('access_token', data.access_token);
          await AsyncStorage.setItem('name', data.fullname);
          await AsyncStorage.setItem('role', data.role);
          dispatch({
            type: 'SET_USER_NAME',
            fullname: data.name,
          });
          props.navigation.dispatch(StackActions.replace('Home Coach'));
        })
        .catch(err => {
          let errmsg;
          if (err.response) {
            errmsg = err.response.data;
          } else {
            errmsg = err;
          }
          console.log(err.response);
          // dispatch({
          //   type: 'SET_ERROR',
          //   val: { status: true, message: errmsg.errors[0] },
          // });
        });
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        source={require('../assets/img/pagi-logo.png')}
        style={styles.logoImg}
      />
      <Text style={styles.loginTitle}>Golf Academy</Text>
      <View style={styles.tab}>
        <TouchableHighlight
          underlayColor="#ebebeb"
          activeOpacity={1}
          style={[
            styles.tabBtn,
            loginRole === 1
              ? { backgroundColor: '#0dbd5f' }
              : { backgroundColor: '#fff' },
          ]}
          onPress={() => changeLoginRole(1)}>
          <Text
            style={loginRole === 1 ? { color: '#fff' } : { color: '#0dbd5f' }}>
            Login as Student
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ebebeb"
          activeOpacity={1}
          style={[
            styles.tabBtn,
            loginRole === 2
              ? { backgroundColor: '#0dbd5f' }
              : { backgroundColor: '#fff' },
          ]}
          onPress={() => changeLoginRole(2)}>
          <Text
            style={loginRole === 2 ? { color: '#fff' } : { color: '#0dbd5f' }}>
            Login as Coach
          </Text>
        </TouchableHighlight>
      </View>
      <Form style={styles.formWrapper}>
        {error.status ? (
          <Text style={styles.errMsg}>{error.message}</Text>
        ) : null}
        <Item
          floatingLabel
          style={{
            borderColor: '#20bf6b',
            marginLeft: 0,
          }}>
          <Label style={{ color: '#1dd1a1' }}>Email</Label>
          <Input
            onChange={handleChangeEmail}
            autoCapitalize={'none'}
            value={email}
          />
        </Item>
        <Item
          floatingLabel
          style={{
            marginBottom: 24,
            borderColor: '#20bf6b',
            marginLeft: 0,
          }}>
          <Label style={{ color: '#1dd1a1' }}>Password</Label>
          <Input
            secureTextEntry={true}
            onChange={handleChangePass}
            autoCapitalize={'none'}
            value={password}
          />
        </Item>
        <Button full success rounded onPress={login}>
          <Text style={styles.btnLogin}>SIGN IN</Text>
        </Button>
      </Form>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Copyright © 2021 PAGI Golf</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoImg: {
    width: wp('39%'),
    height: hp('15%'),
  },
  loginTitle: {
    fontWeight: '700',
    fontSize: 26,
    paddingTop: 10,
    marginBottom: 50,
  },
  formWrapper: {
    width: wp('75%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    fontWeight: '700',
    letterSpacing: 3,
  },
  footer: {
    backgroundColor: '#eb5e0b',
    padding: 13,
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
  },
  errMsg: {
    color: '#fc5c65',
    marginBottom: 2,
    fontWeight: '700',
  },
  tab: {
    flexDirection: 'row',
  },
  tabBtn: {
    borderRadius: 6,
    borderColor: '#0dbd5f',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 3,
  },
});
