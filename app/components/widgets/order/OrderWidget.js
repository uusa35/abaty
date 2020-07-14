import React, {useContext, useCallback} from 'react';
import {
  View,
  Linking,
  Text,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import {appUrlIos} from '../../../env';
import {text} from '../../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../../I18n';
import OrderStatus from './OrderStatus';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ImageLoaderContainer from '../ImageLoaderContainer';

const OrderWidget = ({element}) => {
  const {colors, logo} = useContext(GlobalValuesContext);

  const writeToClipboard = useCallback((text) => {
    Clipboard.setString(text);
    alert(I18n.t('shipment_copied'));
  });

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderRadius: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <ImageLoaderContainer
          img={logo}
          style={{width: 80, height: 80, margin: 5}}
          resizeMode="contain"
        />
        <View style={{flex: 1, paddingRight: 10}}>
          <View style={styles.itemWrapper}>
            <Icon
              type="feather"
              name="folder"
              containerStyle={styles.iconElement}
              size={20}
            />
            <Text style={styles.title}>{I18n.t('order_no')}</Text>
            <Text style={styles.normalText}>{element.id}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Icon
              type="feather"
              name="clipboard"
              containerStyle={styles.iconElement}
              size={20}
            />
            <Text style={styles.title}>{I18n.t('order_status')}</Text>
            <Text style={styles.normalText}>{element.status}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Icon
              type="feather"
              name="calendar"
              containerStyle={styles.iconElement}
              size={20}
            />
            <Text style={styles.title}>{I18n.t('order_date')}</Text>
            <Text style={styles.normalText}>{element.date}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Icon
              type="feather"
              name="tag"
              containerStyle={styles.iconElement}
              size={20}
            />
            <Text style={styles.title}>{I18n.t('net_price')}</Text>
            <Text style={styles.normalText}>
              {element.net_price} {I18n.t('kwd')}
            </Text>
          </View>
          {element.shipment_reference ? (
            <View style={{paddingBottom: 3}}>
              <View style={styles.itemWrapper}>
                <Icon
                  type="material-community"
                  name="truck-fast"
                  containerStyle={styles.iconElement}
                  size={20}
                />
                <Text style={styles.title}>{I18n.t('shipment_reference')}</Text>
                <TouchableOpacity
                  style={styles.normalText}
                  onPress={() => writeToClipboard(element.shipment_reference)}>
                  <Text style={styles.normalText}>
                    {element.shipment_reference}
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                onPress={() => Linking.openURL(`http://dhl.com`)}
                containerStyle={{alignSelf: 'flex-end', width: 100}}
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
      <OrderStatus element={element} />
      <Button
        key={element.id}
        onPress={() =>
          Linking.openURL(`${appUrlIos}view/invoice/${element.id}`)
        }
        title={I18n.t('see_invoice')}
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
      />
    </View>
  );
};

export default OrderWidget;

const styles = StyleSheet.create({
  title: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
  normalText: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
  smText: {
    fontFamily: text.font,
    fontSize: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
  },
  iconElement: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
