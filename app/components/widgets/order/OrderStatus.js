import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from '../../../I18n';
import {text} from './../../../constants/sizes';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const OrderStatus = ({element}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusWrapper,
          {
            backgroundColor: element.success
              ? colors.btn_bg_theme_color
              : '#d6d6d6',
          },
        ]}>
        <Text style={styles.smText}>{I18n.t('success')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {
            backgroundColor: element.under_process
              ? colors.btn_bg_theme_color
              : '#d6d6d6',
          },
        ]}>
        <Text style={styles.smText}>{I18n.t('under_process')}</Text>
      </View>
      {/*<View*/}
      {/*  style={[*/}
      {/*    styles.statusWrapper,*/}
      {/*    {backgroundColor: element.received ? colors.btn_bg_theme_color : '#d6d6d6'},*/}
      {/*  ]}>*/}
      {/*  <Text style={styles.smText}>{I18n.t('received')}</Text>*/}
      {/*</View>*/}
      <View
        style={[
          styles.statusWrapper,
          {
            backgroundColor: element.shipped
              ? colors.btn_bg_theme_color
              : '#d6d6d6',
          },
        ]}>
        <Text style={styles.smText}>{I18n.t('shipped')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {
            backgroundColor: element.delivered
              ? colors.btn_bg_theme_color
              : '#d6d6d6',
          },
        ]}>
        <Text style={styles.smText}>{I18n.t('delivered')}</Text>
      </View>
      <View
        style={[
          styles.statusWrapper,
          {backgroundColor: element.completed ? '#d5ff56' : '#d6d6d6'},
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
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  statusWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '19.8%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  smText: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'center',
  },
});
