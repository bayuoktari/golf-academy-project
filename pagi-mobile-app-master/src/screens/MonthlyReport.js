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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Pdf from 'react-native-pdf';
import { month, getYear } from '../helpers/periodHelper';

export default function MonthlyReport({ navigation, route }) {
  let id;
  if (!route.params) {
    id = '';
  } else {
    id = route.params.id;
  }

  const [openPeriod, setOpenPeriod] = useState(false);
  const [valuePeriod, setValuePeriod] = useState(null);
  const [itemsPeriod, setItemsPeriod] = useState([
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Semester', value: 'Semester' },
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(month);

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState(getYear);

  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [dateYear, setDateYear] = useState({});
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    if (route.params.errMsg) {
      setError(route.params.errMsg);
    }
  }, [route.params.errMsg]);

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

  useEffect(async () => {
    const role = await AsyncStorage.getItem('role');
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Select Report Type',
      headerStyle: {
        backgroundColor: role === 'student' ? '#10B981' : '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'List',
    });
    setToken(await AsyncStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError();
    }, 3500);
  }, [error]);

  function handleShowReport() {
    if (!value || !valueYear) {
      setError('Please Select Period and Year First');
    } else {
      setDateYear({ period: selectedPeriod, year: selectedYear });
      setShowReport(true);
      navigation.navigate('ReportDetail', {
        period: value,
        year: valueYear,
        id,
      });
    }
  }

  function handleShowChart() {
    if (!value || !valueYear) {
      setError('Please Select Period and Year First');
    } else {
      setDateYear({ period: selectedPeriod, year: selectedYear });
      setShowReport(true);
      navigation.navigate('ChartReport', {
        period: value,
        year: valueYear,
        id,
      });
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
              (styles.dropDown, { marginBottom: 3, width: wp('80%') })
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
    width: wp('47%'),
    marginBottom: hp('5%'),
  },
  btnSubmit: {
    backgroundColor: '#10B981',
    padding: 12,
    justifyContent: 'center',
    marginVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
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
  btnChart: {
    backgroundColor: '#10B981',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 5,
  },
});
