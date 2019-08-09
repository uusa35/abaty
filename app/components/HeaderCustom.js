/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';
import {userPrefix, productPrefix} from './../constants';
import I18n from './../I18n';

const HeaderCustom = ({navigation}) => {
  const shareLink = link => {
    console.log('the link', link);
    return Share.open({
      title: I18n.t('share_file'),
      url: link,
      type: 'url',
      message: I18n.t('share_file'),
      subject: I18n.t('share_file')
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.container}>
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
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        color="black"
      />
    </View>
  );
};

export default React.memo(HeaderCustom);

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
