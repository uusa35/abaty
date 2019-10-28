/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DispatchContext} from '../redux/DispatchContext';
import {showCountryModal} from '../redux/actions';
import {Icon} from 'react-native-elements';
import {linkingPrefix} from '../constants';
import Share from 'react-native-share';
import I18n from '../I18n';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import widgetStyles from './widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';
import {SHOW_SEARCH_MODAL} from '../redux/actions/types';

export const HeaderRight = ({
  showCountry = false,
  displayShare = false,
  showFilter = false,
}) => {
  const {country} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const navigation = useNavigation();
  const shareLink = link => {
    __DEV__ ? console.log('the link', link) : null;
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t('appName')}),
      url: link,
      type: 'url',
      message: I18n.t('share_file', {name: I18n.t('appName')}),
      subject: I18n.t('share_file', {name: I18n.t('appName')}),
    })
      .then(res => {
        __DEV__ ? console.log(res) : null;
      })
      .catch(err => {
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
            style={{width: 35, height: 20}}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : null}
      {displayShare ? (
        <Icon
          onPress={() =>
            shareLink(
              `${linkingPrefix}model=${navigation.state.params.model}&id=${navigation.state.params.id}`,
            )
          }
          name="share"
          size={25}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
        />
      ) : null}
      {showFilter ? (
        <Icon
          onPress={() => {
            dispatch({type: SHOW_SEARCH_MODAL});
            navigation.navigate('ClassifiedFilter');
          }}
          name="tune"
          type="material-icon"
          size={25}
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
