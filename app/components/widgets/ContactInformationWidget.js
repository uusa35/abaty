import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking, View} from 'react-native';
import {text, touchOpacity} from '../../constants/sizes';
import {links} from '../../constants/links';
import I18n from '../../I18n';
import {Icon} from 'react-native-elements';
import MapViewWidget from './MapViewWidget';
import validate from 'validate.js';
import {APP_CASE, HOMEKEY} from './../../../app';
import ImageLoaderContainer from './ImageLoaderContainer';
import {useSelector} from 'react-redux';
import {getWhatsappLink} from '../../helpers';

const ContactInformationWidget = () => {
  const {settings} = useSelector((state) => state);
  const {longitude, latitude} = settings;
  const {colors} = settings;
  return (
    <View style={{flex: 1, backgroundColor: 'transparent', marginTop: '5%'}}>
      {settings.logo && (
        <ImageLoaderContainer
          img={settings.logo}
          resizeMode="contain"
          style={styles.logo}
        />
      )}
      {!validate.isEmpty(longitude) &&
        !validate.isEmpty(latitude) &&
        longitude.toString().length > 5 &&
        !HOMEKEY && (
          <MapViewWidget
            logo={settings.logo}
            longitude={settings.longitude}
            latitude={settings.latitude}
            title={`${settings.company} - ${settings.address}`}
            height={250}
          />
        )}
      {settings.mobile && (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() => Linking.openURL(`tel:${settings.mobile}`)}
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="phone"
              color="grey"
              iconStyle={{paddingLeft: 10}}
              color={colors.icon_theme_color}
            />
            <Text style={styles.phoneNo}>{I18n.t('mobile')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.mobile}</Text>
        </TouchableOpacity>
      )}
      {settings.whatsapp && (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() =>
            Linking.openURL(
              getWhatsappLink(settings.whatsapp, I18n.t(APP_CASE)),
            )
          }
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="whatsapp"
              type="font-awesome"
              color="grey"
              iconStyle={{paddingLeft: 10}}
              color={colors.icon_theme_color}
            />
            <Text style={styles.phoneNo}>{I18n.t('whatsapp')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.whatsapp}</Text>
        </TouchableOpacity>
      )}
      {settings.address && (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="map"
              color="grey"
              iconStyle={{paddingLeft: 10}}
              color={colors.icon_theme_color}
            />
            <Text style={styles.phoneNo}>{I18n.t('address')}</Text>
          </View>
          <Text style={[styles.phoneNo, {flex: 1, textAlign: 'right'}]}>
            {settings.address}
          </Text>
        </View>
      )}
      {!validate.isEmpty(settings.longitude) ||
        (!validate.isEmpty(latitude) && (
          <TouchableOpacity
            activeOpacity={touchOpacity}
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
                color={colors.icon_theme_color}
              />
              <Text style={styles.phoneNo}>{I18n.t('location')}</Text>
            </View>
            <Text style={styles.phoneNo}>{settings.company}</Text>
          </TouchableOpacity>
        ))}
      {settings.email && (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`mailto:${settings.email}`)}
          style={styles.container}>
          <View style={styles.wrapper}>
            <Icon
              name="email"
              color="grey"
              iconStyle={{paddingLeft: 10}}
              color={colors.icon_theme_color}
            />
            <Text style={styles.phoneNo}>{I18n.t('email')}</Text>
          </View>
          <Text style={styles.phoneNo}>{settings.email}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ContactInformationWidget;

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
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
