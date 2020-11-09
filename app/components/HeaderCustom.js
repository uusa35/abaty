/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';
import {linkingPrefix} from './../constants/links';
import I18n from './../I18n';
import {useNavigation} from 'react-navigation-hooks';
import {APP_CASE, ABATI} from '../../app';
import {useSelector} from 'react-redux';

const HeaderCustom = () => {
  const navigation = useNavigation();
  const {params} = navigation.state;
  const {settings} = useSelector((state) => state);
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
  return (
    <View style={styles.container}>
      <Icon
        onPress={() =>
          shareLink(
            `${linkingPrefix}${params.model}&id=${params.id}&type=${params.type}`,
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
    padding: 10,
  },
});
