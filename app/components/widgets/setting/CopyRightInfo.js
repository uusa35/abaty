import React, {Fragment, useState} from 'react';
import {text, width} from '../../../constants/sizes';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../../../I18n';
import {APP_CASE} from '../../../../app';
import PropTypes from 'prop-types';
import moment from 'moment';
import {upperCase} from 'lodash';
import ModalBackContainer from '../../containers/ModalBackContainer';
import DeviceInfo from 'react-native-device-info';

const CopyRightInfo = ({version}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <View
        style={{
          width: '100%',
          backgroundColor: 'whitesmoke',
          padding: 5,
          paddingTop: 15,
          position: 'relative',
          left: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.btnTitle}>{`${I18n.t('copyrights')} ${upperCase(
          I18n.t(APP_CASE),
        )} - ${moment().format('y')}.  `}</Text>
        {version ? (
          <Text
            onPress={() => setVisible(true)}
            style={[
              styles.btnTitle,
              {
                textDecorationLine: 'underline',
                textDecorationColor: 'lightgrey',
              },
            ]}>{`${I18n.t('app_version')} ${DeviceInfo.getVersion()}`}</Text>
        ) : null}
      </View>
      <ModalBackContainer
        toggleVisible={visible}
        setToggleVisible={setVisible}
        title={I18n.t('app_information')}>
        <View
          style={{
            borderColor: 'lightgrey',
            borderBottomWidth: 0.1,
            borderTopWidth: 0.5,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.title}>{I18n.t('app_version')}</Text>
          <Text style={styles.title}>{DeviceInfo.getVersion()}</Text>
        </View>
        <View
          style={{
            borderColor: 'lightgrey',
            borderBottomWidth: 0.1,
            borderTopWidth: 0.5,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.title}>{I18n.t('app_build')}</Text>
          <Text style={styles.title}>{version}</Text>
        </View>
        <View
          style={{
            borderColor: 'lightgrey',
            borderBottomWidth: 0.25,
            borderTopWidth: 0.5,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.title}>{I18n.t('app_name')}</Text>
          <Text style={styles.title}>{upperCase(APP_CASE)}</Text>
        </View>
      </ModalBackContainer>
    </Fragment>
  );
};

export default CopyRightInfo;

CopyRightInfo.propTypes = {
  version: PropTypes.any,
};

const styles = StyleSheet.create({
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.smaller,
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontFamily: text.font,
    fontSize: text.smaller,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'black',
  },
});
