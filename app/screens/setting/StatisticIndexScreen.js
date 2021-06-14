import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import widgetStyles from '../../components/widgets/widgetStyles';
import I18n from './../../I18n';
import {useNavigation} from '@react-navigation/native';

const StatisiticIndexScreen = () => {
  const {auth} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <View style={[widgetStyles.panelContent, {padding: 20}]}>
      <Text style={[widgetStyles.headerTow, {lineHeight: 35}]}>
        {I18n.t('total_orders_products_participated')}
      </Text>
      <View style={{marginTop: 30, marginBottom: 30, justifyContent: 'center'}}>
        <Text style={[widgetStyles.headerTow, {textAlign: 'center'}]}>
          ({auth.statistics.orders}) {I18n.t('order')}
        </Text>
      </View>
      <Text style={[widgetStyles.headerTow, {lineHeight: 35}]}>
        {I18n.t('total_products_participated')}
      </Text>
      <View style={{marginTop: 30, marginBottom: 30, justifyContent: 'center'}}>
        <Text style={[widgetStyles.headerTow, {textAlign: 'center'}]}>
          ({auth.statistics.orders_products}) {I18n.t('product')}
        </Text>
      </View>

      <Pressable
        style={{marginTop: 50, marginBottom: 30, justifyContent: 'center'}}
        onPress={() => navigation.navigate('Contactus')}>
        <Text
          style={[
            widgetStyles.headerThree,
            {textAlign: 'center', lineHeight: 35},
          ]}>
          {I18n.t('for_more_information_contact_administration')}
        </Text>
      </Pressable>
    </View>
  );
};

export default StatisiticIndexScreen;
