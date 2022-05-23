import React, { useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function InputNumber({
  label,
  name,
  changeInput,
  score,
  isEdit,
  valueKnow,
  valueSkill,
}) {
  function handleChange(e) {
    if (Number(e.nativeEvent.text) >= 100) {
      e.nativeEvent.text = 100;
    } else if (Number(e.nativeEvent.text) < 0) {
      e.nativeEvent.text = 0;
    }
    changeInput({ ...score, [`know${name}`]: Number(e.nativeEvent.text) });
  }

  function handleChange2(e) {
    if (Number(e.nativeEvent.text) >= 100) {
      e.nativeEvent.text = 100;
    } else if (Number(e.nativeEvent.text) < 0) {
      e.nativeEvent.text = 0;
    }
    changeInput({ ...score, [`skill${name}`]: Number(e.nativeEvent.text) });
  }

  return (
    <View style={styles.formWrapper}>
      <Text style={styles.formLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TextInput
          style={[styles.formInput]}
          keyboardType="numeric"
          onChange={handleChange}
          editable={isEdit}
          defaultValue={
            valueKnow
              ? String(valueKnow)
              : !score || !score[`know${name}`]
              ? '0'
              : String(score[`know${name}`])
          }
        />
        <TextInput
          style={[styles.formInput, { marginLeft: 50, marginRight: 15 }]}
          keyboardType="numeric"
          onChange={handleChange2}
          editable={isEdit}
          defaultValue={
            valueSkill
              ? String(valueSkill)
              : !score || !score[`skill${name}`]
              ? '0'
              : String(score[`skill${name}`])
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  formLabel: {
    fontWeight: '700',
    fontSize: 16,
  },
  formInput: {
    backgroundColor: '#fff',
    // borderColor: '#4B5563',
    width: wp('15%'),
    borderBottomColor: '#4B5563',
    borderBottomWidth: 0.4,
    textAlign: 'center',
    color: '#374151',
    paddingBottom: 2,
    paddingTop: 2,
    fontWeight: '700',
  },
});
