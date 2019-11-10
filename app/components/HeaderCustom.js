/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';
import {linkingPrefix} from './../constants';
import I18n from './../I18n';
import {useNavigation} from 'react-navigation-hooks';
import {APP_CASE} from '../../app';

const HeaderCustom = () => {
  const navigation = useNavigation();
  const {params} = navigation.state;
  const shareLink = link => {
    __DEV__ ? console.log('the link', link) : null;
    return Share.open({
      title: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      url: link,
      type: 'url',
      message: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
      subject: I18n.t('share_file', {name: I18n.t(APP_CASE)}),
    })
      .then(res => {
        __DEV__ ? console.log(res) : null;
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <Icon
        onPress={() =>
          shareLink(`${linkingPrefix}${params.model}&id=${params.id}`)
        }
        name="share"
        size={25}
        underlayColor="transparent"
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        color="black"
      />
    </View>
  );
};

export default React.memo(HeaderCustom);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
