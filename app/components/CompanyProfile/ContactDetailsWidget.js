import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from './../../I18n';
import Communications from 'react-native-communications';
import {links} from './../../constants';

export default class ContactDetailsWidget extends PureComponent {
  render() {
    const {settings} = this.props;
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelTitle}>{I18n.t('contact_details')}</Text>
        </View>
        <View style={styles.panelContentWrapper}>
          <View style={styles.panelContentRowWrapper}>
            <Text style={styles.panelContentTitle}>{I18n.t('address')} : </Text>
            <Text style={styles.panelContent}>{settings.address}</Text>
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>
              {I18n.t('telephone')} :{' '}
            </Text>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => Communications.phonecall(settings.phone, true)}>
              <Text style={styles.panelContent}>{settings.phone}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.panelContentRowWrapper}>
            <Text style={styles.panelContentTitle}>{I18n.t('fax')} : </Text>
            <Text style={styles.panelContent}>{settings.fax}</Text>
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>{I18n.t('email')} : </Text>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() =>
                Communications.email(
                  [settings.email],
                  null,
                  null,
                  I18n.t('email'),
                  ''
                )
              }>
              <Text style={styles.panelContent}>{settings.email}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>
              {I18n.t('whatsapp')} :{' '}
            </Text>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() =>
                Communications.web(`${links.whatsapp}${settings.whatsapp}`)
              }>
              <Text style={styles.panelContent}>{settings.whatsapp}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>{I18n.t('website')} : </Text>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => Communications.web(settings.site_url)}>
              <Text style={styles.panelContent}>{settings.site_url}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelWrapper: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'darkgrey'
    // shadowColor: 'black',
    // shadowOffset: {width: 1, height: 1},
    // shadowRadius: 0,
    // shadowOpacity: 0.1
  },
  panelTitleWrapper: {
    backgroundColor: '#474747'
  },
  panelTitle: {
    paddingLeft: 15,
    padding: 5,
    fontSize: 18,
    color: 'white',
    fontFamily: 'cairo',
    textAlign: 'left'
  },
  panelContentWrapper: {
    padding: 15,
    backgroundColor: 'white'
  },
  panelContent: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: 'left'
  },
  panelContentTitle: {
    fontFamily: 'cairo',
    fontSize: 13,
    textAlign: 'left',
    minWidth: 100
  },
  panelContentRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btnWrapper: {
    height: 35
  }
});
