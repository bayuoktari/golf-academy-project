import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ButtonMenu(props) {
  async function handlepress() {
    switch (props.title) {
      case 'Logout':
        await AsyncStorage.clear();
        props.logout();
        break;
      case 'Check In':
        props.action('CheckIn');
        break;
      case 'Check Out':
        props.action('CheckOut');
        break;
      case 'Student Report':
        props.action('StudentReport');
        break;
      case 'Period Report':
        props.action('PdfReport');
        break;
      default:
        break;
    }
  }
  return (
    <TouchableHighlight
      disabled={props.disable || false}
      onPress={handlepress}
      style={styles.buttonMenu}
      activeOpacity={0.2}
      underlayColor="#F3F4F6">
      <View>
        <MaterialComunityIcons
          name={props.icon}
          size={wp('22%')}
          style={[
            styles.iconMenu,
            props.role !== 'student'
              ? { color: '#EF6637' }
              : { color: '#1b907f' },
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            props.role !== 'student'
              ? { color: '#EF6637' }
              : { color: '#1b907f' },
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  buttonMenu: {
    height: hp('22%'),
    width: wp('39.5%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  iconMenu: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
