/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  showClassifiedFilter,
  showCountryModal,
  showProductFilter,
} from '../redux/actions';
import {Icon} from 'react-native-elements';
import {linkingPrefix} from '../constants/links';
import Share from 'react-native-share';
import I18n from '../I18n';
import widgetStyles from './widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';
import {APP_CASE, HOMEKEY, EXPO} from '../../app';
import {iconSizes} from '../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from './widgets/ImageLoaderContainer';
import {isIOS} from '../constants';

export const HeaderRight = ({
  showCountry = false,
  displayShare = false,
  showClassifiedsFilter = false,
  showProductsSearch = false,
  showExpoSearch = false,
  showHome = false,
}) => {
  const {country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = navigation.state;

  const shareLink = (link) => {
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: `${I18n.t('download_app')}  ${'\n\n'} ${I18n.t('android')} : ${
        settings.android
      } ${'\n'} ${I18n.t('ios')} : ${settings.apple} ${'\n'} ${I18n.t(
        'share_file',
        {
          name: I18n.t(APP_CASE),
        },
      )} ${'\n'} `,
      subject: I18n.t('share_title', {name: I18n.t(APP_CASE)}),
    })
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <View style={widgetStyles.safeContainer}>
      {showCountry && (
        <TouchableOpacity
          onPress={() => dispatch(showCountryModal())}
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
