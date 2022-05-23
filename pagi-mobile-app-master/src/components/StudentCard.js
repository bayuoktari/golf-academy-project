import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StudentCard(props) {
  function moveToAdd() {
    props.moveAdd(props.item);
  }
  function moveToHistory() {
    props.movetoHistory(props.item.id);
  }
  let newImgUrl;

  if (props.item.profilePict) {
    newImgUrl = props.item.profilePict.replace('http://', 'https://');
  }
  let profPict =
    newImgUrl ||
    `https://ui-avatars.com/api/?name=${props.item.fullname.split().join('+')}`;

  return (
    <View style={styles.cardContainer}>
      {/* <Text>{JSON.stringify(props.item.profilePict)}</Text> */}
      <View
        style={{ justifyContent: 'center', marginLeft: 8, width: wp('24%') }}>
        <Thumbnail
          large
          source={{
            uri: profPict,
          }}
        />
      </View>
      <View>
        <Text style={styles.name}>{props.item.fullname}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="email" size={14} style={styles.email} />
          <Text style={styles.email}>{props.item.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="cellphone" size={14} style={styles.email} />
          <Text style={styles.email}>{props.item.phone}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.btnCreate} onPress={moveToAdd}>
            <Text style={{ color: '#fff' }}>Input New Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnShow} onPress={moveToHistory}>
            <Text style={{ color: '#fff' }}>Report History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 8,
    padding: hp('1%'),
    height: hp('20%'),
    shadowColor: '#000',
    marginBottom: 4,
    marginHorizontal: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  profilePict: {
    width: wp('18.5%'),
    height: hp('10.8%'),
    borderRadius: 100,
  },
  name: {
    width: wp('60%'),
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: 3,
  },
  email: {
    color: '#6B7280',
    marginRight: 5,
    marginBottom: 2,
  },
  btnShow: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#10B981',
    marginRight: 5,
    marginTop: 7,
    borderRadius: 10,
  },
  btnCreate: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#F59E0B',
    marginRight: 5,
    marginTop: 7,
    borderRadius: 10,
  },
});
