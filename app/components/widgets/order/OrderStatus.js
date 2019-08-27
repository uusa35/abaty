import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from '../../../I18n';
import {text} from './../../../constants';

const OrderStatus = ({o}) => {
  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.success ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('success')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.under_process ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('under_process')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.received ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('received')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.shipped ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('shipped')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.delivered ? '#bced8b' : '#d6d6d6'}
        ]}>
        <Text style={styles.smText}>{I18n.t('delivered')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: o.completed ? '#bced8b' : '#d6d6d6'}
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
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  statusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 40,
    borderRadius: 10
  },
  smText: {
    fontFamily: text.font,
    fontSize: 10,
    textAlign: 'center'
  }
});
