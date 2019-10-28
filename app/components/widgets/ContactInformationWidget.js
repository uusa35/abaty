import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {links, text} from '../../constants';
import I18n from '../../I18n';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import MapViewWidget from './MapViewWidget';
import {View} from 'react-native-animatable';
import validate from 'validate.js';

const ContactInformationWidget = props => {
  const {settings} = props;
  return (
    <View animation="bounceInLeft" easing="ease-out">
      <FastImage
        source={{uri: settings.logo}}
        resizeMode="contain"
        style={styles.logo}
      />
      {!validate.isEmpty(settings.longitude) || !validate.isEmpty(latitude) ? (
        <MapViewWidget
          logo={settings.logo}
          longitude={settings.longitude}
          latitude={settings.latitude}
          title={settings.company}
          height={250}
        />
      ) : null}

      {settings.mobile ? (
        <TouchableOpacity
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() => Linking.openURL(`tel:${settings.mobile}`)}
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon name="phone" color="grey" iconStyle={{paddingLeft: 10}} />
            <Text style={styles.phoneNo}>{I18n.t('mobile')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.mobile}</Text>
        </TouchableOpacity>
      ) : null}
      {settings.whatsapp ? (
        <TouchableOpacity
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() =>
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Escrap Support`,
            )
          }
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="whatsapp"
              type="font-awesome"
              color="grey"
              iconStyle={{paddingLeft: 10}}
            />
            <Text style={styles.phoneNo}>{I18n.t('whatsapp')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.whatsapp}</Text>
        </TouchableOpacity>
      ) : null}
      {settings.address ? (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Icon name="map" color="grey" iconStyle={{paddingLeft: 10}} />
            <Text style={styles.phoneNo}>{I18n.t('address')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.address}</Text>
        </View>
      ) : null}
      {!validate.isEmpty(settings.longitude) || !validate.isEmpty(latitude) ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() =>
            Linking.openURL(
              `${links.googleMapUrl}${settings.latitude},${settings.longitude}`,
            )
          }
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="location-on"
              color="grey"
              iconStyle={{paddingLeft: 10}}
            />
            <Text style={styles.phoneNo}>{I18n.t('location')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.company}</Text>
        </TouchableOpacity>
      ) : null}
      {settings.email ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`mailto:${settings.email}`)}
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon name="email" color="grey" iconStyle={{paddingLeft: 10}} />
            <Text style={styles.phoneNo}>{I18n.t('email')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.email}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default React.memo(ContactInformationWidget);

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 2,
    marginTop: 5,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.small,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  logo: {
    height: '12%',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
