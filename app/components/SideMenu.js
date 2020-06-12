import React, {Fragment, useEffect} from 'react';
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
import {iconSizes, text} from './../constants/sizes';
import {isIOS} from './../constants';
import FastImage from 'react-native-fast-image';
import {Icon, Divider} from 'react-native-elements';
import {changeLang} from '../redux/actions';
import {logout} from '../redux/actions/user';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {HOMEKEY, ESCRAP} from './../../app';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';

const SideMeu = ({showLogo = true}) => {
  const {
    logo,
    company,
    images,
    menu_bg,
    youtube,
    colors,
    terms,
    policy,
  } = useSelector((state) => state.settings);
  const {lang, guest} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: menu_bg ? menu_bg : images.whiteBgUrl,
      }}
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
          <StatusBar
            barStyle={isIOS ? `dark-content` : `light-content`}
            backgroundColor={colors.menu_theme_bg}
          />
          <View style={{alignItems: 'flex-end', width: '100%'}}>
            <Icon
              name="close-o"
              type="evilicon"
              size={iconSizes.medium}
              color={colors.main_theme_color}
              onPress={() => navigation.closeDrawer()}
            />
          </View>
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
            {__DEV__ && (
              <Fragment>
                <TouchableOpacity onPress={() => navigation.navigate('Mallr')}>
                  <Text>Mallr</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Escrap')}>
                  <Text>Escrap</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Homekey')}>
                  <Text>Homekey</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ClassifiedIndex')}>
                  <Text>Classifieds</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Expo')}>
                  <Text>MyExpo</Text>
                </TouchableOpacity>
              </Fragment>
            )}
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
              onPress={() => navigation.navigate('Contactus', {reset: false})}
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
            {terms.length > 100 ? (
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
            ) : null}
            {policy.length > 100 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Policy')}
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
                  {I18n.t('policies')}
                </Text>
              </TouchableOpacity>
            ) : null}
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
    terms: state.settings.terms,
    policy: state.settings.policy,
  };
}

export default SideMeu;

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
