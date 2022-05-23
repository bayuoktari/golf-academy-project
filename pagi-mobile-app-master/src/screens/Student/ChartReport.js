import React, { useEffect, useState } from 'react';
import { RadarChart } from 'react-native-charts-wrapper';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  processColor,
} from 'react-native';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChartReport({ navigation, route }) {
  const [token, setToken] = useState();
  const { period, year, id } = route.params;
  const [xAxis, setXAxis] = useState({
    valueFormatter: [
      'Golf Attitude',
      'Golf Rules',
      'Accuracy',
      'Driver',
      'Iron',
      'Chip',
      'Putt',
      'Up/Down',
      'Bunker',
      'Impact Ball',
      'Face Off Play',
    ],
  });
  const [data, setData] = useState({});
  useEffect(async () => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Chart Report',
      headerStyle: {
        backgroundColor: '#10B981',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Period',
    });
    setToken(await AsyncStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    // console.log(token);
    let url = '/student/score/mbl';
    if (id) {
      url = '/student/score/' + id;
    }
    axios({
      method: 'POST',
      url: url,
      headers: {
        access_token: token,
      },
      data: {
        period,
        year,
      },
    })
      .then(({ data }) => {
        delete data.newScore.Student;
        setData({
          dataSets: [
            {
              values: [
                { value: data.newScore.knowGolfAttitude || 0 },
                { value: data.newScore.knowGolfRules || 0 },
                { value: data.newScore.knowAccuracy || 0 },
                { value: data.newScore.knowDriver || 0 },
                { value: data.newScore.knowIron || 0 },
                { value: data.newScore.knowChip || 0 },
                { value: data.newScore.knowPutt || 0 },
                { value: data.newScore.knowUpdown || 0 },
                { value: data.newScore.knowBunker || 0 },
                { value: data.newScore.knowInpactBall || 0 },
                { value: data.newScore.knowFaceOffPlay || 0 },
              ],
              label: 'Pengetahuan',
              config: {
                color: processColor('#F59E0B'),
                drawFilled: true,
                fillColor: processColor('#D97706'),
                fillAlpha: 100,
                lineWidth: 2,
              },
            },
            {
              values: [
                { value: data.newScore.skillGolfAttitude || 0 },
                { value: data.newScore.skillGolfRules || 0 },
                { value: data.newScore.skillAccuracy || 0 },
                { value: data.newScore.skillDriver || 0 },
                { value: data.newScore.skillIron || 0 },
                { value: data.newScore.skillChip || 0 },
                { value: data.newScore.skillPutt || 0 },
                { value: data.newScore.skillUpdown || 0 },
                { value: data.newScore.skillBunker || 0 },
                { value: data.newScore.skillInpactBall || 0 },
                { value: data.newScore.skillFaceOffPlay || 0 },
              ],
              label: 'Kemampuan',
              config: {
                color: processColor('#10B981'),
                drawFilled: true,
                fillColor: processColor('#059669'),
                fillAlpha: 100,
                lineWidth: 2,
              },
            },
          ],
        });
      })
      .catch(err => {});
  }, [token]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {period} {year} Report
      </Text>
      <RadarChart
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        legend={{ enabled: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  chart: {
    flex: 1,
    // height: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#10B981',
  },
});
