import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { API_KEY, OFFICE_LAT, OFFICE_LONG } from '@env';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getDistance } from 'geolib';
import GeoLocation from 'react-native-geolocation-service';
import Geocode from 'react-geocode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDate } from '../helpers/getDateTime';

export default function LocationDetail() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentTime, setCurrentTime] = useState('');
  const locationDetail = useSelector(state => state.user.userLocation);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let hours = new Date().getHours(); //Current Hours
  //   let min = new Date().getMinutes(); //Current Minutes
  //   let sec = new Date().getSeconds(); //Current Seconds

  //   let secTimer = setInterval(() => {
  //     if (sec < 10) {
  //       sec = '0' + sec;
  //     } else if (min < 10) {
  //       min = '0' + min;
  //     }
  //     setCurrentTime(hours + ':' + min + ':' + sec);
  //   }, 1000);
  //   return () => clearInterval(secTimer);
  // });

  useEffect(async () => {
    if (Platform.OS === 'ios') {
      GeoLocation.requestAuthorization('whenInUse');
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    Geocode.setApiKey('AIzaSyA0MCco9FI-1PMgWA1WyPi9vpZvu_f9Ybs');
    GeoLocation.getCurrentPosition(
      position => {
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude,
        ).then(
          response => {
            const address = response.results[0].formatted_address;
            const countDistance = getDistance(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              {
                latitude: '-6.41501370752712',
                longitude: '106.88418686758916',
              },
            );
            dispatch({
              type: 'SET_LOCATION_DETAIL',
              locationDetail: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                location: address,
                distance: `${countDistance / 1000}`,
              },
            });
          },
          error => {
            console.error(error);
          },
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return (
    <View>
      <View style={[styles.dateTime, styles.shadow]}>
        <Text style={styles.textDate}>{currentDate}</Text>
        <Text style={styles.textDate}>{currentTime}</Text>
      </View>
      <View style={[styles.locationWrapper, styles.shadow]}>
        <View style={styles.textWrapper}>
          <Icon
            name="crosshairs-gps"
            size={20}
            style={{ color: '#EB353A', marginRight: 7 }}
          />
          <View style={{ width: wp('100%') }}>
            <Text style={{ marginBottom: 3 }}>Current Location</Text>
            <Text style={styles.textDescription}>
              {locationDetail.location}
            </Text>
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Icon
            name="map-marker-radius"
            size={20}
            style={{ color: '#F59E0B', marginRight: 7 }}
          />
          <View style={{ width: wp('100%') }}>
            <Text style={{ marginBottom: 3 }}>Position</Text>
            <Text style={styles.textDescription}>
              {locationDetail.lat
                ? `${locationDetail.lat}, ${locationDetail.long}`
                : 'Checking Your GPS...'}
            </Text>
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Icon
            name="map-marker-distance"
            size={20}
            style={{ color: '#10B981', marginRight: 7 }}
          />
          <View style={{ width: wp('100%') }}>
            <Text style={{ marginBottom: 3 }}>Distance</Text>
            <Text style={styles.textDescription}>
              {locationDetail.distance} km
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateTime: {
    width: wp('94%'),
    backgroundColor: '#FDB059',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 5,
  },
  locationWrapper: {
    width: wp('94%'),
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  textDate: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  textWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textDescription: { width: wp('80%'), color: '#6B7280', fontSize: 12 },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
