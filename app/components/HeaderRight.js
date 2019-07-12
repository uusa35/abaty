/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import {DispatchContext} from '../redux/DispatchContext';
import {showCountryModal} from '../redux/actions';
import {Icon} from 'react-native-elements';
import {productPrefix, userPrefix} from '../constants';
import Share from 'react-native-share';
import I18n from '../I18n';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderRight = ({display, displayShare, navigation}) => {
  const {country} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const shareLink = link => {
    console.log('the link', link);
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t('appName')}),
      url: link,
      type: 'url',
      message: I18n.t('share_file', {name: I18n.t('appName')}),
      subject: I18n.t('share_file', {name: I18n.t('appName')})
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {display ? (
        <TouchableOpacity
          onPress={() => dispatch(showCountryModal())}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <FastImage
            source={{uri: country.thumb}}
            style={{width: 40, height: 25}}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : null}
      {displayShare ? (
        <Icon
          onPress={() =>
            shareLink(
              `${navigation.state.params.product ? productPrefix : userPrefix}${
                navigation.state.params.id
              }`
            )
          }
          name="share"
          size={25}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 3,
    paddingLeft: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80
  }
});
