/**
 * Created by usamaahmed on 9/27/17.
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import I18n from './../I18n';
import {connect} from 'react-redux';
import {text} from './../constants';
import FastImage from 'react-native-fast-image';
import {Icon, Divider} from 'react-native-elements';
import {changeLang, logout} from '../redux/actions';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {MALLR, ABATI, HOMEKEY, ESCRAP, APP_CASE} from './../../app';

const SideMeu = ({
  menuBg,
  logo,
  company,
  images,
  colors,
  youtube,
  guest,
  lang,
  navigation,
  dispatch,
  showLogo = true,
}) => {
  return (
    <ImageBackground
      source={{
        uri: menuBg,
      }}
      loadingIndicatorSource={{uri: logo}}
      style={{width: '100%', flex: 1, opacity: 1}}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={{alignItems: 'center', paddingTop: 10}}
          contentInset={{bottom: 200}}
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <StatusBar barStyle="dark-content" />
          {showLogo ? (
            <FastImage
              source={{uri: logo}}
              style={styles.logo}
              resizeMode="contain"
              loadingIndicatorSource={{uri: logo}}
            />
          ) : null}

          <Text
            style={[
              styles.mainMenuText,
              {color: colors.header_one_theme_color},
            ]}>
            {I18n.t('menu')}
          </Text>
          <Text
            style={[
              styles.mainMenuText,
              {color: colors.header_one_theme_color},
            ]}>
            {company}
          </Text>
          <View style={{width: '100%'}}>
            <Divider style={{marginTop: 10}} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.menuBtn}>
              <Icon
                name="home"
                type="antdesign"
                size={20}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('home')}
              </Text>
            </TouchableOpacity>
            {HOMEKEY || ESCRAP ? (
              <TouchableOpacity
                onPress={() =>
                  !guest
                    ? navigation.navigate('ChooseCategory')
                    : navigation.navigate('Login')
                }
                style={styles.menuBtn}>
                <Icon
                  name="home"
                  type="antdesign"
                  size={20}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('new_classified')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {!guest ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingIndex')}
                style={styles.menuBtn}>
                <Icon
                  name="ios-settings"
                  type="ionicon"
                  size={25}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('settings')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {guest ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.menuBtn}>
                <Icon
                  name="login"
                  type="antdesign"
                  size={20}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('login')}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => dispatch(logout())}
                  style={styles.menuBtn}>
                  <Icon
                    name="login"
                    type="antdesign"
                    size={20}
                    color={colors.icon_theme_color}
                  />
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: colors.header_one_theme_color},
                    ]}>
                    {I18n.t('logout')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('Contactus')}
              style={styles.menuBtn}>
              <Icon
                name="old-phone"
                type="entypo"
                size={20}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('contactus')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermAndCondition')}
              style={styles.menuBtn}>
              <Icon
                name="handshake-o"
                type="font-awesome"
                size={20}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('terms_and_conditions')}
              </Text>
            </TouchableOpacity>
            {!validate.isEmpty(images) ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageZoom', {
                    images: images,
                    name: company,
                    index: 0,
                  })
                }
                style={styles.menuBtn}>
                <Icon
                  name="image"
                  type="entypo"
                  size={20}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('our_gallery', {name: company})}
                </Text>
              </TouchableOpacity>
            ) : null}
            {youtube ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(youtube)}
                style={styles.menuBtn}>
                <Icon
                  name="youtube"
                  type="entypo"
                  size={20}
                  color={colors.icon_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {I18n.t('our_youtube_channel')}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
              style={styles.menuBtn}>
              <Icon
                name="language"
                type="fontawesome"
                size={20}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.header_one_theme_color},
                ]}>
                {I18n.t('lang')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    menuBg: state.settings.menu_bg,
    logo: state.settings.logo,
    company: state.settings.company,
    images: state.settings.images,
    youtube: state.settings.youtube,
    colors: state.settings.colors,
    guest: state.guest,
    lang: state.lang,
    name: state.auth.name,
  };
}

export default connect(mapStateToProps)(SideMeu);

SideMeu.propTypes = {
  menuBg: PropTypes.string,
  logo: PropTypes.string,
  company: PropTypes.string,
  images: PropTypes.array,
  youtube: PropTypes.string,
  colors: PropTypes.object.isRequired,
  guest: PropTypes.bool,
  lang: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  menuBtn: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    minHeight: 50,
    borderBottomColor: 'lightgrey',
  },
  mainMenuText: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
});
