import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
  Pressable,
} from 'react-native';
import {View} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  bottomContentInset,
  iconSizes,
  text,
  touchOpacity,
} from '../../constants/sizes';
import {Button, Icon, Badge} from 'react-native-elements';
import I18n from './../../I18n';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import {APP_CASE} from './../../../app';
import {reAuthenticate, setRole, submitAuth} from '../../redux/actions/user';
import BgContainer from '../../components/containers/BgContainer';
import CopyRightInfo from '../../components/widgets/setting/CopyRightInfo';
import {isEmpty, first, filter} from 'lodash';
import {isIOS, width} from './../../constants';
import widgetStyles from '../../components/widgets/widgetStyles';
import {icons} from '../../constants/images';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import {adjustColor} from '../../helpers';
import {REGISTER_AS_CLIENT} from '../../redux/actions/types';

const DesigneratSettingsIndexScreen = ({navigation}) => {
  const {guest, settings, version, auth, lang} = useSelector((state) => state);
  const {colors} = settings;
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
    dispatch(refetchHomeElements());
  };

  const handleRegisterClick = () => {
    dispatch({type: REGISTER_AS_CLIENT, payload: {isClient: false}});
  };

  const shareLink = (link) => {
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: `${settings.company}  - ${settings.description}`,
      // subject: I18n.t('share_title', {name: I18n.t(APP_CASE)}),
    })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <BgContainer enableMargin={false} showImage={false} white={true}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: adjustColor(colors.btn_bg_theme_color, 50),
          }}
          onPress={() =>
            guest ? handleRegisterClick() : navigation.navigate('UserEdit')
          }>
          <FastImage
            source={{uri: auth.thumb ? auth.thumb : settings.logo}}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 70 / 2}}
          />
          <View
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}>
            <Text
              style={[
                widgetStyles.headerThree,
                {color: colors.btn_text_theme_color},
              ]}>{`${I18n.t('welcome')}  ${!guest ? auth.name : ''}`}</Text>
            {!guest && (
              <Icon
                color={colors.icon_theme_color}
                name="edit"
                type="material-icons"
                size={iconSizes.smallest}
                style={{paddingLeft: 10}}
              />
            )}
          </View>
        </TouchableOpacity>
        <View
          animation="bounceIn"
          easing="ease-out"
          useNativeDriver={true}
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            padding: 15,
            marginTop: '5%',
            width: '100%',
          }}>
          {!guest && (
            <>
              {auth.role && !auth.role.isClient && (
                <>
                  <Pressable
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 60,
                    }}
                    onPress={() => navigation.navigate('ProductCreate')}>
                    <Icon
                      color={colors.menu_theme_color}
                      name="add-circle-outline"
                      type="material"
                      size={iconSizes.smaller}
                    />
                    <Text
                      style={[
                        widgetStyles.headerTow,
                        {paddingLeft: 30, paddingRight: 30},
                      ]}>
                      {I18n.t('add_new_product')}
                    </Text>
                  </Pressable>
                  {auth.statistics.orders >= 1 && (
                    <Pressable
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 60,
                      }}
                      onPress={() => navigation.navigate('StatisticIndex')}>
                      <Icon
                        color={colors.menu_theme_color}
                        name="piechart"
                        type="antdesign"
                        size={iconSizes.smaller}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={[
                            widgetStyles.headerTow,
                            {paddingLeft: 30, paddingRight: 30},
                          ]}>
                          {I18n.t('statistics')}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                </>
              )}
              <Pressable
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                }}
                onPress={() => navigation.navigate('OrderIndex')}>
                <Icon
                  color={colors.menu_theme_color}
                  name="book"
                  type="antdesign"
                  size={iconSizes.smaller}
                />
                <Text
                  style={[
                    widgetStyles.headerTow,
                    {paddingLeft: 30, paddingRight: 30},
                  ]}>
                  {I18n.t('my_orders')}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                }}
                onPress={() => navigation.navigate('UserAddressIndex')}>
                <Icon
                  color={colors.menu_theme_color}
                  name="address-book-o"
                  type="font-awesome"
                  size={iconSizes.smaller}
                />
                <Text
                  style={[
                    widgetStyles.headerTow,
                    {paddingLeft: 30, paddingRight: 30},
                  ]}>
                  {I18n.t('my_addresses')}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                }}
                onPress={() => navigation.navigate('UserAddressCreate')}>
                <Icon
                  color={colors.menu_theme_color}
                  name="add-circle-outline"
                  type="ionicons"
                  size={iconSizes.smaller}
                />
                <Text
                  style={[
                    widgetStyles.headerTow,
                    {paddingLeft: 30, paddingRight: 30},
                  ]}>
                  {I18n.t('add_new_address')}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                }}
                onPress={() => navigation.navigate('FavoriteProductIndex')}>
                <Icon
                  color={colors.menu_theme_color}
                  name="hearto"
                  type="antdesign"
                  size={iconSizes.smaller}
                />
                <Text
                  style={[
                    widgetStyles.headerTow,
                    {paddingLeft: 30, paddingRight: 30},
                  ]}>
                  {I18n.t('wishlist')}
                </Text>
              </Pressable>
            </>
          )}

          {guest && (
            <Pressable
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
              }}
              onPress={() => navigation.navigate('Login')}>
              <Icon
                color={colors.menu_theme_color}
                name="user"
                type="font-awesome"
                size={iconSizes.smaller}
              />
              <Text
                style={[
                  widgetStyles.headerTow,
                  {paddingLeft: 30, paddingRight: 30},
                ]}>
                {I18n.t('login')}
              </Text>
            </Pressable>
          )}
          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
            }}
            onPress={() => navigation.navigate('Aboutus')}>
            <FastImage
              source={{uri: settings.logo}}
              resizeMode="cover"
              style={{width: 25, height: 25}}
            />
            <Text
              style={[
                widgetStyles.headerTow,
                {paddingLeft: 30, paddingRight: 30},
              ]}>
              {I18n.t('aboutus')}
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
            }}
            onPress={() => navigation.navigate('Contactus')}>
            <Icon
              color={colors.menu_theme_color}
              name="perm-phone-msg"
              type="material"
              size={iconSizes.smaller}
            />
            <Text
              style={[
                widgetStyles.headerTow,
                {paddingLeft: 30, paddingRight: 30},
              ]}>
              {I18n.t('contactus')}
            </Text>
          </Pressable>

          {settings.instagram && (
            <Pressable
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
              }}
              onPress={() => Linking.openURL(settings.instagram)}>
              <Icon
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                size={iconSizes.smaller}
                name="instagram"
                type="font-awesome"
                color={colors.menu_theme_color}
              />
              <Text
                style={[
                  widgetStyles.headerTow,
                  {paddingLeft: 30, paddingRight: 30},
                ]}>
                {I18n.t('follow_us_on_instagram')}
              </Text>
            </Pressable>
          )}

          {isIOS && (
            <Pressable
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
              }}
              onPress={() => Linking.openURL(settings.apple)}>
              <Icon
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                size={iconSizes.smaller}
                name="staro"
                type="antdesign"
                color={colors.menu_theme_color}
              />
              <Text
                style={[
                  widgetStyles.headerTow,
                  {paddingLeft: 30, paddingRight: 30},
                ]}>
                {I18n.t('rate_us')}
              </Text>
            </Pressable>
          )}

          {!isIOS && (
            <Pressable
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
              }}
              onPress={() =>
                Linking.openURL(isIOS ? settings.apple : settings.android)
              }>
              <Icon
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                size={iconSizes.smaller}
                name="staro"
                type="antdesign"
                color={colors.menu_theme_color}
              />
              <Text
                style={[
                  widgetStyles.headerTow,
                  {paddingLeft: 30, paddingRight: 30},
                ]}>
                {I18n.t('rate_us')}
              </Text>
            </Pressable>
          )}
          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
            }}
            onPress={() =>
              shareLink(isIOS ? settings.apple : settings.android)
            }>
            <Icon
              hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
              size={iconSizes.smaller}
              name="share"
              type="entypo"
              color={colors.menu_theme_color}
            />
            <Text
              style={[
                widgetStyles.headerTow,
                {paddingLeft: 30, paddingRight: 30},
              ]}>
              {I18n.t('share_our_app')}
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
            }}
            onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}>
            <Icon
              hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
              size={iconSizes.smaller}
              name="language"
              type="fontawesome"
              color={colors.menu_theme_color}
            />
            <Text
              style={[
                widgetStyles.headerTow,
                {paddingLeft: 30, paddingRight: 30},
              ]}>
              {I18n.t('lang')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <CopyRightInfo version={version} />
    </BgContainer>
  );
};

export default DesigneratSettingsIndexScreen;

// DesigneratSettingsIndexScreen.propTypes = {
//   guest: PropTypes.bool.isRequired,
// };
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: '5%',
  },
  btnWrapper: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    width: '45%',
    height: 120,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'center',
  },
});
