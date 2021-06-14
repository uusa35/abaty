import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import I18n from './../../I18n';
import {bottomContentInset, iconSizes, text} from './../../constants/sizes';
import FastImage from 'react-native-fast-image';
import {Icon, Divider} from 'react-native-elements';
import validate from 'validate.js';
import {useSelector, useDispatch} from 'react-redux';
import {HOMEKEY} from './../../../app.json';
import {TabActions, DrawerActions} from '@react-navigation/native';
import {changeLang} from '../../redux/actions';
import {logout} from '../../redux/actions/user';
import PropTypes from 'prop-types';

const AbatiSideMenu = ({showLogo = true, navigation}) => {
  const settings = useSelector(state => state.settings);
  const {logo, company, menu_bg, youtube, colors, terms, policy} = settings;
  const {lang, guest} = useSelector(state => state);
  const dispatch = useDispatch();

  const goToHome = () => {
    navigation.closeDrawer();
    navigation.navigate('Home');
  };
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        opacity: 1,
        backgroundColor: colors.footer_bg_theme_color,
      }}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={{alignItems: 'center', paddingTop: 10}}
          contentInset={{bottom: bottomContentInset}}
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <StatusBar
            barStyle={`light-content`}
            backgroundColor={colors.footer_bg_theme_color}
          />
          <View style={{alignItems: 'flex-end', width: '100%'}}>
            <Icon
              name="close-o"
              type="evilicon"
              size={iconSizes.medium}
              color={colors.footer_theme_color}
              onPress={() => navigation.closeDrawer()}
            />
          </View>
          {showLogo ? (
            <FastImage
              source={{uri: settings.app_logo}}
              style={styles.logo}
              resizeMode="contain"
              loadingIndicatorSource={{uri: logo}}
            />
          ) : null}

          <Text
            style={[styles.mainMenuText, {color: colors.footer_theme_color}]}>
            {I18n.t('menu')}
          </Text>
          <Text
            style={[styles.mainMenuText, {color: colors.footer_theme_color}]}>
            {company}
          </Text>
          <View style={{width: '100%'}}>
            <Divider
              style={{
                marginTop: 20,
                borderWidth: 0.4,
                borderColor: colors.btn_bg_theme_color,
              }}
            />
            <TouchableOpacity
              onPress={() => goToHome()}
              style={[
                styles.menuBtn,
                {
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.btn_bg_theme_color,
                },
              ]}>
              <Icon
                name="home"
                type="antdesign"
                size={iconSizes.smaller}
                color={colors.footer_theme_color}
              />
              <Text
                style={[styles.titleStyle, {color: colors.footer_theme_color}]}>
                {I18n.t('home')}
              </Text>
            </TouchableOpacity>
            {HOMEKEY ? (
              <TouchableOpacity
                onPress={() =>
                  !guest
                    ? navigation.navigate('ChooseCategory')
                    : navigation.navigate('Login')
                }
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="home"
                  type="antdesign"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('new_classified')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {!guest ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                  navigation.dispatch(TabActions.jumpTo('SettingTab'));
                }}
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="gear"
                  type="evilicon"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('settings')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {guest ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="login"
                  type="antdesign"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('login')}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => dispatch(logout())}
                  style={[
                    styles.menuBtn,
                    {
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.btn_bg_theme_color,
                    },
                  ]}>
                  <Icon
                    name="login"
                    type="antdesign"
                    size={iconSizes.smaller}
                    color={colors.footer_theme_color}
                  />
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: colors.footer_theme_color},
                    ]}>
                    {I18n.t('logout')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('Contactus', {reset: false})}
              style={[
                styles.menuBtn,
                {
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.btn_bg_theme_color,
                },
              ]}>
              <Icon
                name="perm-phone-msg"
                type="material"
                size={iconSizes.smaller}
                color={colors.footer_theme_color}
              />
              <Text
                style={[styles.titleStyle, {color: colors.footer_theme_color}]}>
                {I18n.t('contactus')}
              </Text>
            </TouchableOpacity>
            {terms.length > 100 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('TermAndCondition')}
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="book-open"
                  type="simple-line-icon"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('terms_and_conditions')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {policy.length > 100 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Policy')}
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="handshake-o"
                  type="font-awesome"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('policies')}
                </Text>
              </TouchableOpacity>
            ) : null}
            {!validate.isEmpty(settings.images) ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageZoom', {
                    images: settings.images,
                    name: company,
                    index: 0,
                  })
                }
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="image"
                  type="entypo"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('our_gallery', {name: company})}
                </Text>
              </TouchableOpacity>
            ) : null}
            {youtube ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(youtube)}
                style={[
                  styles.menuBtn,
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.btn_bg_theme_color,
                  },
                ]}>
                <Icon
                  name="youtube"
                  type="entypo"
                  size={iconSizes.smaller}
                  color={colors.footer_theme_color}
                />
                <Text
                  style={[
                    styles.titleStyle,
                    {color: colors.footer_theme_color},
                  ]}>
                  {I18n.t('our_youtube_channel')}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
              style={[
                styles.menuBtn,
                {
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.btn_bg_theme_color,
                },
              ]}>
              <Icon
                name="language"
                type="fontawesome"
                size={iconSizes.smaller}
                color={colors.footer_theme_color}
              />
              <Text
                style={[styles.titleStyle, {color: colors.footer_theme_color}]}>
                {I18n.t('lang')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AbatiSideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.small,
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
