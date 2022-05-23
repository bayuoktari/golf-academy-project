import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationDetail from '../components/LocationDetail';
import { checkIn } from '../store/actions/absence';
import { getTime } from '../helpers/getDateTime';

export default function CheckIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTooFar, setIsTooFar] = useState(false);
  const [cameraPath, setCameraPath] = useState('');
  const [role, setRole] = useState();
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.user.userLocation);

  useEffect(async () => {
    const role = await AsyncStorage.getItem('role');
    setRole(role);
    if (userLocation.distance > 1 || userLocation.distance === 'Counting...') {
      setIsTooFar(true);
    } else {
      setIsTooFar(false);
    }
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Check In',
      headerStyle: {
        backgroundColor: role === 'student' ? '#10B981' : '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Home',
    });
  });

  function openCamera() {
    ImagePicker.openCamera({
      width: 250,
      height: 300,
      useFrontCamera: true,
      compressImageQuality: 0.5,
      compressImageMaxHeight: 640,
      compressImageMaxWidth: 480,
    }).then(image => {
      setCameraPath(image.path);
    });
  }
  function handleCheckIn() {
    setIsLoading(true);
    const dataAbsence = new FormData();
    dataAbsence.append('image', {
      uri: Platform.OS === 'ios' ? `file:///${cameraPath}` : cameraPath,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    dataAbsence.append('checkInTime', getTime());
    dataAbsence.append('checkInLongitude', userLocation.long);
    dataAbsence.append('checkInLatitude', userLocation.lat);
    dataAbsence.append('checkInPosition', userLocation.location);
    dispatch(checkIn(dataAbsence, role))
      .then(() => {
        setIsLoading(false);
        if (role === 'student') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Home Coach');
        }
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Error', 'Something Wrong');
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: wp('100%'), alignSelf: 'center' }}>
        <LocationDetail />
      </View>
      <View style={{ width: wp('65%'), height: hp('36%'), marginBottom: 10 }}>
        <Image
          source={{
            uri:
              cameraPath ||
              'https://team.ufsa.ufl.edu/wp-content/uploads/sites/6/2020/11/Profile.png',
          }}
          style={{ width: wp('65%'), height: hp('35.5%') }}
        />
      </View>
      {isTooFar ? (
        <View style={{ paddingBottom: 50 }}>
          <Text style={styles.distanceError}>
            Your Distance is Too Far From The Location
          </Text>
          <Text style={styles.distanceError}>
            Make Sure Your Distance is 1 Kilometer or Less
          </Text>
        </View>
      ) : (
        <View
          style={{
            paddingBottom: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            onPress={openCamera}
            style={[
              styles.btnCheckIn,
              { width: wp('50%'), backgroundColor: '#3B82F6' },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Icon
                name="camera"
                size={20}
                style={{ marginRight: 10, color: '#fff' }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Take a Selfie
              </Text>
            </View>
          </TouchableHighlight>
          {cameraPath ? (
            <TouchableHighlight
              style={styles.btnCheckIn}
              onPress={handleCheckIn}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Check In
                  </Text>
                )}
              </View>
            </TouchableHighlight>
          ) : (
            <Text style={styles.distanceError}>Please Selfie First</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  btnCheckIn: {
    width: wp('90%'),
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 20,
    marginBottom: 5,
  },
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
  distanceError: {
    color: '#EB353A',
    fontWeight: '700',
    marginTop: 15,
    textAlign: 'center',
  },
});
