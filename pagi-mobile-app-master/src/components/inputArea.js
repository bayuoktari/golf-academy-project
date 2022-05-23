import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function InputArea({
  label,
  name,
  changeInput,
  score,
  isEdit,
  value,
}) {
  function handleChange(e) {
    changeInput({ ...score, [name]: e.nativeEvent.text });
  }
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.formLabel}>{label}</Text>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}> */}
      <View>
        <TextInput
          style={[styles.formInput]}
          multiline={true}
          numberOfLines={3}
          onChange={handleChange}
          editable={isEdit}
          defaultValue={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    marginVertical: 4,
  },
  formLabel: {
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
  },
  formInput: {
    backgroundColor: '#fff',
    // borderColor: '#4B5563',
    // width: 55,
    marginTop: 10,
    // height: 70,
    minHeight: hp('12%'),
    maxHeight: hp('20%'),
    borderBottomColor: '#4B5563',
    borderBottomWidth: 0.4,
    // textAlign: 'center',
    color: '#374151',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '700',
  },
});
