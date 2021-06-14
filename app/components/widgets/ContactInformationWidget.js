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
import {themeColors} from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants/images';
import {iconSizes} from '../../constants/sizes';

const ContactInformationWidget = () => {
  const {settings} = useSelector(state => state);
  const {longitude, latitude} = settings;
  const {colors} = settings;
  return (
    <View style={{flex: 1, marginTop: '5%'}}>
      {settings.logo && (
        <ImageLoaderContainer
          img={settings.logo}
          resizeMode="contain"
          style={styles.logo}
        />
      )}
      {!validate.isEmpty(longitude) &&
        !validate.isEmpty(latitude) &&
        longitude.toString().length > 5 && (
          <MapViewWidget
            logo={settings.logo}
            longitude={settings.longitude}
            latitude={settings.latitude}
            title={`${settings.company} - ${settings.address}`}
            height={250}
          />
        )}
      <View
        style={{
          margin: 10,
          marginTop: '5%',
          marginBottom: '10%',
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'white',
        }}>
        {settings.mobile && (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={() => Linking.openURL(`tel:${settings.mobile}`)}
            style={styles.container}>
            <View style={styles.wrapper}>
              <Icon
                name="perm-phone-msg"
                type="material"
                iconStyle={{paddingLeft: 10}}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.phoneNo,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('mobile')}
              </Text>
            </View>
            <Text
              style={[styles.phoneNo, {color: colors.header_one_theme_color}]}>
              {settings.mobile}
            </Text>
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
                iconStyle={{paddingLeft: 10}}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.phoneNo,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('whatsapp')}
              </Text>
            </View>
            <Text
              style={[styles.phoneNo, {color: colors.header_one_theme_color}]}>
              {settings.whatsapp}
            </Text>
          </TouchableOpacity>
        )}
        {settings.address && (
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Icon
                name="map"
                type="evil"
                iconStyle={{paddingLeft: 10}}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.phoneNo,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('address')}
              </Text>
            </View>
            <Text
              style={[
                styles.phoneNo,
                {
                  flex: 1,
                  textAlign: 'right',
                  color: colors.header_one_theme_color,
                },
              ]}>
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
                  name="location"
                  type="evil"
                  iconStyle={{paddingLeft: 10}}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.phoneNo,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('location')}
                </Text>
              </View>
              <Text
                style={[
                  styles.phoneNo,
                  {color: colors.header_one_theme_color},
                ]}>
                {settings.company}
              </Text>
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
                type="evil"
                iconStyle={{paddingLeft: 10}}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.phoneNo,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('email')}
              </Text>
            </View>
            <Text
              style={[styles.phoneNo, {color: colors.header_one_theme_color}]}>
              {settings.email}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
    borderBottomWidth: 0.5,
    borderBottomColor: themeColors.desinerat.darkGray,
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
