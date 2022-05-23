import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';
import { month, getYear } from '../../helpers/periodHelper';

export default function PdfReport({ route, navigation }) {
  let id;
  if (!route.params) {
    id = '';
  } else {
    id = route.params.id;
  }

  useEffect(async () => {
    const role = await AsyncStorage.getItem('role');
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Select Report Type',
      headerStyle: {
        backgroundColor: role === 'student' ? '#10B981' : '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Home',
    });
    setToken(await AsyncStorage.getItem('access_token'));
  }, []);

  const [openPeriod, setOpenPeriod] = useState(false);
  const [valuePeriod, setValuePeriod] = useState(null);
  const [itemsPeriod, setItemsPeriod] = useState([
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Semester', value: 'Semester' },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(month);

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState(getYear);

  const [selectedYear, setSelectedYear] = useState();
  const [dateYear, setDateYear] = useState({});
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [token, setToken] = useState();

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

  function handleShowReport() {
    if (!value || !valueYear) {
      setError('Please Select Month and Year First');
    } else {
      setError('');
      setDateYear({ period: selectedPeriod, year: selectedYear });
      setShowReport(true);
    }
  }

  function handleShowChart() {
    if (!value || !valueYear) {
      setError('Please Select Month and Year First');
    } else {
      setError('');
      navigation.navigate('ChartReport', { period: value, year: valueYear });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
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
              marginTop: 8,
            }}>
            {error}
          </Text>
        ) : (
          <></>
        )}
        <TouchableOpacity style={styles.btnChart} onPress={handleShowChart}>
          <Text style={styles.btnText}>Show Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSubmit} onPress={handleShowReport}>
          <Text style={styles.btnText}>Get Report</Text>
        </TouchableOpacity>
      </View>
      {showReport && (
        <View style={styles.pdfWrapper}>
          <Pdf
            source={{
              // uri: `http://10.10.100.104:3001/student/monthlyreport?period=${value
              //   .split(' ')
              //   .join('%20')}&year=${valueYear}&studentId=${id || ''}`,
              // uri: `https://staging-api-pagi.grt19.com/student/monthlyreport?period=${value
              //   .split(' ')
              //   .join('%20')}&year=${valueYear}&studentId=${id || ''}`,
              uri: `https://pagi-api.grt19.com/student/monthlyreport?period=${value
                .split(' ')
                .join('%20')}&year=${valueYear}&studentId=${id || ''}`,
              headers: { access_token: token },
            }}
            onError={error => {
              // console.log(value.split(' ').join('%20'));
              // console.log(error);
              setShowReport(false);
              setError(`Report of ${value} ${valueYear} Not Found`);
            }}
            style={styles.pdf}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
  },
  textPeriode: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  dropDown: {
    height: hp('5%'),
    width: wp('47.1%'),
    marginBottom: hp('5%'),
  },
  btnSubmit: {
    backgroundColor: '#10B981',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  btnChart: {
    backgroundColor: '#10B981',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  searchWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
