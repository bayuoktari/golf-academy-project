import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function StudentBio(props) {
  return (
    <View style={styles.textWrapper}>
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.subText}>Student Name</Text>
          <Text style={styles.nameContent}>{props.studentData.fullname}</Text>
        </View>
        <View>
          <Text style={styles.subText}>Gender</Text>
          <Text style={styles.textContent}>{props.studentData.gender}</Text>
        </View>
        <View>
          <Text style={styles.subText}>Birth Of Date</Text>
          <Text style={styles.textContent}>{props.studentData.birthDate}</Text>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.subText}>Phone</Text>
          <Text style={styles.textContent}>{props.studentData.phone}</Text>
        </View>
        <View>
          <Text style={styles.subText}>Education</Text>
          <Text style={styles.textContent}>{props.studentData.education}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    alignSelf: 'flex-start',
    paddingTop: 5,
    flexDirection: 'row',
  },
  subText: {
    fontSize: 10,
    color: '#6B7280',
  },
  textContent: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  nameContent: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    width: wp('41%'),
  },
  contentWrapper: {
    // marginHorizontal: '2%',
  },
});
