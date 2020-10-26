/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  hideCountryModal,
  showClassifiedFilter,
  showCountryModal,
  showProductFilter,
} from '../redux/actions';
import {Icon, Badge} from 'react-native-elements';
import {linkingPrefix} from '../constants/links';
import Share from 'react-native-share';
import I18n from '../I18n';
import widgetStyles from './widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';
import {APP_CASE, HOMEKEY, EXPO, ABATI} from '../../app';
import {iconSizes} from '../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from './widgets/ImageLoaderContainer';
import {isIOS} from '../constants';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderRight = ({
  showCountry = false,
  displayShare = false,
  showClassifiedsFilter = false,
  showProductsSearch = false,
  showExpoSearch = false,
  showHome = false,
  showCart = false,
}) => {
  const {country, settings, countryModal} = useSelector((state) => state);
  const {cartLength, colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = navigation.state;
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

  const shareLink = (link) => {
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: `${downloadTitleMessage} ${androidMessage} ${iphoneMessage} ${shareMessage}`,
      // subject: I18n.t('share_title', {name: I18n.t(APP_CASE)}),
    })
      .then((res) => {})
      .catch((err) => {});
  };

  const handleCountryModal = () => {
    if (!countryModal) {
      dispatch(showCountryModal());
    } else {
      dispatch(hideCountryModal());
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
          color="black"
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
          color="black"
        />
      )}
      {showProductsSearch && (
        <Icon
          onPress={() => {
            dispatch(showProductFilter());
          }}
          name="search1"
          type="antdesign"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
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
          color="black"
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
          color="black"
        />
      )}
      {showCart && (
        <View>
          <Icon
            onPress={() => navigation.navigate('CartIndex')}
            name="shoppingcart"
            type="antdesign"
            size={iconSizes.small}
            underlayColor="transparent"
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            color={colors.icon_theme_color}
          />
          {cartLength > 0 ? (
            <Badge
              status="error"
              value={cartLength}
              containerStyle={{
                position: 'absolute',
                top: -4,
                right: -4,
                opacity: 0.8,
              }}
            />
          ) : null}
        </View>
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
