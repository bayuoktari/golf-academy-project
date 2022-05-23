import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputNumber from './InputNumber';
import InputArea from './inputArea';

export default function FormStudent({
  handleSubmit,
  loading,
  scoreData,
  resetForm,
  update,
  page,
}) {
  const [allScore, setAllScore] = useState();
  const [isEdit, setIsEdit] = useState(false);

  function submitScore() {
    handleSubmit(allScore);
  }

  useEffect(() => {
    if (!scoreData) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
      setAllScore(scoreData);
    }
  }, [scoreData]);

  function updateAll() {
    update(allScore);
  }

  return (
    <ScrollView
      style={[
        { paddingHorizontal: 15, paddingBottom: 20, height: hp('50%') },
        Platform.OS === 'android' && { height: hp('50%') },
      ]}
      contentContainerStyle={{ paddingBottom: 60 }}>
      <KeyboardAwareScrollView enableOnAndroid={true} scrollEnabled={true}>
        <View style={styles.titleTable}>
          <Text style={{ fontWeight: '700' }}>Point Penilaian</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{ fontWeight: '700' }}>Pengetahuan</Text>
            <Text style={{ marginLeft: 18, fontWeight: '700' }}>
              Keterampilan
            </Text>
          </View>
        </View>
        <View>
          <InputNumber
            label="Golf Attitude"
            name="GolfAttitude"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowGolfAttitude : 0}
            valueSkill={scoreData ? scoreData.skillGolfAttitude : 0}
          />
          <InputNumber
            label="Golf Rules"
            name="GolfRules"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowGolfRules : 0}
            valueSkill={scoreData ? scoreData.skillGolfRules : 0}
          />
          <InputNumber
            label="Accuracy"
            name="Accuracy"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowAccuracy : 0}
            valueSkill={scoreData ? scoreData.skillAccuracy : 0}
          />
          <InputNumber
            label="Driver"
            name="Driver"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowDriver : 0}
            valueSkill={scoreData ? scoreData.skillDriver : 0}
          />
          <InputNumber
            label="Iron"
            name="Iron"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowIron : 0}
            valueSkill={scoreData ? scoreData.skillIron : 0}
          />
          <InputNumber
            label="Chip"
            name="Chip"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowChip : 0}
            valueSkill={scoreData ? scoreData.skillChip : 0}
          />
          <InputNumber
            label="Putt"
            name="Putt"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowPutt : 0}
            valueSkill={scoreData ? scoreData.skillPutt : 0}
          />
          <InputNumber
            label="Up / Down"
            name="Updown"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowUpdown : 0}
            valueSkill={scoreData ? scoreData.skillUpdown : 0}
          />
          <InputNumber
            label="Bunker"
            name="Bunker"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowBunker : 0}
            valueSkill={scoreData ? scoreData.skillBunker : 0}
          />
          <InputNumber
            label="Impact Ball"
            name="InpactBall"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowInpactBall : 0}
            valueSkill={scoreData ? scoreData.skillInpactBall : 0}
          />
          <InputNumber
            label="Face Off Play"
            name="FaceOffPlay"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            valueKnow={scoreData ? scoreData.knowFaceOffPlay : 0}
            valueSkill={scoreData ? scoreData.skillFaceOffPlay : 0}
          />
          <InputArea
            label="Course Maintenance"
            name="courseMaintenance"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            value={scoreData && scoreData.courseMaintenance}
          />
          <InputArea
            label="Coach Notes"
            name="coachNote"
            changeInput={setAllScore}
            score={allScore}
            isEdit={isEdit}
            value={scoreData && scoreData.coachNote}
          />
        </View>
        {!scoreData ? (
          <TouchableOpacity style={styles.btnSubmit} onPress={submitScore}>
            {loading ? (
              <ActivityIndicator color="#fff" size={'small'} />
            ) : (
              <Text style={styles.btnText}>Submit Score</Text>
            )}
          </TouchableOpacity>
        ) : isEdit && scoreData ? (
          <View>
            <TouchableOpacity style={styles.btnCancel} onPress={resetForm}>
              {loading ? (
                <ActivityIndicator color="#fff" size={'small'} />
              ) : (
                <Text style={styles.btnText}>Cancel Edit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit} onPress={updateAll}>
              {loading ? (
                <ActivityIndicator color="#fff" size={'small'} />
              ) : (
                <Text style={styles.btnText}>Save Change</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              setIsEdit(true);
            }}>
            <Text style={styles.btnText}>Edit Score</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleTable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#000',
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  btnSubmit: {
    backgroundColor: '#10B981',
    padding: 12,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 40,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  btnCancel: {
    backgroundColor: '#DC2626',
    padding: 12,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
  },
});
