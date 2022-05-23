import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FormStudent from '../components/FormStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import axios from '../axios';

export default function Report({ navigation, route }) {
  const { params } = route;
  const [token, setToken] = useState();
  const [score, setScore] = useState();
  const id = params.id;
  useEffect(async () => {
    const role = await AsyncStorage.getItem('role');
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${params.period} Report`,
      headerStyle: {
        backgroundColor: role === 'student' ? '#10B981' : '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Home',
    });
    setToken(await AsyncStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    if (token) {
      axios({
        method: 'POST',
        url: '/student/score/' + id,
        headers: {
          access_token: token,
        },
        data: {
          period: params.period,
          year: params.year,
        },
      })
        .then(({ data }) => {
          setScore(data.newScore);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 404) {
              navigation.navigate('Monthly Report', {
                errMsg: 'Report Not Found',
                id,
              });
            } else {
              navigation.navigate('Monthly Report', {
                errMsg: 'Something When Wrong',
                id,
              });
            }
          }
        });
    }
  }, [token]);

  function backToSelectReport() {
    navigation.goBack();
  }

  function updateScore(editedScore) {
    delete editedScore.Student;
    axios({
      url: 'student/score/' + editedScore.id,
      method: 'PUT',
      headers: {
        access_token: token,
      },
      data: {
        ...editedScore,
      },
    })
      .then(() => {
        navigation.navigate('StudentReport');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={
          styles.titleText
        }>{`${params.period} Report ${params.year}`}</Text>
      <FormStudent
        scoreData={score}
        resetForm={backToSelectReport}
        page="detail"
        update={updateScore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '700',
  },
});
