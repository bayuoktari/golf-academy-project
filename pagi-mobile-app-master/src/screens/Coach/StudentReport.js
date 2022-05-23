import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { getStudentList } from '../../store/actions/other';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StudentCard from '../../components/StudentCard';

export default function StudentReport({ navigation }) {
  const [listStudent, setListStudent] = useState([]);
  const [studentsTemp, setStudentsTemp] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Student Report',
      headerStyle: {
        backgroundColor: '#EF6637',
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Home',
    });
  }, []);

  useEffect(() => {
    dispatch(getStudentList())
      .then(({ data }) => {
        setListStudent(data.student);
        setStudentsTemp(data.student);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function moveToAdd(data) {
    navigation.navigate('AddReport', data);
  }

  function movetoHistory(id) {
    // console.log(id);
    navigation.navigate('Monthly Report', { id: id });
  }

  function searchFilterFunction(text) {
    const newData = studentsTemp.filter(item => {
      const itemData = `${item.fullname.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setListStudent(newData);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon
          style={styles.searchIcon}
          name="account-search"
          size={25}
          color="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Search Student Name"
          underlineColorAndroid="transparent"
          placeholderTextColor="#6B7280"
          onChangeText={text => searchFilterFunction(text)}
        />
      </View>
      <FlatList
        data={listStudent}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => (
          <StudentCard
            item={item}
            moveAdd={moveToAdd}
            movetoHistory={movetoHistory}
          />
        )}
        keyExtractor={item => item.id}
      />
      {/* <StudentCard /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
  },
  searchSection: {
    // flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
