/**
 * Created by usamaahmed on 9/27/17.
 */
import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground
} from 'react-native';
import I18n from './../I18n';
import {connect} from 'react-redux';
import {text, height} from './../constants';
import FastImage from 'react-native-fast-image';
import {Icon, Divider} from 'react-native-elements';
import {changeLang, logout} from '../redux/actions';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
  authNameSelector,
  colorsSelector,
  companyNameSelector,
  guestSelector,
  langSelector,
  logoSelector,
  menuBgSelector,
  settingImagesSelector,
  youtubeSelector
} from '../redux/selectors/collection';
import {DispatchContext} from '../redux/DispatchContext';

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
  name
}) => {
  const {dispatch} = useContext(DispatchContext);
  return (
    <ImageBackground
      source={{
        uri: menuBg
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
          <FastImage
            source={{uri: logo}}
            style={styles.logo}
            resizeMode="contain"
            loadingIndicatorSource={{uri: logo}}
          />
          <Text
            style={[
              styles.mainMenuText,
              {color: colors.header_one_theme_color}
            ]}>
            {I18n.t('menu')}
          </Text>
          <Text
            style={[
              styles.mainMenuText,
              {color: colors.header_one_theme_color}
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
                  {color: colors.header_one_theme_color}
                ]}>
                {I18n.t('home')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceIndex')}
              style={styles.menuBtn}>
              <Icon
                name="customerservice"
                type="antdesign"
                size={20}
                color={colors.icon_theme_color}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.header_one_theme_color}
                ]}>
                {I18n.t('services')}
              </Text>
            </TouchableOpacity>
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
                    {color: colors.header_one_theme_color}
                  ]}>
                  {I18n.t('login')}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileIndex', {name})}
                  style={styles.menuBtn}>
                  <Icon
                    name="profile"
                    type="antdesign"
                    size={20}
                    color={colors.icon_theme_color}
                  />
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: colors.header_one_theme_color}
                    ]}>
                    {I18n.t('profile')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('FavoriteIndex')}
                  style={styles.menuBtn}>
                  <Icon
                    name="star"
                    type="fontawesome"
                    size={25}
                    color={colors.icon_theme_color}
                  />
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: colors.header_one_theme_color}
                    ]}>
                    {I18n.t('wishlist')}
                  </Text>
                </TouchableOpacity>
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
                      {color: colors.header_one_theme_color}
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
                  {color: colors.header_one_theme_color}
                ]}>
                {I18n.t('contactus')}
              </Text>
            </TouchableOpacity>
            {!validate.isEmpty(images) ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageZoom', {
                    images: images,
                    name: company,
                    index: 0
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
                    {color: colors.header_one_theme_color}
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
                    {color: colors.header_one_theme_color}
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
                  {color: colors.header_one_theme_color}
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
    menuBg: menuBgSelector(state),
    logo: logoSelector(state),
    company: companyNameSelector(state),
    images: settingImagesSelector(state),
    youtube: youtubeSelector(state),
    colors: colorsSelector(state),
    guest: guestSelector(state),
    lang: langSelector(state),
    name: authNameSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(SideMeu));

SideMeu.propTypes = {
  menuBg: PropTypes.string,
  logo: PropTypes.string,
  company: PropTypes.string,
  images: PropTypes.array,
  youtube: PropTypes.string,
  colors: PropTypes.object.isRequired,
  guest: PropTypes.bool,
  lang: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  titleStyle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15
  },
  logo: {
    width: 120,
    height: 120
  },
  menuBtn: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: 'lightgrey'
  },
  mainMenuText: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8
  }
});
