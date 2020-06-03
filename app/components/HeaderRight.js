/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DispatchContext} from '../redux/DispatchContext';
import {
  showClassifiedFilter,
  showCountryModal,
  showProductFilter,
} from '../redux/actions';
import {Icon} from 'react-native-elements';
import {linkingPrefix} from '../constants/links';
import Share from 'react-native-share';
import I18n from '../I18n';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import widgetStyles from './widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';
import {SHOW_SEARCH_MODAL} from '../redux/actions/types';
import {APP_CASE, HOMEKEY, EXPO} from '../../app';
import {iconSizes} from '../constants/sizes';

export const HeaderRight = ({
  showCountry = false,
  displayShare = false,
  showClassifiedsFilter = false,
  showProductsSearch = false,
  showExpoSearch = false,
}) => {
  const {country, countriesLength} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const navigation = useNavigation();
  const {params} = navigation.state;

  const shareLink = (link) => {
    __DEV__ ? console.log('the link', link) : null;
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      subject: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
    })
      .then((res) => {
        __DEV__ ? console.log(res) : null;
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  return (
    <View style={widgetStyles.safeContainer}>
      {showCountry ? (
        <TouchableOpacity
          onPress={() => dispatch(showCountryModal())}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <FastImage
            source={{uri: country.thumb}}
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              borderWidth: 0.4,
              borderColor: '#cdcdcd',
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : null}
      {displayShare ? (
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
      ) : null}
      {showClassifiedsFilter ? (
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
      ) : null}
      {showProductsSearch ? (
        <Icon
          onPress={() => {
            dispatch(showProductFilter());
          }}
          name="ios-search"
          type="ionicon"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
        />
      ) : null}
      {showExpoSearch ? (
        <Icon
          onPress={() => {
            navigation.navigate('Search');
          }}
          name="ios-search"
          type="ionicon"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
        />
      ) : null}
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
