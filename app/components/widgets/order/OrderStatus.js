import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from '../../../I18n';
import {text} from './../../../constants';

const OrderStatus = ({ element }) => {
  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.success ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('success')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.under_process ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('under_process')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.received ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('received')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.shipped ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('shipped')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.delivered ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('delivered')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.completed ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('completed')}</Text>
      </View>
    </View>
  );
};
export default OrderStatus;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  statusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '16.5%',
    height: 40,
  },
  smText: {
    fontFamily: text.font,
    fontSize: 10,
    textAlign: 'center'
  }
});
