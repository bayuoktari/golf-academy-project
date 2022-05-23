import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import StudentBio from '../../components/StudentBio';
import { Thumbnail } from 'native-base';
import FormStudent from '../../components/FormStudent';
import DropDownPicker from 'react-native-dropdown-picker';
import { month, getYear } from '../../helpers/periodHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

export default function AddReport(props) {
  const studentData = props.route.params;

  const [openPeriod, setOpenPeriod] = useState(false);
  const [valuePeriod, setValuePeriod] = useState(null);
  const [itemsPeriod, setItemsPeriod] = useState([
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Semester', value: 'Semester' },
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState(getYear);

  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (valuePeriod === 'Monthly') {
      setItems(month);
    } else if (valuePeriod === 'Semester') {
      setItems([
        { label: 'Semester 1', value: 'Semester 1' },
        { label: 'Semester 2', value: 'Semester 2' },
      ]);
    }
  }, [valuePeriod]);

  let newImgUrl;

  if (studentData.profilePict) {
    newImgUrl = studentData.profilePict.replace('http://', 'https://');
  }
  let profPict =
    newImgUrl ||
    `https://ui-avatars.com/api/?name=${studentData.fullname
      .split()
      .join('+')}`;

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add New Report',
      headerStyle: {
        backgroundColor: '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'List',
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError();
    }, 3000);
  }, [error]);

  async function handleSubmit(data) {
    // console.log(data);
    if (!value && !valueYear) {
      setError('Please Select Month and Year Periode');
    } else if (!data) {
      setError('Please make sure all the inputs are filled');
    } else {
      setLoading(true);
      const token = await AsyncStorage.getItem('access_token');
      axios({
        url: 'student/score',
        method: 'POST',
        headers: {
          access_token: token,
        },
        data: {
          studentId: studentData.id,
          period: value,
          year: valueYear,
          ...data,
        },
      })
        .then(() => {
          props.navigation.navigate('StudentReport');
        })
        .catch(err => {
          setError(err.response.data.errors[0]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.imageWrapper}>
          <Thumbnail
            square
            // style={styles.profilePict}
            style={{ borderRadius: 4 }}
            source={{
              uri: profPict,
            }}
          />
        </View>
        <StudentBio studentData={studentData} />
      </View>
      <View>
        <Text style={styles.textPeriode}>Select Periode</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            },
            Platform.OS !== 'android' && {
              zIndex: 10,
            },
          ]}>
          <DropDownPicker
            open={openPeriod}
            value={valuePeriod}
            items={itemsPeriod}
            setOpen={setOpenPeriod}
            setValue={setValuePeriod}
            setItems={setItemsPeriod}
            placeholder="Select Type"
            containerStyle={styles.dropDown}
            zIndex={3000}
            zIndexInverse={1000}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Period"
            containerStyle={styles.dropDown}
            zIndex={2000}
            zIndexInverse={2000}
          />
          <DropDownPicker
            open={openYear}
            value={valueYear}
            items={itemsYear}
            setOpen={setOpenYear}
            setValue={setValueYear}
            setItems={setItemsYear}
            placeholder="Select Year"
            containerStyle={
              (styles.dropDown, { width: wp('70%'), marginBottom: 8 })
            }
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
        {error ? (
          <Text
            style={{
              color: '#DC2626',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            {error}
          </Text>
        ) : (
          <></>
        )}
        <FormStudent handleSubmit={handleSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
  },
  headingContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
  },
  imageWrapper: {
    width: wp('25%'),
    alignItems: 'center',
  },
  profilePict: {
    width: wp('18%'),
    height: hp('8.5%'),
    borderRadius: 10,
  },
  textPeriode: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  dropDown: {
    height: hp('4.5%'),
    width: wp('47.5%'),
    marginBottom: hp('5%'),
  },
});
