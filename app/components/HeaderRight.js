/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext, useMemo, useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  hideCountryModal,
  hideCurrencyModal,
  showClassifiedFilter,
  showCountryModal,
  showCurrencyModal,
  showProductFilter,
} from '../redux/actions';
import {Icon, Badge} from 'react-native-elements';
import {linkingPrefix} from '../constants/links';
import Share from 'react-native-share';
import I18n from '../I18n';
import widgetStyles from './widgets/widgetStyles';
import {APP_CASE, HOMEKEY, EXPO, ABATI, ISTORES} from '../../app';
import {iconSizes} from '../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from './widgets/ImageLoaderContainer';
import {isIOS} from '../constants';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {icons} from '../constants/images';
import FastImage from 'react-native-fast-image';

export const HeaderRight = ({
  showCountry = false,
  showCurrency = false,
  displayShare = false,
  showClassifiedsFilter = false,
  showProductsSearch = false,
  showExpoSearch = false,
  showHome = false,
  showCart = false,
  showProductFavorite = false,
}) => {
  const {country, settings, countryModal, currencyModal} = useSelector(
    state => state,
  );
  const {cartLength, colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params ? route.params : null;
  const [downloadTitleMessage, setDownloadTitleMessage] = useState('');
  const [androidMessage, setAndroidMessage] = useState('');
  const [iphoneMessage, setIphoneMessage] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  useMemo(() => {
    if (!ABATI) {
      setDownloadTitleMessage(
        settings.apple || settings.android
          ? `${I18n.t('download_app')} ${'\n'}`
          : '',
      );
      setAndroidMessage(
        settings.android
          ? `${settings.android ? I18n.t('android') : ''} : ${
              settings.android ? settings.android : ''
            } ${'\n'}`
          : '',
      );
      setIphoneMessage(
        settings.apple ? `${I18n.t('ios')} : ${settings.apple} ${'\n'}` : '',
      );
    }
    setShareMessage(
      `${'\n'} ${I18n.t('share_file', {
        name: I18n.t(APP_CASE),
      })} ${'\n'}`,
    );
  }, []);

  const shareLink = link => {
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: `${downloadTitleMessage} ${androidMessage} ${iphoneMessage} ${shareMessage}`,
      // subject: I18n.t('share_title', {name: I18n.t(APP_CASE)}),
    })
      .then(res => {})
      .catch(err => {});
  };

  const handleCountryModal = () => {
    if (!countryModal) {
      dispatch(showCountryModal());
    } else {
      dispatch(hideCountryModal());
    }
  };

  const handleCurrencyModal = () => {
    if (!currencyModal) {
      dispatch(showCurrencyModal());
    } else {
      dispatch(hideCurrencyModal());
    }
  };

  return (
    <View style={widgetStyles.safeContainer}>
      {showCountry && (
        <TouchableOpacity
          disabled={countryModal}
          onPress={() => handleCountryModal()}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <ImageLoaderContainer
            img={country.thumb}
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              borderWidth: 0.4,
              borderColor: '#cdcdcd',
            }}
            resizeMode={isIOS ? 'stretch' : 'cover'}
          />
        </TouchableOpacity>
      )}
      {showCurrency && (
        <Pressable
          disabled={currencyModal}
          onPress={() => handleCurrencyModal()}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <ImageLoaderContainer
            img={country.thumb}
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              borderWidth: 0.4,
              borderColor: '#cdcdcd',
            }}
            resizeMode={isIOS ? 'stretch' : 'cover'}
          />
        </Pressable>
      )}
      {displayShare && (
        <Icon
          onPress={() =>
            shareLink(
              `${linkingPrefix}${params.model}&id=${params.id}&type=${params.type}`,
            )
          }
          name="share"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showClassifiedsFilter && (
        <Icon
          onPress={() => {
            dispatch(showClassifiedFilter());
          }}
          name={EXPO ? 'search' : 'tune'}
          type="material-icon"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showProductsSearch && (
        <Icon
          onPress={() => {
            if (EXPO || ISTORES) {
              navigation.navigate('SearchTab');
            } else {
              dispatch(
                showProductFilter({
                  showColor: true,
                  showSize: true,
                  showModal: true,
                }),
              );
            }
          }}
          name="search1"
          type="antdesign"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showExpoSearch && (
        <Icon
          onPress={() => {
            navigation.navigate('Search');
          }}
          name="search1"
          type="antdesign"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showHome && (
        <Icon
          onPress={() => {
            navigation.navigate('Home');
          }}
          name="home"
          type="antdesign"
          size={iconSizes.smaller}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showCart && (
        <View>
          <Pressable
            onPress={() => navigation.navigate('CartIndex')}
            hitSlop={{
              top: iconSizes.smaller,
              bottom: iconSizes.smaller,
              left: iconSizes.smaller,
              right: iconSizes.smaller,
            }}>
            <FastImage
              source={icons.cart}
              style={{width: iconSizes.small, height: iconSizes.small}}
              tintColor={colors.footer_theme_color}
            />
          </Pressable>
          {cartLength > 0 ? (
            <Badge
              status="error"
              value={cartLength}
              containerStyle={{
                position: 'absolute',
                top: -4,
                right: -4,
                opacity: 0.9,
              }}
              badgeStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                color: colors.footer_theme_color,
              }}
            />
          ) : null}
        </View>
      )}
      {showProductFavorite && (
        <Icon
          onPress={() => {
            navigation.navigate('FavoriteProductIndex');
          }}
          name="heart"
          type="evilicon"
          size={iconSizes.medium}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
});
