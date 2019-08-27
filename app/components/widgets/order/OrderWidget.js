import React from 'react';
import {View, Linking, Text, StyleSheet} from 'react-native';
import {appUrlIos} from '../../../env';
import {images, text} from '../../../constants';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import I18n from './../../../I18n';
import OrderStatus from './OrderStatus';

const OrderWidget = ({o, colors, logo}) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          source={{uri: logo}}
          style={{width: 80, height: 80, margin: 5}}
          resizeMode="contain"
          loadingIndicatorSource={images.logo}
        />
        <View>
          <View style={{flexDirection: 'row', paddingBottom: 3}}>
            <Text style={styles.title}>{I18n.t('order_no')}</Text>
            <Text style={styles.normalText}>{o.id}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 3}}>
            <Text style={styles.title}>{I18n.t('order_status')}</Text>
            <Text style={styles.normalText}>{o.status}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 3}}>
            <Text style={styles.title}>{I18n.t('order_date')}</Text>
            <Text style={styles.normalText}>{o.date}</Text>
          </View>
          {o.shipment_reference ? (
            <View style={{paddingBottom: 3}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{I18n.t('shipment_reference')}</Text>
                <Text style={styles.normalText}>{o.shipment_reference}</Text>
              </View>
              <Button
                onPress={() => Linking.openURL(`http://dhl.com`)}
                buttonStyle={{padding: 3}}
                titleStyle={{fontFamily: text.font, fontSize: text.small}}
                raised
                title={I18n.t('track')}
                type="outline"
              />
            </View>
          ) : null}
        </View>
      </View>
      <OrderStatus o={o} />
      <Button
        key={o.id}
        onPress={() => Linking.openURL(`${appUrlIos}/view/invoice/${o.id}`)}
        title={I18n.t('see_invoice')}
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
      />
    </View>
  );
};

export default OrderWidget;

const styles = StyleSheet.create({
  title: {
    fontFamily: text.font,
    fontSize: text.medium
  },
  normalText: {
    fontFamily: text.font,
    fontSize: text.medium
  },
  smText: {
    fontFamily: text.font,
    fontSize: 10
  }
});
